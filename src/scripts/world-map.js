(function () {
  // v0.2
  'use strict';

  function createWorldMap ($output, showPositions = false) {
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

    for (let row = 1; row < 11; row++) {
      for (let column = 1; column < 11; column++) {
        const character = State.variables.players[State.variables.activePlayer].characters[State.variables.activeCharacter];
        if (character.explored[row-1][column-1] == 0) {
          const $fogBox = $(document.createElement('div'))
            .addClass('world-map-fog')
            .attr('style', 'grid-area: ' + row + ' / ' + column)
          
          $fogBox.appendTo($mapGrid);
        }
      }
    }
    
    if (showPositions) {
      const positions = getCharacterPositions();

      // for each position in the position object, show a small div on the map
      Object.entries(positions).forEach(([characterName, positionObject]) => {
        const positionMarker = $(document.createElement('div'))
          .addClass('position-marker')
          .attr('title', characterName)
          .attr('style', 'grid-area: ' + positionObject.row + ' / ' + positionObject.column);
        
        positionMarker.appendTo($mapGrid);
      })
    }

    if ($output) {
      if (!($output instanceof $)) {
          $output = $($output);
      }
      $box.appendTo($output);
    };
      
    return $mapGrid;
  }

  function getCharacterPositions () {
    let positionsObject = {};
    Object.entries(State.variables.players).forEach(([_playerName, playerObject]) => {
      Object.entries(playerObject.characters).forEach(([characterName, characterObject]) => {
        const position = characterObject.worldMapPosition;
        const row = position.slice(1);
        const column = position.charCodeAt(0) - 96;
        positionsObject[characterName] = {row: row, column: column}
      })
    })
    return positionsObject;
  }

  Macro.add('worldmap', {
    // map macro
    handler : function () {
      createWorldMap(this.output, this.args[0]);
    }
  });
}());