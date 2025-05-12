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
    console.log(showPositions);
    if (showPositions) {
      const positions = getCharacterPositions();

      positions.forEach(position => {
        const positionMarker = $(document.createElement('div'))
          .addClass('position-marker')
          .attr('style', 'grid-area: ' + position.slice(1) + ' / ' + (position.charCodeAt(0) - 96));
        
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
    let positionArray = [];
    Object.entries(State.variables.players).forEach(([_playerName, playerObject]) => {
      Object.entries(playerObject.characters).forEach(([_characterName, characterObject]) => {
        positionArray.push(characterObject.worldMapPosition);
      })
    })
    return positionArray;
  }

  Macro.add('worldmap', {
    // map macro
    handler : function () {
      createWorldMap(this.output, this.args[0]);
    }
  });
}());