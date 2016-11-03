# `stratic-posts-to-post-pages`

[Gulp][1] plugin to take a stream of Stratic posts and attach them to a post page template

## Installation

    npm install stratic-posts-to-post-pages

## Example

Minimal example:

```js
var gulp = require('gulp');
var parseStratic = require('stratic-parse-header');
var straticPostsToPostPages = require('stratic-posts-to-post-pages');
var addsrc = require('gulp-add-src');

gulp.task('posts', function() {
	return gulp.src(*.md')
	           .pipe(parseStratic())
	           .pipe(addsrc('post.jade'))
	           .pipe(postsToPostPages('post.jade'))
});
```

Full example:

```js
var gulp = require('gulp');
var remark = require('gulp-remark');
var remarkHtml = require('remark-html');
var parseStratic = require('stratic-parse-header');
var straticPostsToPostPages = require('stratic-posts-to-post-pages');
var addsrc = require('gulp-add-src');
var jade = require('gulp-jade');

gulp.task('posts', function() {
	return gulp.src(*.md')
	           .pipe(parseStratic())
	           .pipe(remark().use(remarkHtml))
	           .pipe(addsrc('post.jade'))
	           .pipe(postsToPostPages('post.jade'))
	           .pipe(jade({basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});
```

What's happening here? First we read in the Stratic posts from disk and render them as Markdown. Then we add `post.jade` into the stream of files. `post.jade` is what will be used for the template.

When we pipe all the files to `postsToPostPages`, we pass it the name of the template file. From there, `stratic-posts-to-post-pages` will output copies of this template, one for each post. The post object will be available to the template as the `post` local.

The rest is just standard Gulp: we render the Jade, rename the templates to `.html` files, and write to the `dist` directory.

## License

LGPL 3.0+

## Author

Alex Jordan <alex@strugee.net>

 [1]: http://gulpjs.com/
 [2]: https://github.com/strugee/generator-stratic
