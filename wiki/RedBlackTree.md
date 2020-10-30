>
[Data structures](./Home.md) / [Red Black Tree](./RedBlackTree.md)
***
# Red Black Tree

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
const { RedBlackTree } = require('@styiannis/data-structures');
```


**As an ES module**

```js
import { RedBlackTree } from '@styiannis/data-structures');

// or

import RedBlackTree from '@styiannis/data-structures/src/RedBlackTree');
```

***

## Constructor


<a name="new_RedBlackTree_new"></a>

### new RedBlackTree()
> Returns a new object of RedBlackTree.

**Example**  
```js
const rbt = new RedBlackTree();

// or

const rbt = RedBlackTree();
```

***

## Methods

* [.set(key, value)](#RedBlackTree+set)
* [.get(key)](#RedBlackTree+get) ⇒ <code>\*</code> \| <code>undefined</code>
* [.delete(key)](#RedBlackTree+delete) ⇒ <code>boolean</code>
* [.has(key)](#RedBlackTree+has) ⇒ <code>boolean</code>
* [.at(index)](#RedBlackTree+at) ⇒ <code>array</code> \| <code>undefined</code>
* [.size()](#RedBlackTree+size) ⇒ <code>number</code>
* [.clear()](#RedBlackTree+clear)
* [.isEmpty()](#RedBlackTree+isEmpty) ⇒ <code>boolean</code>
* [.keys([reverse])](#RedBlackTree+keys) ⇒ <code>object</code>
* [.values([reverse])](#RedBlackTree+values) ⇒ <code>object</code>
* [.entries([reverse])](#RedBlackTree+entries) ⇒ <code>object</code>
* [.forEach(callback, [reverse], [thisArg])](#RedBlackTree+forEach)


***
<a name="RedBlackTree+set"></a>

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
const rbt = RedBlackTree();

rbt.set( 8, 'pineapple' );
console.log( rbt.get(8) );  // Output: 'pineapple'

rbt.set( 8, 'orange' );
console.log( rbt.get(8) );  // Output: 'orange'
```


***
<a name="RedBlackTree+get"></a>

### .get(key) ⇒ <code>\*</code> \| <code>undefined</code>
> Returns the element associated with the specified key 
> or <code>undefined</code> if the <code>key</code> can't be found in structure object.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> | The key of the element to return. |

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'banana' );
rbt.set( 9, 'mango' );

console.log( rbt.get(9) );  // Output: 'mango'
console.log( rbt.get(6) );  // Output: 'banana'
console.log( rbt.get(2) );  // Output: undefined
```


***
<a name="RedBlackTree+delete"></a>

### .delete(key) ⇒ <code>boolean</code>
> Removes the specified element from the structure object defined
> by <code>key</code>. Returns <code>false</code> when the
> specified <code>key</code>  can't be found in structure object.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 9, 'orange' );
console.log( rbt.get(9) );  // Output: 'orange'

rbt.delete(9);
console.log( rbt.get(9) );  // Output: undefined
```


***
<a name="RedBlackTree+has"></a>

### .has(key) ⇒ <code>boolean</code>
> Returns a boolean indicating whether an element with
> the specified key exists or not in structure object.


| Param | Type |
| --- | --- |
| key | <code>number</code> | 

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 5, 'blueberries' );
rbt.set( 3, 'apple' );

console.log( rbt.has(3) );  // Output: true
console.log( rbt.has(5) );  // Output: true
console.log( rbt.has(9) );  // Output: false
```


***
<a name="RedBlackTree+at"></a>

### .at(index) ⇒ <code>array</code> \| <code>undefined</code>
> Returns the element to the specified position of the 
> in-order traversal of the elements of the structure objects.

**Returns**: <code>array</code> \| <code>undefined</code> - [key, value]  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Position index (integer >= 0) |

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 4, 'cherries' );
rbt.set( 3, 'banana' );
rbt.set( 7, 'blueberries' );
rbt.set( 2, 'mango' );
rbt.set( 6, 'pineapple' );

console.log( rbt.at(0) );  // Output: [ 2, 'mango' ]
console.log( rbt.at(1) );  // Output: [ 3, 'banana' ]
console.log( rbt.at(2) );  // Output: [ 4, 'cherries' ]
console.log( rbt.at(3) );  // Output: [ 6, 'pineapple' ]
console.log( rbt.at(4) );  // Output: [ 7, 'blueberries' ]
console.log( rbt.at(5) );  // Output: undefined

// Min key value
console.log( rbt.at(0) );  // Output: [ 2, 'banana' ]

// Max key value
console.log( rbt.at( rbt.size() - 1 ) );  // Output: [ 7, 'blueberries' ]
```


***
<a name="RedBlackTree+size"></a>

### .size() ⇒ <code>number</code>
> Returns the number of elements in the structure object.

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 5, 'orange' );
rbt.set( 2, 'apple' );
rbt.set( 8, 'banana' );

console.log( rbt.size() );  // Output: 3
```


***
<a name="RedBlackTree+clear"></a>

### .clear()
> Removes all elements from the structure object.

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 4, 'pineapple' );
rbt.set( 9, 'cherries' );
rbt.set( 7, 'grapefruit' );

console.log( rbt.size() );  // Output: 3

rbt.clear();

console.log( rbt.size() );  // Output: 0
```


***
<a name="RedBlackTree+isEmpty"></a>

### .isEmpty() ⇒ <code>boolean</code>
> Indicates whether structure object is empty.

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 1, 'blueberries' );
rbt.set( 3, 'mango' );

console.log( rbt.isEmpty() );	// Output: false

rbt.clear();

console.log( rbt.isEmpty() );	// Output: true
```


***
<a name="RedBlackTree+keys"></a>

### .keys([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>key</code> for each element
> in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const iter = rbt.keys();  // In order iterator

console.log( iter.next().value );  // Output 2
console.log( iter.next().value );  // Output 4
console.log( iter.next().value );  // Output 6
console.log( iter.next().value );  // Output 8
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const iter = rbt.keys();  // In order iterator

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
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const revIter = rbt.keys(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output 8
console.log( revIter.next().value );  // Output 6
console.log( revIter.next().value );  // Output 4
console.log( revIter.next().value );  // Output 2
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const revIter = rbt.keys(true); // In reverse order iterator

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
<a name="RedBlackTree+values"></a>

### .values([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>value</code> for each element
> in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const iter = rbt.values();  // In order iterator

console.log( iter.next().value );  // Output 'apple'
console.log( iter.next().value );  // Output 'orange'
console.log( iter.next().value );  // Output 'grapefruit'
console.log( iter.next().value );  // Output 'blueberries'
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const iter = rbt.values();  // In order iterator

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
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const revIter = rbt.values(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output 'blueberries'
console.log( revIter.next().value );  // Output 'grapefruit'
console.log( revIter.next().value );  // Output 'orange'
console.log( revIter.next().value );  // Output 'apple'
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const revIter = rbt.values(true);  // In reverse order iterator

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
<a name="RedBlackTree+entries"></a>

### .entries([reverse]) ⇒ <code>object</code>
> Returns an iterator object that contains the <code>[key, value]</code> pairs for each 
> element in the structure object, in order or in reverse order traverse.


| Param | Type | Default |
| --- | --- | --- |
| [reverse] | <code>boolean</code> | <code>false</code> | 

**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const iter = rbt.entries();  // In order iterator

console.log( iter.next().value );  // Output [ 2, 'apple' ]
console.log( iter.next().value );  // Output [ 4, 'orange' ]
console.log( iter.next().value );  // Output [ 6, 'grapefruit' ]
console.log( iter.next().value );  // Output [ 8, 'blueberries' ]
console.log( iter.next().value );  // Output undefined
console.log( iter.next().done );  // Output true
```
**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const iter = rbt.entries();  // In order iterator

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
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const revIter = rbt.entries(true);  // In reverse order iterator

console.log( revIter.next().value );  // Output [ 8, 'blueberries' ]
console.log( revIter.next().value );  // Output [ 6, 'grapefruit' ]
console.log( revIter.next().value );  // Output [ 4, 'orange' ]
console.log( revIter.next().value );  // Output [ 2, 'apple' ]
console.log( revIter.next().value );  // Output undefined
console.log( revIter.next().done );  // Output true
```
**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 6, 'grapefruit' );
rbt.set( 4, 'orange' );
rbt.set( 8, 'blueberries' );
rbt.set( 2, 'apple' );

const revIter = rbt.entries(true);  // In reverse order iterator

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
<a name="RedBlackTree+forEach"></a>

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
const rbt = RedBlackTree();

rbt.set( 5, 'banana' );
rbt.set( 7, 'pineapple' );
rbt.set( 1, 'mango' );

// In order iteration
rbt.forEach( function( key, value ){
  console.log( key, '=>', value );
});

// Output: 1 => 'mango'
// Output: 5 => 'banana'
// Output: 7 => 'pineapple'
```
**Example**  
```js
const rbt = RedBlackTree();

rbt.set( 5, 'banana' );
rbt.set( 7, 'pineapple' );
rbt.set( 1, 'mango' );

// In reverse order iteration
rbt.forEach( function( key, value ){
  console.log( key, '=>', value );
}, true );

// Output: 7 => 'pineapple'
// Output: 5 => 'banana'
// Output: 1 => 'mango'
```

***

## Sources

- [**Red-Black Tree** (*Wikipedia link*)](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
