use mongodb::{
    Client,
    options::{ ClientOptions, ResolverConfig },
};
use dotenv;
use std::{ env, error::Error };

pub async fn connection() -> Result<Client, Box<dyn Error>> {
    dotenv::dotenv()?;

    let client_uri = env::var("MONGODB_CONNECTION").expect("Your MONGO_URI goes here");
    // set the options with the configuratio for the client
    let options = ClientOptions::parse_with_resolver_config(&client_uri,ResolverConfig::cloudflare()).await?;
    let client = Client::with_options(options)?;

    Ok(client)
}

