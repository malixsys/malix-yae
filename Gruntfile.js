'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app/client',
    dist: 'dist'
  };

  var nodemonIgnoredFiles = [
    'README.md',
    'Gruntfile.js',
    '/.git/',
    '/.idea/',
    '/node_modules/',
    '/app/client',
    '/dist/',
    '/test/',
    '/temp/',
    '/.tmp',
    '/.sass-cache',
    '*.txt',
    '*.jade'
  ];

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    open: {
      server: {
        url: 'http://localhost:8080'
      }
    }  ,
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: ['development'],
          watchedExtensions: [
            'js',
            'coffee'
          ],
          // nodemon watches the current directory recursively by default
          // watchedFolders: ['.'],
          debug: false,
          delayTime: 1,
          ignoredFiles: nodemonIgnoredFiles
        }
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'nodemon:dev',
    'open'
  ]);

  grunt.registerTask('default', ['server']);
};
