.PHONY: byzenn trans

byzenn:
	cd books/tools/zenn_github_migrator && cargo run

trans:
	cd books/tools/translator && cargo run