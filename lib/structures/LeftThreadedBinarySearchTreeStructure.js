import { BinaryTree } from './includes/BinaryTree.js';
import { LeftThreadedBinarySearchTreeNode } from '../nodes/LeftThreadedBinarySearchTreeNode.js';

import { getNode } from '../operations/ThreadedBinarySearchTree/access.js';
import { insertNode } from '../operations/LeftThreadedBinarySearchTree/insert.js';
import { removeNode } from '../operations/LeftThreadedBinarySearchTree/remove.js';

/**
 * Left Threaded Binary Search Tree class
 *
 * @extends {BinaryTree}
 */
export class LeftThreadedBinarySearchTreeStructure extends BinaryTree {

	/**
	 * Creates an instance of BinarySearchTreeStructure.
	 */
	constructor(){
		super(LeftThreadedBinarySearchTreeNode, insertNode, removeNode, getNode);
	}
}