/**
 *
 * @module
 */

/**
 * 
 * @param {BTreeNode} node
 * @param {BTreeNode} parentNode
 * @param {array} childNodes [ leftChildNode, rightChildNode ]
 * @param {number} maxNodeEntriesLength
 * @return {BTreeNode} 
 */
function splitNonRootNode(node, parentNode, childNodes, maxNodeEntriesLength) {

	const splitRes = splitRootNode(node, childNodes, maxNodeEntriesLength);

	const entry = splitRes[0];

	splitRes[1].clear();

	let parentEntry = parentNode.firstEntry;

	if (parentEntry.gtk(entry.key)) {
		parentNode.left = childNodes[0];
	} else {
		while (node !== parentEntry.right) {
			parentEntry = parentEntry.next;
		}

		parentEntry.right = childNodes[0];
	}

	parentNode.insert(entry);

	return parentNode;
}

/**
 * 
 * @param {BTreeNode} node
 * @param {array} childNodes [ leftChildNode, rightChildNode ]
 * @param {number} maxNodeEntriesLength
 * @return {array}  [BTreeNodeEntry, BTreeNode]
 */
function splitRootNode(node, childNodes, maxNodeEntriesLength) {

	const leftChildNode = childNodes[0];
	const rightChildNode = childNodes[1];
	const median = Math.floor(maxNodeEntriesLength / 2);
	const entry = node.at(median);

	leftChildNode.firstEntry = node.firstEntry;
	leftChildNode.entriesLength = median;
	leftChildNode.left = node.left;

	rightChildNode.firstEntry = entry.next;
	rightChildNode.entriesLength = node.entriesLength - median - 1;
	rightChildNode.left = entry.right;

	entry.right = rightChildNode;
	entry.prev.next = null;
	entry.prev = null;
	entry.next.prev = null;
	entry.next = null;

	node.firstEntry = entry;
	node.entriesLength = 1;
	node.left = leftChildNode;

	return [entry, node];
}

/**
 * 
 * @param {BTreeNode} node
 * @param {BTreeNode} parentNode
 * @param {array} childNodes [ leftChildNode, rightChildNode ]
 * @param {number} maxNodeEntriesLength
 * @return {BTreeNode} 
 */
export function splitNode(node, parentNode, childNodes, maxNodeEntriesLength) {

	if (void 0 !== parentNode) {
		return splitNonRootNode(node, parentNode, childNodes, maxNodeEntriesLength);
	}

	const res = splitRootNode(node, childNodes, maxNodeEntriesLength);
	return res[1];
}
