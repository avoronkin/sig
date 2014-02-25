var path = require('path');
var express = require('express');
var tinylr = require('tiny-lr');
var gutil = require('gulp-util');

module.exports = function (port, lrport) {
    var lr = tinylr();
    lr.listen(lrport);

    var app = express();
    app.use(express.static(path.resolve('./')));
    app.listen(port);

    gutil.log('Listening on', port + ' / ' + lrport);

    return {
        lr: lr,
        app: app
    };
};
