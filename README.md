
# FlickBlaster

An open-source HTML5 game created as a demo for my LXJS 2013 talk about game development

The game is written in [CoffeeScript](http://coffeescript.org/), bundled with [Browserify](http://browserify.org/) and wrapped as a [Cordova](http://cordova.apache.org/) cross-platform app, but can also be executed and tested in the browser.

The source code is commented end to end and for better understanding.

# Requirements

Includes requirements to build the app locally and run with a the local server for browser testing and also to deploy to a cordova build

* [Node.js](http://nodejs.org/) - Used for building the app, managing dependencies and run the local server for testing
```
brew install node
```

* [Cordova command-line interface](http://cordova.apache.org/docs/en/3.0.0/guide_cli_index.md.html) - Used to build and deploy the app to cordova with a few simple commands
```
sudo npm install -g cordova`
```

* [Coffeescript](coffeescript.com) - Server, build tools and the game source are written in coffeescript
```
sudo npm install -g coffee-script
```

* [Coffeescript](coffeescript.com) - Server, build tools and the game source are written in coffeescript
```
sudo npm install -g coffee-script
```

# Installation

```
git clone git@github.com:tancredi/flickblaster-game.git
cd flickblaster-game
npm install -d
cake build
```
