const onCycle = function(event) {
	console.log( String(event.target) );
};

const onError = function(event) {
	throw new Error(event.target.error);
};

const onComplete = function() {

	const names = this.filter('fastest').map('name');
	
	let i = 0;
	while( i < names.length ){
		names[i] = names[i].trim();
		i += 1;
	}
	
	const res = names.join(', ');

	console.log( '' );
	console.log( '----------------' );
	console.log('Fastest data structure => ' + res );
	console.log( '----------------' );
};

module.exports = { onComplete, onCycle, onError };