/**
 *
 * @param {ThreadedBinarySearchTreeNode} node
 * @return {ThreadedBinarySearchTreeNode} 
 */
function lastPredecessor(node) {
	while (node.hasLeftChild()) {
		node = node.left;
	}

	return node;
}

/**
 * ThreadedBinaryTreeDepthFirstIterator class.
 */
export class ThreadedBinaryTreeDepthFirstIterator {
	/**
	 * Creates an instance of ThreadedBinaryTreeDepthFirstIterator.
	 * 
	 * @param {ThreadedBinarySearchTreeNode} node 
	 * @param {function} proceedNextFunc
	 */
	constructor(node, proceedNextFunc) {
		/**
		 *
		 * @type {function}
		 */
		this.proceedNext = 'function' === typeof proceedNextFunc ? proceedNextFunc : lastPredecessor;
		/**
		 *
		 * @type {(ThreadedBinarySearchTreeNode|null)}
		 */
		this.current = void 0 === node || null === node ? null : this.proceedNext(node);
	}
	/**
	 * Indicates whether next element exists.
	 *
	 * @return {boolean}
	 */
	hasNext() {
		return null !== this.current;
	}
	/**
	 * Returns next element or throws TypeError in case this.current is null.
	 *
	 * @return {ThreadedBinarySearchTreeNode}
	 */
	getNext() {
		let node = this.current;
		this.current = node.right;
		if (node.rightBit) {
			this.current = this.proceedNext(this.current);
		}
		return node;
	}
}
