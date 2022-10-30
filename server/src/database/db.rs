use serde::{ Serialize, Deserialize };
use chrono::{ DateTime, Utc };
use mongodb::{
    bson,
    bson::{
        doc,
        oid::ObjectId
    },
};

#[derive(Serialize, Deserialize, Debug)]
pub struct FileStruct {
#[serde(rename="_id", skip_serializing_if="Option::is_none")]
    id: Option<ObjectId>,
    name:String,
    data:Vec<u8>,
    extension: String,
# [serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    created: DateTime<Utc>,
# [serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    updated: DateTime<Utc>
}

#[derive(Serialize, Deserialize)]
pub struct InsertableFile {
    pub name:String,
    pub data:Vec<u8>,
    pub extension: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ResponseFile {
    id: String,
    name: String,
    data:Vec<u8>,
    extension: String,
    created: Option<String>,
    updated: String
}

impl FileStruct {
    pub fn from_insertable(file:InsertableFile) -> Self {
        Self {
            id: None,
            name: file.name,
            data:file.data,
            extension: file.extension,
            created: Utc::now(),
            updated: Utc::now()
        }
    }

    pub fn update(updates:InsertableFile, file:&FileStruct) -> Self {
        Self {
            id: file.id,
            name: updates.name,
            data: updates.data,
            extension: file.extension.to_owned(),
            created: file.created,
            updated: Utc::now()
        }
    }
}

impl ResponseFile {
pub fn from_file(file: FileStruct) -> Self {
       Self {
            id :format!("{}", file.id.expect("name expected")),
            name:file.name,
            data:file.data,
            extension: file.extension,
            created: None,
            updated: format!("{}", Utc::now())
        }
    }
}
