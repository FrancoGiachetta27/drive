#![allow(unused_attributes)]

use std::error::Error;
#[macro_use]
use rocket::*;
use rocket::shield::Shield;
// use rocket_contrib::helmet::SpaceHelmet;

mod database;
mod middleware;
mod routes;

pub fn rocket_builder() -> Result<Rocket<Build>, Box<dyn Error>> {
    let cors = middleware::make_cors();

    Ok(rocket::build()
        // .attach(SpaceHelmet::default())
        .mount(
            "/api",
            routes![
                routes::files::index,
                routes::files::store,
                routes::files::update,
                routes::files::delete,
            ],
        )
        .attach(cors))
}
