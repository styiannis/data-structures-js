/**
 *
 * @module
 */

import { getNodeByKey } from './helpers/getNodeByKey.js';

/**
 *
 * @param {(BinarySearchTreeNode|null)}  node
 * @param {number} key
 * @return {(BinarySearchTreeNode|null)}
 */
function nextChildNode(node, key){
	return node.gtk(key) ? node.left : node.right;
}

/**
 *
 * @param {(BinarySearchTreeNode|null)}  rootNode
 * @param {number} key
 * @return {(BinarySearchTreeNode|undefined)} 
 */
export function getNode(rootNode, key) {

	return getNodeByKey( rootNode, key, nextChildNode );
}
