>
[Data structures](./Home.md) / [B-Tree](./BTree.md)
***
# B-Tree

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
const { BTree } = require('@styiannis/data-structures');
```


**As an ES module**

```js
import { BTree } from '@styiannis/data-structures');

// or

import BTree from '@styiannis/data-structures/src/BTree');
```


***

## Constructor


<a name="new_BTree_new"></a>

### new BTree([order])
> Returns a new object of BTree.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [order] | <code>number</code> | <code>3</code> | Integer > 2 |

**Example**  
```js
const bt = new BTree();

// or

const bt = BTree();
```

***

## Methods

* [.set(key, value)](#BTree+set)
* [.get(key)](#BTree+get) ⇒ <code>\*</code> \| <code>undefined</code>
* [.delete(key)](#BTree+delete) ⇒ <code>boolean</code>
* [.has(key)](#BTree+has) ⇒ <code>boolean</code>
* [.at(index)](#BTree+at) ⇒ <code>array</code> \| <code>undefined</code>
* [.size()](#BTree+size) ⇒ <code>number</code>
* [.clear()](#BTree+clear)
* [.isEmpty()](#BTree+isEmpty) ⇒ <code>boolean</code>
* [.keys([reverse])](#BTree+keys) ⇒ <code>object</code>
* [.values([reverse])](#BTree+values) ⇒ <code>object</code>
* [.entries([reverse])](#BTree+entries) ⇒ <code>object</code>
* [.forEach(callback, [reverse], [thisArg])](#BTree+forEach)


***
<a name="BTree+set"></a>

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
const bt = BTree();

bt.set( 8, 'pineapple' );
console.log( bt.get(8) );  // Output: 'pineapple'

bt.set( 8, 'orange' );
console.log( bt.get(8) );  // Output: 'orange'
```


***
<a name="BTree+get"></a>

### .get(key) ⇒ <code>\*</code> \| <code>undefined</code>
> Returns the element associated with the specified key 
> or <code>undefined</code> if the <code>key</code> can't be found in structure object.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> | The key of the element to return. |

**Example**  
```js
const bt = BTree();

bt.set( 6, 'banana' );
bt.set( 9, 'mango' );

console.log( bt.get(9) );  // Output: 'mango'
console.log( bt.get(6) );  // Output: 'banana'
console.log( bt.get(2) );  // Output: undefined
```


***
<a name="BTree+delete"></a>

### .delete(key) ⇒ <code>boolean</code>
> Removes the specified element from the structure object defined
> by <code>key</code>. Returns <code>false</code> when the
> specified <code>key</code>  can't be found in structure object.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 

**Example**  
```js
const bt = BTree();

bt.set( 9, 'orange' );
console.log( bt.get(9) );  // Output: 'orange'

bt.delete(9);
console.log( bt.get(9) );  // Output: undefined
```


***
<a name="BTree+has"></a>

### .has(key) ⇒ <code>boolean</code>
> Returns a boolean indicating whether an element with
> the specified key exists or not in structure object.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 

**Example**  
```js
const bt = BTree();

bt.set( 5, 'blueberries' );
bt.set( 3, 'apple' );

console.log( bt.has(3) );  // Output: true
console.log( bt.has(5) );  // Output: true
console.log( bt.has(9) );  // Output: false
```


***
<a name="BTree+at"></a>

### .at(index) ⇒ <code>array</code> \| <code>undefined</code>
> Returns the element to the specified position of the 
> in-order traversal of the elements of the structure objects.

**Returns**: <code>array</code> \| <code>undefined</code> - [key, value]  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Position index (integer >= 0) |

**Example**  
```js
const bt = BTree();

bt.set( 4, 'cherries' );
bt.set( 3, 'banana' );
bt.set( 7, 'blueberries' );
bt.set( 2, 'mango' );
bt.set( 6, 'pineapple' );

console.log( bt.at(0) );  // Output: [ 2, 'mango' ]
console.log( bt.at(1) );  // Output: [ 3, 'banana' ]
console.log( bt.at(2) );  // Output: [ 4, 'cherries' ]
console.log( bt.at(3) );  // Output: [ 6, 'pineapple' ]
console.log( bt.at(4) );  // Output: [ 7, 'blueberries' ]
console.log( bt.at(5) );  // Output: undefined

// Min key value
console.log( bt.at(0) );  // Output: [ 2, 'banana' ]

// Max key value
console.log( bt.at( bt.size() - 1 ) );  // Output: [ 7, 'blueberries' ]
```


***
<a name="BTree+size"></a>

### .size() ⇒ <code>number</code>
> Returns the number of elements in the structure object.

**Example**  
```js
const bt = BTree();

bt.set( 5, 'orange' );
bt.set( 2, 'apple' );
bt.set( 8, 'banana' );

console.log( bt.size() );  // Output: 3
```


***
<a name="BTree+clear"></a>

### .clear()
> Removes all elements from the structure object.

**Example**  
```js
const bt = BTree();

bt.set( 4, 'pineapple' );
bt.set( 9, 'cherries' );
bt.set( 7, 'grapefruit' );

console.log( bt.size() );  // Output: 3

bt.clear();

console.log( bt.size() );  // Output: 0
```


***
<a name="BTree+isEmpty"></a>

### .isEmpty() ⇒ <code>boolean</code>
> Indicates whether structure object is empty.

**Example**  
```js
const bt = BTree();

bt.set( 1, 'blueberries' );
bt.set( 3, 'mango' );

console.log( bt.isEmpty() ); // Output: false

bt.clear();

console.log( bt.isEmpty() ); // Output: true
```


***
<a name="BTree+keys"></a>

### .keys([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>key</code> for each element
> in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const iter = bt.keys();  // In order iterator

console.log( iter.next().value );  // Output 2
console.log( iter.next().value );  // Output 4
console.log( iter.next().value );  // Output 6
console.log( iter.next().value );  // Output 8
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const iter = bt.keys();  // In order iterator

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
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const revIter = bt.keys(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output 8
console.log( revIter.next().value );  // Output 6
console.log( revIter.next().value );  // Output 4
console.log( revIter.next().value );  // Output 2
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const revIter = bt.keys(true); // In reverse order iterator

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
<a name="BTree+values"></a>

### .values([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>value</code> for each element
> in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const iter = bt.values();  // In order iterator

console.log( iter.next().value );  // Output 'apple'
console.log( iter.next().value );  // Output 'orange'
console.log( iter.next().value );  // Output 'grapefruit'
console.log( iter.next().value );  // Output 'blueberries'
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const iter = bt.values();  // In order iterator

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
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const revIter = bt.values(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output 'blueberries'
console.log( revIter.next().value );  // Output 'grapefruit'
console.log( revIter.next().value );  // Output 'orange'
console.log( revIter.next().value );  // Output 'apple'
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const revIter = bt.values(true);  // In reverse order iterator

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
<a name="BTree+entries"></a>

### .entries([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>[key, value]</code> pairs for each 
> element in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const iter = bt.entries();  // In order iterator

console.log( iter.next().value );  // Output [ 2, 'apple' ]
console.log( iter.next().value );  // Output [ 4, 'orange' ]
console.log( iter.next().value );  // Output [ 6, 'grapefruit' ]
console.log( iter.next().value );  // Output [ 8, 'blueberries' ]
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const iter = bt.entries();  // In order iterator

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
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const revIter = bt.entries(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output [ 8, 'blueberries' ]
console.log( revIter.next().value );  // Output [ 6, 'grapefruit' ]
console.log( revIter.next().value );  // Output [ 4, 'orange' ]
console.log( revIter.next().value );  // Output [ 2, 'apple' ]
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const bt = BTree();

bt.set( 6, 'grapefruit' );
bt.set( 4, 'orange' );
bt.set( 8, 'blueberries' );
bt.set( 2, 'apple' );

const revIter = bt.entries(true);  // In reverse order iterator

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
<a name="BTree+forEach"></a>

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
const bt = BTree();

bt.set( 5, 'banana' );
bt.set( 7, 'pineapple' );
bt.set( 1, 'mango' );

// In order iteration
bt.forEach( function( key, value ){
  console.log( key, '=>', value );
});

// Output: 1 => 'mango'
// Output: 5 => 'banana'
// Output: 7 => 'pineapple'
```
**Example**  
```js
const bt = BTree();

bt.set( 5, 'banana' );
bt.set( 7, 'pineapple' );
bt.set( 1, 'mango' );

// In reverse order iteration
bt.forEach( function( key, value ){
  console.log( key, '=>', value );
}, true );

// Output: 7 => 'pineapple'
// Output: 5 => 'banana'
// Output: 1 => 'mango'
```

***

## Sources

- [**B-Tree** (*Wikipedia link*)](https://en.wikipedia.org/wiki/B-tree)
