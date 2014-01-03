var deps = [
    'splunkjs/ready!',
    'underscore'
];

define(
  '<%= appname %>/<%= name %>', 
  deps, 
  function() { 'use strict';

  var _ = require('underscore');
  var mvc = require('splunkjs/ready!');

  var <%= _.capitalize(name) %> = function() {
    
  };

  return <%= _.capitalize(name) %>;
});