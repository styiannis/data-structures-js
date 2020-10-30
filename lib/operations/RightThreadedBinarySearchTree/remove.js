/**
 *
 * @module
 */

import { removeNodeByKey } from '../ThreadedBinarySearchTree/helpers/removeNodeByKey.js';

/**
 *
 * @param {RightThreadedBinarySearchTreeNode} rootNode
 * @param {RightThreadedBinarySearchTreeNode} parentNode
 * @param {RightThreadedBinarySearchTreeNode} node
 * @return {RightThreadedBinarySearchTreeNode}
 */
function withoutChildRemoval(rootNode, parentNode, node) {

	if (null === parentNode) {
		node.detach();

		return null;
	}

	if (null !== parentNode.left && node.eqk(parentNode.left.key)) {
		parentNode.left = node.left;
	} else {
		parentNode.right = node.right;
		parentNode.rightBit = false;
	}

	node.detach();

	return rootNode;
}

/**
 *
 * @param {RightThreadedBinarySearchTreeNode} rootNode
 * @param {number} key
 * @return {(Error|RightThreadedBinarySearchTreeNode)} 
 */
export function removeNode(rootNode, key) {
	return removeNodeByKey(rootNode, key, withoutChildRemoval);
}
