// Generated by CoffeeScript 1.6.1
(function() {
  var BaseBehaviour, LaserBehaviour,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseBehaviour = require('./BaseBehaviour');

  /*
  ## Laser Behaviour class
  
  Determines the behaviour of laser Entities
  
  Laser Entities are Entities created through the editor with attributes `type` and `behaviour` set
  to `laser`
  Entities of 'type' attribute set to 'lasers' will be passe by the World instance to its Lasers
  manager and rendered with SVG
  */


  LaserBehaviour = (function(_super) {

    __extends(LaserBehaviour, _super);

    function LaserBehaviour(entity, world) {
      var _this = this;
      this.entity = entity;
      this.world = world;
      LaserBehaviour.__super__.constructor.apply(this, arguments);
      this.active = true;
      this.player = this.world.getItemById('player');
      this.touching = false;
      this.entity.body.setSensor(true);
      this.entity.onCollisionStart(this.player, function() {
        _this.touching = true;
        if (_this.active) {
          return _this.burnPlayer();
        }
      });
      this.entity.onCollisionStop(this.player, function() {
        return _this.touching = false;
      });
      if ((this.entity.hasAttr('off')) && this.entity.attributes.off) {
        this.off();
      }
    }

    LaserBehaviour.prototype.burnPlayer = function() {
      var decorator, sprite,
        _this = this;
      sprite = this.player.sprites[0];
      decorator = sprite.getDecorator('burn');
      decorator.fadeIn(100);
      return sprite.el.fadeOut(300, function() {
        _this.player.remove();
        return (_(_this.player)).emit('die');
      });
    };

    LaserBehaviour.prototype.off = function() {
      var element, _i, _len, _ref;
      _ref = this.entity.elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        element.remove();
        this.cachedElements = this.entity.elements;
      }
      this.world.lasers.refresh();
      return this.active = false;
    };

    LaserBehaviour.prototype.on = function() {
      var element, _i, _len, _ref;
      _ref = this.cachedElements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        this.world.lasers.el.append(element);
      }
      this.world.lasers.refresh();
      if (this.touching) {
        this.burnPlayer();
      }
      return this.active = true;
    };

    LaserBehaviour.prototype.toggle = function() {
      if (this.active) {
        return this.off();
      } else {
        return this.on();
      }
    };

    return LaserBehaviour;

  })(BaseBehaviour);

  module.exports = LaserBehaviour;

}).call(this);
