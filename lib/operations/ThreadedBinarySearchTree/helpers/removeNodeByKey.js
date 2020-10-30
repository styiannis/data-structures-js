import { InvalidActionError } from '../../../errors/InvalidActionError.js';

import { attachChildToParent } from '../../BinarySearchTree/helpers/attachChildToParent.js';
import { nextChildNode } from './nextChildNode.js';
import { nodePredecessor } from './nodePredecessor.js';
import { nodeSuccessor } from './nodeSuccessor.js';

/**
 *
 * @param {ThreadedBinarySearchTreeNode} rootNode
 * @param {ThreadedBinarySearchTreeNode} parentNode
 * @param {ThreadedBinarySearchTreeNode} node
 * @return {ThreadedBinarySearchTreeNode}
 */
function singleChildRemoval(rootNode, parentNode, node) {

	if (node.hasLeftChild()) {
		nodePredecessor(node).right = null;
	} else {
		nodeSuccessor(node).left = null;
	}

	rootNode = attachChildToParent(node, parentNode, node.hasLeftChild() ? node.left : node.right, rootNode);

	node.detach();

	return rootNode;
}

/**
 *
 * @param {ThreadedBinarySearchTreeNode} rootNode
 * @param {ThreadedBinarySearchTreeNode} node
 * @param {function} withoutChildRemovalFunc
 * @return {(ThreadedBinarySearchTreeNode|null)}
 */
function doubleChildrenRemoval(rootNode, node, withoutChildRemovalFunc) {

	let successorParent = node;
	let successor = node.right;

	while (successor.hasLeftChild()) {
		successorParent = successor;
		successor = successor.left;
	}

	node.key = successor.key;

	if (!successor.hasLeftChild() && !successor.hasRightChild()) {
		return withoutChildRemovalFunc(rootNode, successorParent, successor);
	}

	return singleChildRemoval(rootNode, successorParent, successor);
}

/**
 *
 * @param {ThreadedBinarySearchTreeNode} node
 * @param {ThreadedBinarySearchTreeNode} parentNode
 * @param {ThreadedBinarySearchTreeNode} rootNode
 * @param {function} withoutChildRemovalFunc
 * @return {ThreadedBinarySearchTreeNode} 
 */
function removeNodeAndFix(node, parentNode, rootNode, withoutChildRemovalFunc) {

	if (node.hasLeftChild() && node.hasRightChild()) {
		return doubleChildrenRemoval(rootNode, node, withoutChildRemovalFunc);
	}

	if (node.hasRightChild() || node.hasLeftChild()) {
		return singleChildRemoval(rootNode, parentNode, node);
	}

	return withoutChildRemovalFunc(rootNode, parentNode, node);
}

/**
 *
 * @param {ThreadedBinarySearchTreeNode} rootNode
 * @param {number} key
 * @param {function} withoutChildRemovalFunc
 * @return {(ThreadedBinarySearchTreeNode|InvalidActionError)} 
 */
export function removeNodeByKey(rootNode, key, withoutChildRemovalFunc){

	let parent = null;
	let node = rootNode;

	while (null !== node) {

		if (node.eqk(key)) {
			return removeNodeAndFix(node, parent, rootNode, withoutChildRemovalFunc);
		}

		parent = node;

		node = nextChildNode(node, key);
	}

	throw new InvalidActionError('Undefined key "' + key + '"', 'undefined_key');
}