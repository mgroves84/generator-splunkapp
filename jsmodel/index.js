/*jshint globalstrict: true*/ 'use strict';

/* 
 * Backbone model class generator.
 * Usage: yo splunkapp:jsmodel <Backbone model name>
 */

var yeoman = require('yeoman-generator'),
    util = require('util'),
    path = require('path'),
    splunkApps= require('grunt-splunk/lib/apps');

var Generator = module.exports = function(args, options) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createModel = function() {
  this.sourceRoot(path.join(this.sourceRoot(), '..', '..', 'templates'));

  var currentApp = splunkApps.getCurrentApp();
  if (!currentApp) {
    throw new Error('Could not find current application name. Launch yo under application folder under Splunk.');
  }

  this.appname = currentApp.name();

  var destination = path.join('django', this.appname, 'static', this.appname, 'models', this.name + '.js');
  var source = path.join('django', 'static', 'model.js');

  this.template(source, destination);
};