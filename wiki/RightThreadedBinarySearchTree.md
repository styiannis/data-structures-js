>
[Data structures](./Home.md) / [Right Threaded Binary Search Tree](./RightThreadedBinarySearchTree.md)
***
# Right Threaded Binary Search Tree

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
const { RightThreadedBinarySearchTree } = require('@styiannis/data-structures');
```


**As an ES module**

```js
import { RightThreadedBinarySearchTree } from '@styiannis/data-structures');

// or

import RightThreadedBinarySearchTree from '@styiannis/data-structures/src/RightThreadedBinarySearchTree');
```

***

## Constructor


<a name="new_RightThreadedBinarySearchTree_new"></a>

### new RightThreadedBinarySearchTree()
> Returns a new object of RightThreadedBinarySearchTree.

**Example**  
```js
const rtbst = new RightThreadedBinarySearchTree();

// or

const rtbst = RightThreadedBinarySearchTree();
```

***

## Methods

* [.set(key, value)](#RightThreadedBinarySearchTree+set)
* [.get(key)](#RightThreadedBinarySearchTree+get) ⇒ <code>\*</code> \| <code>undefined</code>
* [.delete(key)](#RightThreadedBinarySearchTree+delete) ⇒ <code>boolean</code>
* [.has(key)](#RightThreadedBinarySearchTree+has) ⇒ <code>boolean</code>
* [.at(index)](#RightThreadedBinarySearchTree+at) ⇒ <code>array</code> \| <code>undefined</code>
* [.size()](#RightThreadedBinarySearchTree+size) ⇒ <code>number</code>
* [.clear()](#RightThreadedBinarySearchTree+clear)
* [.isEmpty()](#RightThreadedBinarySearchTree+isEmpty) ⇒ <code>boolean</code>
* [.keys([reverse])](#RightThreadedBinarySearchTree+keys) ⇒ <code>object</code>
* [.values([reverse])](#RightThreadedBinarySearchTree+values) ⇒ <code>object</code>
* [.entries([reverse])](#RightThreadedBinarySearchTree+entries) ⇒ <code>object</code>
* [.forEach(callback, [reverse], [thisArg])](#RightThreadedBinarySearchTree+forEach)


***
<a name="RightThreadedBinarySearchTree+set"></a>

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
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 8, 'pineapple' );
console.log( rtbst.get(8) );  // Output: 'pineapple'

rtbst.set( 8, 'orange' );
console.log( rtbst.get(8) );  // Output: 'orange'
```


***
<a name="RightThreadedBinarySearchTree+get"></a>

### .get(key) ⇒ <code>\*</code> \| <code>undefined</code>
> Returns the element associated with the specified key 
> or <code>undefined</code> if the <code>key</code> can't be found in structure object.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> | The key of the element to return. |

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'banana' );
rtbst.set( 9, 'mango' );

console.log( rtbst.get(9) );  // Output: 'mango'
console.log( rtbst.get(6) );  // Output: 'banana'
console.log( rtbst.get(2) );  // Output: undefined
```


***
<a name="RightThreadedBinarySearchTree+delete"></a>

### .delete(key) ⇒ <code>boolean</code>
> Removes the specified element from the structure object defined
> by <code>key</code>. Returns <code>false</code> when the
> specified <code>key</code>  can't be found in structure object.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 9, 'orange' );
console.log( rtbst.get(9) );  // Output: 'orange'

rtbst.delete(9);
console.log( rtbst.get(9) );  // Output: undefined
```


***
<a name="RightThreadedBinarySearchTree+has"></a>

### .has(key) ⇒ <code>boolean</code>
> Returns a boolean indicating whether an element with
> the specified key exists or not in structure object.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 5, 'blueberries' );
rtbst.set( 3, 'apple' );

console.log( rtbst.has(3) );  // Output: true
console.log( rtbst.has(5) );  // Output: true
console.log( rtbst.has(9) );  // Output: false
```


***
<a name="RightThreadedBinarySearchTree+at"></a>

### .at(index) ⇒ <code>array</code> \| <code>undefined</code>
> Returns the element to the specified position of the 
> in-order traversal of the elements of the structure objects.

**Returns**: <code>array</code> \| <code>undefined</code> - [key, value]  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Position index (integer >= 0) |

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 4, 'cherries' );
rtbst.set( 3, 'banana' );
rtbst.set( 7, 'blueberries' );
rtbst.set( 2, 'mango' );
rtbst.set( 6, 'pineapple' );

console.log( rtbst.at(0) );  // Output: [ 2, 'mango' ]
console.log( rtbst.at(1) );  // Output: [ 3, 'banana' ]
console.log( rtbst.at(2) );  // Output: [ 4, 'cherries' ]
console.log( rtbst.at(3) );  // Output: [ 6, 'pineapple' ]
console.log( rtbst.at(4) );  // Output: [ 7, 'blueberries' ]
console.log( rtbst.at(5) );  // Output: undefined

// Min key value
console.log( rtbst.at(0) );  // Output: [ 2, 'banana' ]

// Max key value
console.log( rtbst.at( rtbst.size() - 1 ) );  // Output: [ 7, 'blueberries' ]
```


***
<a name="RightThreadedBinarySearchTree+size"></a>

### .size() ⇒ <code>number</code>
> Returns the number of elements in the structure object.

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 5, 'orange' );
rtbst.set( 2, 'apple' );
rtbst.set( 8, 'banana' );

console.log( rtbst.size() );  // Output: 3
```


***
<a name="RightThreadedBinarySearchTree+clear"></a>

### .clear()
> Removes all elements from the structure object.

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 4, 'pineapple' );
rtbst.set( 9, 'cherries' );
rtbst.set( 7, 'grapefruit' );

console.log( rtbst.size() );  // Output: 3

rtbst.clear();

console.log( rtbst.size() );  // Output: 0
```


***
<a name="RightThreadedBinarySearchTree+isEmpty"></a>

### .isEmpty() ⇒ <code>boolean</code>
> Indicates whether structure object is empty.

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 1, 'blueberries' );
rtbst.set( 3, 'mango' );

console.log( rtbst.isEmpty() );	// Output: false

rtbst.clear();

console.log( rtbst.isEmpty() );	// Output: true
```


***
<a name="RightThreadedBinarySearchTree+keys"></a>

### .keys([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>key</code> for each element
> in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const iter = rtbst.keys();  // In order iterator

console.log( iter.next().value );  // Output 2
console.log( iter.next().value );  // Output 4
console.log( iter.next().value );  // Output 6
console.log( iter.next().value );  // Output 8
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const iter = rtbst.keys();  // In order iterator

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
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const revIter = rtbst.keys(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output 8
console.log( revIter.next().value );  // Output 6
console.log( revIter.next().value );  // Output 4
console.log( revIter.next().value );  // Output 2
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const revIter = rtbst.keys(true); // In reverse order iterator

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
<a name="RightThreadedBinarySearchTree+values"></a>

### .values([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>value</code> for each element
> in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const iter = rtbst.values();  // In order iterator

console.log( iter.next().value );  // Output 'apple'
console.log( iter.next().value );  // Output 'orange'
console.log( iter.next().value );  // Output 'grapefruit'
console.log( iter.next().value );  // Output 'blueberries'
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const iter = rtbst.values();  // In order iterator

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
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const revIter = rtbst.values(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output 'blueberries'
console.log( revIter.next().value );  // Output 'grapefruit'
console.log( revIter.next().value );  // Output 'orange'
console.log( revIter.next().value );  // Output 'apple'
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const revIter = rtbst.values(true);  // In reverse order iterator

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
<a name="RightThreadedBinarySearchTree+entries"></a>

### .entries([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>[key, value]</code> pairs for each 
> element in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const iter = rtbst.entries();  // In order iterator

console.log( iter.next().value );  // Output [ 2, 'apple' ]
console.log( iter.next().value );  // Output [ 4, 'orange' ]
console.log( iter.next().value );  // Output [ 6, 'grapefruit' ]
console.log( iter.next().value );  // Output [ 8, 'blueberries' ]
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const iter = rtbst.entries();  // In order iterator

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
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const revIter = rtbst.entries(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output [ 8, 'blueberries' ]
console.log( revIter.next().value );  // Output [ 6, 'grapefruit' ]
console.log( revIter.next().value );  // Output [ 4, 'orange' ]
console.log( revIter.next().value );  // Output [ 2, 'apple' ]
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 6, 'grapefruit' );
rtbst.set( 4, 'orange' );
rtbst.set( 8, 'blueberries' );
rtbst.set( 2, 'apple' );

const revIter = rtbst.entries(true);  // In reverse order iterator

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
<a name="RightThreadedBinarySearchTree+forEach"></a>

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
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 5, 'banana' );
rtbst.set( 7, 'pineapple' );
rtbst.set( 1, 'mango' );

// In order iteration
rtbst.forEach( function( key, value ){
  console.log( key, '=>', value );
});

// Output: 1 => 'mango'
// Output: 5 => 'banana'
// Output: 7 => 'pineapple'
```
**Example**  
```js
const rtbst = RightThreadedBinarySearchTree();

rtbst.set( 5, 'banana' );
rtbst.set( 7, 'pineapple' );
rtbst.set( 1, 'mango' );

// In reverse order iteration
rtbst.forEach( function( key, value ){
  console.log( key, '=>', value );
}, true );

// Output: 7 => 'pineapple'
// Output: 5 => 'banana'
// Output: 1 => 'mango'
```

***

## Sources

- [**Threaded Binary Tree** (*Wikipedia link*)](https://en.wikipedia.org/wiki/Threaded_binary_tree)
