/**
 *
 * @module
 */

/**
 * 
 * @param {BTreeNode} node
 * @param {BTreeNodeEntry} entry
 */
export function removeEntry(node, entry) {

	if (null !== entry.prev) {
		entry.prev.next = entry.next;
	}

	if (null !== entry.next) {
		entry.next.prev = entry.prev;
	}

	if (node.firstEntry === entry) {
		node.firstEntry = entry.next;
	}

	entry.clear();
}

/**
 * 
 * @param {BTreeNode} node
 * @return {(BTreeNodeEntry|undefined)} 
 */
export function popEntry(node) {

	let entry = node.firstEntry;

	if (1 === node.entriesLength) {
		node.firstEntry = null;
	}

	while (null !== entry.next) {
		entry = entry.next;
	}

	if (null !== entry.prev) {
		entry.prev.next = null;
	}

	entry.prev = null;

	return entry;
}

/**
 * 
 * @param {BTreeNode} node
 * @return {(BTreeNodeEntry|undefined)} 
 */
export function shiftEntry(node) {

	const entry = node.firstEntry;

	if (1 === node.entriesLength) {
		node.firstEntry = null;
	} else {
		node.firstEntry.next.prev = null;
		node.firstEntry = node.firstEntry.next;
	}

	entry.next = null;

	return entry;
}
