'use strict'

var jsdoc2md = require('jsdoc-to-markdown');
var fs = require('fs');
var path = require('path');

var OUTPUT_DIR = path.resolve('./wiki');

var doc2mdTmpl = {
	methodsIndex: "{{#orphans ~}}{{>member-index~}}{{/orphans~}}",
	methods: "{{#orphans ~}}{{>members~}}{{/orphans~}}",
};

var doc2mdPlugins = ['dmd-readable'];

/* ################################################## */
/* ################################################## */

function seperator(){
	return "\n***\n";
}

function navigation( ds ){
	return ">\n[Data structures](./Home.md) / [" + ds.title + "](./" + ds.structure + ".md)\n***\n";
}

function title( ds ){
	return "# " + ds.title + "\n";
}

function tableOfContents(ds){

	var output = "\n## Table of contents\n\n";

	output += "- [Import](#import)\n";
	output += "- API\n";
	output += "\t- [Constructor](#constructor)\n";
	output += "\t- [Methods](#methods)\n";
	output += "- [Sources](#sources)\n";

	return output;
}

function imports(ds){

	var output = "\n## Import\n\n";

	output += "\n**As a CommonJS module**\n\n";

	output += "```js\n";
	output += "const { " + ds.structure + " } = require('@styiannis/data-structures');\n";
	output += "```\n\n";

	output += "\n**As an ES module**\n\n";

	output += "```js\n";
	output += "import { " + ds.structure + " } from '@styiannis/data-structures');\n";
	output += "\n// or\n\n";
	output += "import " + ds.structure + " from '@styiannis/data-structures/src/" + ds.structure + "');\n";
	output += "```\n\n";

	return output;
}

function constructor(ds){

	var dsConstructor = dataStructureConstructor(ds.file);

	var output = jsdoc2md.renderSync({
		data: [ dsConstructor.class, dsConstructor.constructor ],
		template: doc2mdTmpl.methods,
		plugin: doc2mdPlugins,
	});

	output = output.replace('<br>', '');

	output = "\n## Constructor\n\n" + output;

	return output;
}

function methodsIndex(ds){

	var dsMethods = dataStructureMethods(ds.file);
	var implMethods = dataStructureImplMethods(ds.implFile);

	var tmpldata = [];

	dsMethods.class.order = 0;
	tmpldata.push(dsMethods.class);

	var nextOrder = tmpldata.length;

	var regxp = new RegExp(ds.impl, "g");

	var field;

	for (var fid in implMethods) {

		field = implMethods[fid];

		field.id = field.id.replace(regxp, ds.structure);
		field.longname = field.longname.replace(regxp, ds.structure);
		field.memberof = field.memberof.replace(regxp, ds.structure);
		field.order = nextOrder;

		tmpldata.push(field);

		nextOrder = nextOrder + 1;
	}

	var output = jsdoc2md.renderSync({
		data: tmpldata,
		template: doc2mdTmpl.methodsIndex,
		plugin: doc2mdPlugins,
	});

	var lines = output.trim().split('\n');
	
	var res = '';

	var i =0;
	while( i < lines.length ){
		
		if(0<i){	// Removes first line.
			res += lines[i].trim() + "\n";
		}

		i += 1;
	}

	res = "\n## Methods\n\n" + res;

	return res;
}

function methods(ds) {

	var dsMethods = dataStructureMethods(ds.file);
	var implMethods = dataStructureImplMethods(ds.implFile);

	var tmpldata = [];

	dsMethods.class.order = 0;
	tmpldata.push(dsMethods.class);

	dsMethods.constructor.order = 1;
	tmpldata.push(dsMethods.constructor);

	var nextOrder = 2;

	var regxp = new RegExp(ds.impl, "g");

	var field;

	for (var fid in implMethods) {

		field = implMethods[fid];

		field.id = field.id.replace(regxp, ds.structure);
		field.longname = field.longname.replace(regxp, ds.structure);
		field.memberof = field.memberof.replace(regxp, ds.structure);
		field.order = nextOrder;

		tmpldata.push(field);

		nextOrder = nextOrder + 1;
	}

	var output = jsdoc2md.renderSync({
		data: tmpldata,
		template: doc2mdTmpl.methods,
		plugin: doc2mdPlugins,
	});

	output = output.replace(/\<br\>/g, '\n***\n');
	output = output.replace(/st\./g, ds.objname + '.' );

	regxp = new RegExp( "### " + ds.structure + ".", "ig");
	output = output.replace( regxp, "### ." )

	regxp = new RegExp( "st =", "g");
	output = output.replace( regxp, ds.objname + " =" );

	regxp = new RegExp( "" + ds.impl + "\\(", "g");
	output = output.replace( regxp, ds.structure + "(" );

	regxp = new RegExp( "instance, Iterator, ReverseIterator", "g");
	output = output.replace( regxp, "" );

	return output;
}

function sources(ds){

	var output = "\n## Sources\n\n";

	let i = 0;
	while( i < ds.sources.length ){
		output += "- [" + ds.sources[i].label + "](" + ds.sources[i].link_href + ")\n";

		i += 1;
	}

	return output;
}

/* ################################################## */
/* ################################################## */

function dataStructureConstructor(inputFile) {

	var fields = {};

	var templateData = jsdoc2md.getTemplateDataSync({ files: inputFile });

	for (var td of templateData) {

		if ( 'constructor' === td.kind || 'class' === td.kind ) {
			fields[td.kind] = td;
		}
	}

	return fields;
}

function dataStructureMethods(inputFile) {

	var fields = {};

	var templateData = jsdoc2md.getTemplateDataSync({ files: inputFile });

	for (var td of templateData) {

		if ( 'class' === td.kind ) {
			fields[td.kind] = td;
		}
	}

	return fields;
}

function dataStructureImplMethods(inputFile) {

	var instanceFields = {};

	var templateData = jsdoc2md.getTemplateDataSync({ files: inputFile });

	for (var td of templateData) {

		if ('constructor' !== td.kind && 'class' !== td.kind && 'inner' !== td.scope) {

			if ('instance' === td.scope) {
				instanceFields[td.id] = td;
			}
		}
	}

	return instanceFields;
}

function generateDataStructureWiki(ds) {

	var output =
		navigation( ds ) +
		title( ds ) +
		tableOfContents( ds ) +
		seperator() + 
		imports(ds) + 
		seperator() + 
		constructor(ds) + 
		seperator() + 
		methodsIndex(ds) +
		methods(ds) + 
		seperator() + 
		sources(ds);

	fs.writeFileSync(path.resolve(OUTPUT_DIR, ds.structure + '.md'), output);
}

function generateIndexWiki(ds) {
	
	var output = "# Data structures\n\n";

	var i;

	for (var g in ds) {

		if (ds.hasOwnProperty(g)) {

			output += "## " + g + "\n\n";

			i = 0;
			while( i < ds[g].length ){
				output += "- [" + ds[g][i].title + "](./" + ds[g][i].structure + ".md)\n";
				i += 1;
			}
			
			output += "\n\n";
		}
	}

	output += "***\n\
	\n## Sources\n\
	\n- [Data structure (*Wikipedia link*)](https://en.wikipedia.org/wiki/Data_structure)\
	\n- [Tree data structure (*Wikipedia link*)](https://en.wikipedia.org/wiki/Tree_(data_structure))\
	\n- [Binary tree (*Wikipedia link*)](https://en.wikipedia.org/wiki/Binary_tree)\n";

	fs.writeFileSync(path.resolve(OUTPUT_DIR, 'Home.md'), output);
}

function generateWiki() {

	var data_structures = {
		'B trees': [
			{
				title: 'B-Tree',
				structure: 'BTree',
				file: path.resolve('src/BTree.js'),
				impl: 'SearchTree',
				implFile: path.resolve('src/includes/SearchTree.js'),
				objname: 'bt',
				sources:[
					{
						label: '**B-Tree** (*Wikipedia link*)',
						link_href: 'https://en.wikipedia.org/wiki/B-tree',
					},
					/*{
						label: '**2–3 tree** (*Wikipedia link*)',
						link_href: 'https://en.wikipedia.org/wiki/2%E2%80%933_tree',
					},
					{
						label: '**2–3-4 tree** (*Wikipedia link*)',
						link_href: 'https://en.wikipedia.org/wiki/2%E2%80%933%E2%80%934_tree',
					},*/
				],
			},
		],
		'Binary search trees': [
			{
				title: 'Red Black Tree',
				structure: 'RedBlackTree',
				file: path.resolve('src/RedBlackTree.js'),
				impl: 'SearchTree',
				implFile: path.resolve('src/includes/SearchTree.js'),
				objname: 'rbt',
				sources: [
					{
						label: '**Red-Black Tree** (*Wikipedia link*)',
						link_href: 'https://en.wikipedia.org/wiki/Red%E2%80%93black_tree',
					},
				],
			},
			{
				title: 'Binary Search Tree',
				structure: 'BinarySearchTree',
				file: path.resolve('src/BinarySearchTree.js'),
				impl: 'SearchTree',
				implFile: path.resolve('src/includes/SearchTree.js'),
				objname: 'bst',
				sources:[
					{
						label: '**Binary Search Tree** (*Wikipedia link*)',
						link_href: 'https://en.wikipedia.org/wiki/Binary_search_tree',
					},
				],
			},
			{
				title: 'Threaded Binary Search Tree',
				structure: 'ThreadedBinarySearchTree',
				file: path.resolve('src/ThreadedBinarySearchTree.js'),
				impl: 'SearchTree',
				implFile: path.resolve('src/includes/SearchTree.js'),
				objname: 'tbst',
				sources: [
					{
						label: '**Threaded Binary Tree** (*Wikipedia link*)',
						link_href: 'https://en.wikipedia.org/wiki/Threaded_binary_tree',
					},
				],
			},
			{
				title: 'Right Threaded Binary Search Tree',
				structure: 'RightThreadedBinarySearchTree',
				file: path.resolve('src/RightThreadedBinarySearchTree.js'),
				impl: 'SearchTree',
				implFile: path.resolve('src/includes/SearchTree.js'),
				objname: 'rtbst',
				sources: [
					{
						label: '**Threaded Binary Tree** (*Wikipedia link*)',
						link_href: 'https://en.wikipedia.org/wiki/Threaded_binary_tree',
					},
				],
			},
			{
				title: 'Left Threaded Binary Search Tree',
				structure: 'LeftThreadedBinarySearchTree',
				file: path.resolve('src/LeftThreadedBinarySearchTree.js'),
				impl: 'SearchTree',
				implFile: path.resolve('src/includes/SearchTree.js'),
				objname: 'ltbst',
				sources: [
					{
						label: '**Threaded Binary Tree** (*Wikipedia link*)',
						link_href: 'https://en.wikipedia.org/wiki/Threaded_binary_tree',
					},
				],
			},
		],
	};

	var i;

	for (var g in data_structures) {

		if (data_structures.hasOwnProperty(g)) {
			
			i = 0;
			while( i < data_structures[g].length ){
				generateDataStructureWiki(data_structures[g][i], data_structures[g][i].structure, data_structures[g][i].title, data_structures[g][i].file, data_structures[g][i].impl, data_structures[g][i].implFile)
				i += 1;
			}

		}
	}

	generateIndexWiki(data_structures);
}

generateWiki();
