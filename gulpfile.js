var gulp  = require ('gulp'),
		$ = require("gulp-load-plugins")();

/*活动模板*/
gulp.task('convertJS', function(){
  gulp.src(['assets/javascript/!(*.min).js'])
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(gulp.dest('assets/javascript/'))
});

// 解析css
gulp.task("css",function () {
  gulp.src("assets/stylesheets/*.less")
  .pipe($.less())
 // .pipe(gulp.dest('./template5/assets/stylesheets/'))
  .pipe( $.minifyCss() )
  .pipe($.rename({suffix: '.min'}))   //rename压缩后的文件名
  .pipe( gulp.dest("assets/stylesheets/"))
})
gulp.task("reload",function () {
  gulp.src([
    "assets/stylesheets/*.less",
    "assets/javascript/*.js",
    "*.html"
    ])
  .pipe($.connect.reload())
})
//开启服务器
gulp.task("webserver",function () {
  $.connect.server({
    host: '0.0.0.0',
    port : "7070",
    livereload : true,
    root: "./"
  })
})


// gulp.watch([
//   "assets/stylesheets/*.less",
//   "assets/javascript/*.js",
//   "*.html",
// ],["css", "convertJS", "reload"])
gulp.watch([
  "assets/stylesheets/*.less",
],["css","reload"])//关联文件

gulp.watch([
  "assets/javascript/*.js",
  ],['convertJS',"reload"])//关联文件

gulp.watch([
"*.html",
],["reload"])//关联文件

gulp.task("default",["css","convertJS","webserver"])