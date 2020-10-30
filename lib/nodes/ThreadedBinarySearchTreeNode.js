import { BinarySearchTreeNode } from './BinarySearchTreeNode.js';

/**
 * ThreadedBinarySearchTreeNode class.
 *
 * @extends {BinarySearchTreeNode}
 */
export class ThreadedBinarySearchTreeNode extends BinarySearchTreeNode {
	/**
	 * Creates an instance of ThreadedBinarySearchTreeNode.
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
	hasLeftChild(){
		return this.leftBit;
	}

	/*
	 *
	 * @return {boolean}
	 */
	hasRightChild(){
		return this.rightBit;
	}
}
