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
            console.log($.wiki(contents));
            $mapGrid.append(contents); // ← Convert wikitext to HTML
          }

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
        tags: null,
        handler : function () {
            createMap(this.output, this.args[0], this.payload[0].contents);
        }
    });
}());