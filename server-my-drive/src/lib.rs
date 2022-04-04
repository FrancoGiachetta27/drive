#![allow(unused_attributes)]

#[macro_use] use rocket::*;

mod routes;
mod database;


pub fn rocket_builder() -> Rocket<Build> {
    rocket::build()
        .mount("/api", routes![
            routes::files::index,
            routes::files::store,
            routes::files::update
        ])
}
