/**
 *
 * @param {LeftThreadedBinarySearchTreeNode} node
 * @return {LeftThreadedBinarySearchTreeNode} 
 */
export function nodePredecessor(node) {
	let predecessor = node.left;
	while (predecessor.hasRightChild()) {
		predecessor = predecessor.right;
	}
	return predecessor;
}