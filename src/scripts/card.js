(function () {
    // v0.3
    'use strict';

    let mergimals = new Map();

    function createCard ($output, type, mergimal, strategy, number) {
        const $cardBox = $(document.createElement('div'))
            .addClass('card-box');

        const $cardHeader = $(document.createElement('div'))
            .addClass('card-header')
            .appendTo($cardBox);

        const $cardType = $(document.createElement('div'))
            .addClass('card-type ' + type)
            .appendTo($cardHeader);
        
        const $cardTitle = $(document.createElement('div'))
            .addClass('card-title')
            .text(mergimal)
            .appendTo($cardHeader);

        const $cardImage = $(document.createElement('img'))
            .addClass('card-img')
            .attr('src', '../images/mergimals/card art ' + mergimal + '.png')
            .appendTo($cardBox);

        const $cardText = $(document.createElement('div'))
            .addClass('card-text')
            .text(strategy)
            .appendTo($cardBox);

        const $cardFooter = $(document.createElement('div'))
            .addClass('card-footer')
            .appendTo($cardBox);
        
        const $cardNumber = $(document.createElement('div'))
            .addClass('card-number')
            .text(number)
            .appendTo($cardFooter);

        if ($output) {
            if (!($output instanceof $)) {
                $output = $($output);
            }
            $cardBox.appendTo($output);
        };
    };

    Macro.add('card', {
        handler : function () {
            console.log(this);
            createCard(this.output, this.args[0], this.args[1], this.args[2], this.args[3]);
        }
    });

    setup.card = createCard;

}());