BIN= ./node_modules/.bin
VERSION=`node -e " var pkg = require('./package.json'); console.log(pkg.version); "`
OUTPUT_MIN="xsduration-$(VERSION).min.js"

test: test-unit 

test-unit:
	@NODE_ENV=test $(BIN)/vows 

build:
	@rm -rf $(OUTPUT_MIN)
	@$(BIN)/uglifyjs  xsduration.js -cm > "$(OUTPUT_MIN)"

.PHONY: test
