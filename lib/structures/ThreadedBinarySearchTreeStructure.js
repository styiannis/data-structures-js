import { BinaryTree } from './includes/BinaryTree.js';
import { ThreadedBinarySearchTreeNode } from '../nodes/ThreadedBinarySearchTreeNode.js';

import { getNode } from '../operations/ThreadedBinarySearchTree/access.js';
import { insertNode } from '../operations/ThreadedBinarySearchTree/insert.js';
import { removeNode } from '../operations/ThreadedBinarySearchTree/remove.js';

/**
 * Threaded Binary Search Tree class
 *
 * @extends {BinaryTree}
 */
export class ThreadedBinarySearchTreeStructure extends BinaryTree {

	/**
	 * Creates an instance of BinarySearchTreeStructure.
	 */
	constructor(){
		super(ThreadedBinarySearchTreeNode, insertNode, removeNode, getNode);
	}
}
