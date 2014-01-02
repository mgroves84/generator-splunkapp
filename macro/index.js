/*jshint globalstrict: true*/ 'use strict';

/* 
 * Macro generator.
 * Usage: yo splunkapp:macro <scriptedinputname>
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
    name: 'macroargs',
    message: 'Specify macro arguments (separate with comma):'
  }, {
    name: 'definition',
    message: 'Macro definition:'
  }];

  this.prompt(prompts, function(props) {

    this.definition = props.definition;
    this.macroargs = _(props.macroargs.split(',')).map(function(s) { return s.trim(); });

    cb();
  }.bind(this));
};

Generator.prototype.createMacro = function() {
  this.sourceRoot(path.join(this.sourceRoot(), '..', '..', 'templates'));
  var templateContent = this.read(path.join('default', 'macros.conf.macro'));
  var content = _.template(templateContent, this);

  var defaultMacros = path.join(this.destinationRoot(), 'default', 'macros.conf');
  fs.appendFileSync(
    defaultMacros, 
    endOfLine + content);

  this.log.ok('Macros "' + this.name + '" has been added to "default/macros.conf".');
};