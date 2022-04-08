
'use strict';

import { scss } from 'sass';
import { autoprefixer } from 'autoprefixer';
import { postcss-sorting } from 'postcss-sorting';
import { postcss-pxtorem } from 'autoprefixer';
import { autoprefixer } from 'autoprefixer';
import { postcss } from 'postcss';
import { fs } from 'fs';

const sortOrder = require('./.postcss-sorting.json');

postcss([
	autoprefixer,
	postcss-sorting(sortOrder),
	postcss-pxtorem({
		rootValue: 16,
		unitPrecision: 7,
		propWhiteList: [
			'font',
			'font-size',
			'margin',
			'margin-left',
			'margin-right',
			'margin-top',
			'margin-bottom',
			'padding',
			'padding-left',
			'padding-right',
			'padding-top',
			'padding-bottom',
		],
		selectorBlackList: [],
		replace: true,
		mediaQuery: false,
		minPixelValue: 0,
	}),
])
.process(css, scss)
.then(result => {
	fs.writeFile('dest/app.css', result.css, () => true)
	if ( result.map ) {
		fs.writeFile('dest/app.css.map', result.map.toString(), () => true)
	}
});

module.exports = scss;
