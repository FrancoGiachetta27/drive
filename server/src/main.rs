use server_my_drive::rocket_builder;
use tokio;

#[tokio::main]
async fn main() {
    rocket_builder().launch().await.unwrap();
}
