function insert( instance, middleKey ){
	let i = middleKey;
	let counter = 0;
	while (i >= 1) {
		instance.set(middleKey - counter, (middleKey + counter).toString());
		if (counter) {
			instance.set(middleKey + counter, (middleKey + counter).toString());
		}
		counter += 1;
		i -= 1;
	}
}

function access( instance, middleKey ){
	let i = middleKey;
	let counter = 0;
	while (i >= 1) {
		instance.get(middleKey - counter);
		if (counter) {
			instance.get(middleKey + counter);
		}
		counter += 1;
		i -= 1;
	}
}

function remove( instance, middleKey ){
	let i = middleKey;
	let counter = 0;
	while (i >= 1) {
		instance.delete(middleKey - counter);
		if (counter) {
			instance.delete(middleKey + counter);
		}
		counter += 1;
		i -= 1;
	}
}

function inOrderTraversal( instance, reversed ){
	instance.forEach( (key, val) => key - 1, reversed);
}

module.exports = { insert, access, remove, inOrderTraversal };