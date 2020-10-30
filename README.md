# @styiannis/data-structures

[![Build Status](https://api.travis-ci.com/styiannis/data-structures-js.svg?branch=main)](https://travis-ci.com/styiannis/data-structures-js)
[![Coverage Status](https://coveralls.io/repos/github/styiannis/data-structures-js/badge.svg?branch=main)](https://coveralls.io/github/styiannis/data-structures-js?branch=main)<!--
[![Libraries.io depndency status for GitHub repo](https://img.shields.io/librariesio/github/styiannis/data-structures-js)](#)-->
[![Known Vulnerabilities](https://snyk.io/test/github/styiannis/data-structures-js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/styiannis/data-structures-js?targetFile=package.json) <!--[![Inline docs](http://inch-ci.org/github/styiannis/data-structures-js.svg?branch=main)](http://inch-ci.org/github/styiannis/data-structures-js?branch=main)-->
[![Maintainability](https://api.codeclimate.com/v1/badges/a78549d1d9aace1d67d6/maintainability)](https://codeclimate.com/github/styiannis/data-structures-js/maintainability)
[![npm (scoped)](https://img.shields.io/npm/v/@styiannis/data-structures)](https://www.npmjs.com/package/@styiannis/data-structures)<!--
[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/styiannis/data-structures-js/main)](https://github.com/styiannis/data-structures-js/releases)
[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/styiannis/data-structures-js)](https://github.com/styiannis/data-structures-js/tags)-->
[![GitHub](https://img.shields.io/github/license/styiannis/data-structures-js)](https://github.com/styiannis/data-structures-js/blob/main/LICENSE) 
<!--![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/styiannis/data-structures-js)
![GitHub repo size](https://img.shields.io/github/repo-size/styiannis/data-structures-js)
![Lines of code](https://img.shields.io/tokei/lines/github/styiannis/data-structures-js)-->
<!--[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)-->

Javascript implementation of classic and advanced data structures.

## Table of contents

- [Installation](#Installation)
- [Usage](#Usage)
- [Documentation](#Documentation)
	- [B trees](#B-trees)
	- [Binary search trees](#Binary-search-trees)
- [License](#License)

## Installation

Install via NPM:
```sh
$ npm install @styiannis/data-structures
```

## Usage

**Print data structures list**

```js
const ds = require('@styiannis/data-structures');

console.log( ds );

// Output:

{
  'BTree': [Function: BTree],
  'BinarySearchTree': [Function: BinarySearchTree],
  'LeftThreadedBinarySearchTree': [Function: LeftThreadedBinarySearchTree],
  'RedBlackTree': [Function: RedBlackTree],
  'RightThreadedBinarySearchTree': [Function: RightThreadedBinarySearchTree],
  'ThreadedBinarySearchTree': [Function: ThreadedBinarySearchTree]
}
```

**Basic data structure usage**
```js
const { RedBlackTree } = require('@styiannis/data-structures');

// Create a Red-black tree
const rbt = RedBlackTree();

// Insert items into the tree
rbt.set( 46, 'foo' );
rbt.set( 13, 'baz' );
rbt.set( 75, 'bar' );

// Get tree item value specified by key
console.log( rbt.get( 13 ) );  // Output: 'baz'

// Check for key within the tree
console.log( rbt.has( 46 ) );  // Output: true

// Remove item from tree
console.log( rbt.delete( 75 ) );  // Output: true
```
## Documentation

### B trees

- [B-Tree](https://github.com/styiannis/data-structures-js/blob/main/wiki/BTree.md)

### Binary search trees

- [Red Black Tree](https://github.com/styiannis/data-structures-js/blob/main/wiki/RedBlackTree.md)
- [Binary Search Tree](https://github.com/styiannis/data-structures-js/blob/main/wiki/BinarySearchTree.md)
- [Threaded Binary Search Tree](https://github.com/styiannis/data-structures-js/blob/main/wiki/ThreadedBinarySearchTree.md)
- [Right Threaded Binary Search Tree](https://github.com/styiannis/data-structures-js/blob/main/wiki/RightThreadedBinarySearchTree.md)
- [Left Threaded Binary Search Tree](https://github.com/styiannis/data-structures-js/blob/main/wiki/LeftThreadedBinarySearchTree.md)

## License

This project is licensed under the [MIT License](https://github.com/styiannis/data-structures-js/blob/main/LICENSE)