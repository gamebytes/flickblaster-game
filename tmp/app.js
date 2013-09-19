// Generated by CoffeeScript 1.6.1

/*
## App File

The main file that starts up the app

* Initialises the app and every module used in it
* Defines views routing
* Loads the Handlebars templates in the Renderer
* If the app is loaded through phonegap listens for `deviceready` Phonegap event
* Instanciates and open the first view
*/


(function() {
  var bind, device, gameData, init, onDeviceReady, renderer, touchables, views;

  device = require('./core/device');

  renderer = require('./core/renderer');

  views = require('./core/views');

  gameData = require('./engine/gameData');

  touchables = require('./ui/touchables');

  views.load({
    levels: require('./views/LevelsView'),
    game: require('./views/GameView')
  });

  views.init();

  renderer.templates = window.templates;

  init = function() {
    if (device.isTouch()) {
      return bind();
    } else {
      return onDeviceReady();
    }
  };

  bind = function() {
    return document.addEventListener('deviceready', onDeviceReady, false);
  };

  onDeviceReady = function() {};

  touchables.initialise();

  gameData.init();

  gameData.onReady(function() {
    return views.open('levels');
  });

  init();

}).call(this);
