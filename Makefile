install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

format:
	npx prettier --write .