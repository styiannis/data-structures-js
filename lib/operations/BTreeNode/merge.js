/**
 *
 * @module
 */

/**
 *
 * @param {BTreeNodeEntry} parentEntry
 * @param {BTreeNode} parentNode
 * @param {BTreeNode} leftNode
 */
function detachParentEntry( parentEntry, parentNode, leftNode ){

	if( null !== parentEntry.prev ){
		
		parentEntry.prev.next = parentEntry.next;
		
		if( null !== parentEntry.next ){
			parentEntry.next.prev = parentEntry.prev;
		}

		parentEntry.prev.right = leftNode;

		return;
	}

	parentNode.firstEntry = parentEntry.next;

	if( null !== parentEntry.next ){
		parentEntry.next.prev = null;
	}

	parentNode.left = leftNode;

	parentEntry.prev = null;
	parentEntry.next = null;
}

/**
 *
 * @param {BTreeNode} leftNode
 * @param {BTreeNode} rightNode
 * @param {BTreeNode} parentNode
 * @param {BTreeNodeEntry} parentEntry
 */
export function mergeNodes(leftNode, rightNode, parentNode, parentEntry){

	detachParentEntry( parentEntry, parentNode, leftNode );

	parentEntry.right = rightNode.left;

	rightNode.left = null;

	leftNode.insert( parentEntry );

	parentNode.entriesLength -= 1;

	while( rightNode.entriesLength ){
		leftNode.insert( rightNode.shift() );
	}

	rightNode.clear();
}
