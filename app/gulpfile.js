const gulp = require('gulp'),
    del = require('del');

gulp.task('default',  gulp.series(clean, copyIndex, copyAppJs, watchAppJs));

function clean (done) {
    gulp.src('./client/index.html')
        .pipe(gulp.dest('./dist',
            {overwrite: true})
        );
    done();
}

function copyIndex(done) {
    gulp.src('./client/index.html').pipe(gulp.dest('./dist',
        {overwrite: true}));
    done();
}

function copyAppJs (done) {
    gulp.src('./client/**/*.js')
        .pipe(gulp.dest('./dist',
            {overwrite: true})
    );
    done();
}

function watchAppJs(done) {
    return gulp.watch('./client/**/*.*', gulp.series(clean, copyIndex, copyAppJs, copyVendor));
}
gulp.task('watch', gulp.series(watchAppJs));

function copyVendor(done) {
    var vendor_files = ['./node_modules/angular/angular.js'];
    return gulp.src(vendor_files, {base: './node_modules'}).pipe(gulp.dest('./dist/vendor', {overwrite: true}));
    done();
}