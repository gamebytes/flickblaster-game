// Generated by CoffeeScript 1.6.1

/*
## Behaviours Index module

Routing map, assigns all behaviours to standardised keys so they match the behaviour specified
in Entities 'behaviour' attribute - usually through the editor

Read Entity to see how this module is used
*/


(function() {
  var base, button, laser, player, sensor, target, teleport;

  base = require('./BaseBehaviour');

  player = require('./PlayerBehaviour');

  target = require('./TargetBehaviour');

  laser = require('./LaserBehaviour');

  button = require('./ButtonBehaviour');

  teleport = require('./TeleportBehaviour');

  sensor = require('./SensorBehaviour');

  module.exports = {
    base: base,
    player: player,
    target: target,
    laser: laser,
    button: button,
    teleport: teleport,
    sensor: sensor
  };

}).call(this);
