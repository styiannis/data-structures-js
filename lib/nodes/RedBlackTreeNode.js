import { BinarySearchTreeNode } from './BinarySearchTreeNode.js';

/**
 * RedBlackTreeNode class.
 *
 * @extends {BinarySearchTreeNode}
 */
export class RedBlackTreeNode extends BinarySearchTreeNode{
	/**
	 * Creates an instance of RedBlackTreeNode.
	 *
	 * @param {number} key
	 * @param {*} value
	 */
	constructor(key, value) {
		super(key, value);
		/**
		 *
		 * @type {boolean}
		 */
		this.isRed = true;
	}
}
