// Generated by CoffeeScript 1.6.1
(function() {
  var CollisionManager, phys;

  phys = require('../utils/physics');

  /*
  ## Collision Manager class
  
  Work around for major issues encountered with several different ways of
  binding events to Box2D collisions.
  
  The events you can bind are:
  1. `start`:         *Triggered before the collision is solved*
  2. `end`:           *Triggered after the collision is solved*
  3. `BeginContact`:  *Triggered before the contact has happened*
  4. `EndContact`:    *Triggered after the contact has happened*
  */


  CollisionManager = (function() {

    function CollisionManager(world) {
      this.world = world;
      this.callbacks = {
        start: [],
        end: [],
        pre: [],
        post: []
      };
      this.listener = new phys.ContactListener;
      this.bind();
    }

    CollisionManager.prototype.bind = function() {
      var _this = this;
      this.listener.BeginContact = function(contact) {
        var cb, _i, _len, _ref, _results;
        _ref = _this.callbacks.start;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          _results.push(cb(contact));
        }
        return _results;
      };
      this.listener.EndContact = function(contact) {
        var cb, _i, _len, _ref, _results;
        _ref = _this.callbacks.end;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          _results.push(cb(contact));
        }
        return _results;
      };
      this.listener.PreSolve = function(contact, impulse) {
        var cb, _i, _len, _ref, _results;
        _ref = _this.callbacks.pre;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          _results.push(cb(contact, impulse));
        }
        return _results;
      };
      this.listener.PostSolve = function(contact, oldManifold) {
        var cb, _i, _len, _ref, _results;
        _ref = _this.callbacks.post;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          _results.push(cb(contact, oldManifold));
        }
        return _results;
      };
      return this.world.b2dWorld.SetContactListener(this.listener);
    };

    CollisionManager.prototype.on = function(evt, callback) {
      return this.callbacks[evt].push(callback);
    };

    return CollisionManager;

  })();

  module.exports = CollisionManager;

}).call(this);