import { BinarySearchTreeNode } from './BinarySearchTreeNode.js';

/**
 * LeftThreadedBinarySearchTreeNode class.
 *
 * @extends {BinarySearchTreeNode}
 */
export class LeftThreadedBinarySearchTreeNode extends BinarySearchTreeNode{
	/**
	 * Creates an instance of LeftThreadedBinarySearchTreeNode.
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
		this.leftBit = false;
	}

	/*
	 *
	 * @return {boolean}
	 */
	hasLeftChild(){
		return this.leftBit;
	}
}
