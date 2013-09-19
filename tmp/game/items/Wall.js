// Generated by CoffeeScript 1.6.1
(function() {
  var Body, Wall, gameConfig, renderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  renderer = require('../../core/renderer');

  Body = require('./Body');

  gameConfig = require('../config');

  /*
  ## Wall class
  
  A physical Body (Game item) which shape gets rendered on screen in an SVG path element of a fixed
  color
  
  Read Walls for more about the way a Wall is added to the scene and handled Walls support all
  shape types (`type`) that Body supports
  
  Read Body for more
  */


  Wall = (function(_super) {

    __extends(Wall, _super);

    Wall.prototype.itemType = 'wall';

    function Wall(options, world, wrap, color) {
      this.world = world;
      this.wrap = wrap;
      this.color = color != null ? color : gameConfig.wallsColor;
      options.interaction = 'static';
      Wall.__super__.constructor.apply(this, arguments);
      this.render();
    }

    Wall.prototype.render = function() {
      var ctx, point, x, y, _i, _len, _ref;
      ctx = {
        x: this.viewport.worldToScreen(this.x),
        y: this.viewport.worldToScreen(this.y),
        fill: this.color
      };
      if (this.type === 'rect') {
        ctx.width = this.viewport.worldToScreen(this.width);
        ctx.height = this.viewport.worldToScreen(this.height);
        ctx.x -= ctx.width / 2;
        ctx.y -= ctx.height / 2;
      } else if (this.type === 'circle') {
        ctx.radius = this.viewport.worldToScreen(this.radius);
      } else if (this.type === 'poly') {
        ctx.points = [];
        _ref = this.points;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          point = _ref[_i];
          x = (this.viewport.worldToScreen(point[0])) + ctx.x;
          y = (this.viewport.worldToScreen(point[1])) + ctx.y;
          ctx.points.push("" + x + "," + y);
        }
        ctx.points = ctx.points.join(' ');
      }
      this.el = $(renderer.render("svg-" + this.type, ctx));
      return this.el.appendTo(this.wrap);
    };

    return Wall;

  })(Body);

  module.exports = Wall;

}).call(this);
