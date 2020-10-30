/**
 *
 * @module
 */

/**
 *
 * @param {BTreeNode} nextNode
 * @param {array} pair [node, entry]
 */
function nextNodeEntry(nextNode, pair){
	pair[0] = nextNode;
	pair[1] = null === pair[0] ? null : pair[0].firstEntry;
}

/**
 *
 * @param {number} key
 * @param {array} pair [node, entry]
 */
function nextEntry(key, pair){

	if( pair[1].gtk(key) ){
		nextNodeEntry(pair[0].left, pair);
	}
	else if( null === pair[1].next || pair[1].next.gtk(key) ){
		nextNodeEntry(pair[1].right, pair);
	}
	else{
		pair[1] = pair[1].next;
	}
}
 
/**
 *
 * @param {(BTreeNode|null)} rootNode
 * @param {number} key
 * @return {(BTreeNode|undefined)} 
 */
export function getNodeEntry(rootNode, key) {

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
