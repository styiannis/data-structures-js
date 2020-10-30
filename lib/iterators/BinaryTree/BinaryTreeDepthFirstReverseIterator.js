import { BinaryTreeDepthFirstIterator } from './BinaryTreeDepthFirstIterator.js';

/**
 *
 * @inner
 * @param {BinarySearchTreeNode} node
 * @param {(BinarySearchTreeNode|null)} node
 */
function nextStackFillNode( node ){
	return node.hasRightChild() ? node.right : null;
}

/**
 * BinaryTreeDepthFirstReverseIterator class.
 *
 * @extends {BinaryTreeDepthFirstIterator}
 */
export class BinaryTreeDepthFirstReverseIterator extends BinaryTreeDepthFirstIterator {
	/**
	 * Creates an instance of BinaryTreeDepthFirstIterator.
	 * 
	 * @param {BinarySearchTreeNode} node
	 */
	constructor( node ) {
		super(node, nextStackFillNode);
	}
	/**
	 * Returns next element or throws TypeError in case this.stack array is empty.
	 *
	 * @return {BinarySearchTreeNode}
	 */
	getNext() {
		let node = this.stack.pop();
		this.stackFillFn(this.stack, node.left, this.nextStackFillNodeFn);
		return node;
	}
}
