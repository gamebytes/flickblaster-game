// Generated by CoffeeScript 1.6.1
(function() {
  var BaseView, LevelsView, device, gameData, getByRole, userData, views,
    _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseView = require('../core/BaseView');

  views = require('../core/views');

  device = require('../core/device');

  getByRole = (require('../helpers/dom')).getByRole;

  gameData = require('../game/utils/gameData');

  userData = require('../game/utils/userData');

  /*
  ## Levels View
  
  View containing information about user progress and levels navigation
  */


  LevelsView = (function(_super) {

    __extends(LevelsView, _super);

    LevelsView.prototype.templateName = 'levels';

    LevelsView.prototype.fixHeight = true;

    LevelsView.prototype.classNames = 'view-levels';

    function LevelsView() {
      var i, level, levelsProgress, n, stars, _i, _j, _len, _ref,
        _this = this;
      this.bind = function() {
        return LevelsView.prototype.bind.apply(_this, arguments);
      };
      this.getElements = function() {
        return LevelsView.prototype.getElements.apply(_this, arguments);
      };
      LevelsView.__super__.constructor.apply(this, arguments);
      this.context.levels = [];
      levelsProgress = userData.getLevelsProgress();
      _ref = gameData.get('levels');
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        level = _ref[i];
        stars = [];
        for (n = _j = 0; _j <= 2; n = ++_j) {
          if (levelsProgress[i].stars > n) {
            stars.push({
              scored: true
            });
          } else {
            stars.push({
              scored: false
            });
          }
        }
        this.context.levels.push({
          index: i + 1,
          name: level.name,
          completed: levelsProgress[i].completed,
          perfect: levelsProgress[i] === 3 ? true : false,
          stars: stars,
          locked: levelsProgress[i].locked
        });
      }
    }

    LevelsView.prototype.getElements = function() {
      LevelsView.__super__.getElements.apply(this, arguments);
      return this.elements.levels = getByRole('level', this.elements.main);
    };

    LevelsView.prototype.bind = function() {
      var self;
      LevelsView.__super__.bind.apply(this, arguments);
      self = this;
      return this.elements.levels.on(device.getEvent('click'), function() {
        return self.openLevel(($(this)).attr('data-level-name'));
      });
    };

    LevelsView.prototype.openLevel = function(levelName) {
      return views.open('game', 'slide-right', null, false, levelName);
    };

    return LevelsView;

  })(BaseView);

  module.exports = LevelsView;

}).call(this);
