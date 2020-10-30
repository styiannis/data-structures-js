/**
 *
 * @param {boolean} ifCondition
 * @param {array} arr
 * @param {*} val
 * @return {boolean}
 */
function ifPushArray(ifCondition, arr, val) {

	if (!ifCondition) {
		return false;
	}

	arr.push(val);

	return true;
}

/**
 *
 * @param {array} stack
 * @param {object} state
 */
function fillStack(stack, state) {
	while (null !== state.node.left) {
		stack.push(state.entry);
		state.node = state.node.left;
		state.entry = state.node.firstEntry;
	}
}

/**
 * BTreeDepthFirstIterator class.
 */
export class BTreeDepthFirstIterator {
	/**
	 * Creates an instance of BTreeDepthFirstIterator.
	 * 
	 * @param {BTreeNode} node
	 */
	constructor(node) {

		/**
		 *
		 * @type {array}
		 */		
		this.stack = [];

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
		this.state.entry = node.firstEntry;

		fillStack(this.stack, this.state);
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
	 * Returns next element or throws TypeError in case this.entry is null.
	 *
	 * @return {BTreeNodeEntry}
	 */
	getNext() {

		const ret = this.state.entry;

		if (null !== this.state.entry.right) {
			ifPushArray(null !== this.state.entry.next, this.stack, this.state.entry.next);
			this.state.node = this.state.entry.right;
			this.state.entry = this.state.node.firstEntry;
			fillStack(this.stack, this.state);
		} else if (null !== this.state.entry.next) {
			this.state.entry = this.state.entry.next;
			fillStack(this.stack, this.state);
		} else if (this.stack.length) {
			this.state.entry = this.stack.pop();
		} else {
			this.state.entry = null;
		}

		return ret;
	}
}
