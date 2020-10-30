import { SearchTree } from './includes/SearchTree.js';
import { ThreadedBinarySearchTreeStructure } from '../lib/structures/ThreadedBinarySearchTreeStructure.js';
import { ThreadedBinaryTreeDepthFirstIterator } from '../lib/iterators/ThreadedBinaryTree/ThreadedBinaryTreeDepthFirstIterator.js';
import { ThreadedBinaryTreeDepthFirstReverseIterator } from '../lib/iterators/ThreadedBinaryTree/ThreadedBinaryTreeDepthFirstReverseIterator.js';

/**
 * Returns a new object of ThreadedBinarySearchTree.
 *
 * @example
 * const tbst = new ThreadedBinarySearchTree();
 *
 * // or
 *
 * const tbst = ThreadedBinarySearchTree();
 *
 * @class ThreadedBinarySearchTree
 */
export function ThreadedBinarySearchTree(){
	return SearchTree( new ThreadedBinarySearchTreeStructure, ThreadedBinaryTreeDepthFirstIterator, ThreadedBinaryTreeDepthFirstReverseIterator );
}

export default ThreadedBinarySearchTree;
