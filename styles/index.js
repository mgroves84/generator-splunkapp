/*jshint globalstrict: true*/ 'use strict';

/* 
 * CSS file generator.
 * Usage: yo splunkapp:styles <css file name>
 */

var yeoman = require('yeoman-generator'),
    util = require('util'),
    path = require('path'),
    splunkApps= require('grunt-splunk/lib/apps');

var Generator = module.exports = function(args, options) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createCollection = function() {
  this.sourceRoot(path.join(this.sourceRoot(), '..', '..', 'templates'));

  var currentApp = splunkApps.getCurrentApp();
  if (!currentApp) {
    throw new Error('Could not find current application name. Launch yo under application folder under Splunk.');
  }

  this.appname = currentApp.name();

  var destination = path.join('django', this.appname, 'static', this.appname, this.name + '.css');
  var source = path.join('django', 'static', 'styles.css');

  this.template(source, destination);
};