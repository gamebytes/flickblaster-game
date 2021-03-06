
BaseModal = require './BaseModal'
device = require '../../core/device'
views = require '../../core/views'

###
## Pause Modal class

Modal shown when pausing
Read BaseModal for more
###

class PauseModal extends BaseModal
  templateName: 'partials/modal-pause'
  classNames: 'modal-pause'
  showClose: false

  constructor: (@wrap, @context, options = {}) ->
    @game = options.game            # Parent GameView instance
    @levelName = options.levelName  # Name of the level currently played

    # 'Pause' the world physics and updates
    @game.world.stop()

    super

  render: ->
    @context.title = "Level #{@game.levelName}"

    super

  # Delegate actions to all buttons
  bind: ->
    super

    @inner.on (device.getEvent 'mousedown'), '[data-role="restart"]', (e) =>
      @game.restart()
      e.preventDefault()

    @inner.on (device.getEvent 'mousedown'), '[data-role="resume"]', (e) =>
      @close()
      @game.world.play()
      e.preventDefault()

    @inner.on (device.getEvent 'mousedown'), '[data-role="back"]', (e) =>
      views.open 'levels', 'slide-left'
      e.preventDefault()

module.exports = PauseModal
