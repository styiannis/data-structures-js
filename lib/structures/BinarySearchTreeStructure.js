import { BinaryTree } from './includes/BinaryTree.js';
import { BinarySearchTreeNode } from '../nodes/BinarySearchTreeNode.js';

import { getNode } from '../operations/BinarySearchTree/access.js';
import { insertNode } from '../operations/BinarySearchTree/insert.js';
import { removeNode } from '../operations/BinarySearchTree/remove.js';

/**
 * Binary Search Tree class
 *
 * @extends {BinaryTree}
 */
export class BinarySearchTreeStructure extends BinaryTree{

	/**
	 * Creates an instance of BinarySearchTreeStructure.
	 */
	constructor(){
		super(BinarySearchTreeNode, insertNode, removeNode, getNode);
	}
}