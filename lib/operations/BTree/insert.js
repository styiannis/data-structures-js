/**
 *
 * @module
 */

import { BTreeNode } from '../../nodes/BTreeNode.js';
import { nextEntry } from './helpers/nextEntry.js';

/**
 *
 * @param {BTreeNodeEntry} entry
 * @return {BTreeNode}
 */
function insertRootNode( entry ){
	const node = new BTreeNode();
	node.insert( entry );
	return node;
}

/**
 *
 * @param {array} pair [node, entry]
 * @param {array} anchestorNodes
 * @param {BTreeNode} rootNode
 * @param {number} order
 * @return {BTreeNode}
 */
function insertEntryAndBalance( pair, anchestorNodes, rootNode, order ){

	const maxEntriesLength = order - 1;
	
	let node = pair[0];
	const entry = pair[1];

	node.insert( entry );

	while( maxEntriesLength < node.entriesLength ){

		if( ! anchestorNodes.length ){
			rootNode = node.split(maxEntriesLength);
			break;
		}
		
		node = node.split( maxEntriesLength, anchestorNodes.pop() );
	}

	return rootNode;
}

/**
 *
 * @param {BTreeNode} rootNode
 * @param {BTreeNodeEntry} newEntry
 * @param {number} order
 * @return {BTreeNode}
 */
export function insertNodeEntry( rootNode, newEntry, order ){

	if( null === rootNode ){
		return insertRootNode( newEntry );
	}

	if (! rootNode.entriesLength) {
		rootNode.insert( newEntry );
		return rootNode;
	}

	const anchestorNodes = [];
	
	let node = rootNode;

	const pair = [ node, node.firstEntry ];

	while( null !== pair[1] ){

		if( pair[1].eqk(newEntry.key) ){
			pair[1].value = newEntry.value;
			pair[1] = null;
			break;
		}

		nextEntry(newEntry.key, pair, anchestorNodes);
	}

	pair[1] = newEntry;

	return insertEntryAndBalance( pair, anchestorNodes, rootNode, order );
}
