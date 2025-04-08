(function () {
    // v0.2
    'use strict';

    function createWorldMap ($output) {
        var $box = $(document.createElement('div'))
            .addClass('world-map-container');
         
        var $mapGrid = $(document.createElement('div'))
            .addClass('world-map-grid');

        const src = 'images/maps/map - world.webp';

        var $img = $(document.createElement('img'))
            .attr('src', src)
            .addClass('world-map-img');

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

    Macro.add('worldmap', {
        // map macro
        handler : function () {
            createWorldMap(this.output);
        }
    });

    setup.worldmap = createWorldMap;

}());