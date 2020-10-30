import { SearchTree } from './includes/SearchTree.js';
import { BinarySearchTreeStructure } from '../lib/structures/BinarySearchTreeStructure.js';
import { BinaryTreeDepthFirstIterator } from '../lib/iterators/BinaryTree/BinaryTreeDepthFirstIterator.js';
import { BinaryTreeDepthFirstReverseIterator } from '../lib/iterators/BinaryTree/BinaryTreeDepthFirstReverseIterator.js';

/**
 * Returns a new object of BinarySearchTree.
 *
 * @example
 * const bst = new BinarySearchTree();
 *
 * // or
 *
 * const bst = BinarySearchTree();
 *
 * @class BinarySearchTree
 */
export function BinarySearchTree(){
	return SearchTree( new BinarySearchTreeStructure, BinaryTreeDepthFirstIterator, BinaryTreeDepthFirstReverseIterator );
}

export default BinarySearchTree;
