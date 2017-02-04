# `gulp-attach-to-template`

[![Greenkeeper badge](https://badges.greenkeeper.io/straticjs/gulp-attach-to-template.svg)](https://greenkeeper.io/)

[gulp][1] plugin to take a stream of Vinyl files and attach them to a template

## Why?

This module is very similar to the excellent [`gulp-apply-template`][2]. It differs in the following ways:

1. It's version is >=1.0.0, so semver is more useful
2. Its usage is simpler
3. It doesn't use [consolidate.js][3] and instead expects you to render templates yourself (this also means it pulls the template from the file stream instead of reading it directly, which is a \[admittedly widespread] [gulp antipattern][4])

These items are a matter of personal preference, to varying degrees. Feel free to use `gulp-apply-template` if you think that style is more readable.

## Installation

    npm install gulp-attach-to-template

## Example

Minimal example:

```js
var gulp = require('gulp');
var attachToTemplate = require('gulp-attach-to-template');
var addsrc = require('gulp-add-src');

gulp.task('template', function() {
	return gulp.src('*.md')
	           .pipe(addsrc('template.jade'))
	           .pipe(attachToTemplate('template.jade'));
});
```

Full example:

```js
var gulp = require('gulp');
var remark = require('gulp-remark');
var remarkHtml = require('remark-html');
var attachToTemplate = require('gulp-attach-to-template');
var addsrc = require('gulp-add-src');
var jade = require('gulp-jade');
var rename = require('gulp-rename');

gulp.task('template', function() {
	return gulp.src('*.md')
	           .pipe(remark().use(remarkHtml))
	           .pipe(addsrc('template.jade'))
	           .pipe(attachToTemplate('template.jade'))
	           .pipe(jade({basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});
```

What's happening here? First we read in some Markdown files from disk and render them to HTML. Then we add `template.jade` into the stream of files. `template.jade` is what will be used for the template.

When we pipe all the files to `attachToTemplate`, we pass it the name of the template file. From there, `gulp-attach-to-template` will output copies of this template, one for each file. The Vinyl file object will be available to the template as the `file` local, and the template copy's `path` will be set to the `path` of its `file` local. (That is, each template copy will inherit the Vinyl path of whatever's attached to it.)

The rest is just standard gulp: we render the Jade, rename the templates to `.html` files, and write to the `dist` directory.

## License

LGPL 3.0+

## Author

Alex Jordan <alex@strugee.net>

 [1]: http://gulpjs.com/
 [2]: https://www.npmjs.com/package/gulp-apply-template/
 [3]: https://github.com/tj/consolidate.js
 [4]: https://github.com/gulpjs/gulp/issues/357
