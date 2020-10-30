/**
 *
 * @param {LeftThreadedBinarySearchTreeNode} node
 * @return {LeftThreadedBinarySearchTreeNode} 
 */
export function nodeSuccessor(node) {
	let successor = node.right;
	while (successor.hasLeftChild()) {
		successor = successor.left;
	}
	return successor;
}