.DEFAULT_GOAL := check

init:
	@echo "Initialising the project"
	@yarn install

check: --pre_check test
	@echo "✅"

docs:
	@npx doctoc .
	@echo "📚 Documentation ready!"

clean:
	@echo "🛁 Cleaning..."

clean_all:
	@echo "🧨 Clean all"
	@rm -rf node_modules yarn.lock

test:
	@echo "Testing..."
	@yarn test

release_patch: release

release_minor: check
	@.scripts/finish-release minor

release_major: check
	@.scripts/finish-release major

release: check
	@.scripts/finish-release patch

--pre_check:
	@yarn install
