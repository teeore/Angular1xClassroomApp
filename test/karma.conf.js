
module.exports = function(config) {
    'use strict';

    config.set({
        autoWatch: true,
        basePath: '../',
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'app/scripts/**/*.js',
            'test/spec/**/*.js'
        ],

        browsers: [
            'Chrome_small'
        ],

        reporters: ['mocha'],

        customLaunchers: {
            Chrome_small: {
                base: 'Chrome',
                flags: ['--window-size=600,200']
            }
        },

        // Which plugins to enable
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-mocha-reporter'
        ],

        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO

    });
};
