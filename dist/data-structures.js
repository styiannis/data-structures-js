'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function SearchTree(instance, Iterator, ReverseIterator) {
	function keyValidation(key) {
		if (isNaN(key)) {
			throw TypeError('"' + key + '" is not a number');
		}
	}
	function indexValidation(index) {
		if (isNaN(index) || 0 > index || index !== Math.floor(index)) {
			throw TypeError('Invalid index value "' + index + '"');
		}
	}
	function newIterator(reverse, valueType) {
		const iter = 1 === reverse || true === reverse ? new ReverseIterator(instance.rootNode) : new Iterator(instance.rootNode);
		function next() {
			if (!iter.hasNext()) {
				return { done: true };
			}
			const ret = { done: false };
			const curr = iter.getNext();
			switch (valueType) {
			case 1:
				ret.value = curr.key;
				break;
			case 2:
				ret.value = curr.value;
				break;
			default:
				ret.value = [curr.key, curr.value];
			}
			return ret;
		}
		return { next };
	}
	function set(key, value) {
		keyValidation(key);
		instance.insert(key, value);
	}
	function get(key) {
		keyValidation(key);
		return instance.get(key);
	}
	function remove(key) {
		keyValidation(key);
		return instance.remove(key);
	}
	function has(key) {
		keyValidation(key);
		return instance.hasKey(key);
	}
	function at(index) {
		indexValidation(index);
		if (index >= instance.length) {
			return;
		}
		let next;
		let i = 0;
		const iter = new Iterator(instance.rootNode);
		while (iter.hasNext() && i <= index) {
			next = iter.getNext();
			if (i === index) {
				return [next.key, next.value];
			}
			i += 1;
		}
	}
	const size = () => instance.length;
	const clear = () => instance.clear();
	const isEmpty = () => 0 === instance.length;
	const keys = reverse => newIterator(reverse, 1);
	const values = reverse => newIterator(reverse, 2);
	const entries = reverse => newIterator(reverse, 3);
	function forEach(callback, reverse, thisArg) {
		if ('function' !== typeof callback) {
			throw TypeError(callback + ' is not a function');
		}
		const iter = 1 === reverse || true === reverse ? new ReverseIterator(instance.rootNode) : new Iterator(instance.rootNode);
		let curr;
		while (iter.hasNext()) {
			curr = iter.getNext();
			callback.call(thisArg, curr.key, curr.value);
		}
	}
	return Object.freeze({
		size,
		clear,
		isEmpty,
		set,
		get,
		has,
		at,
		delete: remove,
		keys,
		values,
		entries,
		forEach,
	});
}

class Tree{
	constructor() {
		this.length = 0;
		this.rootNode = null;
	}
	clear() {
		this.length = 0;
		this.rootNode = null;
	}
}

class BTreeNodeEntry {
	constructor(key, value, right) {
		this.key = key;
		this.value = value;
		this.right = right;
		this.prev = null;
		this.next = null;
	}
	clear() {
		this.key = void 0;
		this.value = void 0;
		this.prev = null;
		this.next = null;
		this.right = null;
	}
	gtk(key) {
		return this.key > key;
	}
	ltk(key) {
		return this.key < key;
	}
	eqk(key) {
		return this.key === key;
	}
}

function nextNodeEntry(nextNode, pair){
	pair[0] = nextNode;
	pair[1] = null === pair[0] ? null : pair[0].firstEntry;
}
function nextEntry(key, pair){
	if( pair[1].gtk(key) ){
		nextNodeEntry(pair[0].left, pair);
	}
	else if( null === pair[1].next || pair[1].next.gtk(key) ){
		nextNodeEntry(pair[1].right, pair);
	}
	else {
		pair[1] = pair[1].next;
	}
}
function getNodeEntry(rootNode, key) {
	if (null === rootNode) {
		return;
	}
	let pair = [ rootNode, rootNode.firstEntry ];
	while( null !== pair[1] ){
		if( pair[1].eqk(key) ){
			return pair[1];
		}
		nextEntry(key, pair);
	}
}

function insertEntry(node, newEntry) {
	if (!node.entriesLength) {
		node.firstEntry = newEntry;
		return newEntry;
	}
	if ( node.firstEntry.gtk(newEntry.key) ) {
		node.firstEntry.prev = newEntry;
		newEntry.next = node.firstEntry;
		node.firstEntry = newEntry;
		return newEntry;
	}
	let entry = node.firstEntry;
	while (null !== entry.next && entry.next.ltk(newEntry.key) ) {
		entry = entry.next;
	}
	if( null !== entry.next ){
		entry.next.prev  = newEntry;
	}
	newEntry.prev = entry;
	newEntry.next = entry.next;
	entry.next = newEntry;
	return newEntry;
}

function splitNonRootNode(node, parentNode, childNodes, maxNodeEntriesLength) {
	const splitRes = splitRootNode(node, childNodes, maxNodeEntriesLength);
	const entry = splitRes[0];
	splitRes[1].clear();
	let parentEntry = parentNode.firstEntry;
	if (parentEntry.gtk(entry.key)) {
		parentNode.left = childNodes[0];
	} else {
		while (node !== parentEntry.right) {
			parentEntry = parentEntry.next;
		}
		parentEntry.right = childNodes[0];
	}
	parentNode.insert(entry);
	return parentNode;
}
function splitRootNode(node, childNodes, maxNodeEntriesLength) {
	const leftChildNode = childNodes[0];
	const rightChildNode = childNodes[1];
	const median = Math.floor(maxNodeEntriesLength / 2);
	const entry = node.at(median);
	leftChildNode.firstEntry = node.firstEntry;
	leftChildNode.entriesLength = median;
	leftChildNode.left = node.left;
	rightChildNode.firstEntry = entry.next;
	rightChildNode.entriesLength = node.entriesLength - median - 1;
	rightChildNode.left = entry.right;
	entry.right = rightChildNode;
	entry.prev.next = null;
	entry.prev = null;
	entry.next.prev = null;
	entry.next = null;
	node.firstEntry = entry;
	node.entriesLength = 1;
	node.left = leftChildNode;
	return [entry, node];
}
function splitNode(node, parentNode, childNodes, maxNodeEntriesLength) {
	if (void 0 !== parentNode) {
		return splitNonRootNode(node, parentNode, childNodes, maxNodeEntriesLength);
	}
	const res = splitRootNode(node, childNodes, maxNodeEntriesLength);
	return res[1];
}

function detachParentEntry( parentEntry, parentNode, leftNode ){
	if( null !== parentEntry.prev ){
		parentEntry.prev.next = parentEntry.next;
		if( null !== parentEntry.next ){
			parentEntry.next.prev = parentEntry.prev;
		}
		parentEntry.prev.right = leftNode;
		return;
	}
	parentNode.firstEntry = parentEntry.next;
	if( null !== parentEntry.next ){
		parentEntry.next.prev = null;
	}
	parentNode.left = leftNode;
	parentEntry.prev = null;
	parentEntry.next = null;
}
function mergeNodes(leftNode, rightNode, parentNode, parentEntry){
	detachParentEntry( parentEntry, parentNode, leftNode );
	parentEntry.right = rightNode.left;
	rightNode.left = null;
	leftNode.insert( parentEntry );
	parentNode.entriesLength -= 1;
	while( rightNode.entriesLength ){
		leftNode.insert( rightNode.shift() );
	}
	rightNode.clear();
}

function removeEntry(node, entry) {
	if (null !== entry.prev) {
		entry.prev.next = entry.next;
	}
	if (null !== entry.next) {
		entry.next.prev = entry.prev;
	}
	if (node.firstEntry === entry) {
		node.firstEntry = entry.next;
	}
	entry.clear();
}
function popEntry(node) {
	let entry = node.firstEntry;
	if (1 === node.entriesLength) {
		node.firstEntry = null;
	}
	while (null !== entry.next) {
		entry = entry.next;
	}
	if (null !== entry.prev) {
		entry.prev.next = null;
	}
	entry.prev = null;
	return entry;
}
function shiftEntry(node) {
	const entry = node.firstEntry;
	if (1 === node.entriesLength) {
		node.firstEntry = null;
	} else {
		node.firstEntry.next.prev = null;
		node.firstEntry = node.firstEntry.next;
	}
	entry.next = null;
	return entry;
}

class BTreeNode {
	constructor() {
		this.left = null;
		this.entriesLength = 0;
		this.firstEntry = null;
	}
	clear() {
		this.left = null;
		this.entriesLength = 0;
		this.firstEntry = null;
	}
	at(index){
		let entry = this.firstEntry;
		let i = 0;
		while( i < index && null !== entry.next ){
			entry = entry.next;
			i += 1;
		}
		return entry;
	}
	lastEntry(){
		let entry = this.firstEntry;
		while (null !== entry.next) {
			entry = entry.next;
		}
		return entry;
	}
	insert(entry) {
		insertEntry(this, entry);
		this.entriesLength += 1;
	}
	remove(entry) {
		removeEntry(this, entry);
		this.entriesLength -= 1;
	}
	pop() {
		const entry = popEntry(this);
		this.entriesLength -= 1;
		return entry;
	}
	shift() {
		const entry = shiftEntry(this);
		this.entriesLength -= 1;
		return entry;
	}
	merge(node, parentNode, parentEntry) {
		mergeNodes(this, node, parentNode, parentEntry);
	}
	split(maxEntriesLength, parentNode) {
		return splitNode(this, parentNode, [ new BTreeNode(), new BTreeNode() ], maxEntriesLength);
	}
	leftSibling(parentNode, parentEntry) {
		if (this === parentNode.left) {
			return null;
		}
		if (null !== parentEntry.prev) {
			return parentEntry.prev.right;
		}
		return parentNode.left;
	}
	rightSibling(parentNode, parentEntry) {
		if (this === parentNode.left) {
			return parentEntry.right;
		}
		if (null !== parentEntry.next) {
			return parentEntry.next.right;
		}
		return null;
	}
	childrenSize() {
		let length = null !== this.left ? 1 : 0;
		let entry = this.firstEntry;
		while (null !== entry) {
			length += null !== entry.right ? 1 : 0;
			entry = entry.next;
		}
		return length;
	}
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
	inOrderSuccessor(nodeEntry, successorAnchestorNodes) {
		let node = nodeEntry.right;
		while (null !== node.left) {
			successorAnchestorNodes.push(node);
			node = node.left;
		}
		return node;
	}
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

function nextNodeEntryPair(node, nextNode, pair, anchestorNodes){
	if( null === nextNode ){
		pair[1] = null;
		return;
	}
	anchestorNodes.push(node);
	pair[0] = nextNode;
	pair[1] = nextNode.firstEntry;
}
function nextEntry$1(key, pair, anchestorNodes){
	if( pair[1].gtk(key) ){
		nextNodeEntryPair(pair[0], pair[0].left, pair, anchestorNodes);
	}
	else if( null === pair[1].next || pair[1].next.gtk(key) ){
		nextNodeEntryPair(pair[0], pair[1].right, pair, anchestorNodes);
	}
	else {
		pair[1] = pair[1].next;
	}
}

function insertRootNode( entry ){
	const node = new BTreeNode();
	node.insert( entry );
	return node;
}
function insertEntryAndBalance( pair, anchestorNodes, rootNode, order ){
	const maxEntriesLength = order - 1;
	let node = pair[0];
	const entry = pair[1];
	node.insert( entry );
	while( maxEntriesLength < node.entriesLength ){
		if( ! anchestorNodes.length ){
			rootNode = node.split(maxEntriesLength);
			break;
		}
		node = node.split( maxEntriesLength, anchestorNodes.pop() );
	}
	return rootNode;
}
function insertNodeEntry( rootNode, newEntry, order ){
	if( null === rootNode ){
		return insertRootNode( newEntry );
	}
	if (! rootNode.entriesLength) {
		rootNode.insert( newEntry );
		return rootNode;
	}
	const anchestorNodes = [];
	let node = rootNode;
	const pair = [ node, node.firstEntry ];
	while( null !== pair[1] ){
		if( pair[1].eqk(newEntry.key) ){
			pair[1].value = newEntry.value;
			pair[1] = null;
			break;
		}
		nextEntry$1(newEntry.key, pair, anchestorNodes);
	}
	pair[1] = newEntry;
	return insertEntryAndBalance( pair, anchestorNodes, rootNode, order );
}

function InvalidActionError(message, type, fileName, lineNumber) {
	Object.defineProperties(this, {
		type: {
			value: type
		},
		message: {
			enumerable: true,
			value: message
		},
		fileName: {
			value: fileName
		},
		lineNumber: {
			value: lineNumber
		},
	});
}

function swap(first, second) {
	const key = first.key;
	const value = first.value;
	first.key = second.key;
	first.value = second.value;
	second.key = key;
	second.value = value;
}
function swapChildren(entry, node){
	const entryChild = entry.right;
	entry.right = node.left;
	node.left = entryChild;
}
function rotate(siblingEntry, parentEntry, swapNode, insertNode){
	swap(siblingEntry, parentEntry);
	swapChildren(siblingEntry, swapNode);
	insertNode.insert(siblingEntry);
}
function leftRotation(leftNode, rightNode, parentEntry) {
	rotate(rightNode.shift(), parentEntry, rightNode, leftNode);
}
function rightRotation(leftNode, rightNode, parentEntry) {
	rotate(leftNode.pop(), parentEntry, rightNode, rightNode);
}

function rootNodeFix( node ){
	if( ! node.entriesLength && null !== node.left ){
		node.entriesLength = node.left.entriesLength;
		node.firstEntry = node.left.firstEntry;
		node.left = node.left.left;
	}
}
function nodeRotationFix( nodesPair, parentEntry, execLeftRotation ){
	if ( execLeftRotation ){
		leftRotation( nodesPair[0], nodesPair[1], parentEntry.right === nodesPair[1] ? parentEntry : parentEntry.next );
	}
	else {
		rightRotation( nodesPair[0], nodesPair[1], parentEntry );
	}
}
function nodeFix( node, anchestorNodes, minNodeChildren ){
	const minNodeKeys = minNodeChildren - 1;
	const parentNode = anchestorNodes.pop();
	const parentEntry = node.parentEntry(parentNode);
	const leftSiblingNode = node.leftSibling( parentNode, parentEntry );
	const rightSiblingNode = node.rightSibling( parentNode, parentEntry );
	const nodesPair = [ node, rightSiblingNode ];
	let siblingNode = rightSiblingNode;
	const useLeftSibling = null !== leftSiblingNode && ( null === rightSiblingNode || rightSiblingNode.entriesLength <= leftSiblingNode.entriesLength );
	if ( useLeftSibling ){
		siblingNode = leftSiblingNode;
		nodesPair[0] = leftSiblingNode;
		nodesPair[1] = node;
	}
	if( siblingNode.entriesLength > minNodeKeys ){
		nodeRotationFix( nodesPair, parentEntry, ! useLeftSibling );
		return;
	}
	nodesPair[0].merge( nodesPair[1], parentNode, parentEntry );
	balanceStructure( parentNode, anchestorNodes, minNodeChildren );
}
function balanceStructure( node, anchestorNodes, minNodeChildren ){
	if( ! anchestorNodes.length ){
		rootNodeFix( node );
	}
	else if( node.entriesLength < minNodeChildren - 1 || node.childrenSize() < minNodeChildren ){
		nodeFix( node, anchestorNodes, minNodeChildren );
	}
}
function removeNonLeafNodeEntry( entry, node, anchestorNodes, minNodeChildren ){
	const minNodeKeys = minNodeChildren - 1;
	const successorNodeAnchestors = [];
	const predecessorNodeAnchestors = [];
	const successorNode = node.inOrderSuccessor(entry, successorNodeAnchestors);
	const predecessorNode = node.inOrderPredecessor(entry, predecessorNodeAnchestors);
	let replaceEntry, replaceNode, replaceNodeAnchestors;
	if( successorNode.entriesLength > predecessorNode.entriesLength ){
		replaceNode = successorNode;
		replaceNodeAnchestors = successorNodeAnchestors;
		replaceEntry = successorNode.shift();
		successorNode.left = replaceEntry.right;
		replaceEntry.right = null;
	}
	else {
		replaceNode = predecessorNode;
		replaceNodeAnchestors = predecessorNodeAnchestors;
		replaceEntry = predecessorNode.pop();
	}
	entry.key = replaceEntry.key;
	entry.value = replaceEntry.value;
	if( replaceNode.entriesLength <= minNodeKeys ){
		anchestorNodes.push(node, ...replaceNodeAnchestors);
		balanceStructure( replaceNode, anchestorNodes, minNodeChildren );
	}
}
function removeEntryAndBalance(entry, node, anchestorNodes, minNodeChildren){
	const minNodeKeys = minNodeChildren - 1;
	if( null === node.left ){
		node.remove( entry );
		if( anchestorNodes.length && node.entriesLength < minNodeKeys ){
			balanceStructure( node, anchestorNodes, minNodeChildren );
		}
	}
	else {
		removeNonLeafNodeEntry( entry, node, anchestorNodes, minNodeChildren );
	}
}
function removeNodeEntry(rootNode, key, order){
	const minNodeChildren = Math.ceil( order  / 2 );
	const anchestorNodes = [];
	const pair = [null, null];
	if( void 0 !== rootNode && null !== rootNode ){
		pair[0] = rootNode;
		pair[1] = rootNode.firstEntry;
	}
	while( null !== pair[1] ){
		if( pair[1].eqk(key) ){
			removeEntryAndBalance(pair[1], pair[0], anchestorNodes, minNodeChildren);
			return rootNode;
		}
		nextEntry$1(key, pair, anchestorNodes);
	}
	throw new InvalidActionError( 'Undefined key "' + key + '"', 'undefined_key' );
}

class BTreeStructure extends Tree {
	constructor(order) {
		super();
		this.order = void 0 !== order && 2 < order ? order : 3;
	}
	get(key) {
		let entry = getNodeEntry(this.rootNode, key);
		return void 0 === entry ? entry : entry.value;
	}
	hasKey(key) {
		return void 0 !== getNodeEntry(this.rootNode, key);
	}
	insert(key, value) {
		this.rootNode = insertNodeEntry(this.rootNode, new BTreeNodeEntry(key, value, null), this.order );
		this.length += 1;
	}
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

function ifPushArray(ifCondition, arr, val) {
	if (!ifCondition) {
		return false;
	}
	arr.push(val);
	return true;
}
function fillStack(stack, state) {
	while (null !== state.node.left) {
		stack.push(state.entry);
		state.node = state.node.left;
		state.entry = state.node.firstEntry;
	}
}
class BTreeDepthFirstIterator {
	constructor(node) {
		this.stack = [];
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
	hasNext() {
		return null !== this.state.entry;
	}
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
function nextFromPrev(stacks, state) {
	if (null !== state.entry.prev.right) {
		stacks.nodes.push(state.node);
		stacks.entries.push(state.entry.prev);
		fillStacks(state.entry.prev.right, stacks, state);
	} else {
		state.entry = state.entry.prev;
	}
}
function nextFromStack(stacks, state) {
	state.node = stacks.nodes.pop();
	state.entry = stacks.entries.pop();
}
class BTreeDepthFirstReverseIterator {
	constructor(node) {
		this.stacks = {
			nodes: [],
			entries: [],
		};
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
	hasNext() {
		return null !== this.state.entry;
	}
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

function BTree(order){
	if( void 0 === order ){
		return SearchTree( new BTreeStructure(), BTreeDepthFirstIterator, BTreeDepthFirstReverseIterator );
	}
	if (isNaN(order) || order !== Math.floor(order)) {
		throw TypeError('Invalid order "' + order + '"');
	}
	if ( 3 > order ) {
		throw RangeError('Invalid order "' + order + '"');
	}
	return SearchTree( new BTreeStructure(order-1), BTreeDepthFirstIterator, BTreeDepthFirstReverseIterator );
}

class BinaryTree extends Tree{
	constructor(Node, insertMethod, removeMethod, getMethod) {
		super();
		this.Node = Node;
		this.getNode = getMethod;
		this.insertNode = insertMethod;
		this.removeNode = removeMethod;
	}
	get(key) {
		let node = this.getNode(this.rootNode, key);
		return void 0 === node ? node : node.value;
	}
	hasKey(key) {
		return void 0 !== this.getNode(this.rootNode, key);
	}
	insert(key, value) {
		this.rootNode = this.insertNode(this.rootNode, new this.Node(key, value));
		this.length += 1;
	}
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

class BinarySearchTreeNode {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.left = null;
		this.right = null;
	}
	detach() {
		this.left = null;
		this.right = null;
	}
	gtk(key) {
		return this.key > key;
	}
	ltk(key) {
		return this.key < key;
	}
	eqk(key) {
		return this.key === key;
	}
	hasLeftChild(){
		return null !== this.left;
	}
	hasRightChild(){
		return null !== this.right;
	}
}

class RedBlackTreeNode extends BinarySearchTreeNode{
	constructor(key, value) {
		super(key, value);
		this.isRed = true;
	}
}

function getNodeByKey( rootNode, key, nextChildNodeFunc ){
	if (null === rootNode) {
		return;
	}
	let node = rootNode;
	while (null !== node) {
		if (node.eqk(key)) {
			return node;
		}
		node = nextChildNodeFunc(node, key);
	}
}

function nextChildNode(node, key){
	return node.gtk(key) ? node.left : node.right;
}
function getNode(rootNode, key) {
	return getNodeByKey( rootNode, key, nextChildNode );
}

function attachChildToParent( node, parentNode, childNode, rootNode ){
	if (null === parentNode) {
		return childNode;
	}
	if (null !== parentNode.left && node.eqk(parentNode.left.key)) {
		parentNode.left = childNode;
	}
	else {
		parentNode.right = childNode;
	}
	return rootNode;
}

function rotation( node, parent, onLeft ){
	let child;
	if( onLeft ){
		child = node.right;
		node.right = child.left;
		child.left = node;
	}
	else {
		child = node.left;
		node.left = child.right;
		child.right = node;
	}
	return attachChildToParent(node, parent, child);
}
function leftRotation$1( node, parent ){
	return rotation( node, parent, true );
}
function rightRotation$1( node, parent ){
	return rotation( node, parent, false );
}

function nodeIsLeftChild(node, parentNode) {
	return null !== parentNode.left ? node.eqk(parentNode.left.key) : false;
}
function insertParentSiblingFixup(parentSibling, triplet, anchestors) {
	parentSibling.isRed = false;
	triplet[1].isRed = false;
	triplet[2].isRed = 0 < anchestors.length;
	triplet[0] = triplet[2];
	triplet[1] = anchestors.length ? anchestors.pop() : null;
	triplet[2] = anchestors.length ? anchestors.pop() : null;
}
function insertLineFixup(parentIsLeftChild, triplet, anchestors, rootNode) {
	let newTreeRoot = rootNode;
	let grandGrandParent = anchestors.length ? anchestors.pop() : null;
	if (parentIsLeftChild) {
		rightRotation$1(triplet[2], grandGrandParent);
	} else {
		leftRotation$1(triplet[2], grandGrandParent);
	}
	triplet[1].isRed = false;
	triplet[2].isRed = true;
	if (null === grandGrandParent) {
		newTreeRoot = triplet[1];
	}
	triplet[0] = triplet[1];
	triplet[1] = grandGrandParent;
	triplet[2] = anchestors.length ? anchestors.pop() : null;
	return newTreeRoot;
}
function insertTriangleFixup(parentIsLeftChild, triplet, newNode) {
	if (parentIsLeftChild) {
		leftRotation$1(triplet[1], triplet[2]);
	} else {
		rightRotation$1(triplet[1], triplet[2]);
	}
	triplet[0] = triplet[1];
	triplet[1] = newNode;
}
function insertFixupStep(newNode, anchestors, rootNode, triplet) {
	let newTreeRoot = rootNode;
	let parentIsLeftChild = nodeIsLeftChild(triplet[1], triplet[2]);
	let parentSibling = parentIsLeftChild ? triplet[2].right : triplet[2].left;
	if (null !== parentSibling && parentSibling.isRed) {
		insertParentSiblingFixup(parentSibling, triplet, anchestors);
	} else if (parentIsLeftChild === nodeIsLeftChild(triplet[0], triplet[1])) {
		newTreeRoot = insertLineFixup(parentIsLeftChild, triplet, anchestors, newTreeRoot);
	} else {
		insertTriangleFixup(parentIsLeftChild, triplet, newNode);
	}
	return newTreeRoot;
}
function insertFixup(newNode, anchestors, rootNode) {
	let newTreeRoot = rootNode;
	let triplet = [newNode, anchestors.pop(), anchestors.length ? anchestors.pop() : null];
	while (null !== triplet[1] && triplet[1].isRed && triplet[0].isRed) {
		if (null === triplet[2]) {
			triplet[1].isRed = false;
			break;
		}
		newTreeRoot = insertFixupStep(newNode, anchestors, newTreeRoot, triplet);
	}
	return newTreeRoot;
}
function insertNewNode(node, newNode, anchestors) {
	anchestors.push(node);
	if (node.gtk(newNode.key)) {
		if (null === node.left) {
			node.left = newNode;
			return null;
		}
		return node.left;
	}
	if (null === node.right) {
		node.right = newNode;
		return null;
	}
	return node.right;
}
function insertNode(rootNode, newNode) {
	if (null === rootNode) {
		return newNode;
	}
	const anchestors = [];
	let node = rootNode;
	while (null !== node) {
		if (node.eqk(newNode.key)) {
			node.value = newNode.value;
			return rootNode;
		}
		node = insertNewNode(node, newNode, anchestors);
	}
	return insertFixup(newNode, anchestors, rootNode);
}

function mostRightNodeWithAnchestors(node, anchestorNodes){
	while (null !== node.right) {
		anchestorNodes.push(node);
		node = node.right;
	}
	return node;
}
function case_1( rootNode, siblingNode, parentNode, anchestorNodes ){
	const grandParentNode = anchestorNodes.length ? anchestorNodes.pop() : null;
	const siblingIsLeftChild = null !== parentNode.left && siblingNode.eqk( parentNode.left.key );
	const rotationRoot = siblingIsLeftChild ? rightRotation$1( parentNode, grandParentNode ) : leftRotation$1( parentNode, grandParentNode );
	siblingNode.isRed = false;
	parentNode.isRed = true;
	anchestorNodes.push(siblingNode, parentNode);
	return blackCasesReplacement( null === grandParentNode ? rotationRoot : rootNode, ! siblingIsLeftChild, anchestorNodes );
}
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
function case_3( rootNode, siblingNode, parentNode, grandParentNode ){
	const siblingIsLeftChild = null !== parentNode.left && siblingNode.eqk( parentNode.left.key );
	siblingNode.isRed = true;
	if( siblingIsLeftChild ){
		siblingNode.right.isRed = false;
		leftRotation$1( siblingNode, parentNode );
	}
	else {
		siblingNode.left.isRed = false;
		rightRotation$1( siblingNode, parentNode );
	}
	return case_4( rootNode, siblingIsLeftChild ? parentNode.left : parentNode.right, parentNode, grandParentNode );
}
function case_4( rootNode, siblingNode, parentNode, grandParentNode ){
	siblingNode.isRed = parentNode.isRed;
	parentNode.isRed = false;
	const siblingIsLeftChild = null !== parentNode.left && siblingNode.eqk( parentNode.left.key );
	if( siblingIsLeftChild ){
		siblingNode.left.isRed = false;
	}
	else {
		siblingNode.right.isRed = false;
	}
	const rotationRoot = siblingIsLeftChild ? rightRotation$1( parentNode, grandParentNode ) : leftRotation$1( parentNode, grandParentNode );
	return null === grandParentNode ? rotationRoot : rootNode;
}
function blackLeftNode(node){
	return null === node.left || ! node.left.isRed;
}
function blackRightNode(node){
	return null === node.right || ! node.right.isRed;
}
function blackCaseStep1( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes ){
	if( siblingNode.isRed ){
		return case_1( rootNode, siblingNode, anchestorNodes.pop(), anchestorNodes );
	}
	return blackCaseStep2( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes );
}
function blackCaseStep2( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes ){
	if( blackLeftNode(siblingNode) && blackRightNode(siblingNode) ){
		return case_2( rootNode, siblingNode, anchestorNodes.pop(), anchestorNodes );
	}
	return blackCaseStep3( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes );
}
function blackCaseStep3( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes ){
	if( nodeIsLeftChild && ! blackLeftNode(siblingNode) || ! nodeIsLeftChild && ! blackRightNode(siblingNode) ){
		return case_3( rootNode, siblingNode, anchestorNodes.pop(), anchestorNodes.length ? anchestorNodes.pop() : null );
	}
	return blackCaseStep4( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes );
}
function blackCaseStep4( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes ){
	return case_4( rootNode, siblingNode, anchestorNodes.pop(), anchestorNodes.length ? anchestorNodes.pop() : null );
}
function blackCasesReplacement( rootNode, nodeIsLeftChild, anchestorNodes ){
	const siblingNode = nodeIsLeftChild ? anchestorNodes[ anchestorNodes.length - 1 ].right : anchestorNodes[ anchestorNodes.length - 1 ].left;
	if( null === siblingNode ){
		return rootNode;
	}
	return blackCaseStep1( rootNode, siblingNode, nodeIsLeftChild, anchestorNodes );
}
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
	else {
		parentNode.right = null;
	}
	if( node.isRed ){
		return rootNode;
	}
	anchestorNodes.push(parentNode);
	return blackCasesReplacement( rootNode, nodeIsLeftChild, anchestorNodes );
}
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
	else {
		parentNode.right = child;
	}
	return rootNode;
}
function withTwoChildren( rootNode, node, anchestorNodes ) {
	const predecessorAnchestors = anchestorNodes;
	predecessorAnchestors.push(node);
	let predecessor = node.left;
	let predecessorIsLeftChild = null === predecessor.right;
	if( predecessorIsLeftChild ){
		predecessorAnchestors[ predecessorAnchestors.length - 1 ].left = predecessor.left;
	}
	else {
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
function removeNode( rootNode, key ) {
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

class RedBlackTreeStructure extends BinaryTree {
	constructor(){
		super(RedBlackTreeNode, insertNode, removeNode, getNode);
	}
}

function nextStackFillNode( node ){
	return node.hasLeftChild() ? node.left : null;
}
function stackFill(stack, node, nextStackFillNodeFn){
	while (null !== node) {
		stack.push(node);
		node = nextStackFillNodeFn(node);
	}
}
class BinaryTreeDepthFirstIterator {
	constructor( node, nextStackFillNodeFn ) {
		this.stack = [];
		if (void 0 === node || null === node) {
			return;
		}
		this.nextStackFillNodeFn = 'function' === typeof nextStackFillNodeFn ? nextStackFillNodeFn : nextStackFillNode;
		this.stackFillFn = stackFill;
		this.stackFillFn(this.stack, node, this.nextStackFillNodeFn);
	}
	hasNext() {
		return 0 < this.stack.length;
	}
	getNext() {
		let node = this.stack.pop();
		this.stackFillFn(this.stack, node.right, this.nextStackFillNodeFn);
		return node;
	}
}

function nextStackFillNode$1( node ){
	return node.hasRightChild() ? node.right : null;
}
class BinaryTreeDepthFirstReverseIterator extends BinaryTreeDepthFirstIterator {
	constructor( node ) {
		super(node, nextStackFillNode$1);
	}
	getNext() {
		let node = this.stack.pop();
		this.stackFillFn(this.stack, node.left, this.nextStackFillNodeFn);
		return node;
	}
}

function RedBlackTree(){
	return SearchTree( new RedBlackTreeStructure, BinaryTreeDepthFirstIterator, BinaryTreeDepthFirstReverseIterator );
}

function insertNewNode$1(node, newNode){
	if( node.gtk(newNode.key) ){
		if (null !== node.left) {
			return node.left;
		}
		node.left = newNode;
		return null;
	}
	if (null !== node.right) {
		return node.right;
	}
	node.right = newNode;
	return null;
}
function insertNode$1(rootNode, newNode) {
	if (null === rootNode) {
		return newNode;
	}
	let node = rootNode;
	while (null !== node) {
		if (node.eqk(newNode.key)) {
			node.value = newNode.value;
			return rootNode;
		}
		node = insertNewNode$1( node, newNode );
	}
	return rootNode;
}

function nodeSuccessor(node){
	let successor = node.right;
	while (null !== successor.left) {
		successor = successor.left;
	}
	return successor;
}
function removeNodeAndFix(node, parentNode, rootNode ){
	if (null !== node.left && null !== node.right) {
		let successor = nodeSuccessor(node);
		node.key = successor.key;
		node.right = removeNode$1(node.right, successor.key);
		return rootNode;
	}
	let childNode = null === node.right ? node.left : node.right;
	node.detach();
	return attachChildToParent( node, parentNode, childNode, rootNode );
}
function removeNode$1(rootNode, key) {
	let parent = null;
	let node = rootNode;
	while( null !== node ){
		if ( node.eqk(key) ) {
			return removeNodeAndFix( node, parent, rootNode );
		}
		parent = node;
		node = node.gtk(key) ? node.left : node.right;
	}
	throw new InvalidActionError( 'Undefined key "' + key + '"', 'undefined_key' );
}

class BinarySearchTreeStructure extends BinaryTree{
	constructor(){
		super(BinarySearchTreeNode, insertNode$1, removeNode$1, getNode);
	}
}

function BinarySearchTree(){
	return SearchTree( new BinarySearchTreeStructure, BinaryTreeDepthFirstIterator, BinaryTreeDepthFirstReverseIterator );
}

class ThreadedBinarySearchTreeNode extends BinarySearchTreeNode {
	constructor(key, value) {
		super(key, value);
		this.leftBit = false;
		this.rightBit = false;
	}
	hasLeftChild(){
		return this.leftBit;
	}
	hasRightChild(){
		return this.rightBit;
	}
}

function nextChildNode$1(node, key) {
	if (node.gtk(key)) {
		return node.hasLeftChild() ? node.left : null;
	}
	return node.hasRightChild() ? node.right : null;
}

function getNode$1(rootNode, key) {
	return getNodeByKey( rootNode, key, nextChildNode$1 );
}

function checkInsertNext(newNode, pair, insertLeftDirectionNodeFunc, insertRightDirectionNodeFunc ) {
	if (pair[0].eqk(newNode.key)) {
		pair[0].value = newNode.value;
		pair[0] = null;
		return;
	}
	pair[1] = pair[0];
	if (pair[0].gtk(newNode.key)) {
		if (pair[0].hasLeftChild()) {
			pair[0] = pair[0].left;
			return;
		}
		insertLeftDirectionNodeFunc(newNode, pair[1]);
		pair[0] = null;
		return;
	}
	if (pair[0].hasRightChild()) {
		pair[0] = pair[0].right;
		return;
	}
	insertRightDirectionNodeFunc(newNode, pair[1]);
	pair[0] = null;
}
function insertNewNode$2(rootNode, newNode, insertLeftDirectionNodeFunc, insertRightDirectionNodeFunc){
	if (null === rootNode) {
		return newNode;
	}
	const pair = [rootNode, null];
	while (null !== pair[0]) {
		checkInsertNext(newNode, pair, insertLeftDirectionNodeFunc, insertRightDirectionNodeFunc);
	}
	return rootNode;
}

function insertLeftDirectionNode(newNode, parentNode) {
	newNode.left = parentNode.left;
	newNode.right = parentNode;
	parentNode.leftBit = true;
	parentNode.left = newNode;
}
function insertRightDirectionNode(newNode, parentNode) {
	newNode.left = parentNode;
	newNode.right = parentNode.right;
	parentNode.rightBit = true;
	parentNode.right = newNode;
}
function insertNode$2(rootNode, newNode) {
	return insertNewNode$2(rootNode, newNode, insertLeftDirectionNode, insertRightDirectionNode );
}

function nodePredecessor(node) {
	let predecessor = node.left;
	while (predecessor.hasRightChild()) {
		predecessor = predecessor.right;
	}
	return predecessor;
}

function nodeSuccessor$1(node) {
	let successor = node.right;
	while (successor.hasLeftChild()) {
		successor = successor.left;
	}
	return successor;
}

function singleChildRemoval(rootNode, parentNode, node) {
	if (node.hasLeftChild()) {
		nodePredecessor(node).right = null;
	} else {
		nodeSuccessor$1(node).left = null;
	}
	rootNode = attachChildToParent(node, parentNode, node.hasLeftChild() ? node.left : node.right, rootNode);
	node.detach();
	return rootNode;
}
function doubleChildrenRemoval(rootNode, node, withoutChildRemovalFunc) {
	let successorParent = node;
	let successor = node.right;
	while (successor.hasLeftChild()) {
		successorParent = successor;
		successor = successor.left;
	}
	node.key = successor.key;
	if (!successor.hasLeftChild() && !successor.hasRightChild()) {
		return withoutChildRemovalFunc(rootNode, successorParent, successor);
	}
	return singleChildRemoval(rootNode, successorParent, successor);
}
function removeNodeAndFix$1(node, parentNode, rootNode, withoutChildRemovalFunc) {
	if (node.hasLeftChild() && node.hasRightChild()) {
		return doubleChildrenRemoval(rootNode, node, withoutChildRemovalFunc);
	}
	if (node.hasRightChild() || node.hasLeftChild()) {
		return singleChildRemoval(rootNode, parentNode, node);
	}
	return withoutChildRemovalFunc(rootNode, parentNode, node);
}
function removeNodeByKey(rootNode, key, withoutChildRemovalFunc){
	let parent = null;
	let node = rootNode;
	while (null !== node) {
		if (node.eqk(key)) {
			return removeNodeAndFix$1(node, parent, rootNode, withoutChildRemovalFunc);
		}
		parent = node;
		node = nextChildNode$1(node, key);
	}
	throw new InvalidActionError('Undefined key "' + key + '"', 'undefined_key');
}

function withoutChildRemoval(rootNode, parentNode, node) {
	if (null === parentNode) {
		node.detach();
		return null;
	}
	if (parentNode.leftBit && node.eqk(parentNode.left.key)) {
		parentNode.left = node.left;
		parentNode.leftBit = false;
	} else {
		parentNode.right = node.right;
		parentNode.rightBit = false;
	}
	node.detach();
	return rootNode;
}
function removeNode$2(rootNode, key) {
	return removeNodeByKey(rootNode, key, withoutChildRemoval);
}

class ThreadedBinarySearchTreeStructure extends BinaryTree {
	constructor(){
		super(ThreadedBinarySearchTreeNode, insertNode$2, removeNode$2, getNode$1);
	}
}

function lastPredecessor(node) {
	while (node.hasLeftChild()) {
		node = node.left;
	}
	return node;
}
class ThreadedBinaryTreeDepthFirstIterator {
	constructor(node, proceedNextFunc) {
		this.proceedNext = 'function' === typeof proceedNextFunc ? proceedNextFunc : lastPredecessor;
		this.current = void 0 === node || null === node ? null : this.proceedNext(node);
	}
	hasNext() {
		return null !== this.current;
	}
	getNext() {
		let node = this.current;
		this.current = node.right;
		if (node.rightBit) {
			this.current = this.proceedNext(this.current);
		}
		return node;
	}
}

function lastSucessor(node) {
	while (node.hasRightChild()) {
		node = node.right;
	}
	return node;
}
class ThreadedBinaryTreeDepthFirstReverseIterator extends ThreadedBinaryTreeDepthFirstIterator {
	constructor(node) {
		super(node, lastSucessor);
	}
	getNext() {
		let node = this.current;
		this.current = node.left;
		if (node.leftBit) {
			this.current = this.proceedNext(this.current);
		}
		return node;
	}
}

function ThreadedBinarySearchTree(){
	return SearchTree( new ThreadedBinarySearchTreeStructure, ThreadedBinaryTreeDepthFirstIterator, ThreadedBinaryTreeDepthFirstReverseIterator );
}

class RightThreadedBinarySearchTreeNode extends BinarySearchTreeNode{
	constructor(key, value) {
		super(key, value);
		this.rightBit = false;
	}
	hasRightChild(){
		return this.rightBit;
	}
}

function insertLeftDirectionNode$1(newNode, parentNode) {
	newNode.right = parentNode;
	parentNode.left = newNode;
}
function insertRightDirectionNode$1(newNode, parentNode) {
	newNode.right = parentNode.right;
	parentNode.rightBit = true;
	parentNode.right = newNode;
}
function insertNode$3(rootNode, newNode) {
	return insertNewNode$2(rootNode, newNode, insertLeftDirectionNode$1, insertRightDirectionNode$1 );
}

function withoutChildRemoval$1(rootNode, parentNode, node) {
	if (null === parentNode) {
		node.detach();
		return null;
	}
	if (null !== parentNode.left && node.eqk(parentNode.left.key)) {
		parentNode.left = node.left;
	} else {
		parentNode.right = node.right;
		parentNode.rightBit = false;
	}
	node.detach();
	return rootNode;
}
function removeNode$3(rootNode, key) {
	return removeNodeByKey(rootNode, key, withoutChildRemoval$1);
}

class RightThreadedBinarySearchTreeStructure extends BinaryTree {
	constructor(){
		super(RightThreadedBinarySearchTreeNode, insertNode$3, removeNode$3, getNode$1);
	}
}

function RightThreadedBinarySearchTree(){
	return SearchTree( new RightThreadedBinarySearchTreeStructure, ThreadedBinaryTreeDepthFirstIterator, BinaryTreeDepthFirstReverseIterator );
}

class LeftThreadedBinarySearchTreeNode extends BinarySearchTreeNode{
	constructor(key, value) {
		super(key, value);
		this.leftBit = false;
	}
	hasLeftChild(){
		return this.leftBit;
	}
}

function insertLeftDirectionNode$2(newNode, parentNode) {
	newNode.left = parentNode.left;
	parentNode.leftBit = true;
	parentNode.left = newNode;
}
function insertRightDirectionNode$2(newNode, parentNode) {
	newNode.left = parentNode;
	parentNode.right = newNode;
}
function insertNode$4(rootNode, newNode) {
	return insertNewNode$2(rootNode, newNode, insertLeftDirectionNode$2, insertRightDirectionNode$2 );
}

function withoutChildRemoval$2(rootNode, parentNode, node) {
	if (null === parentNode) {
		node.detach();
		return null;
	}
	if (parentNode.leftBit && node.eqk(parentNode.left.key)) {
		parentNode.left = node.left;
		parentNode.leftBit = false;
	} else {
		parentNode.right = node.right;
	}
	node.detach();
	return rootNode;
}
function removeNode$4(rootNode, key) {
	return removeNodeByKey(rootNode, key, withoutChildRemoval$2);
}

class LeftThreadedBinarySearchTreeStructure extends BinaryTree {
	constructor(){
		super(LeftThreadedBinarySearchTreeNode, insertNode$4, removeNode$4, getNode$1);
	}
}

function LeftThreadedBinarySearchTree(){
	return SearchTree( new LeftThreadedBinarySearchTreeStructure, BinaryTreeDepthFirstIterator, ThreadedBinaryTreeDepthFirstReverseIterator );
}

exports.BTree = BTree;
exports.BinarySearchTree = BinarySearchTree;
exports.LeftThreadedBinarySearchTree = LeftThreadedBinarySearchTree;
exports.RedBlackTree = RedBlackTree;
exports.RightThreadedBinarySearchTree = RightThreadedBinarySearchTree;
exports.ThreadedBinarySearchTree = ThreadedBinarySearchTree;
