import { SearchTree } from './includes/SearchTree.js';
import { BTreeStructure } from '../lib/structures/BTreeStructure.js';
import { BTreeDepthFirstIterator } from '../lib/iterators/BTree/BTreeDepthFirstIterator.js';
import { BTreeDepthFirstReverseIterator } from '../lib/iterators/BTree/BTreeDepthFirstReverseIterator.js';

/**
 * Returns a new object of BTree.
 *
 * @example
 * const bt = new BTree();
 *
 * // or
 *
 * const bt = BTree();
 *
 * @class BTree
 * @param {number} [order=3] Integer > 2
 */
export function BTree(order){

	if( void 0 === order ){
		return SearchTree( new BTreeStructure(), BTreeDepthFirstIterator, BTreeDepthFirstReverseIterator );
	}
		
	if (isNaN(order) || order !== Math.floor(order)) {
		throw TypeError('Invalid order "' + order + '"');
	}
	
	if ( 3 > order ) {
		throw RangeError('Invalid order "' + order + '"');
	}

	return SearchTree( new BTreeStructure(order-1), BTreeDepthFirstIterator, BTreeDepthFirstReverseIterator );
}

export default BTree;
