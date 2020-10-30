import { SearchTree } from './includes/SearchTree.js';
import { LeftThreadedBinarySearchTreeStructure } from '../lib/structures/LeftThreadedBinarySearchTreeStructure.js';
import { BinaryTreeDepthFirstIterator } from '../lib/iterators/BinaryTree/BinaryTreeDepthFirstIterator.js';
import { ThreadedBinaryTreeDepthFirstReverseIterator } from '../lib/iterators/ThreadedBinaryTree/ThreadedBinaryTreeDepthFirstReverseIterator.js';

/**
 * Returns a new object of LeftThreadedBinarySearchTree.
 *
 * @example
 * const ltbst = new LeftThreadedBinarySearchTree();
 *
 * // or
 *
 * const ltbst = LeftThreadedBinarySearchTree();
 *
 * @class LeftThreadedBinarySearchTree
 */
export function LeftThreadedBinarySearchTree(){
	return SearchTree( new LeftThreadedBinarySearchTreeStructure, BinaryTreeDepthFirstIterator, ThreadedBinaryTreeDepthFirstReverseIterator );
}

export default LeftThreadedBinarySearchTree;
