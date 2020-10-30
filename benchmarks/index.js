const Benchmark = require('benchmark');

const operations = require('./helpers/operations.js');
const callbacks = require('./helpers/callbacks.js');

const ds = require("../dist/data-structures.js");

const sizeClass = 13;
const LEN = Math.pow(2, sizeClass) + 1;
const MIDDLE = Math.ceil(LEN / 2);

const suite = new Benchmark.Suite;

// const dslist = Object.keys(ds);
const dslist = [ 'ThreadedBinarySearchTree', 'RightThreadedBinarySearchTree', 'LeftThreadedBinarySearchTree', 'BinarySearchTree', 'BTree', 'RedBlackTree' ];

let str;
let order = 0;

for(let dsitem of dslist){

	order += 1;

	str = dsitem;

	while( 30 > str.length ){
		str += ' ';
	}

	suite.add( order + '. ' + str, () => {
		let ins = ds[dsitem]();
		operations.insert(ins, MIDDLE);
		operations.access(ins, MIDDLE);
		operations.inOrderTraversal(ins);
		operations.inOrderTraversal(ins, true);
		operations.remove(ins, MIDDLE);
		ins.clear();
		ins = void 0;
	});
}

suite.on('start', function() {
	console.log( '----------------' );
	console.log('Data size: ', LEN);
	console.log( '----------------' );
	console.log('Operations:');
	console.log( '' );
	console.log('a. Create data structure');
	console.log('b. Insert data');
	console.log('c. Access data');
	console.log('d. In order data iteration');
	console.log('e. In reverse order data iteration');
	console.log('f. Remove data');
	console.log('g. Destroy data structure');
	console.log( '' );
	console.log( '----------------' );
	console.log('Data structures:');
	console.log( '' );
});

suite.on('complete', callbacks.onComplete );
suite.on('cycle', callbacks.onCycle );
suite.on('error', callbacks.onError );

suite.run({ 'async': true });
