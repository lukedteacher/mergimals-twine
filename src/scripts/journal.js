(function () {
  // v1.0
  'use strict';

  function writeEntry ($output, entry) {
    const journal = State.variables.players[State.variables.activePlayer].characters[State.variables.activeCharacter].journal;
    if (!journal) throw new Error('no journal found');
    journal.push(entry);
    const $entryBox = $(document.createElement('div'))
      .addClass('journal-entry-box');
    
    const $writeSpan = $(document.createElement('span'))
      .addClass('journal-verb-span')
      .text('WRITE: ')
      .appendTo($entryBox);
    
    const $entrySpan = $(document.createElement('span'))
      .addClass('journal-entry-span')
      .text('"' + entry + '"')
      .appendTo($entryBox);
    
    if ($output) {
      if (!($output instanceof $)) {
        $output = $($output);
      }
      $entryBox.appendTo($output);
    };
  }

  Macro.add('writeentry', {
    handler : function () {
      writeEntry(this.output, this.args[0]);
    }
  });
}());