use std:: {
    fs::File,
    io::BufReader, path::PathBuf, clone
};
use futures::{ TryStreamExt, stream, StreamExt };
use rocket::{
    *,
    fs::{ TempFile, NamedFile },
    form::{ FromForm, Form },
    serde::{ Serialize, Deserialize },
    serde::json::{ serde_json::json, Json, Value },
};
use tokio::io::AsyncReadExt;
use mongodb::{
    bson,
    bson::{ doc, Document, Bson },
    Client,
    Collection,
};
use bytes::BytesMut;

use crate::database::{ mongo_connection::connection };
use crate::database::db::{ InsertableFile, ResponseFile, FileStruct };
use crate::routes::responses::ApiResponse;

#[derive(FromForm,Debug)]
pub struct DataStruct<'a> {
    files: Vec<TempFile<'a>>,
}

#[get("/files")]
pub async fn index() -> ApiResponse {
    let client:Client = connection().await.unwrap();
    let filesDB:Collection<Document> = client.database("FilesDB").collection("files");
    let files:Vec<_> = filesDB.find(None, None).await.unwrap().try_collect().await.unwrap();

    ApiResponse::ok(json!(files))
}

#[post("/files/upload", data="<data>")]
pub async fn store(mut data:Form<DataStruct<'_>> ) -> ApiResponse {
    let client:Client = connection().await.unwrap();
    let filesDB:Collection<Document> = client.database("FilesDB").collection("files");
    let mut files:Vec<FileStruct> = vec![];

    for f in data.files.iter() {
        //get the file from the response body
        let mut getFile = NamedFile::open(f.path().unwrap()).await.unwrap();
        let mut file = getFile.take_file();
        //get the buffer to read the content of the file
        let mut buffer = BytesMut::with_capacity(5000000000);

        file.read_buf(&mut buffer).await.unwrap();

        let fileData = &file.metadata();
        let response_ = InsertableFile {
            name:f.name().unwrap().to_string(),
            data: buffer[..].to_vec()
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

// #[put("/files/<name>", format="json", data="<file>")]
// pub async fn update(name:String, file:Json<InsertableFile>) -> ApiResponse {
//
//     ApiResponse::ok(json!())
// }
//
// #[delete("/files/<name>")]
// pub async fn delete(name: String) -> ApiResponse {
//
//     ApiResponse::ok(json!())
// }
