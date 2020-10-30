/**
 * SearchTree class
 *
 * @class SearchTree
 *
 * @param {Tree} instance Instance of structure class.
 * @param {(BTreeDepthFirstIterator|BinaryTreeDepthFirstIterator|ThreadedBinaryTreeDepthFirstIterator)} Iterator Structure elements in order iterator.
 * @param {(BTreeDepthFirstReverseIterator|BinaryTreeDepthFirstReverseIterator|ThreadedBinaryTreeDepthFirstReverseIterator)} ReverseIterator Structure elements in reverse order iterator.
 */
export function SearchTree(instance, Iterator, ReverseIterator) {

	/**
	 *
	 * @param {number} key
	 */
	function keyValidation(key) {
		if (isNaN(key)) {
			throw TypeError('"' + key + '" is not a number');
		}
	}

	/**
	 *
	 * @param {number} index
	 */
	function indexValidation(index) {
		if (isNaN(index) || 0 > index || index !== Math.floor(index)) {
			throw TypeError('Invalid index value "' + index + '"');
		}
	}

	/**
	 *
	 * @param {boolean} [reverse=false]
	 * @param {number} [valueType=3] 1, 2, or 3
	 * @return {(Iterator|ReverseIterator)}
	 */
	function newIterator(reverse, valueType) {

		const iter = 1 === reverse || true === reverse ? new ReverseIterator(instance.rootNode) : new Iterator(instance.rootNode);

		/**
		 *
		 */
		function next() {
			
			if (!iter.hasNext()) {
				return { done: true };
			}

			const ret = { done: false };

			const curr = iter.getNext();

			switch (valueType) {
			case 1:
				ret.value = curr.key;
				break;
			case 2:
				ret.value = curr.value;
				break;
			default:
				ret.value = [curr.key, curr.value];
			}

			return ret;
		}

		return { next };
	}

	/**
	 * Specifies an element with a <code>key</code> and a <code>value</code> 
	 * to the structure object. In case there is already an element in the structure
	 * with the specified <code>key</code>, the element <code>value</code> is updated.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 8, 'pineapple' );
	 * console.log( st.get(8) );  // Output: 'pineapple'
	 *
	 * st.set( 8, 'orange' );
	 * console.log( st.get(8) );  // Output: 'orange'
	 *
	 *
	 * @method set
	 * @memberOf SearchTree
	 * @instance
	 * @param {number} key
	 * @param {*} value
	 */
	function set(key, value) {
		keyValidation(key);
		instance.insert(key, value);
	}

	/**
	 * Returns the element associated with the specified key 
	 * or <code>undefined</code> if the <code>key</code> can't be found in structure object.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'banana' );
	 * st.set( 9, 'mango' );
	 *
	 * console.log( st.get(9) );  // Output: 'mango'
	 * console.log( st.get(6) );  // Output: 'banana'
	 * console.log( st.get(2) );  // Output: undefined
	 *
	 *
	 * @method get
	 * @memberOf SearchTree
	 * @instance
	 * @param {number} key The key of the element to return.
	 * @return {(*|undefined)}
	 */
	function get(key) {
		keyValidation(key);
		return instance.get(key);
	}

	/**
	 * Removes the specified element from the structure object defined
	 * by <code>key</code>. Returns <code>false</code> when the
	 * specified <code>key</code>  can't be found in structure object.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 9, 'orange' );
	 * console.log( st.get(9) );  // Output: 'orange'
	 *
	 * st.delete(9);
	 * console.log( st.get(9) );  // Output: undefined
	 *
	 *
	 * @method delete
	 * @memberOf SearchTree
	 * @instance
	 * @param {number} key
	 * @return {boolean}
	 */
	function remove(key) {
		keyValidation(key);
		return instance.remove(key);
	}

	/**
	 * Returns a boolean indicating whether an element with
	 * the specified key exists or not in structure object.
	 * 
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 5, 'blueberries' );
	 * st.set( 3, 'apple' );
	 *
	 * console.log( st.has(3) );  // Output: true
	 * console.log( st.has(5) );  // Output: true
	 * console.log( st.has(9) );  // Output: false
	 *
	 *
	 * @method has
	 * @memberOf SearchTree
	 * @instance
	 * @param {number} key
	 * @return {boolean}
	 */
	function has(key) {
		keyValidation(key);
		return instance.hasKey(key);
	}

	/**
	 * Returns the element to the specified position of the 
	 * in-order traversal of the elements of the structure objects.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 4, 'cherries' );
	 * st.set( 3, 'banana' );
	 * st.set( 7, 'blueberries' );
	 * st.set( 2, 'mango' );
	 * st.set( 6, 'pineapple' );
	 *
	 * console.log( st.at(0) );  // Output: [ 2, 'mango' ]
	 * console.log( st.at(1) );  // Output: [ 3, 'banana' ]
	 * console.log( st.at(2) );  // Output: [ 4, 'cherries' ]
	 * console.log( st.at(3) );  // Output: [ 6, 'pineapple' ]
	 * console.log( st.at(4) );  // Output: [ 7, 'blueberries' ]
	 * console.log( st.at(5) );  // Output: undefined
	 *
	 * // Min key value
	 * console.log( st.at(0) );  // Output: [ 2, 'banana' ]
	 *
	 * // Max key value
	 * console.log( st.at( st.size() - 1 ) );  // Output: [ 7, 'blueberries' ]
	 *
	 *
	 * @method at
	 * @memberOf SearchTree
	 * @instance
	 * @param {number} index Position index (integer >= 0)
	 * @return {(array|undefined)} [key, value]
	 */
	function at(index) {

		indexValidation(index);

		if (index >= instance.length) {
			return;
		}

		let next;
		let i = 0;

		const iter = new Iterator(instance.rootNode);

		while (iter.hasNext() && i <= index) {

			next = iter.getNext();

			if (i === index) {
				return [next.key, next.value];
			}

			i += 1;
		}
	}

	/**
	 * Returns the number of elements in the structure object.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 5, 'orange' );
	 * st.set( 2, 'apple' );
	 * st.set( 8, 'banana' );
	 *
	 * console.log( st.size() );  // Output: 3
	 *
	 *
	 * @method size
	 * @memberOf SearchTree
	 * @instance
	 * @return {number}
	 */
	const size = () => instance.length;

	/**
	 * Removes all elements from the structure object.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 4, 'pineapple' );
	 * st.set( 9, 'cherries' );
	 * st.set( 7, 'grapefruit' );
	 *
	 * console.log( st.size() );  // Output: 3
	 *
	 * st.clear();
	 *
	 * console.log( st.size() );  // Output: 0
	 *
	 *
	 * @method clear
	 * @memberOf SearchTree
	 * @instance
	 */
	const clear = () => instance.clear();

	/**
	 * Indicates whether structure object is empty.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 1, 'blueberries' );
	 * st.set( 3, 'mango' );
	 *
	 * console.log( st.isEmpty() ); // Output: false
	 *
	 * st.clear();
	 *
	 * console.log( st.isEmpty() ); // Output: true
	 *
	 *
	 * @method isEmpty
	 * @memberOf SearchTree
	 * @instance
	 * @return {boolean}
	 */
	const isEmpty = () => 0 === instance.length;

	/**
	 * Returns an iterator object that contains the <code>key</code> for each element
	 * in the structure object, in order or in reverse order traverse.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const iter = st.keys();  // In order iterator
	 *
	 * console.log( iter.next().value );  // Output 2
	 * console.log( iter.next().value );  // Output 4
	 * console.log( iter.next().value );  // Output 6
	 * console.log( iter.next().value );  // Output 8
	 * console.log( iter.next().value );  // Output undefined
	 * console.log( iter.next().done );  // Output true
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const iter = st.keys();  // In order iterator
	 * 
	 * for( let iterKey = iter.next(); ! iterKey.done; iterKey = iter.next() ){
	 *     console.log( iterKey );
	 * }
	 *
	 * // Output: { value: 2, done: false }
	 * // Output: { value: 4, done: false }
	 * // Output: { value: 6, done: false }
	 * // Output: { value: 8, done: false }
	 *
	 * console.log( iter.next() );	// Output: { done: true }
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const revIter = st.keys(true);  // In reverse order iterator
	 *
	 * console.log( revIter.next().value );  // Output 8
	 * console.log( revIter.next().value );  // Output 6
	 * console.log( revIter.next().value );  // Output 4
	 * console.log( revIter.next().value );  // Output 2
	 * console.log( revIter.next().value );  // Output undefined
	 * console.log( revIter.next().done );  // Output true
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const revIter = st.keys(true); // In reverse order iterator
	 * 
	 * for( let iterKey = revIter.next(); ! iterKey.done; iterKey = revIter.next() ){
	 *     console.log( iterKey );
	 * }
	 *
	 * // Output: { value: 8, done: false }
	 * // Output: { value: 6, done: false }
	 * // Output: { value: 4, done: false }
	 * // Output: { value: 2, done: false }
	 *
	 * console.log( revIter.next() );	// Output: { done: true }
	 *
	 *
	 * @method keys
	 * @memberOf SearchTree
	 * @instance
	 * @param {boolean} [reverse=false]
	 * @return {object}
	 */
	const keys = reverse => newIterator(reverse, 1);

	/**
	 * Returns an iterator object that contains the <code>value</code> for each element
	 * in the structure object, in order or in reverse order traverse.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const iter = st.values();  // In order iterator
	 *
	 * console.log( iter.next().value );  // Output 'apple'
	 * console.log( iter.next().value );  // Output 'orange'
	 * console.log( iter.next().value );  // Output 'grapefruit'
	 * console.log( iter.next().value );  // Output 'blueberries'
	 * console.log( iter.next().value );  // Output undefined
	 * console.log( iter.next().done );  // Output true
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const iter = st.values();  // In order iterator
	 * 
	 * for( let iterValue = iter.next(); ! iterValue.done; iterValue = iter.next() ){
	 *     console.log( iterValue );
	 * }
	 *
	 * // Output: { value: 'apple', done: false }
	 * // Output: { value: 'orange', done: false }
	 * // Output: { value: 'grapefruit', done: false }
	 * // Output: { value: 'blueberries', done: false }
	 *
	 * console.log( iter.next() );	// Output: { done: true }
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const revIter = st.values(true);  // In reverse order iterator
	 *
	 * console.log( revIter.next().value );  // Output 'blueberries'
	 * console.log( revIter.next().value );  // Output 'grapefruit'
	 * console.log( revIter.next().value );  // Output 'orange'
	 * console.log( revIter.next().value );  // Output 'apple'
	 * console.log( revIter.next().value );  // Output undefined
	 * console.log( revIter.next().done );  // Output true
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const revIter = st.values(true);  // In reverse order iterator
	 * 
	 * for( let iterValue = revIter.next(); ! iterValue.done; iterValue = revIter.next() ){
	 *     console.log( iterValue );
	 * }
	 *
	 * // Output: { value: 'blueberries', done: false }
	 * // Output: { value: 'grapefruit', done: false }
	 * // Output: { value: 'orange', done: false }
	 * // Output: { value: 'apple', done: false }
	 *
	 * console.log( revIter.next() );	// Output: { done: true }
	 *
	 *
	 * @method values
	 * @memberOf SearchTree
	 * @instance
	 * @param {boolean} [reverse=false]
	 * @return {object}
	 */
	const values = reverse => newIterator(reverse, 2);

	/**
	 * Returns an iterator object that contains the <code>[key, value]</code> pairs for each 
	 * element in the structure object, in order or in reverse order traverse.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const iter = st.entries();  // In order iterator
	 *
	 * console.log( iter.next().value );  // Output [ 2, 'apple' ]
	 * console.log( iter.next().value );  // Output [ 4, 'orange' ]
	 * console.log( iter.next().value );  // Output [ 6, 'grapefruit' ]
	 * console.log( iter.next().value );  // Output [ 8, 'blueberries' ]
	 * console.log( iter.next().value );  // Output undefined
	 * console.log( iter.next().done );  // Output true
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const iter = st.entries();  // In order iterator
	 * 
	 * for( let iterEntry = iter.next(); ! iterEntry.done; iterEntry = iter.next() ){
	 *     console.log( iterEntry );
	 * }
	 *
	 * // Output: { value: [ 2, 'apple' ], done: false }
	 * // Output: { value: [ 4, 'orange' ], done: false }
	 * // Output: { value: [ 6, 'grapefruit' ], done: false }
	 * // Output: { value: [ 8, 'blueberries' ], done: false }
	 *
	 * console.log( iter.next() );	// Output: { done: true }
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const revIter = st.entries(true);  // In reverse order iterator
	 *
	 * console.log( revIter.next().value );  // Output [ 8, 'blueberries' ]
	 * console.log( revIter.next().value );  // Output [ 6, 'grapefruit' ]
	 * console.log( revIter.next().value );  // Output [ 4, 'orange' ]
	 * console.log( revIter.next().value );  // Output [ 2, 'apple' ]
	 * console.log( revIter.next().value );  // Output undefined
	 * console.log( revIter.next().done );  // Output true
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 6, 'grapefruit' );
	 * st.set( 4, 'orange' );
	 * st.set( 8, 'blueberries' );
	 * st.set( 2, 'apple' );
	 *
	 * const revIter = st.entries(true);  // In reverse order iterator
	 * 
	 * for( let iterEntry = revIter.next(); ! iterEntry.done; iterEntry = revIter.next() ){
	 *     console.log( iterEntry );
	 * }
	 *
	 * // Output: { value: [ 8, 'blueberries' ], done: false }
	 * // Output: { value: [ 6, 'grapefruit' ], done: false }
	 * // Output: { value: [ 4, 'orange' ], done: false }
	 * // Output: { value: [ 2, 'apple' ], done: false }
	 *
	 * console.log( revIter.next() );	// Output: { done: true }
	 *
	 *
	 * @method entries
	 * @memberOf SearchTree
	 * @instance
	 * @param {boolean} [reverse=false]
	 * @return {object}
	 */
	const entries = reverse => newIterator(reverse, 3);

	/**
	 * Executes a provided function once per each <code>key</code> - <code>value</code>
	 * pair in the structure object, in order or in reverse order traverse.
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 5, 'banana' );
	 * st.set( 7, 'pineapple' );
	 * st.set( 1, 'mango' );
	 *
	 * // In order iteration
	 * st.forEach( function( key, value ){
	 *   console.log( key, '=>', value );
	 * });
	 *
	 * // Output: 1 => 'mango'
	 * // Output: 5 => 'banana'
	 * // Output: 7 => 'pineapple'
	 *
	 *
	 * @example
	 * const st = SearchTree(instance, Iterator, ReverseIterator);
	 * 
	 * st.set( 5, 'banana' );
	 * st.set( 7, 'pineapple' );
	 * st.set( 1, 'mango' );
	 *
	 * // In reverse order iteration
	 * st.forEach( function( key, value ){
	 *   console.log( key, '=>', value );
	 * }, true );
	 *
	 * // Output: 7 => 'pineapple'
	 * // Output: 5 => 'banana'
	 * // Output: 1 => 'mango'
	 *
	 *
	 * @memberOf SearchTree
	 * @instance
	 * @param {function} callback Function to execute for each element of the structure object.
	 * 					  		  It takes the following arguments:
	 *                            a) element <code>key</code>,
	 *                            b) element <code>value</code>.
	 *
	 *
	 * @method forEach
	 * @param {boolean} [reverse=false]
	 * @param {*} [thisArg=undefined]    Value to use as <code>this</code> when executing <code>callback</code>.
	 */
	function forEach(callback, reverse, thisArg) {

		if ('function' !== typeof callback) {
			throw TypeError(callback + ' is not a function');
		}

		const iter = 1 === reverse || true === reverse ? new ReverseIterator(instance.rootNode) : new Iterator(instance.rootNode);

		let curr;

		while (iter.hasNext()) {
			curr = iter.getNext();
			callback.call(thisArg, curr.key, curr.value);
		}
	}

	return Object.freeze({
		size,
		clear,
		isEmpty,
		set,
		get,
		has,
		at,
		delete: remove,
		keys,
		values,
		entries,
		forEach,
	});
}
