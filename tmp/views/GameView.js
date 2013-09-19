// Generated by CoffeeScript 1.6.1
(function() {
  var BaseView, EndGameModal, GameControls, GameView, PauseModal, World, debug, device, getByRole, introDuration, phys, userData, views, win,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseView = require('../core/BaseView');

  getByRole = (require('../helpers/dom')).getByRole;

  device = require('../core/device');

  debug = require('../core/debug');

  views = require('../core/views');

  EndGameModal = require('../ui/modals/EndGameModal');

  PauseModal = require('../ui/modals/PauseModal');

  World = require('../game/World');

  GameControls = require('../game/controls/GameControls');

  userData = require('../game/utils/userData');

  phys = require('../game/utils/physics');

  win = $(window);

  introDuration = debug.skipAnimations ? 0 : 2400;

  /*
  ## Game View class
  
  Loads a level's data, wraps, initialises and runs game logic
  */


  GameView = (function(_super) {

    __extends(GameView, _super);

    GameView.prototype.templateName = 'game';

    GameView.prototype.classNames = 'view-game';

    GameView.prototype.fixHeight = true;

    function GameView(levelName) {
      this.levelName = levelName;
      GameView.__super__.constructor.apply(this, arguments);
      this.shots = null;
      this.targetsCount = null;
      this.stars = 3;
      this.finished = false;
    }

    GameView.prototype.getElements = function() {
      GameView.__super__.getElements.apply(this, arguments);
      this.elements.pause = getByRole('pause', this.elements.main);
      return this.elements.shots = getByRole('shots-counter', this.elements.main);
    };

    GameView.prototype.bind = function() {
      var _this = this;
      GameView.__super__.bind.apply(this, arguments);
      this.world = new World(this.elements.main, this.levelName);
      this.elements.pause.on(device.getEvent('click'), function(e) {
        var context, options;
        context = {
          title: 'Pause'
        };
        options = {
          game: _this,
          levelName: _this.levelName
        };
        new PauseModal(_this.elements.main, context, options);
        return e.preventDefault();
      });
      (_(this.world)).on('shoot', function() {
        return _this.setShots(_this.shots - 1);
      });
      return (_(this.world)).on('pot', function() {
        return _this.setTargetsCount(_this.targetsCount - 1);
      });
    };

    GameView.prototype.restart = function() {
      return views.open('game', null, null, false, this.levelName);
    };

    GameView.prototype.transitionComplete = function() {
      var _this = this;
      GameView.__super__.transitionComplete.apply(this, arguments);
      return this.world.onReady(function() {
        return _this.startGame();
      });
    };

    GameView.prototype.startGame = function() {
      var _this = this;
      this.world.play();
      this.player = this.world.getItemById('player');
      this.targets = this.world.getItemsByAttr('type', 'target');
      (_(this.player)).on('die', function() {
        return _this.finish(false);
      });
      this.setShots(this.world.level.data.shots);
      this.setTargetsCount(this.targets.length);
      return this.showIntro(function() {
        return _this.enableControls();
      });
    };

    GameView.prototype.setTargetsCount = function(amt) {
      this.targetsCount = amt;
      if (amt === 0) {
        return this.finish(true);
      }
    };

    GameView.prototype.finish = function(win) {
      var context, options;
      if (win == null) {
        win = false;
      }
      if (!this.finished) {
        this.finished = true;
        context = {
          win: win,
          title: win ? 'Level Complete!' : 'Ouch!'
        };
        options = {
          stars: this.stars,
          game: this,
          levelName: this.levelName
        };
        if (win) {
          userData.saveLevelScore(this.levelName, this.stars);
        }
        return new EndGameModal(this.elements.main, context, options);
      }
    };

    GameView.prototype.setShots = function(amt) {
      this.shots = amt;
      if (amt < -2) {
        this.setStars(0);
      } else if (amt < -1) {
        this.setStars(1);
      } else if (amt < 0) {
        this.setStars(2);
      }
      return this.elements.shots.text(amt);
    };

    GameView.prototype.setStars = function(amt) {
      if (this.stars !== amt) {
        this.elements.shots.removeClass("stars-" + this.stars);
        this.stars = amt;
        return this.elements.shots.addClass("stars-" + this.stars);
      }
    };

    GameView.prototype.enableControls = function() {
      var _this = this;
      this.world.loop.use(function() {
        return _this.update();
      });
      this.controls = new GameControls(this);
      return this.controls.on();
    };

    GameView.prototype.showIntro = function(callback) {
      var _this = this;
      this.viewportFits = this.world.viewport.fits();
      if (!this.viewportFits) {
        return this.world.viewport.followEntity(this.targets[0], introDuration / 2, function() {
          return _this.world.viewport.followEntity(_this.player, introDuration / 2, function() {
            return callback();
          });
        });
      } else {
        return callback();
      }
    };

    GameView.prototype.close = function() {
      this.elements.pause.off(device.getEvent('click'));
      GameView.__super__.close.apply(this, arguments);
      if (this.controls != null) {
        this.controls.off();
      }
      if (this.world != null) {
        return this.world.stop();
      }
    };

    GameView.prototype.update = function() {
      if (!this.viewportFits) {
        return this.world.viewport.followEntity(this.player);
      }
    };

    return GameView;

  })(BaseView);

  module.exports = GameView;

}).call(this);
