import { toBe } from "./helpers.js";

import { TestRedBlackTree } from './TestRedBlackTree.js';

function treePathData( rootNode, detailed ){

	const includeAll = void 0 === detailed ? false : ( 1 === detailed || true === detailed ? true : false );

	const result = {
		pathLength: 0,
		maxPathSize: void 0,
		minPathSize: void 0,
		blackNodesHeight: void 0,
		validRedNodes: true,
		validBlackNodes: true,
	};

	if( includeAll ){
		result.data = [];
	}

	let node, nodesCntr, bnodesCntr, keys, reds, doubleReds;

	let blackNodesHeight;

	const stack = [ [ rootNode, 0, 0, 0 ] ];

	if( includeAll ){
		stack[0].push([]);
		stack[0].push([]);
	}

	while( stack.length ){

		if( includeAll ){
			
			[ node, nodesCntr, bnodesCntr, doubleReds, keys, reds ] = stack.pop();

			keys.push( node.key );
			reds.push( node.isRed );
		}
		else{
			[ node, nodesCntr, bnodesCntr, doubleReds ] = stack.pop();
		}

		nodesCntr += 1;

		if( ! node.isRed ){	
			bnodesCntr += 1;
		}

		if ( 2 > doubleReds ){
			doubleReds = node.isRed ? doubleReds + 1 : 0;
		}

		if( null === node.left && null === node.right ){			

			result.pathLength += 1;

			if( result.validRedNodes && 2 === doubleReds ){
				result.validRedNodes = false;
			}

			if( 1 === result.pathLength ){
				result.blackNodesHeight = bnodesCntr;
			}
			else if( result.validBlackNodes && result.blackNodesHeight !== bnodesCntr ){
				result.validBlackNodes = false;
			}

			if( includeAll ){
				result.data.push({
					height: nodesCntr,
					blackNodesHeight: bnodesCntr,
					consecutiveReds: 2 === doubleReds,
					keys: keys,
					reds: reds,
				});
			}

			if( 1 === result.pathLength ){
				result.minPathSize = nodesCntr;
				result.maxPathSize = nodesCntr;
			}
			else if( nodesCntr < result.minPathSize ){
				result.minPathSize = nodesCntr;
			}
			else if( nodesCntr > result.maxPathSize ){
				result.maxPathSize = nodesCntr;
			}
		}
		else{

			if( null !== node.left ){

				stack.push( [ node.left, nodesCntr, bnodesCntr, doubleReds ] );

				if( includeAll ){
					stack[ stack.length - 1 ].push([...keys]);
					stack[ stack.length - 1 ].push([...reds]);
				}
			}

			if( null !== node.right ){
					
				stack.push( [ node.right, nodesCntr, bnodesCntr, doubleReds ] );

				if( includeAll ){
					stack[ stack.length - 1 ].push([...keys]);
					stack[ stack.length - 1 ].push([...reds]);
				}
			}
		}
	}

	return result;
}

export class TestRedBlackTreeBalance{

	constructor(StructureType) {

		if (void 0 === StructureType) {
			return;
		}

		this.StructureType = StructureType;

		this.initStructure();
		this.initTestValues();
		this.runTests();
	}

	initStructure() {
		this.instance = new this.StructureType;
	}
	
	initTestValues() {

		this.values = [8, 3, 10, 1, 6, 14, 4, 7, 13, 9, 20, 30];

		const initialValuesLength = this.values.length;

		let j, g;

		j = 0;

		while (j < 2) {
			g = 0;

			while (g < initialValuesLength) {
				this.values.push(((1 + j) * 100) + (this.values[g] + j));
				g += 1;
			}

			j += 1;
		}
	}

	runTests() {

		toBe("", true, true);

		let paths;

		let i = 0;
		while( i < this.values.length ){

			this.instance.insert( this.values[i] );
			
			i += 1;

			paths = treePathData( this.instance.rootNode );

			toBe( "RebBlackTree: Valid nodes color", paths.validRedNodes && paths.validBlackNodes, true );

			if( 2 < i ){
				toBe( "RebBlackTree: Valid height and paths size", paths.maxPathSize <= 2 * paths.minPathSize && paths.maxPathSize <= 2 * Math.log2( i - 1 ), true );
			}
		}

		/*const paths = treePathData( this.instance.rootNode, false );

		if( void 0 === paths.data ){
			console.log( paths );
			console.log( "" );
		}
		else{
			for(let p of paths.data){
				console.log( '[' + p.keys.length + ']' , p.keys.join(" -> "));
			}
			console.log( "" );
		}

		console.log( "Structure size (size - S):", this.instance.length );
		console.log( "Root-to-leaf path maximum height (height - H):", paths.maxPathSize );
		console.log( "Root-to-leaf path minimum height (min path - MP):", paths.minPathSize );
		console.log( "Balanced structure:", paths.validRedNodes && paths.validBlackNodes );
		console.log( "Valid structure height", paths.maxPathSize <= 2 * paths.minPathSize && paths.maxPathSize <= 2 * Math.log2( this.instance.length - 1 ) );

		toBe( "Reb-Black Tree: Valid nodes colors", paths.validRedNodes && paths.validBlackNodes, true );
		toBe( "Reb-Black Tree: Valid height and paths size", paths.maxPathSize <= 2 * paths.minPathSize && paths.maxPathSize <= 2 * Math.log2( this.instance.length - 1 ), true );*/

		/*console.log( "\n1) H <= 2 * MP && H <= 2 * log2( S - 1 )" );
		console.log( "2) " + paths.maxPathSize + " <= 2 * " + paths.minPathSize + " && " + paths.maxPathSize + " <= 2 * log2( " + this.instance.length + " - 1 )" );
		console.log( "3) " + paths.maxPathSize + " <= " + ( 2 * paths.minPathSize ) + " && " + paths.maxPathSize + " <= 2 * log2( " + ( this.instance.length - 1 ) + " )" );
		console.log( "4) " + paths.maxPathSize + " <= " + ( 2 * paths.minPathSize ) + " && " + paths.maxPathSize + " <= 2 * " + Math.log2( this.instance.length - 1 ) );
		console.log( "5) " + paths.maxPathSize + " <= " + ( 2 * paths.minPathSize ) + " && " + paths.maxPathSize + " <= " + ( 2 * Math.log2( this.instance.length - 1 ) ) );
		console.log( "6) " + ( paths.maxPathSize <= ( 2 * paths.minPathSize ) ) + " && " + ( paths.maxPathSize <= ( 2 * Math.log2( this.instance.length - 1 ) ) ) );
		console.log( "7) " + ( ( paths.maxPathSize <= ( 2 * paths.minPathSize ) ) && ( paths.maxPathSize <= ( 2 * Math.log2( this.instance.length - 1 ) ) ) ) );
		console.log( "" );*/
	}
}
