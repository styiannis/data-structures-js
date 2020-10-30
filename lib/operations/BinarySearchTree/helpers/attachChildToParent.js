/**
 *
 * @param {BinarySearchTreeNode} node
 * @param {(BinarySearchTreeNode|null)} parentNode
 * @param {BinarySearchTreeNode} childNode
 * @param {BinarySearchTreeNode} [rootNode]
 * @return {(BinarySearchTreeNode|undefined)} 
 */
export function attachChildToParent( node, parentNode, childNode, rootNode ){

	if (null === parentNode) {
		return childNode;
	}
	
	if (null !== parentNode.left && node.eqk(parentNode.left.key)) {
		parentNode.left = childNode;
	}
	else {
		parentNode.right = childNode;
	}

	return rootNode;
}