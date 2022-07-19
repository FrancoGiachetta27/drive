use futures::TryStreamExt;
use rocket::{
    *,
    fs::{ TempFile, NamedFile },
    form::{ FromForm, Form },
    serde::json::serde_json::json,
};
use tokio::io::AsyncReadExt;
use mongodb::{
    bson,
    bson::{ doc, Document, Bson, oid::ObjectId },
    Client,
    Collection,
};
use bytes::BytesMut;

use crate::database::mongo_connection::connection;
use crate::database::db::{ InsertableFile, ResponseFile, FileStruct };
use crate::routes::responses::ApiResponse;

#[derive(FromForm,Debug)]
pub struct DataStruct<'a> {
    files: Vec<TempFile<'a>>,
    extension:Vec<String>
}

#[get("/files")]
pub async fn index() -> ApiResponse {
    let client:Client = connection().await.unwrap();
    let filesDB:Collection<Document> = client.database("FilesDB").collection("files");
    let files:Vec<_> = filesDB.find(None, None).await.unwrap().try_collect().await.unwrap();

    ApiResponse::ok(json!(files))
}

#[post("/files/upload", data="<data>")]
pub async fn store(data:Form<DataStruct<'_>>) -> ApiResponse {
    let client:Client = connection().await.unwrap();
    let filesDB:Collection<Document> = client.database("FilesDB").collection("files");
    let mut files:Vec<FileStruct> = vec![];

    println!("Here {:?}", &data);

    for (i,f) in data.files.iter().enumerate() {
        //get the file from the response body
        let getFile = NamedFile::open(f.path().unwrap()).await.unwrap();
        let mut file = getFile.take_file();

        //get the buffer to read the content of the file
        let mut buffer = BytesMut::with_capacity(5000000000);

        file.read_buf(&mut buffer).await.unwrap();

        let response_ = InsertableFile {
            name:format!("{}",f.name().unwrap()),
            data: buffer[..].to_vec(),
            extension: data.extension[i].to_owned()
        };

        // transfor the data to bason for mongo to understand it
        let serialized_doc = bson::to_bson(&FileStruct::from_insertable(response_)).unwrap();

        // trasform bson to a document to insert it
        let to_document = serialized_doc.as_document().unwrap();
        let inserted = filesDB.insert_one(to_document.to_owned(),None).await.unwrap();

        //find the just inserted data
        let new_data = filesDB.find_one(Some(doc! { "_id":  inserted.inserted_id.clone() }), None)
            .await
            .unwrap()
            .expect("Document not found");

        // convert the data to File struct
       files.push(bson::from_bson(Bson::Document(new_data)).unwrap());
    }

    ApiResponse::ok(json!(files))
}

#[put("/files/<id>", data="<data>")]
pub async fn update(id:String, data:Form<DataStruct<'_>>) -> ApiResponse {
    let client:Client = connection().await.unwrap();
    let filesDB:Collection<Document> = client.database("FilesDB").collection("files");

    //get the file from the response body
    let getFile = NamedFile::open(data.files[0].path().unwrap()).await.unwrap();
    let mut file = getFile.take_file();

    //get the buffer to read the content of the file
    let mut buffer = BytesMut::with_capacity(5000000000);

    file.read_buf(&mut buffer).await.unwrap();

    let replasement = InsertableFile {
        name:format!("{}",data.files[0].name().unwrap()),
        data: buffer[..].to_vec(),
        extension: data.extension[0].to_owned()
    };

    let to_update:FileStruct = bson::from_bson(Bson::Document(filesDB.find_one(
        Some( doc! { "_id": ObjectId::parse_str(&id).unwrap() }),
        None).await.unwrap().expect("Document not found"))
    ).unwrap();

    let to_serealized = bson::to_bson(&FileStruct::update(replasement, &to_update)).unwrap();
    let to_document = to_serealized.as_document().unwrap();

    let update_to = filesDB.replace_one(doc! {
        "_id": ObjectId::parse_str(&id).unwrap() },
        to_document,
        None).await;

    println!("update: {:?}", update_to);

    ApiResponse::ok(
        json!(ResponseFile::from_file(bson::from_bson::<FileStruct>(
            Bson::Document(to_document.to_owned())).unwrap()))
    )
}

#[delete("/files/<id>")]
pub async fn delete(id: String) -> ApiResponse {
    let client:Client = connection().await.unwrap();
    let files_db:Collection<Document> = client.database("FilesDB").collection("files");

    let result = files_db.delete_one(doc!{
        "_id": ObjectId::parse_str(id).unwrap() },
        None).await.unwrap();

    ApiResponse::ok(json!(result))
}
