install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	make test -- --coverage
