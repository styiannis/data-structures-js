import { toBe } from "./helpers.js";

import { TestBinarySearchTree } from "./TestBinarySearchTree.js";

function treePathData( ins, rootNode, maxNodeKeys, detailed ){

	const minNodeChild = Math.ceil( ( 1 + maxNodeKeys ) / 2 );
	const minNodeKeys = minNodeChild - 1;

	const includeAll = void 0 === detailed ? false : ( 1 === detailed || true === detailed ? true : false );

	const result = {
		height: -1,
		balanced: true,
		validNodes: true,
	};

	if( includeAll ){
		result.data = [];
	}

	const stack = [ [ rootNode, 0, true, true, true ] ];

	let node, nodesCntr, validKeys, validChild, validKeysNChild;
	let keyLen;
	let childLenCntr;
	let leftChildCntr;
	let rightChildCntr;
	let entry;
	let i;

	while( stack.length ){

		[ node, nodesCntr, validKeys, validChild, validKeysNChild ] = stack.pop();

		nodesCntr += 1;

		keyLen = node.entriesLength;

		childLenCntr = node.childrenSize();
		leftChildCntr = null === node.left ? 0 : 1;
		rightChildCntr = childLenCntr - leftChildCntr;

		if( childLenCntr ){

			if( 1 === nodesCntr ){

				// Is root node.

				if( validKeys && ( keyLen < 1 || keyLen > maxNodeKeys ) ){
					validKeys = false;
				}

				if( validChild && childLenCntr < 1 ){
					validChild = false;
				}
			}
			else{

				if( validKeys && ( keyLen < minNodeKeys || keyLen > maxNodeKeys ) ){
					validKeys = false;
				}

				if( validChild && childLenCntr < minNodeChild ){
					validChild = false;
				}
			}

			if( validKeysNChild && ( keyLen !== childLenCntr - 1 ) ){
				validKeysNChild = false;
			}
		}

		if( leftChildCntr ){
			stack.push( [ node.left, nodesCntr, validKeys, validChild, validKeysNChild ] );
		}

		entry = node.firstEntry;
			
		while( null !== entry ){

			if( null !== entry.right ){
				stack.push( [ entry.right, nodesCntr, validKeys, validChild, validKeysNChild ] );
			}

			entry = entry.next;
		}

		if( ! leftChildCntr && ! rightChildCntr ){

			if( -1 === result.height ){
				result.height = nodesCntr;
			}
			else{
				result.balanced = result.balanced && result.height === nodesCntr;
			}

			result.validNodes = result.validNodes && validKeys && validChild && validKeysNChild;

			if( includeAll ){

				result.data.push({
					height: nodesCntr,
					validKeysLen: validKeys,
					validChildLen: validChild,
					validKeysNChildLen: validKeysNChild,
				});
			}
		}
	}

	return result;
}

export class TestBTreeBalance {

	constructor(StructureType) {

		if (void 0 === StructureType) {
			return;
		}

		this.StructureType = StructureType;

		this.order = 5;

		this.initStructure();
		this.initTestValues();
		this.runTests();
	}

	initStructure() {
		this.instance = new this.StructureType(this.order);
	}

	initTestValues() {
		this.values = [15, 40, 58, 66, 43, 36, 81, 29, 46, 65,
			47, 7, 12, 86, 89, 31, 52, 87, 27, 78,
			80, 64, 84, 62, 23, 69, 32, 99, 34, 97,
			4, 82, 1, 17, 63, 54, 53];
	}

	runTests() {
		let paths;
		let i = 0;
		while( i < this.values.length ){
			this.instance.insert( this.values[i], this.values[i] + '' );
			i += 1;
			paths = treePathData( this.instance, this.instance.rootNode, this.order - 1 );
			toBe("BTree: Is balanced", paths.balanced, true);
			toBe("BTree: Valid nodes", paths.validNodes, true);
		}
	}
}
