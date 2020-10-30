/**
 *
 * @param {(LeftThreadedBinarySearchTreeNode|null)}  node
 * @param {number} key
 * @return {(LeftThreadedBinarySearchTreeNode|null)}
 */
export function nextChildNode(node, key) {

	if (node.gtk(key)) {
		return node.hasLeftChild() ? node.left : null;
	}

	return node.hasRightChild() ? node.right : null;
}