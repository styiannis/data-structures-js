/**
 *
 * @param {ThreadedBinarySearchTreeNode} newNode
 * @param {array} pair [node, parentNode]
 * @param {function} insertLeftDirectionNodeFunc
 * @param {function} insertRightDirectionNodeFunc
 * @return {undefined}
 */
function checkInsertNext(newNode, pair, insertLeftDirectionNodeFunc, insertRightDirectionNodeFunc ) {

	if (pair[0].eqk(newNode.key)) {
		pair[0].value = newNode.value;
		pair[0] = null;
		return;
	}

	pair[1] = pair[0];

	if (pair[0].gtk(newNode.key)) {

		if (pair[0].hasLeftChild()) {
			pair[0] = pair[0].left;
			return;
		}

		insertLeftDirectionNodeFunc(newNode, pair[1]);
		pair[0] = null;
		return;
	}

	if (pair[0].hasRightChild()) {
		pair[0] = pair[0].right;
		return;
	}

	insertRightDirectionNodeFunc(newNode, pair[1]);
	pair[0] = null;
}

/**
 *
 * @param {ThreadedBinarySearchTreeNode} rootNode
 * @param {ThreadedBinarySearchTreeNode} newNode
 * @param {function} insertLeftDirectionNodeFunc
 * @param {function} insertRightDirectionNodeFunc
 * @return {(ThreadedBinarySearchTreeNode|null)}
 */
export function insertNewNode(rootNode, newNode, insertLeftDirectionNodeFunc, insertRightDirectionNodeFunc){

	if (null === rootNode) {
		return newNode;
	}

	const pair = [rootNode, null];

	while (null !== pair[0]) {
		checkInsertNext(newNode, pair, insertLeftDirectionNodeFunc, insertRightDirectionNodeFunc);
	}
	
	return rootNode;
}