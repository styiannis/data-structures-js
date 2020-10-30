import { BinarySearchTreeNode } from './BinarySearchTreeNode.js';

/**
 * RightThreadedBinarySearchTreeNode class.
 *
 * @extends {BinarySearchTreeNode}
 */
export class RightThreadedBinarySearchTreeNode extends BinarySearchTreeNode{
	/**
	 * Creates an instance of RightThreadedBinarySearchTreeNode.
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
		this.rightBit = false;
	}

	/*
	 *
	 * @return {boolean}
	 */
	hasRightChild(){
		return this.rightBit;
	}
}