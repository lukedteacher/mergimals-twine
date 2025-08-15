(function () {
  // v1.0
  'use strict';

  function gainItem ($output, item, quantity) {
    const activePlayer = State.variables.activePlayer
    if (!activePlayer) throw new Error('no active player found');
    const activeCharacter = State.variables.activeCharacter
    if (!activeCharacter) throw new Error('no active character found');
    const backpack = State.variables.players[activePlayer].characters[activeCharacter].backpack;
    if (!backpack) throw new Error('no backpack found');

    // add the item to the current stock of items
    backpack[item] += quantity;

    // create the element to display the item gain notification
    const $gainBox = $(document.createElement('div'))
      .addClass('gain-notification-box');
    
    const $gainSpan = $(document.createElement('span'))
      .addClass('gain-verb-span')
      .text('🫴 GAIN: ')
      .appendTo($gainBox);
    
    const $notificationSpan = $(document.createElement('span'))
      .addClass('gain-notification-span')
      .text(' ' + quantity + ' ' + item + '.')
      .appendTo($gainBox);
    
    // safety check for output being valid
    if ($output) {
      if (!($output instanceof $)) {
        $output = $($output);
      }
      $gainBox.appendTo($output);
    };
  }

  Macro.add('gainItem', {
    handler : function () {
      // check if an item name was provided
      if (!this.args[0]) throw new Error('no item provided for gain item macro');
      const item = this.args[0];

      // set quantity of item to 1 as default
      let quantity = 1;
      if (this.args[1]) quantity = this.args[1];

      gainItem(this.output, item, quantity);
    }
  });
}());