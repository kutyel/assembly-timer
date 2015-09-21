module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'js/**/*.js',
        'test/**/*.coffee'
    ],

    exclude: [
    ],

    preprocessors: {
        '**/*.coffee': ['coffee']
    },

    coffeePreprocessor: {
        options: {
            bare: true,
            sourceMap: false
        },
        transformPath: function(path){
            return path.replace(/\.coffee$/, '.js')
        }
    },

    reporters: ['progress', 'html'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    plugins: [
        'karma-coffee-preprocessor',
        'karma-jasmine-html-reporter',
        'karma-chrome-launcher',
        'karma-jasmine'
    ]
  })
}
