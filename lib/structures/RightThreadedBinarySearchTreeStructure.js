import { BinaryTree } from './includes/BinaryTree.js';
import { RightThreadedBinarySearchTreeNode } from '../nodes/RightThreadedBinarySearchTreeNode.js';

import { getNode } from '../operations/ThreadedBinarySearchTree/access.js';
import { insertNode } from '../operations/RightThreadedBinarySearchTree/insert.js';
import { removeNode } from '../operations/RightThreadedBinarySearchTree/remove.js';

/**
 * Right Threaded Binary Search Tree class
 *
 * @extends {BinaryTree}
 */
export class RightThreadedBinarySearchTreeStructure extends BinaryTree {

	/**
	 * Creates an instance of BinarySearchTreeStructure.
	 */
	constructor(){
		super(RightThreadedBinarySearchTreeNode, insertNode, removeNode, getNode);
	}
}