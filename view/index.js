/*jshint globalstrict: true*/ 'use strict';

/* 
 * Scripted input generator.
 * Usage: yo splunkapp:scriptedinput <scriptedinputname>
 */

var _ = require('underscore'),
    yeoman = require('yeoman-generator'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    endOfLine = require('os').EOL,
    splunkApps= require('grunt-splunk/lib/apps');

var Generator = module.exports = function(args, options) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.askFor = function() {
  var cb = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'usetemplate',
    message: 'Do you want to use Splunk base template?',
    default: true
  }, {
    type: 'list',
    name: 'templatename',
    message: 'Choose template:',
    choices: [
      'base',
      'base_with_basic_styles',
      'base_with_footer',
      'base_with_account_bar',
      'base_with_app_bar'
    ],
    when: function(props) {
      return props.usetemplate;
    },
    default: 'base_with_app_bar'
  }];

  this.prompt(prompts, function(props) {
    _.extend(this, props);
    cb();
  }.bind(this));
};

Generator.prototype.createView = function() {
  this.sourceRoot(path.join(this.sourceRoot(), '..', '..', 'templates'));

  var currentApp = splunkApps.getCurrentApp();
  if (!currentApp) {
    throw new Error('Could not find current application name. Launch yo under application folder under Splunk.');
  }

  var destination = path.join('django', currentApp.name(), 'templates', this.name + '.html');
  var source = this.usetemplate ? 
    path.join('django', 'templates', 'view.template.html') :
    path.join('django', 'templates', 'view.html');

  this.template(source, destination);
};