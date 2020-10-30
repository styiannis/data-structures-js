/**
 *
 * @module
 */

/**
 * Swap node entries keys and values.
 *
 * @param {BTreeNodeEntry} first
 * @param {BTreeNodeEntry} second
 */
function swap(first, second) {

	const key = first.key;
	const value = first.value;

	first.key = second.key;
	first.value = second.value;

	second.key = key;
	second.value = value;
}

/**
 * Swap children pointers between node (left pointer)
 * and node entry (right pointer),
 *
 * @param {BTreeNodeEntry} entry
 * @param {BTreeNode} node
 */
function swapChildren(entry, node){
	const entryChild = entry.right;
	entry.right = node.left;
	node.left = entryChild;
}

/**
 *
 * @param {BTreeNodeEntry} siblingEntry
 * @param {BTreeNodeEntry} parentEntry
 * @param {BTreeNode} swapNode
 * @param {BTreeNode} insertNode
 */
function rotate(siblingEntry, parentEntry, swapNode, insertNode){
	swap(siblingEntry, parentEntry);
	swapChildren(siblingEntry, swapNode);
	insertNode.insert(siblingEntry);
}

/**
 *
 * @param {BTreeNode} leftNode
 * @param {BTreeNode} rightNode
 * @param {BTreeNodeEntry} parentEntry
 */
export function leftRotation(leftNode, rightNode, parentEntry) {
	rotate(rightNode.shift(), parentEntry, rightNode, leftNode);
}

/**
 *
 * @param {BTreeNode} leftNode
 * @param {BTreeNode} rightNode
 * @param {BTreeNodeEntry} parentEntry
 */
export function rightRotation(leftNode, rightNode, parentEntry) {
	rotate(leftNode.pop(), parentEntry, rightNode, rightNode);
}