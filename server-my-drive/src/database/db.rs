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
# [serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    created: DateTime<Utc>,
# [serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    updated: DateTime<Utc>
}

#[derive(Serialize, Deserialize)]
pub struct InsertableFile {
    pub name:String,
    pub data:Vec<u8>
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ResponseFile {
    id: String,
    name: String,
    data:Vec<u8>,
    created: Option<String>,
    updated: String
}

impl FileStruct {
    pub fn from_insertable(file:InsertableFile) -> Self {
        Self {
            id: None,
            name: file.name,
            data:file.data,
            created: Utc::now(),
            updated: Utc::now()
        }
    }
}

impl ResponseFile {
pub fn from_file(file: FileStruct) -> Self {
       Self {
            id :format!("{}", file.id.expect("expected name")),
            name:file.name,
            data:file.data,
            created: None,
            updated: format!("{}", Utc::now())
        }
    }
}
