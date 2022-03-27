use rocket::{
    *,
    serde::json::{ Json, Value },
    http::{ ContentType, Status },
    response,
    response::{ Responder, Response },
};

#[derive(Debug)]
pub struct ApiResponse {
    status: Status,
    body: Value,
}

impl ApiResponse {
    pub fn ok(body:Value) -> Self {
        Self {
            status: Status::Ok,
            body: body
        }
    }

    pub fn err(body:Value) -> Self {
        Self {
            status: Status::InternalServerError,
            body: body
        }
    }
}

#[rocket::async_trait]
impl<'r, 'o: 'r> Responder<'r, 'o> for ApiResponse {
    fn respond_to(self, request: &'r Request<'_>) -> response::Result<'o> {
        Response::build_from(self.body.respond_to(&request).unwrap())
            .status(self.status)
            .header(ContentType::JSON)
            .ok()
    }
}
