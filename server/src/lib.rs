#![allow(unused_attributes)]

use std::error::Error;
#[macro_use] use rocket::*;

mod routes;
mod database;
mod middleware;

pub fn rocket_builder() -> Result<Rocket<Build>, Box<dyn Error>> {
    Ok(rocket::build()
        // .attach(SpaceHelmet::default())
        .attach(middleware::CORS)
        .mount("/api", routes![
            routes::files::index,
            routes::files::store,
            routes::files::update,
            routes::files::delete
        ])
    )
}

