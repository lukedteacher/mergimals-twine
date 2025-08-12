(function () {
  // v1.0
  'use strict';

  function writeEntry ($output, entry) {
    const activePlayer = State.variables.activePlayer
    if (!activePlayer) throw new Error('no active player found');
    const activeCharacter = State.variables.activeCharacter
    if (!activeCharacter) throw new Error('no active character found');
    const journal = State.variables.players[activePlayer].characters[activeCharacter].journal;
    if (!journal) throw new Error('no journal found');

    // add the entry to the journal variable
    journal.push(entry);

    // create the element to display the journal notification
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
    
    // safety check for output being valid
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