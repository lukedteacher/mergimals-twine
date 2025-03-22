(function () {
    // v0.1
    'use strict';

    function createMap ($output, coord) {
        console.log(coord);
        var $box = $(document.createElement('div'))
            .addClass('map-container');
         
        var $mapGrid = $(document.createElement('div'))
            .addClass('map-grid');     

        const src = '../images/maps/map - story - ' + coord + '.png';

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

        return $box;
    }

    setup.map = createMap;

    Macro.add('map', {
        // map macro
        handler : function () {
            createMap(this.output, this.args[0]);
        }
    });
}());