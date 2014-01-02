var deps = [
    'splunkjs/ready!',
    'underscore', 
    'backbone',
    '<%= appname %>/models/<%= name %>'
];

define(
  '<%= appname %>/collections/<%= name %>', 
  deps, 
  function() { 'use strict';

  var _ = require('underscore');
  var Backbone = require('backbone');
  var mvc = require('splunkjs/ready!');

  var <%= _.classify(name) %>Collection = Backbone.Collection.extend({
    model: require('<%= appname %>/models/<%= name %>')
  });

  return <%= _.classify(name) %>Collection;
});