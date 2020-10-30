/**
 * BTreeNodeEntry class.
 */
export class BTreeNodeEntry {
	/**
	 * Creates an instance of BTreeNodeEntry.
	 *
	 * @param {number} key
	 * @param {*} value
	 * @param {(BTreeNode|null)} right
	 */
	constructor(key, value, right) {
		/**
		 *
		 * @type {number}
		 */
		this.key = key;
		/**
		 *
		 * @type {*}
		 */
		this.value = value;
		/**
		 *
		 * @type {(BTreeNode|null)}
		 */
		this.right = right;
		/**
		 *
		 * @type {(BTreeNodeEntry|null)}
		 */
		this.prev = null;
		/**
		 *
		 * @type {(BTreeNodeEntry|null)}
		 */
		this.next = null;
	}
	/**
	 *
	 */
	clear() {
		this.key = void 0;
		this.value = void 0;
		this.prev = null;
		this.next = null;
		this.right = null;
	}
	/**
	 * Indicates if entry's key is higher than the provided key.
	 *
	 * @param {number} key
	 * @return {boolean}
	 */
	gtk(key) {
		return this.key > key;
	}
	/**
	 * Indicates if entry's key is lower than the provided key.
	 *
	 * @param {number} key
	 * @return {boolean}
	 */
	ltk(key) {
		return this.key < key;
	}
	/**
	 * Indicates if node's key is equal with the provided key.
	 *
	 * @param {number} key
	 * @return {boolean}
	 */
	eqk(key) {
		return this.key === key;
	}
}
