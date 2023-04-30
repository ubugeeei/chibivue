use anyhow::Result;
use chatgpt::prelude::ChatGPT;
use dotenv;
use glob::glob;

struct Page {
    file_name: String,
    content: String,
}

#[tokio::main]
async fn main() -> Result<()> {
    // env vars
    dotenv::dotenv().ok();
    let open_ai_api_key = dotenv::var("OPEN_AI_API_KEY").expect("OPEN_AI_API_KEY is not set");
    let repository_url = dotenv::var("REPOSITORY_URL").expect("REPOSITORY_URL is not set");
    let local_books_dir_path =
        dotenv::var("LOCAL_BOOKS_DIR_PATH").expect("LOCAL_BOOKS_DIR_PATH is not set");

    // load
    let pages_path = format!("{local_books_dir_path}/*.md");
    let pages = load_pages(&pages_path);

    // translate
    std::fs::create_dir_all(format!("{local_books_dir_path}/translated")).unwrap();
    let chat_gpt = ChatGPT::new(&open_ai_api_key).unwrap();
    for page in pages {
        let prompt = create_translation_prompt(&page.content);
        let translated = chat_gpt
            .send_message(&prompt)
            .await?
            .message()
            .content
            .clone();
        let translated_path = format!(
            "{local_books_dir_path}/translated/{file_name}",
            file_name = page.file_name
        );
        std::fs::write(&translated_path, translated).unwrap();
    }

    // add adjacent pages link
    let translated_pages_path = format!("{local_books_dir_path}/translated/*.md");
    let translated_pages = load_pages(&translated_pages_path);
    for (i, page) in translated_pages.iter().enumerate() {
        let prev_page_name = if i == 0 {
            None
        } else {
            Some(translated_pages[i - 1].file_name.clone())
        };

        let prev_page_link = if let Some(prev_page_name) = prev_page_name {
            format!("[Prev]({repository_url}/{prev_page_name})",)
        } else {
            String::from("Prev")
        };

        let next_page_name = if i == translated_pages.len() - 1 {
            None
        } else {
            Some(translated_pages[i + 1].file_name.clone())
        };

        let next_page_link = if let Some(next_page_name) = next_page_name {
            format!("[Next]({repository_url}/{next_page_name})",)
        } else {
            String::from("Next")
        };

        let mut new_content = page.content.clone();
        new_content.push_str(&format!(
            "\n\n{prev_page_link} | {next_page_link}",
            prev_page_link = prev_page_link,
            next_page_link = next_page_link
        ));

        let translated_path = format!(
            "{local_books_dir_path}/translated/{file_name}",
            file_name = page.file_name
        );

        std::fs::write(&translated_path, new_content).unwrap();
    }

    Ok(())
}

fn load_pages(path_wild_card: &str) -> Vec<Page> {
    let paths = glob(path_wild_card).expect("Failed to read glob pattern");

    paths
        .into_iter()
        .map(|path| {
            let path = &path.unwrap();
            let file_name = path.file_name().unwrap().to_str().unwrap().to_string();
            let path_name = path.to_str().unwrap().to_string();
            let content = std::fs::read_to_string(&path_name).unwrap();
            Page { file_name, content }
        })
        .collect()
}

fn create_translation_prompt(page_content: &str) -> String {
    format!("英語に翻訳してください。\n\n{page_content}")
}
