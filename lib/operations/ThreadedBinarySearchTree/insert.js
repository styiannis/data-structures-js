/**
 *
 * @module 
 */

import { insertNewNode } from './helpers/insertNewNode.js';

/**
 *
 * @param {(ThreadedBinarySearchTreeNode)} newNode
 * @param {ThreadedBinarySearchTreeNode} parentNode
 */
function insertLeftDirectionNode(newNode, parentNode) {
	newNode.left = parentNode.left;
	newNode.right = parentNode;
	parentNode.leftBit = true;
	parentNode.left = newNode;
}

/**
 *
 * @param {(ThreadedBinarySearchTreeNode)} newNode
 * @param {ThreadedBinarySearchTreeNode} parentNode
 */
function insertRightDirectionNode(newNode, parentNode) {
	newNode.left = parentNode;
	newNode.right = parentNode.right;
	parentNode.rightBit = true;
	parentNode.right = newNode;
}

/**
 *
 * @param {(ThreadedBinarySearchTreeNode)} rootNode
 * @param {ThreadedBinarySearchTreeNode} newNode
 * @return {(ThreadedBinarySearchTreeNode|null)}
 */
export function insertNode(rootNode, newNode) {
	return insertNewNode(rootNode, newNode, insertLeftDirectionNode, insertRightDirectionNode );
}