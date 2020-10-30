import { Tree } from './includes/Tree.js';
import { BTreeNodeEntry } from '../nodes/BTreeNodeEntry.js';

import { getNodeEntry } from '../operations/BTree/access.js';
import { insertNodeEntry } from '../operations/BTree/insert.js';
import { removeNodeEntry } from '../operations/BTree/remove.js';

/**
 * B-Tree class
 *
 * @extends {Tree}
 */
export class BTreeStructure extends Tree {

	/**
	 * Creates an instance of BTreeStructure.
	 * 
 	 * @param {number} [order]
	 */
	constructor(order) {

		super();

		/**
	     *
	     * @type {number}
	     */
		this.order = void 0 !== order && 2 < order ? order : 3;
	}
	/**
	 *
	 * @param {number} key
	 * @return {*}
	 */
	get(key) {
		let entry = getNodeEntry(this.rootNode, key);

		return void 0 === entry ? entry : entry.value;
	}
	/**
	 *
	 * @param {number} key
	 * @return {boolean}
	 */
	hasKey(key) {
		return void 0 !== getNodeEntry(this.rootNode, key);
	}
	/**
	 *
	 * @param {number} key
	 * @param {*} [value]
	 */
	insert(key, value) {
		this.rootNode = insertNodeEntry(this.rootNode, new BTreeNodeEntry(key, value, null), this.order );
		this.length += 1;
	}
	/**
	 *
	 * @param {number} key
	 * @return {boolean}
	 */
	remove(key) {
		try {
			this.rootNode = removeNodeEntry(this.rootNode, key, this.order );
			this.length -= 1;

			return true;
		} catch (err) {
			return false;
		}
	}
}