var gulp            = require('gulp'),
    jade            = require('gulp-jade'),
    jadeInheritance = require('gulp-jade-inheritance'),
    changed         = require('gulp-changed'),
    compass         = require('gulp-compass'),
    watch           = require('gulp-watch'),
    connect         = require('gulp-connect'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    autoprefixer    = require('gulp-autoprefixer'),
    svgSymbols      = require('gulp-svg-symbols'),
    path = require('path'),
    //svgSprite = require('gulp-svg-sprite'),
    gulp_if         = require('gulp-if'),
    rename          = require('gulp-rename'),
    csso            = require('gulp-csso'),
    rigger          = require('gulp-rigger'),
    del             = require('del'),
    zip             = require('gulp-zip'),
    cached          = require('gulp-cached'),
    filter          = require('gulp-filter'),
    svgmin          = require('gulp-svgmin'),
    cheerio         = require('gulp-cheerio'),
    replace         = require('gulp-replace'),
    plumber         = require('gulp-plumber'),
    uglify          = require('gulp-uglify'),
    prettify        = require('gulp-prettify');

var pkg = require('./package.json');

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 3006,
    logPrefix: "Anton.erof"
};

gulp.task('webserver', function () {
    browserSync(config);
});

var outputDir = 'build/',
    outputImgDir = 'build/images/',
    outputSpriteDir = 'build/images/ico/';

gulp.task('jade', function(){
   gulp.src('src/templates/**/*.jade')
        .pipe(changed(outputDir, {extension: '.html'}))
        .pipe(gulp_if(global.isWatching, cached('jade')))
        .pipe(jadeInheritance({basedir: 'src/templates/'}))
        .pipe(filter(function (file) {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        .pipe(plumber())
        .pipe(jade())
        .on('error', function(err) {
            console.log(err);
            // Would like to catch the error here
        })
        .pipe(prettify({ indent_size: 4, unformatted: [] }))
        .pipe(gulp.dest(outputDir))
        .pipe(reload({stream: true}));
});

gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('css', function() {
    gulp.src('src/sass/main.sass')
        .pipe(plumber())
        .pipe(changed('build/css'))
        .pipe(compass({
            css: 'build/css',
            sass: 'src/sass',
            path: '/',
            image: 'build/images',
            style: 'expanded', // nested, expanded, compact, compressed
            comments: false
        }))
        .on('error', function(err) {
            console.log(err);
            // Would like to catch the error here
        })
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 3 versions', 'ie 10', 'safari 8'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(reload({stream: true}));
});

// gulp.task('css:min', function() {
//     gulp.src('build/css/main.css')
//         .pipe(csso())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest(outputDir + 'css'))
//         .pipe(connect.reload());
// });

gulp.task('sprite', function(){
     gulp.src('src/images/ico/**/*.*')
        .pipe(gulp.dest(outputSpriteDir))
        .pipe(reload({stream: true}))
});

gulp.task('svg', function() {
    return gulp.src('src/svg/sprites/*.svg')
        // minify svg
        .pipe(svgmin(function(file) {
            var name = path.basename(file.relative, path.extname(file.relative))
            var ids = { cleanupIDs: { minify: true, prefix: 'def-' + name + '-' } }
            return { plugins: [ ids ] }
        }))
        // remove all fill and style declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))

        .pipe(svgSymbols({
            id: 'icon-%f',
            className: '.icon-%f',
            svgClassname: 'visually-hidden'
        }))
        //.pipe(gulp_if(/[.]css$/, rename('_symbols.scss')))
        .pipe(gulp_if(/[.]svg$/, gulp.dest('src/svg')))
        .pipe(gulp_if(/[.]scss$/, gulp.dest('src/sass')))

        //.pipe(svgSprite({
            //mode: {
                //symbol: {
                    //sprite: '../svg-symbols.svg',
                    //render: {
                       // scss: {
                            //dest:'../../../src/sass/_symbols.scss',
                            //template: 'src/sass/mixins/_sprite_template.scss'
                        //}
                    //},
                //}
            //}
        //}))
        //.pipe(gulp.dest('src/svg'))

        .pipe(reload({stream: true}));
});

gulp.task('img', function(){
    gulp.src('src/images/**/*.*')
        .pipe(gulp.dest(outputImgDir))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function(){
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest(outputDir + "fonts"))
        .pipe(reload({stream: true}));
});

gulp.task('js', function(){
    gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(reload({stream: true}));
});

// Cжимаем js
gulp.task('js:compress', function() {
  return gulp.src('build/js/main.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(outputDir + 'js'))
    //.pipe(connect.reload());
});

// Если нужно удалить грязную верстку
gulp.task('clean', del.bind(null, 'build'));

// Если нужен архивчик с версткой
gulp.task('archive', function() {
    return gulp.src('build/**/*')
        .pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['setWatch', 'jade'], function() {
    gulp.watch('src/templates/**/*.jade', ['jade']);
    gulp.watch('src/svg/sprites/*.svg', ['svg']);
    gulp.watch('src/images/ico/**/*.*', ['sprite']);
    gulp.watch('src/sass/**/*.sass', ['css']);
    //gulp.watch('build/css/*', ['css:min']);
    gulp.watch('src/images/**/*', ['img']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/fonts/*', ['fonts']);
});

gulp.task('connect', function(){
    connect.server({
        root: [outputDir],
        port: 3000,
        livereload: true
    });
});

gulp.task('default', ['jade', 'svg', 'css', 'sprite', 'fonts', 'img', 'js', 'webserver', 'watch']);
