/**
 *
 * @module
 */

import { insertNewNode } from '../ThreadedBinarySearchTree/helpers/insertNewNode.js';

/**
 *
 * @param {(RightThreadedBinarySearchTreeNode)} newNode
 * @param {RightThreadedBinarySearchTreeNode} parentNode
 */
function insertLeftDirectionNode(newNode, parentNode) {
	newNode.right = parentNode;
	parentNode.left = newNode;
}

/**
 *
 * @param {(RightThreadedBinarySearchTreeNode)} newNode
 * @param {RightThreadedBinarySearchTreeNode} parentNode
 */
function insertRightDirectionNode(newNode, parentNode) {
	newNode.right = parentNode.right;
	parentNode.rightBit = true;
	parentNode.right = newNode;
}

/**
 *
 * @param {(RightThreadedBinarySearchTreeNode|null)} rootNode
 * @param {RightThreadedBinarySearchTreeNode} newNode
 * @return {(RightThreadedBinarySearchTreeNode|null)} 
 */
export function insertNode(rootNode, newNode) {
	return insertNewNode(rootNode, newNode, insertLeftDirectionNode, insertRightDirectionNode );
}