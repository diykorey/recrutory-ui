var path    = require('path'),
    fs      = require('fs'  ),
    url     = require('url' ),
    sass    = require('node-sass'),
    postcss = require('postcss'  ),
    chalk   = require('chalk');

prefixer = postcss([ require('autoprefixer')({ browsers: ['last 3 versions'] }) ]);

var urlTest  = /^((?:\/[a-z0-9\-\._]+)+)\.css$/i,
    sassTest = /.(scss|sass)$/i,
    extLessTest = /^\/?[\w\-\_]*(\/[\w\-\_]*)*([\?#].+){0,1}$/i;

function normalizePath(root, extension, filePath) {
    if (!urlTest.test(filePath)) return void 0;

    filePath = filePath.replace(urlTest, "$1." + extension);
    filePath = path.join(root, filePath);
    filePath = path.normalize(filePath);

    return filePath;
}

function respondError(response, file, error) {
    error.message.split('\n').forEach(function(error, index) {
        console.log('[' + chalk.red.bold('ER') + '] ' + (file ? file : 'CSS') + ': ' + error);
    });

    response.statusCode = 500;
    response.end();
}

function doAutoprefixer(response, data, file, callback) {
    prefixer.process(data.css || data).then(function(result) {
        callback(null, result.css);
    });
}

function doSass(pathname, callback) {
    var includes = [
        path.join(__dirname, '..', 'content', 'styles'),
        path.join(__dirname, '..', 'bower_components')
    ];

    sass.render({ file: pathname, includePaths: includes }, callback);
}

var finders = [
    normalizePath.bind(null, 'content', 'scss'),
    normalizePath.bind(null, 'content', 'sass'),
    normalizePath.bind(null, 'content', 'css'),
    normalizePath.bind(null, 'bower_components', 'scss'),
    normalizePath.bind(null, 'bower_components', 'sass'),
    normalizePath.bind(null, 'bower_components', 'css'),
];

exports.css = function(request, response, next) {
    var pathname = url.parse(request.url).pathname;

    var found = finders.map(function(finder) { return finder(pathname); })
                       .map(function(path) { return fs.existsSync(path) ? path : undefined })
                       .filter(function(path) { return path && path.length; });

    if (!found.length) return next();

    var foundFile = found[0];

    var processAndServe = function(error, result) {
        if (error) return respondError(response, foundFile, error);

        doAutoprefixer(response, result, foundFile, function(error, result) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/css');
            response.write(result);
            response.end();
        });
    };

    if (sassTest.test(foundFile)) {
        return doSass(foundFile, processAndServe);
    }

    fs.readFile(foundFile, processAndServe);
};


exports.extLess = function(request, response, next) {
    if (extLessTest.test(request.url)) request.url = '/index.html';

    next();
};
