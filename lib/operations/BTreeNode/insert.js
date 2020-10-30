/**
 *
 * @module
 */

/**
 *
 * @param {BTreeNode} node
 * @param {BTreeNodeEntry} newEntry
 * @return {BTreeNodeEntry} 
 */
export function insertEntry(node, newEntry) {

	if (!node.entriesLength) {
		node.firstEntry = newEntry;
		return newEntry;
	}

	if ( node.firstEntry.gtk(newEntry.key) ) {
		node.firstEntry.prev = newEntry;
		newEntry.next = node.firstEntry;
		node.firstEntry = newEntry;
		return newEntry;
	}
	
	let entry = node.firstEntry;

	while (null !== entry.next && entry.next.ltk(newEntry.key) ) {
		entry = entry.next;
	}

	if( null !== entry.next ){
		entry.next.prev  = newEntry;
	}

	newEntry.prev = entry;
	newEntry.next = entry.next;

	entry.next = newEntry;

	return newEntry;
}