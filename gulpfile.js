const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");
const browserSync = require("browser-sync").create();
const svgmin = require("gulp-svgmin");
const htmlmin = require("gulp-htmlmin");

function compilescss() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function copyFonts() {
  return src("src/fonts/*.{woff,woff2}").pipe(dest("dist/fonts"));
}

function optimizeimg() {
  return src("src/images/*.{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"));
}

function webpImage() {
  return src("dist/images/*.{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

function jsmin() {
  return src("src/js/*.js")
    .pipe(terser())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

function svgMinify() {
  return src("src/images/icons/*.svg")
    .pipe(svgmin())
    .pipe(dest("dist/images/icons"));
}

function htmlCopy() {
  return src("*.html").pipe(dest("dist/"));
}

function watchTask() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  watch("src/scss/**/*.scss", compilescss);
  watch("src/js/*.js", jsmin);
  watch("src/images/*", optimizeimg);
  watch("dist/images/*.{jpg,png}", webpImage);
  watch("*.html", htmlCopy);
}

exports.default = series(
  compilescss,
  jsmin,
  optimizeimg,
  copyFonts,
  webpImage,
  svgMinify,
  watchTask,
  htmlCopy
);
