/**
 * BinarySearchTreeNode class.
 */
export class BinarySearchTreeNode {
	/**
	 * Creates an instance of BinarySearchTreeNode.
	 *
	 * @param {number} key
	 * @param {*} value
	 */
	constructor(key, value) {

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
		 * @type {(BinarySearchTreeNode|null)}
		 */
		this.left = null;
		
		/**
		 *
		 * @type {(BinarySearchTreeNode|null)}
		 */
		this.right = null;
	}
	/**
	 * Disconnect node from structure.
	 */
	detach() {
		this.left = null;
		this.right = null;
	}
	/**
	 * Indicates if node's key is higher than the provided key.
	 *
	 * @param {number} key
	 * @return {boolean}
	 */
	gtk(key) {
		return this.key > key;
	}
	/**
	 * Indicates if node's key is lower than the provided key.
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

	/*
	 *
	 * @return {boolean}
	 */
	hasLeftChild(){
		return null !== this.left;
	}

	/*
	 *
	 * @return {boolean}
	 */
	hasRightChild(){
		return null !== this.right;
	}
}
