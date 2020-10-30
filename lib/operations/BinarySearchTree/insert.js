/**
 *
 * @module 
 */

/**
 *
 * @param {BinarySearchTreeNode} node
 * @param {BinarySearchTreeNode} newNode
 * @return {(BinarySearchTreeNode|null)} 
 */
function insertNewNode(node, newNode){

	if( node.gtk(newNode.key) ){
		
		if (null !== node.left) {
			return node.left;
		}

		node.left = newNode;

		return null;
	}
	
	if (null !== node.right) {
		return node.right;
	}

	node.right = newNode;

	return null;
}

/**
 *
 * @param {BinarySearchTreeNode} rootNode
 * @param {BinarySearchTreeNode} newNode
 * @return {BinarySearchTreeNode} 
 */
export function insertNode(rootNode, newNode) {

	if (null === rootNode) {
		return newNode;
	}
	
	let node = rootNode;

	while (null !== node) {

		if (node.eqk(newNode.key)) {
			node.value = newNode.value;
			return rootNode;
		}
		
		node = insertNewNode( node, newNode );
	}
	
	return rootNode;
}
