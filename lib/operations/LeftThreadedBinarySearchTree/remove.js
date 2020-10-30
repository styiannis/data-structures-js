/**
 *
 * @module
 */

import { removeNodeByKey } from '../ThreadedBinarySearchTree/helpers/removeNodeByKey.js';

/**
 *
 * @param {LeftThreadedBinarySearchTreeNode} rootNode
 * @param {LeftThreadedBinarySearchTreeNode} parentNode
 * @param {LeftThreadedBinarySearchTreeNode} node
 * @return {LeftThreadedBinarySearchTreeNode}
 */
function withoutChildRemoval(rootNode, parentNode, node) {

	if (null === parentNode) {
		node.detach();

		return null;
	}

	if (parentNode.leftBit && node.eqk(parentNode.left.key)) {
		parentNode.left = node.left;
		parentNode.leftBit = false;
	} else {
		parentNode.right = node.right;
	}

	node.detach();

	return rootNode;
}

/**
 *
 * @param {LeftThreadedBinarySearchTreeNode} rootNode
 * @param {number} key
 * @return {(Error|LeftThreadedBinarySearchTreeNode)} 
 */
export function removeNode(rootNode, key) {
	return removeNodeByKey(rootNode, key, withoutChildRemoval);
}
