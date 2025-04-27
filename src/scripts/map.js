(function () {
    // v0.2
    'use strict';

    function createMap ($output, gridCoordinate) {
        var $box = $(document.createElement('div'))
            .addClass('map-container');
         
        var $mapGrid = $(document.createElement('div'))
            .addClass('map-grid');

        const src = 'images/maps/map - story - ' + gridCoordinate + '.webp';

        var $img = $(document.createElement('img'))
            .attr('src', src)
            .addClass('map-img');

        if ($img.attr('src') && $img.attr('src').trim()) {
            $mapGrid.append($img);
            $box.append($mapGrid);
        };

        if ($output) {
            if (!($output instanceof $)) {
                $output = $($output);
            }
            $box.appendTo($output);
        };
        
        return $mapGrid;
    }

    Macro.add('map', {
        // map macro
        tags: ['n', 'e', 'w', 's'], // TODO tags for clickable elements?
        handler : function () {
            // create map grid
            const gridCoordinate = this.args[0];
            if (!gridCoordinate) throw new Error('no grid coordinate for map macro');
            // TODO clickable elements for map interactions
            // create map in a grid attached to current output, using the coordinate as image name
            const $mapGrid = createMap(this.output, gridCoordinate);
            
            const directions = this.payload.slice(1);
            // create move buttons in grid based on direction tags passed
            createMoveButtons($mapGrid, directions, gridCoordinate);
        }
    });

    function createMoveButtons ($mapGrid, directions, gridCoordinate) {
        const longDirections = {n: 'north', e: 'east', w: 'west', s: 'south'};
        console.log(directions);
        directions.forEach(direction => {
            // direction is an object, so get the name
            const shortDirection = direction.name;
            // map the name to a long direction
            const longDirection = longDirections[shortDirection];

            // create a button to move between map pages
            var $button = $(document.createElement('button'))
                .addClass('move-btn ' + longDirection);
            
            const destinationGridCoordinate = gridChange(gridCoordinate, longDirection);

            $button.click(() => Engine.play(destinationGridCoordinate));
            
            if ($mapGrid) {
                $button.appendTo($mapGrid);
            };
        });
    }

    // either increment the letter or number based on the direction traveled
    function gridChange (gridCoordinate, direction) {
        let destinationGridCoordinate = '';
        if (direction == 'north') {
            destinationGridCoordinate = gridCoordinate.slice(0, 1) + ( Number(gridCoordinate.slice(1, 2)) - 1 );
        } else if (direction == 'east') {
            destinationGridCoordinate = nextLetter(gridCoordinate.slice(0, 1)) + gridCoordinate.slice(1, 2);
        } else if (direction == 'west') {
            destinationGridCoordinate = previousLetter(gridCoordinate.slice(0, 1)) + gridCoordinate.slice(1, 2);
        } else if (direction == 'south') {
            destinationGridCoordinate = gridCoordinate.slice(0, 1) + ( Number(gridCoordinate.slice(1, 2)) + 1 );
        }
        return destinationGridCoordinate;
    }

    function previousLetter (letter) {
        if (letter === 'a') return 'z';
        return String.fromCharCode(letter.charCodeAt(0) - 1);
    }

    function nextLetter (letter) {
        if (letter === 'z') return 'a';
        return String.fromCharCode(letter.charCodeAt(0) + 1);
    }

    setup.map = createMap;
    setup.move = createMoveButtons;

}());