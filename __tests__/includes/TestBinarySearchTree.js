import { toBe, quickSort } from "./helpers.js";

export class TestBinarySearchTree {

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
		this.values = [8, 3, 10, 1, 6, 15, 4, 5, 7, 13, 14, 50, 20];
	}

	runTests() {
		this.testingEmptyStructure();
		this.testingStructureInsertion();
		this.testingStructureRemoval();
		this.testingIterations();
		this.testingInvalidArguments();
	}

	testingEmptyStructure() {
		this.resetStructure();
		this.validateEmptyStructure();
		this.validateUndefinedValues();
		this.validateUndefinedKeyRemoval();
	}

	testingStructureInsertion() {

		this.resetStructure();

		this.validateValuesInsertion();

		this.validateFullStructure();
		this.validateUndefinedValues();
		this.validateKeyValueUpdate();
		
		this.resetStructure();

		this.validateValuesInsertion(true);
		this.validateFullStructure();
		this.validateUndefinedValues();
		this.validateKeyValueUpdate();

		this.resetStructure();
	}

	testingStructureRemoval() {

		this.resetStructure();

		this.fillStructure();

		this.validateUndefinedKeyRemoval();
		this.validateKeyRemoval();

		this.fillStructure();
		this.validateKeyRemoval(true);

		this.fillStructure();
		this.validateKeyMixedRemoval();

		this.fillStructure();
		this.validateKeyMixedRemoval(true);
	}

	testingIterations() {

		this.resetStructure();

		this.fillStructure();

		const sortedValues = quickSort([...this.values]);
		const reversedSortedValues = [...sortedValues].reverse();

		const that = this;

		let keysIter;
		let valuesIter;
		let entriesIter;
		let nextKey;
		let nextValue;
		let nextEntry;
		let entry;
		let i;

		// In order.

		keysIter = this.instance.keys();
		valuesIter = this.instance.values();
		entriesIter = this.instance.entries();

		nextKey = keysIter.next();
		nextValue = valuesIter.next();
		nextEntry = entriesIter.next();

		i = 0;

		this.instance.forEach(function (k, v) {

			entry = this.instance.at(i);

			toBe("", nextKey.done, false);
			toBe("", nextValue.done, false);
			toBe("", nextEntry.done, false);

			toBe("", k, sortedValues[i]);
			toBe("", v, sortedValues[i].toString());

			toBe("", nextKey.value, k);
			toBe("", nextValue.value, v);
			toBe("", nextEntry.value[0], k);
			toBe("", nextEntry.value[1], v);
			toBe("", entry[0], k);
			toBe("", entry[1], v);

			i += 1;

			nextKey = keysIter.next();
			nextValue = valuesIter.next();
			nextEntry = entriesIter.next();

		}, false, this);

		toBe("", nextKey.done, true);
		toBe("", nextValue.done, true);
		toBe("", nextEntry.done, true);

		toBe("", nextKey.value, void 0);
		toBe("", nextValue.value, void 0);
		toBe("", nextEntry.value, void 0);

		toBe("", i, sortedValues.length);

		// In reverse order.

		keysIter = this.instance.keys(true);
		valuesIter = this.instance.values(true);
		entriesIter = this.instance.entries(true);

		nextKey = keysIter.next();
		nextValue = valuesIter.next();
		nextEntry = entriesIter.next();

		i = 0;

		this.instance.forEach(function (k, v) {

			toBe("", nextKey.done, false);
			toBe("", nextValue.done, false);
			toBe("", nextEntry.done, false);

			toBe("", k, reversedSortedValues[i]);
			toBe("", v, reversedSortedValues[i].toString());

			toBe("", nextKey.value, k);
			toBe("", nextValue.value, v);
			toBe("", nextEntry.value[0], k);
			toBe("", nextEntry.value[1], v);

			i += 1;

			nextKey = keysIter.next();
			nextValue = valuesIter.next();
			nextEntry = entriesIter.next();

		}, true, this);

		toBe("", nextKey.done, true);
		toBe("", nextValue.done, true);
		toBe("", nextEntry.done, true);

		toBe("", nextKey.value, void 0);
		toBe("", nextValue.value, void 0);
		toBe("", nextEntry.value, void 0);

		toBe("", i, reversedSortedValues.length);

		this.instance.forEach(function (k, v) {
			toBe("", this === that, false);
		});

		this.resetStructure();

		// Iterations on empty structure.

		keysIter = this.instance.keys();
		toBe("", keysIter.next().done, true);

		valuesIter = this.instance.keys();
		toBe("", valuesIter.next().done, true);

		entriesIter = this.instance.keys();
		toBe("", entriesIter.next().done, true);

		i = 0;
		
		this.instance.forEach(function (k, v) {
			i += 1;
		});

		toBe("", i, 0);

		// Iterations on empty structure.

		keysIter = this.instance.keys(true);
		toBe("", keysIter.next().done, true);

		valuesIter = this.instance.keys();
		toBe("", valuesIter.next().done, true);

		entriesIter = this.instance.keys();
		toBe("", entriesIter.next().done, true);

		i = 0;
		
		this.instance.forEach(function (k, v) {
			i += 1;
		});

		toBe("", i, 0);
	}

	testingInvalidArguments() {

		this.resetStructure();

		this.fillStructure();

		try {
			this.instance.set("invalid_key");
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.get("invalid_key");
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.has("invalid_key");
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.delete("invalid_key");
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.at("invalid_key");
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.at(-1);
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.at(this.values.length);
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.at(Infinity);
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.at(-Infinity);
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.forEach("invalid_callback_function");
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			this.instance.forEach();
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		this.resetStructure();
	}

	fillStructure(inReverseOrder) {

		let i;

		if (!!inReverseOrder) {

			i = this.values.length - 1;

			while (i >= 0) {
				this.instance.set(this.values[i], this.values[i].toString());
				i -= 1;
			}
		}
		else {

			i = 0;

			while (i < this.values.length) {
				this.instance.set(this.values[i], this.values[i].toString());
				i += 1;
			}
		}
	}

	resetStructure() {
		toBe("", this.instance.clear(), void 0);
	}

	validateFullStructure() {
		toBe("", this.instance.isEmpty(), false);
		toBe("", this.instance.size(), this.values.length);
	}

	validateEmptyStructure() {
		toBe("", this.instance.isEmpty(), true);
		toBe("", this.instance.size(), 0);
	}

	validateUndefinedValues() {
		toBe("", this.instance.get(Number.MIN_SAFE_INTEGER), void 0);
		toBe("", this.instance.has(Number.MAX_SAFE_INTEGER), false);
	}
	
	validateUndefinedKeyRemoval() {
		toBe("", this.instance.delete(Number.MIN_SAFE_INTEGER), false);
		toBe("", this.instance.delete(Number.MAX_SAFE_INTEGER), false);
	}

	validateValuesInsertion(inReverseOrder) {

		let i;

		if (!!inReverseOrder) {

			i = this.values.length - 1;
			while (0 <= i) {
				toBe("", this.instance.set(this.values[i], this.values[i]), void 0);
				toBe("", this.instance.get(this.values[i]), this.values[i]);
				toBe("", this.instance.size(), this.values.length - i);
				i -= 1;
			}
		}
		else {

			i = 0;
			while (i < this.values.length) {
				toBe("", this.instance.set(this.values[i], this.values[i]), void 0);
				toBe("", this.instance.get(this.values[i]), this.values[i]);
				toBe("", this.instance.size(), i + 1);
				i += 1;
			}
		}
	}

	validateKeyValueUpdate() {
		
		const prevValue = this.instance.get( this.values[this.values.length - 1] );
		const newValue = prevValue + "_UPDATED";
		
		this.instance.set(this.values[this.values.length - 1], newValue);

		toBe("", this.instance.get( this.values[this.values.length - 1] ) === newValue, true);
	}

	validateKeyRemoval(inReverseOrder) {

		let i;

		if (!!inReverseOrder) {

			i = this.values.length - 1;

			while (0 <= i) {
				toBe("", this.instance.delete(this.values[i]), true);
				toBe("", this.instance.get(this.values[i]), void 0);
				toBe("", this.instance.size(), i);
				i -= 1;
			}
		}
		else {

			i = 0;

			while (i < this.values.length) {
				toBe("", this.instance.delete(this.values[i]), true);
				toBe("", this.instance.get(this.values[i]), void 0);
				toBe("", this.instance.size(), this.values.length - (i + 1));
				i += 1;
			}
		}
	}

	validateKeyMixedRemoval(inReverseOrder) {

		const vals = this.values.slice(0);

		let val;
		let i = 0;

		if (!!inReverseOrder) {

			while (vals.length) {

				if (i % 2) {
					val = vals.pop();
				}
				else {
					val = vals.shift();
				}

				toBe("", this.instance.delete(val), true);
				toBe("", this.instance.get(val), void 0);
				toBe("", this.instance.size(), this.values.length - (i + 1));

				i += 1;
			}
		}
		else {

			while (vals.length) {

				if (i % 2) {
					val = vals.shift();
				}
				else {
					val = vals.pop();
				}

				toBe("", this.instance.delete(val), true);
				toBe("", this.instance.get(val), void 0);
				toBe("", this.instance.size(), this.values.length - (i + 1));

				i += 1;
			}
		}
	}
}
