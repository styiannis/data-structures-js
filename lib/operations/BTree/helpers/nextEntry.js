/**
 *
 * @param {BTreeNode} nextNode
 * @param {array} pair [node, entry]
 */
function nextNodeEntryPair(node, nextNode, pair, anchestorNodes){
	
	if( null === nextNode ){
		pair[1] = null;
		return;
	}

	anchestorNodes.push(node);

	pair[0] = nextNode;
	pair[1] = nextNode.firstEntry;
}

/**
 *
 * @param {number} key
 * @param {array} pair [node, entry]
 */
export function nextEntry(key, pair, anchestorNodes){

	if( pair[1].gtk(key) ){
		nextNodeEntryPair(pair[0], pair[0].left, pair, anchestorNodes);
	}
	else if( null === pair[1].next || pair[1].next.gtk(key) ){
		nextNodeEntryPair(pair[0], pair[1].right, pair, anchestorNodes);
	}
	else{
		pair[1] = pair[1].next;
	}
}