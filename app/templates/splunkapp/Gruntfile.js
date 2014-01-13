/*jshint globalstrict: true*/ 'use strict';

var configuration = require('grunt-splunk/lib/configuration'),
    splunkEnvironment = require('grunt-splunk/lib/environment'),
    splunkWatchConfig = require('grunt-splunk/lib/watchConfig'),
    path = require('path');

module.exports = function(grunt) {
  // Verify environment
  if (!splunkEnvironment.splunkHome()) {
    grunt.fail.fatal('Could not locate splunk home directory');
  }

  // Verify configuration
  var splunkConfig = configuration.get();
  if (!splunkConfig) {
    grunt.fail.fatal(
      'Could not load configuration for current Splunk instance. Use `splunkdev configure`.' +
      'If `splunkdev` is not available install it with `npm install -g splunkdev`.');
  }

  // Set splunk application
  splunkConfig.splunkApp = '<%= appname %>';

  // Specify config for splunk-pack task
  splunkConfig.pack = {
    sourceDir: __dirname,
    output: path.join(__dirname, (splunkConfig.splunkApp + '.tar.gz')),
    source: [
      '**/*',
      '!*.tar.gz'
    ]
  };

  // Watch config. Launch jshint for all changed JS files
  var watchConfig = {
    js: {
      files: ['<%= "<" + "%= jshint.files %" + ">" %>'],
      tasks: ['jshint']
    }
  };

  // Add watch configuration for splunk app (reload splunk)
  watchConfig = splunkWatchConfig.watchForApp(watchConfig, splunkConfig.splunkApp);

  // Initialize Splunk config
  grunt.config.init({
    splunk: splunkConfig,
    jshint: {
      files: ['Gruntfile.js', 'django/<%= appname %>/static/<%= appname %>/**/*.js'],
      options: {
        ignores: ['django/<%= appname %>/static/<%= appname %>/bower_components/**/*'],
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
    watch: watchConfig
  });

  // Load grunt-splunk
  grunt.loadNpmTasks('grunt-splunk');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['splunk-pack']);
};
