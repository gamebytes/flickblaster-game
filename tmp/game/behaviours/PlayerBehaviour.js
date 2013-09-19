// Generated by CoffeeScript 1.6.1
(function() {
  var BaseBehaviour, PlayerBehaviour,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseBehaviour = require('./BaseBehaviour');

  /*
  ## Player Behaviour class
  
  Defines the behaviour of the player on stage
  Shamefully, the player is that little red disc you flick around the stage when playing
  */


  PlayerBehaviour = (function(_super) {

    __extends(PlayerBehaviour, _super);

    function PlayerBehaviour(entity, world) {
      var target, targets, _i, _len,
        _this = this;
      this.entity = entity;
      this.world = world;
      PlayerBehaviour.__super__.constructor.apply(this, arguments);
      targets = this.world.getItemsByAttr('type', 'target');
      this.hoveredTarget = null;
      this.potted = false;
      for (_i = 0, _len = targets.length; _i < _len; _i++) {
        target = targets[_i];
        if (target.data.targetType === this.entity.data.targetType) {
          this.entity.onCollisionStart(target, function() {
            _this.hoveredTarget = target;
            return (_(target)).emit('hover');
          });
          this.entity.onCollisionEnd(target, function() {
            _this.hoveredTarget = null;
            return (_(target)).emit('release');
          });
        }
      }
    }

    PlayerBehaviour.prototype.update = function() {
      PlayerBehaviour.__super__.update.apply(this, arguments);
      if ((this.hoveredTarget != null) && !this.potted) {
        return this.potIn(this.hoveredTarget);
      }
    };

    PlayerBehaviour.prototype.potIn = function(target) {
      var _this = this;
      this.potted = true;
      return this.potFx(function() {
        _this.entity.remove();
        return (_(_this.world)).emit('pot', [_this.entity, target]);
      });
    };

    PlayerBehaviour.prototype.potFx = function(callback) {
      var sprite, _i, _len, _ref;
      _ref = this.entity.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        sprite.el.transition({
          scale: .1,
          opacity: 0
        }, 600);
      }
      if (callback != null) {
        return setTimeout(callback, 600);
      }
    };

    return PlayerBehaviour;

  })(BaseBehaviour);

  module.exports = PlayerBehaviour;

}).call(this);