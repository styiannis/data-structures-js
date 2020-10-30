/**
 *
 * @param {(BinarySearchTreeNode|null)}  node
 * @param {number} key
 * @param {function} nextChildNodeFunc
 * @return {(BinarySearchTreeNode|null)}
 */
export function getNodeByKey( rootNode, key, nextChildNodeFunc ){

	if (null === rootNode) {
		return;
	}

	let node = rootNode;

	while (null !== node) {

		if (node.eqk(key)) {
			return node;
		}

		node = nextChildNodeFunc(node, key);
	}
}