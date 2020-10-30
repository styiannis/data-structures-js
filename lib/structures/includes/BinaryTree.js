import { Tree } from './Tree.js';

/**
 * BinaryTree class 
 */
export class BinaryTree extends Tree{
	/**
	 * Creates an instance of BinaryTree.
	 * 
	 * @param {BinarySearchTreeNode} Node
	 * @param {function} insertMethod
	 * @param {function} removeMethod
	 * @param {function} getMethod
	 * @memberof BinaryTree
	 */
	constructor(Node, insertMethod, removeMethod, getMethod) {
		super();
		this.Node = Node;
		this.getNode = getMethod;
		this.insertNode = insertMethod;
		this.removeNode = removeMethod;
	}
	/**
	 *
	 * @param {number} key
	 * @return {*}
	 */
	get(key) {
		let node = this.getNode(this.rootNode, key);

		return void 0 === node ? node : node.value;
	}
	/**
	 *
	 * @param {number} key
	 * @return {boolean}
	 */
	hasKey(key) {
		return void 0 !== this.getNode(this.rootNode, key);
	}
	/**
	 *
	 * @param {number} key
	 * @param {*} [value]
	 */
	insert(key, value) {
		this.rootNode = this.insertNode(this.rootNode, new this.Node(key, value));
		this.length += 1;
	}
	/**
	 *
	 * @param {number} key
	 * @return {boolean}
	 */
	remove(key) {
		try {
			this.rootNode = this.removeNode(this.rootNode, key);
			this.length -= 1;

			return true;
		} catch (err) {
			return false;
		}
	}
}
