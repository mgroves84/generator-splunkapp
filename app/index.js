/*jshint globalstrict: true*/ 'use strict';

var _ = require('underscore'),
    util = require('util'),
    path = require('path'),
    fs = require('fs'),
    yeoman = require('yeoman-generator');

var Generator = module.exports = function(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  // Determine name of Splunk app being created
  this.argument('appname', { type: String, required: false });
  if (fs.existsSync(this.appname) &&
    fs.statSync(this.appname).isDirectory()) {
    this.destinationRoot(this.appname);
    this.appname =  path.basename(this.appname);
  } else {
    this.appname = this.appname || path.basename(process.cwd());
  }

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function() {
  // have Yeoman greet the user.
  console.log(this.yeoman);
};

/*
 * Execute template function over all files under source folder.
 * If source path contains @placeholder@ in name - use context properties
 * to replace these placeholders.
 */
Generator.prototype._templateDir = function(source, destination, context) {
  if (_.isUndefined(context)) {
    context = this;
  }

  fs.readdirSync(source).forEach(function(file) {
    // Change the path, depends on the template
    var destinationFile = file.replace(
        /@(\w+)@/g, 
        function(match, placeholder) { 
          return context[placeholder]; 
        });

    var stat = fs.statSync(path.join(source, file));
    if (stat.isDirectory()) {
      this._templateDir(
        path.join(source, file), 
        path.join(destination, destinationFile),
        context);
    } else {
      this.template(
        path.join(source, file), 
        path.join(destination, destinationFile),
        context);
    }
  }, this);
};

// === Tasks ===

Generator.prototype.app = function app() {
  //Go to the splunk app root
  this._templateDir(
    path.join(this.sourceRoot(), 'splunkapp'), 
    this.destinationRoot());
};