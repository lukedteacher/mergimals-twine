(function () {
    // v0.2
    'use strict';

    function createMap ($output, coord, contents) {
        var $box = $(document.createElement('div'))
            .addClass('map-container');
         
        var $mapGrid = $(document.createElement('div'))
            .addClass('map-grid');

        const src = '/images/maps/map - story - ' + coord + '.png';

        var $img = $(document.createElement('img'))
            .attr('src', src)
            .addClass('map-img');

        if ($img.attr('src') && $img.attr('src').trim()) {
            $mapGrid.append($img);
            $box.append($mapGrid);
        };

        if (contents) {
            $mapGrid.append(contents);
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
        tags: ['north', 'east', 'west', 'south'],
        handler : function () {
            const mapGrid = createMap(this.output, this.args[0], this.payload[0].contents);
            createMoveButtons(mapGrid, this.payload.slice(1));
        }
    });

    function createMoveButtons (mapGrid, directions) {
        directions.forEach(direction => {
            var $button = $(document.createElement('button'))
                .addClass('move-btn ' + direction.name);
        
            if (direction.args[0]) {
                $button.click(() => Engine.play(direction.args[0]));
            }
            
            if (mapGrid) {
                $button.appendTo(mapGrid);
            };
        });
    }

    setup.map = createMap;
    setup.move = createMoveButtons;

}());