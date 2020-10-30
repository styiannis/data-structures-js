/**
 *
 * @module
 */

import { removeNodeByKey } from './helpers/removeNodeByKey.js';

/**
 *
 * @param {ThreadedBinarySearchTreeNode} rootNode
 * @param {(ThreadedBinarySearchTreeNode|null)} parentNode
 * @param {*} node
 * @return {(ThreadedBinarySearchTreeNode|null)} 
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
		parentNode.rightBit = false;
	}

	node.detach();

	return rootNode;
}

/**
 *
 * @param {(ThreadedBinarySearchTreeNode|null)} rootNode
 * @param {number} key
 * @return {ThreadedBinarySearchTreeNode} 
 */
export function removeNode(rootNode, key) {
	return removeNodeByKey(rootNode, key, withoutChildRemoval);
}
