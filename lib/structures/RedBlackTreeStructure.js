import { BinaryTree } from './includes/BinaryTree.js';
import { RedBlackTreeNode } from '../nodes/RedBlackTreeNode.js';

import { getNode } from '../operations/BinarySearchTree/access.js';
import { insertNode } from '../operations/RedBlackTree/insert.js';
import { removeNode } from '../operations/RedBlackTree/remove.js';

/**
 * Red-Black Tree class
 *
 * @extends {BinaryTree}
 */
export class RedBlackTreeStructure extends BinaryTree {

	/**
	 * Creates an instance of RedBlackTreeStructure.
	 */
	constructor(){
		super(RedBlackTreeNode, insertNode, removeNode, getNode);
	}
}