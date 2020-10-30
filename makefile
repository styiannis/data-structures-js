TEST_DIR:= ./__tests__

install:
	npm install

update:
	npm update --dev

clean-installation: clean-build clean-exports
	node ./scripts/rmrf.js ./node_modules

reset-installation: clean-installation install
	
commit:
	npm run commit

watch:
	npm run watch

build:
	npm run build

clean-build:
	npm run clean:build

lint:
	npm run lint

lint-fix:
	npm run lint:fix

pkg-size:
	npm run pkg:size

benchmarks:
	npm run benchmarks

.PHONY : benchmarks

test:
	npm run test

coverage:
	npm run coverage

.PHONY : coverage

clean-coverage:
	npm run clean:coverage

visual:
	npm run visual

clean-visual:
	npm run clean:visual

docs:
	npm run docs

.PHONY : docs

clean-docs:
	npm run clean:docs

wiki:
	npm run wiki

.PHONY : wiki

clean-wiki:
	npm run clean:wiki

exports: docs wiki visual coverage

clean-exports: clean-docs clean-wiki clean-visual clean-coverage

test-BTree:
	npx jest $(TEST_DIR)/src/BTree.test.js

test-RedBlackTree:
	npx jest $(TEST_DIR)/src/RedBlackTree.test.js

test-BinarySearchTree:
	npx jest $(TEST_DIR)/src/BinarySearchTree.test.js

test-ThreadedBinarySearchTree:
	npx jest $(TEST_DIR)/src/ThreadedBinarySearchTree.test.js

test-RightThreadedBinarySearchTree:
	npx jest $(TEST_DIR)/src/RightThreadedBinarySearchTree.test.js

test-LeftThreadedBinarySearchTree:
	npx jest $(TEST_DIR)/src/LeftThreadedBinarySearchTree.test.js
