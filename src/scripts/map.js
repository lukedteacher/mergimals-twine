(function () {
    // v0.1
    'use strict';

    function createMap ($output, coord, contents) {
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

        if (contents) {
            $mapGrid.append(contents);
        };

        if ($output) {
            if (!($output instanceof $)) {
                $output = $($output);
            }
            $box.appendTo($output);
        };
        
        return $box;
    }

    Macro.add('map', {
        // map macro
        tags: ['move'],
        handler : function () {
            var mapBox = createMap(this.output, this.args[0], this.payload[0].contents);
            var move = this.args.includes('move');
            createMoveButton(mapBox, this.payload[1]);
        }
    });

    function createMoveButton ($output, direction) {
        var buttonImage = '../images/svg/' + direction + '.svg';

        var $button = $(document.createElement('button'))
            .addClass('move-btn');

        console.log($button);

        if ($output) {
            if (!($output instanceof $)) {
                $output = $($output);
            }
            $button.appendTo($output);
        };

        return $button;
    }

    setup.map = createMap;
    setup.move = createMoveButton;

}());