/**
 * Tree class
 */
export class Tree{
	/**
	 * Creates an instance of Tree.
	 */
	constructor() {
		/**
	     * Structure elements length.
	     *
	     * @type {number}
	     */
		this.length = 0;
		/**
	     * Structure root node.
	     *
	     * @type {(BinarySearchTreeNode|null)}
	     */
		this.rootNode = null;
	}
	/**
	 * Removes all the elements from the structure.
	 */
	clear() {
		this.length = 0;
		this.rootNode = null;
	}
}