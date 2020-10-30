/**
 *
 * @param {BinarySearchTreeNode} node
 * @param {(BinarySearchTreeNode|null)} node
 */
function nextStackFillNode( node ){
	return node.hasLeftChild() ? node.left : null;
}

/**
 *
 * @param {array} stack
 * @param {(BinarySearchTreeNode|null)} node
 */
function stackFill(stack, node, nextStackFillNodeFn){
	while (null !== node) {
		stack.push(node);
		node = nextStackFillNodeFn(node);
	}
}

/**
 * BinaryTreeDepthFirstIterator class.
 */
export class BinaryTreeDepthFirstIterator {
	/**
	 * Creates an instance of BinaryTreeDepthFirstIterator.
	 * 
	 * @param {BinarySearchTreeNode} node
	 * @param {function} nextStackFillNodeFn
	 */
	constructor( node, nextStackFillNodeFn ) {

		/**
	     *
	     * @type {array}
	     */
		this.stack = [];

		if (void 0 === node || null === node) {
			return;
		}

		/**
	     *
	     * @type {function}
	     */
		this.nextStackFillNodeFn = 'function' === typeof nextStackFillNodeFn ? nextStackFillNodeFn : nextStackFillNode;

		/**
	     *
	     * @type {function}
	     */
		this.stackFillFn = stackFill;

		this.stackFillFn(this.stack, node, this.nextStackFillNodeFn);
	}
	/**
	 * Indicates whether next element exists.
	 *
	 * @return {boolean}
	 */
	hasNext() {
		return 0 < this.stack.length;
	}
	/**
	 * Returns next element or throws TypeError in case this.stack array is empty.
	 *
	 * @return {BinarySearchTreeNode}
	 */
	getNext() {
		let node = this.stack.pop();
		this.stackFillFn(this.stack, node.right, this.nextStackFillNodeFn);
		return node;
	}
}
