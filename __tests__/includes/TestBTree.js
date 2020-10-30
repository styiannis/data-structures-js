import { toBe } from "./helpers.js";

import { TestBinarySearchTree } from "./TestBinarySearchTree.js";

export class TestBTree extends TestBinarySearchTree {

	constructor(StructureType) {

		if (void 0 === StructureType) {
			return;
		}

		super(StructureType);

		// Re-init instance.
		this.instance = new this.StructureType(6);

		// Re-run tests.
		this.runTests();
	}

	initStructure() {
		this.instance = new this.StructureType();
	}
	initTestValues() {
		this.values = [15, 40, 58, 66, 43, 36, 81, 29, 46, 65,
			47, 7, 12, 86, 89, 31, 52, 87, 27, 78,
			80, 64, 84, 62, 23, 69, 32, 99, 34, 97,
			4, 82, 1, 17, 63, 54, 53];
	}
	runTests() {
		this.testingEmptyStructure();
		this.testingStructureInsertion();
		this.testingStructureRemoval();
		this.testingIterations();
		this.testingInvalidArguments();
		this.testingInvalidStructureInstance();
	}
	testingInvalidStructureInstance() {

		try {
			const invalid_instance = new this.StructureType("invalid_max_nodes_number");
			console.log(invalid_instance);
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}

		try {
			const invalid_instance_2 = new this.StructureType(1);
		}
		catch (err) {
			toBe("", err instanceof RangeError, true);
		}

		try {
			const invalid_instance_2 = new this.StructureType(3.5);
		}
		catch (err) {
			toBe("", err instanceof TypeError, true);
		}
	}
}
