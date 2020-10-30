/**
 *
 * @module
 */

import { insertNewNode } from '../ThreadedBinarySearchTree/helpers/insertNewNode.js';

/**
 *
 * @param {(LeftThreadedBinarySearchTreeNode)} newNode
 * @param {LeftThreadedBinarySearchTreeNode} parentNode
 */
function insertLeftDirectionNode(newNode, parentNode) {
	newNode.left = parentNode.left;
	parentNode.leftBit = true;
	parentNode.left = newNode;
}

/**
 *
 * @param {(LeftThreadedBinarySearchTreeNode)} newNode
 * @param {LeftThreadedBinarySearchTreeNode} parentNode
 */
function insertRightDirectionNode(newNode, parentNode) {
	newNode.left = parentNode;
	parentNode.right = newNode;
}

/**
 *
 * @param {(LeftThreadedBinarySearchTreeNode|null)} rootNode
 * @param {LeftThreadedBinarySearchTreeNode} newNode
 * @return {(LeftThreadedBinarySearchTreeNode|null)} 
 */
export function insertNode(rootNode, newNode) {
	return insertNewNode(rootNode, newNode, insertLeftDirectionNode, insertRightDirectionNode );
}