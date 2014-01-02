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
    endOfLine = require('os').EOL;

var Generator = module.exports = function(args, options) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.askFor = function() {
  var cb = this.async();

  var prompts = [{
    name: 'sourcetype',
    message: 'sourcetype ='
  }, {
    name: 'source',
    message: 'source ='
  }, {
    name: 'host',
    message: 'host ='
  }];

  this.prompt(prompts, function(props) {
    _.extend(this, props);
    cb();
  }.bind(this));
};

Generator.prototype.createScriptedInput = function() {
  this.sourceRoot(path.join(this.sourceRoot(), '..', '..', 'templates'));
  var templateContent = this.read(path.join('default', 'input.conf.scriptedinput'));
  var content = _.template(templateContent, this);

  var defaultInput = path.join(this.destinationRoot(), 'default', 'input.conf');
  fs.appendFileSync(
    defaultInput, 
    endOfLine + content);

  this.copy(path.join('bin', 'script.cmd'), path.join('bin', this.name + '.cmd'));
  this.copy(path.join('bin', 'script.sh'), path.join('bin', this.name + '.sh'));

  this.log.ok('Scripted input configuration "' + this.name + '" has been added to "default/input.conf".');
};