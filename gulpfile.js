const del = require(`del`);
const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const mqpacker = require(`css-mqpacker`);
const minify = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const svgstore = require(`gulp-svgstore`);
const rollup = require(`gulp-better-rollup`);
const sourcemaps = require(`gulp-sourcemaps`);
const mocha = require(`gulp-mocha`); // Добавим установленный gulp-mocha плагин
const babel = require(`rollup-plugin-babel`); // Добавим  в сборщик зависимостей Rollup плагин транспайлера babel
const noderesolve = require(`rollup-plugin-node-resolve`); // Позволяет загружать сторонние модули из node_modules в проект
const commonjs = require(`rollup-plugin-commonjs`); // Обеспечивает поддержку подключения CommonJS-модулей
const uglify = require(`gulp-uglify`);

gulp.task(`style`, () => {
  return gulp.src(`sass/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          `last 1 version`,
          `last 2 Chrome versions`,
          `last 2 Firefox versions`,
          `last 2 Opera versions`,
          `last 2 Edge versions`
        ]
      }),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest(`build/css`))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest(`build/css`));
});

gulp.task(`sprite`, () => {
  return gulp.src(`img/sprite/*.svg`)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`scripts`, () => {
  return gulp.src(`js/main.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    // Чтобы Rollup.js при сборке использовал Babel: В вызов метода rollup передаем объект с настройками,
    // где в массив plugins будет записан вызов babel с нужными параметрами
    .pipe(rollup({
      plugins: [
        // resolve node_modules
        noderesolve({browser: true}),
        // resolve commonjs imports
        commonjs(),
        // use babel to transpile into ES5
        babel({
          babelrc: false,
          exclude: `node_modules/**`,
          presets: [`@babel/env`]
        })
      ]
    }, `iife`))
    .pipe(uglify())
    .pipe(sourcemaps.write(``))
    .pipe(gulp.dest(`build/js`));
});

gulp.task(`clean`, () => {
  return del(`build`);
});

gulp.task(`copy-html`, () => {
  return gulp.src(`*.{html,ico}`)
    .pipe(gulp.dest(`build`))
    .pipe(server.stream());
});

gulp.task(`copy`, gulp.parallel(`copy-html`, `scripts`, `style`, `sprite`, () => {
  return gulp.src([
    `fonts/**/*.{woff,woff2}`,
    `img/*.*`
  ], {base: `.`})
    .pipe(gulp.dest(`build`));
}));

gulp.task(`assemble`, gulp.series(`clean`, `copy`)); // `style` ???

gulp.task(`imagemin`, gulp.series(`copy`, () => {
  return gulp.src(`build/img/**/*.{jpg,png,gif}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest(`build/img`));
}));

gulp.task(`js-watch`, gulp.series(`scripts`, (done) => {
  server.reload();
  done();
}));

gulp.task(`serve`, gulp.series(`assemble`, () => {
  server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch(`sass/**/*.{scss,sass}`, gulp.series(`style`));
  gulp.watch(`*.html`, gulp.series(`copy-html`));
  gulp.watch(`js/**/*.js`, gulp.series(`js-watch`));
}));

gulp.task(`build`, gulp.series(`assemble`, `imagemin`));

gulp.task(`test`, () => {
  return gulp
    .src([`js/**/*.test.js`], {read: false})
    .pipe(mocha({
      require: [
        `babel-core/register`,
        `jsdom-global/register` // npm i -DE jsdom jsdom-global // mocha -r jsdom-global/register
      ],
      reporter: `spec` // Вид в котором я хочу отображать результаты тестирования - варианты: 'list', json` и т.д - https://github.com/mochajs/mocha/tree/master/lib/reporters
    }));
});
