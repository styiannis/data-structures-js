/**
 *
 * @module
 */
 
import { InvalidActionError } from '../../errors/InvalidActionError.js';
import { leftRotation, rightRotation } from '../BinarySearchTree/rotate.js';

/**
 * 
 * @param {RedBlackTreeNode} node
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode} 
 */
function mostRightNodeWithAnchestors(node, anchestorNodes){

	while (null !== node.right) {
		anchestorNodes.push(node);
		node = node.right;
	}

	return node;
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {RedBlackTreeNode} siblingNode
 * @param {RedBlackTreeNode} parentNode
 * @param {RedBlackTreeNode} grandParentNode
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode}
 */
function case_1( rootNode, siblingNode, parentNode, anchestorNodes ){

	const grandParentNode = anchestorNodes.length ? anchestorNodes.pop() : null;	
	const siblingIsLeftChild = null !== parentNode.left && siblingNode.eqk( parentNode.left.key );
	const rotationRoot = siblingIsLeftChild ? rightRotation( parentNode, grandParentNode ) : leftRotation( parentNode, grandParentNode );

	siblingNode.isRed = false;
	parentNode.isRed = true;

	anchestorNodes.push(siblingNode, parentNode);
	
	return blackCasesReplacement( null === grandParentNode ? rotationRoot : rootNode, ! siblingIsLeftChild, anchestorNodes );
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {RedBlackTreeNode} siblingNode
 * @param {RedBlackTreeNode} parentNode
 * @param {RedBlackTreeNode} grandParentNode
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode}
 */
function case_2( rootNode, siblingNode, parentNode, anchestorNodes ){

	siblingNode.isRed = true;

	if( parentNode.isRed ){
		parentNode.isRed = false;

		return rootNode;
	}

	if( ! anchestorNodes.length ){
		return rootNode;
	}
	
	const siblingIsLeftChild = null !== parentNode.left && siblingNode.eqk( parentNode.left.key );

	return blackCasesReplacement( rootNode, ! siblingIsLeftChild, anchestorNodes );
}

/**
 * 
 * @param {*} rootNode
 * @param {*} siblingNode
 * @param {*} parentNode
 * @param {*} grandParentNode
 * @return {RedBlackTreeNode}
 */
function case_3( rootNode, siblingNode, parentNode, grandParentNode ){

	const siblingIsLeftChild = null !== parentNode.left && siblingNode.eqk( parentNode.left.key );

	siblingNode.isRed = true;

	if( siblingIsLeftChild ){
		siblingNode.right.isRed = false;
		leftRotation( siblingNode, parentNode );
	}
	else{
		siblingNode.left.isRed = false;
		rightRotation( siblingNode, parentNode );
	}

	return case_4( rootNode, siblingIsLeftChild ? parentNode.left : parentNode.right, parentNode, grandParentNode );
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {RedBlackTreeNode} siblingNode
 * @param {RedBlackTreeNode} parentNode
 * @param {RedBlackTreeNode} grandParentNode
 * @return {RedBlackTreeNode} 
 */
function case_4( rootNode, siblingNode, parentNode, grandParentNode ){

	siblingNode.isRed = parentNode.isRed;
	parentNode.isRed = false;

	const siblingIsLeftChild = null !== parentNode.left && siblingNode.eqk( parentNode.left.key );

	if( siblingIsLeftChild ){
		siblingNode.left.isRed = false;
	}
	else{
		siblingNode.right.isRed = false;
	}

	const rotationRoot = siblingIsLeftChild ? rightRotation( parentNode, grandParentNode ) : leftRotation( parentNode, grandParentNode );

	return null === grandParentNode ? rotationRoot : rootNode;
}

/**
 * 
 * @param {RedBlackTreeNode} node
 * @return {boolean} 
 */
function blackLeftNode(node){
	return null === node.left || ! node.left.isRed;
}

/**
 * 
 * @param {RedBlackTreeNode} node
 * @return {boolean} 
 */
function blackRightNode(node){
	return null === node.right || ! node.right.isRed;
}

/**
 * 
 * @param {RedBlackTreeNode} siblingNode
 * @param {RedBlackTreeNode} rootNode
 * @param {boolean} nodeIsLeftChild
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode} 
 */
function blackCaseStep1( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes ){

	if( siblingNode.isRed ){
		return case_1( rootNode, siblingNode, anchestorNodes.pop(), anchestorNodes );
	}

	return blackCaseStep2( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes );
}

/**
 * 
 * @param {RedBlackTreeNode} siblingNode
 * @param {RedBlackTreeNode} rootNode
 * @param {boolean} nodeIsLeftChild
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode} 
 */
function blackCaseStep2( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes ){

	if( blackLeftNode(siblingNode) && blackRightNode(siblingNode) ){
		return case_2( rootNode, siblingNode, anchestorNodes.pop(), anchestorNodes );
	}

	return blackCaseStep3( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes );
}

/**
 * 
 * @param {RedBlackTreeNode} siblingNode
 * @param {RedBlackTreeNode} rootNode
 * @param {boolean} nodeIsLeftChild
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode} 
 */
function blackCaseStep3( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes ){

	if( nodeIsLeftChild && ! blackLeftNode(siblingNode) || ! nodeIsLeftChild && ! blackRightNode(siblingNode) ){
		return case_3( rootNode, siblingNode, anchestorNodes.pop(), anchestorNodes.length ? anchestorNodes.pop() : null );
	}

	return blackCaseStep4( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes );
}

/**
 * 
 * @param {RedBlackTreeNode} siblingNode
 * @param {RedBlackTreeNode} rootNode
 * @param {boolean} nodeIsLeftChild
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode} 
 */
function blackCaseStep4( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes ){
	return case_4( rootNode, siblingNode, anchestorNodes.pop(), anchestorNodes.length ? anchestorNodes.pop() : null );
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {boolean} nodeIsLeftChild
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode} 
 */
function blackCasesReplacement( rootNode, nodeIsLeftChild, anchestorNodes ){

	const siblingNode = nodeIsLeftChild ? anchestorNodes[ anchestorNodes.length - 1 ].right : anchestorNodes[ anchestorNodes.length - 1 ].left;

	if( null === siblingNode ){
		return rootNode;
	}

	return blackCaseStep1( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes );
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {RedBlackTreeNode} node
 * @param {RedBlackTreeNode} parentNode
 * @param {RedBlackTreeNode} grandParentNode
 * @param {array} anchestorNodes
 * @return {*} 
 */
function withoutChild( rootNode, node, anchestorNodes ) {
	
	node.detach();

	if( ! anchestorNodes.length ){
		return null;
	}

	const parentNode = anchestorNodes.pop();
	const nodeIsLeftChild = null !== parentNode.left ? node.eqk( parentNode.left.key ) : false;
	
	if( nodeIsLeftChild ){
		parentNode.left = null;
	}
	else{
		parentNode.right = null;
	}

	if( node.isRed ){
		return rootNode;
	}

	anchestorNodes.push(parentNode);

	return blackCasesReplacement( rootNode, nodeIsLeftChild, anchestorNodes );
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {RedBlackTreeNode} node
 * @param {RedBlackTreeNode} parentNode
 * @return {RedBlackTreeNode}
 */
function withOneChild( rootNode, node, parentNode ) {

	let child = null !== node.left ? node.left : node.right;

	node.detach();

	if( ! node.isRed && child.isRed ){
		child.isRed = false;
	}

	if( null === parentNode ){
		return child;
	}

	if( node === parentNode.left ){
		parentNode.left = child;
	}
	else{
		parentNode.right = child;
	}

	return rootNode;
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {RedBlackTreeNode} node
 * @param {RedBlackTreeNode} parentNode
 * @param {RedBlackTreeNode} grandParentNode
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode} 
 */
function withTwoChildren( rootNode, node, anchestorNodes ) {

	const predecessorAnchestors = anchestorNodes;

	predecessorAnchestors.push(node);
	
	let predecessor = node.left;
	let predecessorIsLeftChild = null === predecessor.right;

	if( predecessorIsLeftChild ){
		predecessorAnchestors[ predecessorAnchestors.length - 1 ].left = predecessor.left;
	}
	else{
		predecessor = mostRightNodeWithAnchestors(predecessor, predecessorAnchestors);
		predecessorAnchestors[ predecessorAnchestors.length - 1 ].right = predecessor.left;
	}
	
	let replacement = predecessor.left;

	node.key = predecessor.key;
	predecessor.detach();

	if( null !== replacement ){
		replacement.isRed = predecessor.isRed;
		return blackCasesReplacement( rootNode, predecessorIsLeftChild, predecessorAnchestors );
	}
	
	if( ! predecessor.isRed ){
		return blackCasesReplacement( rootNode, predecessorIsLeftChild, predecessorAnchestors );
	}

	return rootNode;
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {RedBlackTreeNode} node
 * @param {array} anchestorNodes
 * @return {RedBlackTreeNode}
 */
function removeNodeAndBalanceStructure( node, anchestorNodes ){

	const rootNode = anchestorNodes.length ? anchestorNodes[0] : node;

	if( null !== node.left && null !== node.right ){
		return withTwoChildren( rootNode, node, anchestorNodes );
	}

	if( null === node.left && null === node.right ){
		return withoutChild( rootNode, node, anchestorNodes );
	}

	return withOneChild(rootNode, node, anchestorNodes.length ? anchestorNodes.pop() : null );
}

/**
 * 
 * @param {RedBlackTreeNode} rootNode
 * @param {number} key
 * @return {(Error|RedBlackTreeNode)}
 */
export function removeNode( rootNode, key ) {

	const anchestorNodes = [];
	let node = rootNode;

	while ( null !== node ) {

		if (node.eqk(key)) {
			return removeNodeAndBalanceStructure( node, anchestorNodes );
		}

		anchestorNodes.push( node );
		node = node.ltk(key) ? node.right : node.left;
	}

	throw new InvalidActionError( new Error( 'Undefined key "' + key + '"' ), 'undefined_key' );
}
