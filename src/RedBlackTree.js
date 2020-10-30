import { SearchTree } from './includes/SearchTree.js';
import { RedBlackTreeStructure } from '../lib/structures/RedBlackTreeStructure.js';
import { BinaryTreeDepthFirstIterator } from '../lib/iterators/BinaryTree/BinaryTreeDepthFirstIterator.js';
import { BinaryTreeDepthFirstReverseIterator } from '../lib/iterators/BinaryTree/BinaryTreeDepthFirstReverseIterator.js';

/**
 * Returns a new object of RedBlackTree.
 *
 * @example
 * const rbt = new RedBlackTree();
 *
 * // or
 *
 * const rbt = RedBlackTree();
 *
 * @class RedBlackTree
 */
export function RedBlackTree(){
	return SearchTree( new RedBlackTreeStructure, BinaryTreeDepthFirstIterator, BinaryTreeDepthFirstReverseIterator );
}

export default RedBlackTree;
