/**
 *
 * @module 
 */

import { getNodeByKey } from '../BinarySearchTree/helpers/getNodeByKey.js';
import { nextChildNode } from './helpers/nextChildNode.js';

/**
 *
 * @param {(ThreadedBinarySearchTreeNode)} rootNode
 * @param {number} key
 * @return {(ThreadedBinarySearchTreeNode|undefined)} 
 */
export function getNode(rootNode, key) {

	return getNodeByKey( rootNode, key, nextChildNode );
}
