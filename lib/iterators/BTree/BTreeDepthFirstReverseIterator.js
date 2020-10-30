/**
 *
 * @param {BTreeNode} node
 * @param {array} stacks
 * @param {array} state
 */
function fillStacks(node, stacks, state) {

	state.node = node;
	state.entry = node.firstEntry;

	while (null !== state.entry.next) {
		state.entry = state.entry.next;
	}

	if (null !== state.entry.right) {
		stacks.nodes.push(node);
		stacks.entries.push(state.entry);
		fillStacks(state.entry.right, stacks, state);
	}
}

/**
 *
 * @param {array} stacks
 * @param {array} state
 */
function nextFromPrev(stacks, state) {
	if (null !== state.entry.prev.right) {
		stacks.nodes.push(state.node);
		stacks.entries.push(state.entry.prev);
		fillStacks(state.entry.prev.right, stacks, state);
	} else {
		state.entry = state.entry.prev;
	}
}

/**
 *
 * @param {array} stacks
 * @param {array} state
 */
function nextFromStack(stacks, state) {
	state.node = stacks.nodes.pop();
	state.entry = stacks.entries.pop();
}

/**
 * BTreeDepthFirstReverseIterator class.
 */
export class BTreeDepthFirstReverseIterator {
	/**
	 * Creates an instance of BTreeDepthFirstReverseIterator.
	 * 
	 * @param {BTreeNode} node
	 */
	constructor(node) {

		/**
		 *
		 * @type {array}
		 */
		this.stacks = {
			nodes: [],
			entries: [],
		};

		/**
		 *
		 * @type {object}
		 */
		this.state = {
			node: null,
			entry: null,
		};

		if (void 0 === node || null === node) {
			return;
		}

		this.state.node = node;

		fillStacks(node, this.stacks, this.state);
	}
	/**
	 * Indicates whether next element exists.
	 *
	 * @return {boolean}
	 */
	hasNext() {
		return null !== this.state.entry;
	}
	/**
	 * Returns next element or throws TypeError in case this.state.entry is null.
	 *
	 * @return {BTreeNodeEntry}
	 */
	getNext() {

		const ret = this.state.entry;

		if (null !== this.state.entry.prev) {
			nextFromPrev(this.stacks, this.state);
		} else if (null !== this.state.node.left) {
			fillStacks(this.state.node.left, this.stacks, this.state);
		} else if (this.stacks.nodes.length) {
			nextFromStack(this.stacks, this.state);
		} else {
			this.state.entry = null;
		}

		return ret;
	}
}
