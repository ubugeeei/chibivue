use dotenv;
use glob::glob;

struct Page {
    file_name: String,
    content: String,
}

fn main() {
    // env vars
    dotenv::dotenv().ok();
    let output_dir_path = dotenv::var("OUTPUT_DIR_PATH").expect("OUTPUT_DIR_PATH is not set");
    let repository_url = dotenv::var("REPOSITORY_URL").expect("REPOSITORY_URL is not set");
    let local_books_dir_path =
        dotenv::var("LOCAL_BOOKS_DIR_PATH").expect("LOCAL_BOOKS_DIR_PATH is not set");

    // load
    let pages_path = format!("{local_books_dir_path}/*.md");
    let paths = glob(&pages_path).expect("Failed to read glob pattern");
    let pages: Vec<Page> = paths
        .into_iter()
        .map(|path| {
            let path = &path.unwrap();
            let file_name = path.file_name().unwrap().to_str().unwrap().to_string();
            let path_name = path.to_str().unwrap().to_string();
            let content = std::fs::read_to_string(&path_name).unwrap();
            Page { file_name, content }
        })
        .collect();

    // add adjacent pages link
    for (i, page) in pages.iter().enumerate() {
        let prev_page_name = if i == 0 {
            None
        } else {
            pages.get(i - 1).map(|prev| prev.file_name.clone())
        };
        let prev_page_link = prev_page_name
            .as_ref()
            .map(|name| format!("[Prev]({}/{})", repository_url, name))
            .unwrap_or_else(|| "Prev".to_string());

        let next_page_name = pages.get(i + 1).map(|next| next.file_name.clone());
        let next_page_link = next_page_name
            .as_ref()
            .map(|name| format!("[Next]({}/{})", repository_url, name))
            .unwrap_or_else(|| "Next".to_string());

        let new_content = format!(
            "{prev_page_link} | {next_page_link}\n\n{page_content}\n\n{prev_page_link} | {next_page_link}",
            page_content = page.content,
        );

        let translated_path = format!("{}/{}", output_dir_path, page.file_name);

        std::fs::write(&translated_path, new_content).expect("Failed to write file");
    }
}
