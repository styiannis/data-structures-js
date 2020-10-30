/**
 *
 * @module 
 */

import { InvalidActionError } from '../../errors/InvalidActionError.js';
import { leftRotation, rightRotation } from './rotate.js';
import { nextEntry } from './helpers/nextEntry.js';

/**
 *
 * @param {BTreeNode} node
 */
function rootNodeFix( node ){
	if( ! node.entriesLength && null !== node.left ){
		node.entriesLength = node.left.entriesLength;
		node.firstEntry = node.left.firstEntry;
		node.left = node.left.left;
	}
}

/**
 *
 * @param {array} nodesPair [leftNode, rightNode]
 * @param {BTreeNodeEntry} parentEntry
 * @param {boolean} execLeftRotation
 */
function nodeRotationFix( nodesPair, parentEntry, execLeftRotation ){

	if ( execLeftRotation ){
		leftRotation( nodesPair[0], nodesPair[1], parentEntry.right === nodesPair[1] ? parentEntry : parentEntry.next );
	}
	else{
		rightRotation( nodesPair[0], nodesPair[1], parentEntry );
	}

}

/**
 *
 * @param {BTreeNode} node
 * @param {array} anchestorNodes
 * @param {number} minNodeChildren
 * @return {undefined} 
 */
function nodeFix( node, anchestorNodes, minNodeChildren ){

	const minNodeKeys = minNodeChildren - 1;

	const parentNode = anchestorNodes.pop();		
	const parentEntry = node.parentEntry(parentNode);
	
	const leftSiblingNode = node.leftSibling( parentNode, parentEntry );
	const rightSiblingNode = node.rightSibling( parentNode, parentEntry );

	const nodesPair = [ node, rightSiblingNode ];

	let siblingNode = rightSiblingNode;

	const useLeftSibling = null !== leftSiblingNode && ( null === rightSiblingNode || rightSiblingNode.entriesLength <= leftSiblingNode.entriesLength );

	if ( useLeftSibling ){
		siblingNode = leftSiblingNode;
		nodesPair[0] = leftSiblingNode;
		nodesPair[1] = node;
	}

	if( siblingNode.entriesLength > minNodeKeys ){
		nodeRotationFix( nodesPair, parentEntry, ! useLeftSibling );
		return;
	}

	nodesPair[0].merge( nodesPair[1], parentNode, parentEntry );
	balanceStructure( parentNode, anchestorNodes, minNodeChildren );
}

/**
 *
 * @param {BTreeNode} node
 * @param {array} anchestorNodes
 * @param {number} minNodeChildren
 */
function balanceStructure( node, anchestorNodes, minNodeChildren ){
	if( ! anchestorNodes.length ){
		rootNodeFix( node );
	}
	else if( node.entriesLength < minNodeChildren - 1 || node.childrenSize() < minNodeChildren ){
		nodeFix( node, anchestorNodes, minNodeChildren );
	}
}

/**
 *
 * @param {BTreeNodeEntry} entry
 * @param {BTreeNode} node
 * @param {array} anchestorNodes
 * @param {number} minNodeChildren
 */
function removeNonLeafNodeEntry( entry, node, anchestorNodes, minNodeChildren ){

	const minNodeKeys = minNodeChildren - 1;

	const successorNodeAnchestors = [];
	const predecessorNodeAnchestors = [];
	const successorNode = node.inOrderSuccessor(entry, successorNodeAnchestors);
	const predecessorNode = node.inOrderPredecessor(entry, predecessorNodeAnchestors);

	let replaceEntry, replaceNode, replaceNodeAnchestors;

	if( successorNode.entriesLength > predecessorNode.entriesLength ){

		replaceNode = successorNode;
		replaceNodeAnchestors = successorNodeAnchestors;

		replaceEntry = successorNode.shift();
		
		successorNode.left = replaceEntry.right;
		replaceEntry.right = null;
	}
	else{

		replaceNode = predecessorNode;
		replaceNodeAnchestors = predecessorNodeAnchestors;

		replaceEntry = predecessorNode.pop();
	}

	entry.key = replaceEntry.key;
	entry.value = replaceEntry.value;
		
	if( replaceNode.entriesLength <= minNodeKeys ){
		anchestorNodes.push(node, ...replaceNodeAnchestors);
		balanceStructure( replaceNode, anchestorNodes, minNodeChildren );
	}
}

/**
 *
 * @param {BTreeNodeEntry} entry
 * @param {BTreeNode} node
 * @param {array} anchestorNodes
 * @param {number} minNodeChildren
 */
function removeEntryAndBalance(entry, node, anchestorNodes, minNodeChildren){
	
	const minNodeKeys = minNodeChildren - 1;

	if( null === node.left ){

		node.remove( entry );

		if( anchestorNodes.length && node.entriesLength < minNodeKeys ){
			balanceStructure( node, anchestorNodes, minNodeChildren );
		}
	}
	else{
		removeNonLeafNodeEntry( entry, node, anchestorNodes, minNodeChildren );
	}
}

/**
 *
 * @param {BTreeNode} rootNode
 * @param {number} key
 * @param {number} order
 * @return {BTreeNode} 
 */
export function removeNodeEntry(rootNode, key, order){

	const minNodeChildren = Math.ceil( order  / 2 );
	const anchestorNodes = [];
	const pair = [null, null];

	if( void 0 !== rootNode && null !== rootNode ){
		pair[0] = rootNode;
		pair[1] = rootNode.firstEntry;
	}

	while( null !== pair[1] ){

		if( pair[1].eqk(key) ){
			removeEntryAndBalance(pair[1], pair[0], anchestorNodes, minNodeChildren);
			return rootNode;
		}

		nextEntry(key, pair, anchestorNodes);
	}

	throw new InvalidActionError( 'Undefined key "' + key + '"', 'undefined_key' );
}
