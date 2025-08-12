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
    
    const $gainIcon = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
      .addClass('gain-icon')
      .attr('viewBox', '0 0 100 100')
      .appendTo($gainBox);
    
    const $gainIconPath = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
      .attr('stroke-width', '2')
      .attr('stroke', 'white')
      .attr('d', 'M22 15V16L14 18.5L7 16.6V18H1V7H9L15.2 9.3C16.2 9.7 17 10.8 17 12H19C20.7 12 22 13.3 22 15M5 16V9H3V16H5M19.9 14.6C19.7 14.2 19.4 14 19 14H13.6C13.1 14 12.5 13.9 12 13.8L9.7 13L10.3 11.1L12.7 11.9C13 11.9 15 12 15 12C15 11.6 14.8 11.3 14.4 11.2L8.6 9H7V14.5L14 16.4L19.9 14.6Z')
      .appendTo($gainIcon);
    
    const $gainSpan = $(document.createElement('span'))
      .addClass('gain-verb-span')
      .text(' GAIN: ')
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