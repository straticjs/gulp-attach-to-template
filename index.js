/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var path = require('path');
var through2 = require('through2');
var gutil = require('gulp-util');

module.exports = function(template, options) {
	if (typeof template !== 'string') throw new Error('template not specified');

	var files = [];
	var templateFile;

	// For each file that comes through, add it to an array
	var stream = through2.obj(function(file, enc, callback) {
		// Check if the file is the template file
		if (file.relative === template) {
			templateFile = file;
		} else {
			files.push(file);
		}

		callback();
	},
	// Wait until all files have come through, then attach the non-template files
	function(callback) {
		// TODO: don't wait until the end. Instead, emit immediately upon finding the template

		if (!templateFile) throw new Error('template not found in stream');

		templateFile.data = templateFile.data || {};

		files.forEach(function(post) {
			var file = templateFile.clone();

			file.data.post = post;
			file.path = post.path;

			this.push(file);
		}, this);

		callback();
	});

	return stream;
};
