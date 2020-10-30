import { ThreadedBinaryTreeDepthFirstIterator } from './ThreadedBinaryTreeDepthFirstIterator.js';

/**
 *
 * @param {ThreadedBinarySearchTreeNode} node
 * @return {ThreadedBinarySearchTreeNode}
 */
function lastSucessor(node) {
	while (node.hasRightChild()) {
		node = node.right;
	}

	return node;
}

/**
 * ThreadedBinaryTreeDepthFirstReverseIterator class.
 *
 * @extends {ThreadedBinaryTreeDepthFirstIterator}
 */
export class ThreadedBinaryTreeDepthFirstReverseIterator extends ThreadedBinaryTreeDepthFirstIterator {
	/**
	 * Creates an instance of ThreadedBinaryTreeDepthFirstIterator.
	 * 
	 * @param {ThreadedBinarySearchTreeNode} node
	 */
	constructor(node) {
		super(node, lastSucessor);
	}
	/**
	 * Returns next element or throws TypeError in case this.current is null.
	 *
	 * @return {ThreadedBinarySearchTreeNode}
	 */
	getNext() {
		let node = this.current;
		this.current = node.left;
		if (node.leftBit) {
			this.current = this.proceedNext(this.current);
		}
		return node;
	}
}
