import { SearchTree } from './includes/SearchTree.js';
import { RightThreadedBinarySearchTreeStructure } from '../lib/structures/RightThreadedBinarySearchTreeStructure.js';
import { ThreadedBinaryTreeDepthFirstIterator } from '../lib/iterators/ThreadedBinaryTree/ThreadedBinaryTreeDepthFirstIterator.js';
import { BinaryTreeDepthFirstReverseIterator } from '../lib/iterators/BinaryTree/BinaryTreeDepthFirstReverseIterator.js';

/**
 * Returns a new object of RightThreadedBinarySearchTree.
 *
 * @example
 * const rtbst = new RightThreadedBinarySearchTree();
 *
 * // or
 *
 * const rtbst = RightThreadedBinarySearchTree();
 *
 * @class RightThreadedBinarySearchTree
 */
export function RightThreadedBinarySearchTree(){
	return SearchTree( new RightThreadedBinarySearchTreeStructure, ThreadedBinaryTreeDepthFirstIterator, BinaryTreeDepthFirstReverseIterator );
}

export default RightThreadedBinarySearchTree;
