import { TestBTree } from '../includes/TestBTree.js';
import { TestBTreeBalance } from '../includes/TestBTreeBalance.js';

import { BTree } from '../../src/';
import { BTreeStructure } from '../../lib/structures/BTreeStructure.js';

new TestBTree( BTree );
new TestBTreeBalance( BTreeStructure );