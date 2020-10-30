import { insertEntry } from '../operations/BTreeNode/insert.js';
import { splitNode } from '../operations/BTreeNode/split.js';
import { mergeNodes } from '../operations/BTreeNode/merge.js';
import { removeEntry, shiftEntry, popEntry } from '../operations/BTreeNode/remove.js';

/**
 * BTreeNode class.
 */
export class BTreeNode {
	/**
	 * Creates an instance of BTreeNode.
	 */
	constructor() {
		/**
		 *
		 * @type {(BTreeNode|null)}
		 */
		this.left = null;
		/**
		 * Entries counters.
		 *
		 * @type {number}
		 */
		this.entriesLength = 0;
		/**
		 *
		 * @type {(BTreeNodeEntry|null)}
		 */
		this.firstEntry = null;
	}
	/**
	 *
	 */
	clear() {
		this.left = null;
		this.entriesLength = 0;
		this.firstEntry = null;
	}
	/**
	 *
	 * @return {(BTreeNodeEntry|null)}
	 */
	at(index){
		let entry = this.firstEntry;
		let i = 0;
		while( i < index && null !== entry.next ){
			entry = entry.next;
			i += 1;
		}
		return entry;
	}
	/**
	 *
	 * @return {(BTreeNodeEntry|null)}
	 */
	lastEntry(){
		let entry = this.firstEntry;
		while (null !== entry.next) {
			entry = entry.next;
		}
		return entry;
	}
	/**
	 *
	 * @param {BTreeNodeEntry} entry
	 */
	insert(entry) {
		insertEntry(this, entry);
		this.entriesLength += 1;
	}
	/**
	 *
	 * @param {BTreeNodeEntry} entry
	 */
	remove(entry) {
		removeEntry(this, entry);
		this.entriesLength -= 1;
	}
	/**
	 *
	 * @return {BTreeNodeEntry}
	 */
	pop() {
		const entry = popEntry(this);

		this.entriesLength -= 1;

		return entry;
	}
	/**
	 *
	 * @return {BTreeNodeEntry}
	 */
	shift() {
		const entry = shiftEntry(this);

		this.entriesLength -= 1;

		return entry;
	}
	/**
	 *
	 * @param {BTreeNode} node
	 * @param {BTreeNode} parentNode
	 * @param {BTreeNodeEntry} parentEntry
	 */
	merge(node, parentNode, parentEntry) {
		mergeNodes(this, node, parentNode, parentEntry);
	}
	/**
	 *
	 * @param {number} maxEntriesLength
	 * @param {BTreeNode} parentNode
	 * @return {BTreeNode}
	 */
	split(maxEntriesLength, parentNode) {
		return splitNode(this, parentNode, [ new BTreeNode(), new BTreeNode() ], maxEntriesLength);
	}
	/**
	 *
	 * @param {BTreeNode} parentNode
	 * @param {BTreeNodeEntry} parentEntry
	 * @return {(BTreeNode|null)}
	 */
	leftSibling(parentNode, parentEntry) {

		if (this === parentNode.left) {
			return null;
		}

		if (null !== parentEntry.prev) {
			return parentEntry.prev.right;
		}

		return parentNode.left;
	}
	/**
	 *
	 * @param {BTreeNode} parentNode
	 * @param {BTreeNodeEntry} parentEntry
	 * @return {(BTreeNode|null)}
	 */
	rightSibling(parentNode, parentEntry) {

		if (this === parentNode.left) {
			return parentEntry.right;
		}

		if (null !== parentEntry.next) {
			return parentEntry.next.right;
		}

		return null;
	}
	/**
	 *
	 * @return {number}
	 */
	childrenSize() {
		let length = null !== this.left ? 1 : 0;
		let entry = this.firstEntry;

		while (null !== entry) {
			length += null !== entry.right ? 1 : 0;
			entry = entry.next;
		}

		return length;
	}
	/**
	 *
	 * @param {BTreeNode} parentNode
	 * @return {(BTreeNodeEntry|null)}
	 */
	parentEntry(parentNode) {
		
		let entry = parentNode.firstEntry;

		if (this === parentNode.left) {
			return entry;
		}

		while (null !== entry) {
			if (this === entry.right) {
				return entry;
			}

			entry = entry.next;
		}
	}
	/**
	 *
	 * @param {array} successorAnchestorNodes
	 * @return {BTreeNode}
	 */
	inOrderSuccessor(nodeEntry, successorAnchestorNodes) {

		let node = nodeEntry.right;

		while (null !== node.left) {
			successorAnchestorNodes.push(node);
			node = node.left;
		}

		return node;
	}
	/**
	 *
	 * @param {array} predecessorAnchestorNodes
	 * @return {BTreeNode}
	 */
	inOrderPredecessor(nodeEntry, predecessorAnchestorNodes) {

		let node = nodeEntry === this.firstEntry ? this.left : nodeEntry.prev.right;
		let entry;

		while (null !== node) {

			entry = node.lastEntry();

			if (null === entry.right) {
				break;
			}

			predecessorAnchestorNodes.push(node);

			node = entry.right;
		}

		return node;
	}
}
