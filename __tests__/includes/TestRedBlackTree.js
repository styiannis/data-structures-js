import { toBe } from "./helpers.js";

import { TestBinarySearchTree } from './TestBinarySearchTree.js';

export class TestRedBlackTree extends TestBinarySearchTree{
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
}
