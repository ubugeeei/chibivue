import fs from "fs";

const listFiles = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((dirent) =>
      dirent.isFile()
        ? [`${dir}/${dirent.name}`]
        : listFiles(`${dir}/${dirent.name}`)
    );

const countBookSize = (files: string[]): number =>
  files.reduce((acc, file) => {
    if (file.endsWith(".md")) {
      const content = fs.readFileSync(file, "utf-8");
      const size = content.length;
      return acc + size;
    }
    return acc;
  }, 0);

(function main() {
  const ROOT = "book/online-book/ja";
  const OUT = "book/tools/count-book-size/book-size.json";
  const files = listFiles(ROOT);
  const bookSize = countBookSize(files);
  const json = JSON.stringify({ length: bookSize });
  fs.writeFileSync(OUT, json);
})();
