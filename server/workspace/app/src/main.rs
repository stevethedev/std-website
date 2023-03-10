#![deny(
    clippy::complexity,
    clippy::correctness,
    clippy::perf,
    clippy::style,
    clippy::suspicious,
    clippy::pedantic
)]

use actix_web::{web, App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let bind = "0.0.0.0:8080";

    HttpServer::new(move || App::new().service(web::resource("/").to(|| async { "Hello world!" })))
        .bind(bind)?
        .run()
        .await
}
