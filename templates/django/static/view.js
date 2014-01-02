var deps = [
    'splunkjs/ready!',
    'underscore', 
    'backbone'
];

define(
  '<%= appname %>/views/<%= name %>', 
  deps, 
  function() { 'use strict';

  var _ = require('underscore');
  var Backbone = require('backbone');
  var mvc = require('splunkjs/ready!');

  var <%= _.classify(name) %>View = Backbone.View.extend({
  });

  return <%= _.classify(name) %>View;
});