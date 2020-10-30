/**
 *
 * @module
 */

import { leftRotation, rightRotation } from '../BinarySearchTree/rotate.js';

/**
 *
 * @param {RedBlackTreeNode} node
 * @param {RedBlackTreeNode} parentNode
 * @return {boolean}
 */
function nodeIsLeftChild(node, parentNode) {
	return null !== parentNode.left ? node.eqk(parentNode.left.key) : false;
}

/**
 *
 * @param {boolean} parentIsLeftChild
 * @param {array} triplet [node, parentNode, grandparentNode]
 * @param {array} anchestors
 */
function insertParentSiblingFixup(parentSibling, triplet, anchestors) {

	parentSibling.isRed = false;
	triplet[1].isRed = false;
	triplet[2].isRed = 0 < anchestors.length;

	triplet[0] = triplet[2];
	triplet[1] = anchestors.length ? anchestors.pop() : null;
	triplet[2] = anchestors.length ? anchestors.pop() : null;
}

/**
 *
 * @param {boolean} parentIsLeftChild
 * @param {array} triplet [node, parentNode, grandparentNode]
 * @param {array} anchestors
 * @param {RedBlackTreeNode} rootNode
 * @return {RedBlackTreeNode} 
 */
function insertLineFixup(parentIsLeftChild, triplet, anchestors, rootNode) {

	let newTreeRoot = rootNode;

	let grandGrandParent = anchestors.length ? anchestors.pop() : null;

	if (parentIsLeftChild) {
		rightRotation(triplet[2], grandGrandParent);
	} else {
		leftRotation(triplet[2], grandGrandParent);
	}

	triplet[1].isRed = false;
	triplet[2].isRed = true;

	if (null === grandGrandParent) {
		newTreeRoot = triplet[1];
	}

	triplet[0] = triplet[1];
	triplet[1] = grandGrandParent;
	triplet[2] = anchestors.length ? anchestors.pop() : null;

	return newTreeRoot;
}

/**
 *
 * @param {boolean} parentIsLeftChild
 * @param {array} triplet [node, parentNode, grandparentNode]
 * @param {RedBlackTreeNode} newNode
 */
function insertTriangleFixup(parentIsLeftChild, triplet, newNode) {

	if (parentIsLeftChild) {
		leftRotation(triplet[1], triplet[2]);
	} else {
		rightRotation(triplet[1], triplet[2]);
	}

	triplet[0] = triplet[1];
	triplet[1] = newNode;
}

/**
 *
 * @param {RedBlackTreeNode} newNode
 * @param {array} anchestors
 * @param {RedBlackTreeNode} rootNode
 * @param {array} triplet [node, parentNode, grandparentNode]
 * @return {RedBlackTreeNode} 
 */
function insertFixupStep(newNode, anchestors, rootNode, triplet) {

	let newTreeRoot = rootNode;
	let parentIsLeftChild = nodeIsLeftChild(triplet[1], triplet[2]);
	let parentSibling = parentIsLeftChild ? triplet[2].right : triplet[2].left;

	if (null !== parentSibling && parentSibling.isRed) {
		insertParentSiblingFixup(parentSibling, triplet, anchestors);
	} else if (parentIsLeftChild === nodeIsLeftChild(triplet[0], triplet[1])) {
		newTreeRoot = insertLineFixup(parentIsLeftChild, triplet, anchestors, newTreeRoot);
	} else {
		insertTriangleFixup(parentIsLeftChild, triplet, newNode);
	}

	return newTreeRoot;
}

/**
 *
 * @param {RedBlackTreeNode} newNode
 * @param {array} anchestors
 * @param {RedBlackTreeNode} rootNode
 * @return {RedBlackTreeNode} 
 */
function insertFixup(newNode, anchestors, rootNode) {

	let newTreeRoot = rootNode;
	let triplet = [newNode, anchestors.pop(), anchestors.length ? anchestors.pop() : null];

	while (null !== triplet[1] && triplet[1].isRed && triplet[0].isRed) {

		if (null === triplet[2]) {
			triplet[1].isRed = false;
			break;
		}

		newTreeRoot = insertFixupStep(newNode, anchestors, newTreeRoot, triplet);
	}

	return newTreeRoot;
}

/**
 *
 * @param {RedBlackTreeNode} node
 * @param {RedBlackTreeNode} newNode
 * @param {array} anchestors
 * @return {(RedBlackTreeNode|null)} 
 */
function insertNewNode(node, newNode, anchestors) {

	anchestors.push(node);

	if (node.gtk(newNode.key)) {

		if (null === node.left) {
			node.left = newNode;
			return null;
		}

		return node.left;
	}

	if (null === node.right) {
		node.right = newNode;
		return null;
	}

	return node.right;
}

/**
 *
 * @param {(RedBlackTreeNode|null)} rootNode
 * @param {RedBlackTreeNode} newNode
 * @return {RedBlackTreeNode} 
 */
export function insertNode(rootNode, newNode) {

	if (null === rootNode) {
		return newNode;
	}

	const anchestors = [];

	let node = rootNode;

	while (null !== node) {

		if (node.eqk(newNode.key)) {
			node.value = newNode.value;
			return rootNode;
		}

		node = insertNewNode(node, newNode, anchestors);
	}

	return insertFixup(newNode, anchestors, rootNode);
}
