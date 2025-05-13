(function () {
  // v0.2
  'use strict';

  function createWorldMap ($output) {
    const $box = $(document.createElement('div'))
      .addClass('world-map-container');
      
    const $mapGrid = $(document.createElement('div'))
      .addClass('world-map-grid');

    const src = 'images/maps/map - world.webp';

    const $img = $(document.createElement('img'))
      .attr('src', src)
      .addClass('world-map-img');

    if ($img.attr('src') && $img.attr('src').trim()) {
      $mapGrid.append($img);
      $box.append($mapGrid);
    };

    const activePlayersCharacters = State.variables.players[State.variables.activePlayer].characters;

    // create a variable for each characters position
    let characterPositions = {}
    Object.entries(activePlayersCharacters).forEach(([characterName, characterObject]) => {
      characterPositions[characterName] = mapToGrid(characterObject);
    });

    const activeCharacterName = State.variables.players[State.variables.activePlayer].characters[State.variables.activeCharacter].name;

    // cycle through each row and column of the world map to add markers and fog
    for (let row = 1; row < 11; row++) {
      for (let column = 1; column < 11; column++) {
        // if the active character has not explored this cell, add a fog div
        if (activePlayersCharacters[activeCharacterName].explored[row - 1][column - 1] == 0) {
          $(document.createElement('div'))
            .addClass('world-map-fog')
            .attr('style', 'grid-area: ' + row + ' / ' + column)
            .appendTo($mapGrid);
        };

        // add a position marker for each character
        Object.entries(characterPositions).forEach(([characterName, positionObject]) => {
          if (positionObject.row == row && positionObject.column == column) {
            const positionMarker = $(document.createElement('div'))
              .addClass('position-marker bg-' + activePlayersCharacters[characterName].color)
              .attr('title', characterName)
              .attr('style', 'grid-area: ' + positionObject.row + ' / ' + positionObject.column);
            
            positionMarker.appendTo($mapGrid);
          }
        });
      };
    };

    if ($output) {
      if (!($output instanceof $)) {
          $output = $($output);
      }
      $box.appendTo($output);
    };
      
    return $mapGrid;
  }

  function mapToGrid (characterObject) {
    const position = characterObject.worldMapPosition;
    const row = Number(position.slice(1));
    const column = position.charCodeAt(0) - 96;
    return {row: row, column: column}
  }

  Macro.add('worldmap', {
    // map macro
    handler : function () {
      createWorldMap(this.output);
    }
  });
}());