#![deny(
    clippy::complexity,
    clippy::correctness,
    clippy::perf,
    clippy::style,
    clippy::suspicious,
    clippy::pedantic
)]

mod environment;

use crate::environment::EnvironmentVariable;
use actix_web::{web, App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let mut server = HttpServer::new(move || {
        App::new().service(web::resource("/").to(|| async { "Hello world!" }))
    });

    // Apply the HTTP_LISTEN environment variable.
    let bindings = environment::http::Bindings::get();
    for binding in bindings.split(',') {
        server = server.bind(binding)?;
    }

    // Start the server.
    server.run().await
}
