/**
 *
 * @module 
 */

import { InvalidActionError } from '../../errors/InvalidActionError.js';
import { attachChildToParent } from './helpers/attachChildToParent.js';

/**
 *
 * @param {BinarySearchTreeNode} node
 * @return {BinarySearchTreeNode} 
 */
function nodeSuccessor(node){
	
	let successor = node.right;

	while (null !== successor.left) {
		successor = successor.left;
	}

	return successor;
}

/**
 *
 * @param {BinarySearchTreeNode} node
 * @param {BinarySearchTreeNode} parentNode
 * @param {BinarySearchTreeNode} rootNode
 * @return {BinarySearchTreeNode} 
 */
function removeNodeAndFix(node, parentNode, rootNode ){

	if (null !== node.left && null !== node.right) {

		let successor = nodeSuccessor(node);
	
		node.key = successor.key;
		node.right = removeNode(node.right, successor.key);

		return rootNode;
	}

	let childNode = null === node.right ? node.left : node.right;

	node.detach();

	return attachChildToParent( node, parentNode, childNode, rootNode );
}

/**
 *
 * @param {BinarySearchTreeNode} rootNode
 * @param {number} key
 * @return {(BinarySearchTreeNode|null)} 
 */
export function removeNode(rootNode, key) {

	let parent = null;
	let node = rootNode;

	while( null !== node ){

		if ( node.eqk(key) ) {
			return removeNodeAndFix( node, parent, rootNode );
		}

		parent = node;
		node = node.gtk(key) ? node.left : node.right;
	}

	throw new InvalidActionError( 'Undefined key "' + key + '"', 'undefined_key' );
}
