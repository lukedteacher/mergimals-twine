(function () {
    // v0.1
    'use strict';

    function createKeyword ($output, keyword) {
        var $span = $(document.createElement('span'))
            .addClass('keyword-span')
            .text(keyword);

        if ($output) {
            if (!($output instanceof $)) {
                $output = $($output);
            }
            $span.appendTo($output);
        };

        return $span;
    }

    Macro.add('mergipedia', {
        handler : function () {
            createKeyword(this.output, this.args[0]);
        }
    });

    setup.keyword = createKeyword;

}());