.PHONY: build clean publish bump-version

# Default version bump type (patch, minor, or major)
BUMP ?= patch

clean:
	rm -rf dist
	rm -rf node_modules
	rm -f package-lock.json

install:
	npm install

build: install
	npm run build

bump-version:
	npm version $(BUMP)

publish: build
	npm publish

# All-in-one command to bump version, build, and publish
release: bump-version build publish

# Development commands
dev-install: install
	npm link

test:
	npm test

# Helper to show current version
version:
	@node -e "console.log(require('./package.json').version)" 