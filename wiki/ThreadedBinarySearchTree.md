>
[Data structures](./Home.md) / [Threaded Binary Search Tree](./ThreadedBinarySearchTree.md)
***
# Threaded Binary Search Tree

## Table of contents

- [Import](#import)
- API
	- [Constructor](#constructor)
	- [Methods](#methods)
- [Sources](#sources)

***

## Import


**As a CommonJS module**

```js
const { ThreadedBinarySearchTree } = require('@styiannis/data-structures');
```


**As an ES module**

```js
import { ThreadedBinarySearchTree } from '@styiannis/data-structures');

// or

import ThreadedBinarySearchTree from '@styiannis/data-structures/src/ThreadedBinarySearchTree');
```


***

## Constructor


<a name="new_ThreadedBinarySearchTree_new"></a>

### new ThreadedBinarySearchTree()
> Returns a new object of ThreadedBinarySearchTree.

**Example**  
```js
const tbst = new ThreadedBinarySearchTree();

// or

const tbst = ThreadedBinarySearchTree();
```

***

## Methods

* [.set(key, value)](#ThreadedBinarySearchTree+set)
* [.get(key)](#ThreadedBinarySearchTree+get) ⇒ <code>\*</code> \| <code>undefined</code>
* [.delete(key)](#ThreadedBinarySearchTree+delete) ⇒ <code>boolean</code>
* [.has(key)](#ThreadedBinarySearchTree+has) ⇒ <code>boolean</code>
* [.at(index)](#ThreadedBinarySearchTree+at) ⇒ <code>array</code> \| <code>undefined</code>
* [.size()](#ThreadedBinarySearchTree+size) ⇒ <code>number</code>
* [.clear()](#ThreadedBinarySearchTree+clear)
* [.isEmpty()](#ThreadedBinarySearchTree+isEmpty) ⇒ <code>boolean</code>
* [.keys([reverse])](#ThreadedBinarySearchTree+keys) ⇒ <code>object</code>
* [.values([reverse])](#ThreadedBinarySearchTree+values) ⇒ <code>object</code>
* [.entries([reverse])](#ThreadedBinarySearchTree+entries) ⇒ <code>object</code>
* [.forEach(callback, [reverse], [thisArg])](#ThreadedBinarySearchTree+forEach)


***
<a name="ThreadedBinarySearchTree+set"></a>

### .set(key, value)
> Specifies an element with a <code>key</code> and a <code>value</code> 
> to the structure object. In case there is already an element in the structure
> with the specified <code>key</code>, the element <code>value</code> is updated.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 
| value | <code>\*</code> | 

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 8, 'pineapple' );
console.log( tbst.get(8) );  // Output: 'pineapple'

tbst.set( 8, 'orange' );
console.log( tbst.get(8) );  // Output: 'orange'
```


***
<a name="ThreadedBinarySearchTree+get"></a>

### .get(key) ⇒ <code>\*</code> \| <code>undefined</code>
> Returns the element associated with the specified key 
> or <code>undefined</code> if the <code>key</code> can't be found in structure object.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> | The key of the element to return. |

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'banana' );
tbst.set( 9, 'mango' );

console.log( tbst.get(9) );  // Output: 'mango'
console.log( tbst.get(6) );  // Output: 'banana'
console.log( tbst.get(2) );  // Output: undefined
```


***
<a name="ThreadedBinarySearchTree+delete"></a>

### .delete(key) ⇒ <code>boolean</code>
> Removes the specified element from the structure object defined
> by <code>key</code>. Returns <code>false</code> when the
> specified <code>key</code>  can't be found in structure object.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 9, 'orange' );
console.log( tbst.get(9) );  // Output: 'orange'

tbst.delete(9);
console.log( tbst.get(9) );  // Output: undefined
```


***
<a name="ThreadedBinarySearchTree+has"></a>

### .has(key) ⇒ <code>boolean</code>
> Returns a boolean indicating whether an element with
> the specified key exists or not in structure object.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 5, 'blueberries' );
tbst.set( 3, 'apple' );

console.log( tbst.has(3) );  // Output: true
console.log( tbst.has(5) );  // Output: true
console.log( tbst.has(9) );  // Output: false
```


***
<a name="ThreadedBinarySearchTree+at"></a>

### .at(index) ⇒ <code>array</code> \| <code>undefined</code>
> Returns the element to the specified position of the 
> in-order traversal of the elements of the structure objects.

**Returns**: <code>array</code> \| <code>undefined</code> - [key, value]  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Position index (integer >= 0) |

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 4, 'cherries' );
tbst.set( 3, 'banana' );
tbst.set( 7, 'blueberries' );
tbst.set( 2, 'mango' );
tbst.set( 6, 'pineapple' );

console.log( tbst.at(0) );  // Output: [ 2, 'mango' ]
console.log( tbst.at(1) );  // Output: [ 3, 'banana' ]
console.log( tbst.at(2) );  // Output: [ 4, 'cherries' ]
console.log( tbst.at(3) );  // Output: [ 6, 'pineapple' ]
console.log( tbst.at(4) );  // Output: [ 7, 'blueberries' ]
console.log( tbst.at(5) );  // Output: undefined

// Min key value
console.log( tbst.at(0) );  // Output: [ 2, 'banana' ]

// Max key value
console.log( tbst.at( tbst.size() - 1 ) );  // Output: [ 7, 'blueberries' ]
```


***
<a name="ThreadedBinarySearchTree+size"></a>

### .size() ⇒ <code>number</code>
> Returns the number of elements in the structure object.

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 5, 'orange' );
tbst.set( 2, 'apple' );
tbst.set( 8, 'banana' );

console.log( tbst.size() );  // Output: 3
```


***
<a name="ThreadedBinarySearchTree+clear"></a>

### .clear()
> Removes all elements from the structure object.

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 4, 'pineapple' );
tbst.set( 9, 'cherries' );
tbst.set( 7, 'grapefruit' );

console.log( tbst.size() );  // Output: 3

tbst.clear();

console.log( tbst.size() );  // Output: 0
```


***
<a name="ThreadedBinarySearchTree+isEmpty"></a>

### .isEmpty() ⇒ <code>boolean</code>
> Indicates whether structure object is empty.

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 1, 'blueberries' );
tbst.set( 3, 'mango' );

console.log( tbst.isEmpty() ); // Output: false

tbst.clear();

console.log( tbst.isEmpty() ); // Output: true
```


***
<a name="ThreadedBinarySearchTree+keys"></a>

### .keys([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>key</code> for each element
> in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const iter = tbst.keys();  // In order iterator

console.log( iter.next().value );  // Output 2
console.log( iter.next().value );  // Output 4
console.log( iter.next().value );  // Output 6
console.log( iter.next().value );  // Output 8
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const iter = tbst.keys();  // In order iterator

for( let iterKey = iter.next(); ! iterKey.done; iterKey = iter.next() ){
    console.log( iterKey );
}

// Output: { value: 2, done: false }
// Output: { value: 4, done: false }
// Output: { value: 6, done: false }
// Output: { value: 8, done: false }

console.log( iter.next() );	// Output: { done: true }
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const revIter = tbst.keys(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output 8
console.log( revIter.next().value );  // Output 6
console.log( revIter.next().value );  // Output 4
console.log( revIter.next().value );  // Output 2
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const revIter = tbst.keys(true); // In reverse order iterator

for( let iterKey = revIter.next(); ! iterKey.done; iterKey = revIter.next() ){
    console.log( iterKey );
}

// Output: { value: 8, done: false }
// Output: { value: 6, done: false }
// Output: { value: 4, done: false }
// Output: { value: 2, done: false }

console.log( revIter.next() );	// Output: { done: true }
```


***
<a name="ThreadedBinarySearchTree+values"></a>

### .values([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>value</code> for each element
> in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const iter = tbst.values();  // In order iterator

console.log( iter.next().value );  // Output 'apple'
console.log( iter.next().value );  // Output 'orange'
console.log( iter.next().value );  // Output 'grapefruit'
console.log( iter.next().value );  // Output 'blueberries'
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const iter = tbst.values();  // In order iterator

for( let iterValue = iter.next(); ! iterValue.done; iterValue = iter.next() ){
    console.log( iterValue );
}

// Output: { value: 'apple', done: false }
// Output: { value: 'orange', done: false }
// Output: { value: 'grapefruit', done: false }
// Output: { value: 'blueberries', done: false }

console.log( iter.next() );	// Output: { done: true }
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const revIter = tbst.values(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output 'blueberries'
console.log( revIter.next().value );  // Output 'grapefruit'
console.log( revIter.next().value );  // Output 'orange'
console.log( revIter.next().value );  // Output 'apple'
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const revIter = tbst.values(true);  // In reverse order iterator

for( let iterValue = revIter.next(); ! iterValue.done; iterValue = revIter.next() ){
    console.log( iterValue );
}

// Output: { value: 'blueberries', done: false }
// Output: { value: 'grapefruit', done: false }
// Output: { value: 'orange', done: false }
// Output: { value: 'apple', done: false }

console.log( revIter.next() );	// Output: { done: true }
```


***
<a name="ThreadedBinarySearchTree+entries"></a>

### .entries([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>[key, value]</code> pairs for each 
> element in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const iter = tbst.entries();  // In order iterator

console.log( iter.next().value );  // Output [ 2, 'apple' ]
console.log( iter.next().value );  // Output [ 4, 'orange' ]
console.log( iter.next().value );  // Output [ 6, 'grapefruit' ]
console.log( iter.next().value );  // Output [ 8, 'blueberries' ]
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const iter = tbst.entries();  // In order iterator

for( let iterEntry = iter.next(); ! iterEntry.done; iterEntry = iter.next() ){
    console.log( iterEntry );
}

// Output: { value: [ 2, 'apple' ], done: false }
// Output: { value: [ 4, 'orange' ], done: false }
// Output: { value: [ 6, 'grapefruit' ], done: false }
// Output: { value: [ 8, 'blueberries' ], done: false }

console.log( iter.next() );	// Output: { done: true }
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const revIter = tbst.entries(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output [ 8, 'blueberries' ]
console.log( revIter.next().value );  // Output [ 6, 'grapefruit' ]
console.log( revIter.next().value );  // Output [ 4, 'orange' ]
console.log( revIter.next().value );  // Output [ 2, 'apple' ]
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 6, 'grapefruit' );
tbst.set( 4, 'orange' );
tbst.set( 8, 'blueberries' );
tbst.set( 2, 'apple' );

const revIter = tbst.entries(true);  // In reverse order iterator

for( let iterEntry = revIter.next(); ! iterEntry.done; iterEntry = revIter.next() ){
    console.log( iterEntry );
}

// Output: { value: [ 8, 'blueberries' ], done: false }
// Output: { value: [ 6, 'grapefruit' ], done: false }
// Output: { value: [ 4, 'orange' ], done: false }
// Output: { value: [ 2, 'apple' ], done: false }

console.log( revIter.next() );	// Output: { done: true }
```


***
<a name="ThreadedBinarySearchTree+forEach"></a>

### .forEach(callback, [reverse], [thisArg])
> Executes a provided function once per each <code>key</code> - <code>value</code>
> pair in the structure object, in order or in reverse order traverse.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Function to execute for each element of the structure object. 					  		  It takes the following arguments:                            a) element <code>key</code>,                            b) element <code>value</code>. |
| [reverse] | <code>boolean</code> | <code>false</code> |  |
| [thisArg] | <code>\*</code> |  | Value to use as <code>this</code> when executing <code>callback</code>. |

**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 5, 'banana' );
tbst.set( 7, 'pineapple' );
tbst.set( 1, 'mango' );

// In order iteration
tbst.forEach( function( key, value ){
  console.log( key, '=>', value );
});

// Output: 1 => 'mango'
// Output: 5 => 'banana'
// Output: 7 => 'pineapple'
```
**Example**  
```js
const tbst = ThreadedBinarySearchTree();

tbst.set( 5, 'banana' );
tbst.set( 7, 'pineapple' );
tbst.set( 1, 'mango' );

// In reverse order iteration
tbst.forEach( function( key, value ){
  console.log( key, '=>', value );
}, true );

// Output: 7 => 'pineapple'
// Output: 5 => 'banana'
// Output: 1 => 'mango'
```

***

## Sources

- [**Threaded Binary Tree** (*Wikipedia link*)](https://en.wikipedia.org/wiki/Threaded_binary_tree)
