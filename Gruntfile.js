/*jshint globalstrict: true*/ 'use strict';

module.exports = function(grunt) {
  // Initialize Splunk config
  grunt.config.init({
    jshint: {
      files: ['Gruntfile.js', '**/*.js'],
      options: {
        ignores: ['app/templates/**/*', 'node_modules/**/*', 'templates/**/*'],
        globals: {
          console: true,
          module: true,
          require: true,
          process: true,
          Buffer: true,
          __dirname: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};