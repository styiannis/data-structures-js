/**
 *
 * @module
 */

import { attachChildToParent } from './helpers/attachChildToParent.js';

/**
 *
 * @param {BinarySearchTreeNode} node
 * @param {(BinarySearchTreeNode|null)} parent
 * @param {boolean} onLeft
 * @return {BinarySearchTreeNode} 
 */
function rotation( node, parent, onLeft ){

	let child;

	if( onLeft ){
		child = node.right;
		node.right = child.left;
		child.left = node;
	}
	else{
		child = node.left;
		node.left = child.right;
		child.right = node;
	}

	return attachChildToParent(node, parent, child);
}

/**
 *
 * @param {BinarySearchTreeNode} node
 * @param {(BinarySearchTreeNode|null)} parent
 * @return {BinarySearchTreeNode} 
 */
export function leftRotation( node, parent ){
	return rotation( node, parent, true );
}

/**
 *
 * @param {BinarySearchTreeNode} node
 * @param {(BinarySearchTreeNode|null)} parent
 * @return {BinarySearchTreeNode} 
 */
export function rightRotation( node, parent ){
	return rotation( node, parent, false );
}