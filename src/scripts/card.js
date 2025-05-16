(function () {
    // v0.3
    'use strict';

    function createCard ($output, name, selectable = false, size = 'large', partial = false) {
        const mergimals = State.variables.mergimals;
        const artDir = 'images/mergimals/'

        const $cardBox = $(document.createElement('div'))
            .addClass('card-box card-' + size);
        
        if (selectable) {
            $cardBox.addClass('selectable');
            $cardBox.click(() => Engine.play(name));
        }

        const $cardHeader = $(document.createElement('div'))
            .addClass('card-header')
            .appendTo($cardBox);

        const $cardType = $(document.createElement('div'))
            .addClass('card-type ' + mergimals[name].type)
            .appendTo($cardHeader);
        
        const $cardTitle = $(document.createElement('div'))
            .addClass('card-title')
            .text(name)
            .appendTo($cardHeader);

        const $cardImage = $(document.createElement('img'))
            .addClass('card-img')
            .attr('src', artDir + mergimals[name].name + '.png')
            .appendTo($cardBox);

        const $cardText = $(document.createElement('div'))
            .addClass('card-text')
            .text(mergimals[name].strategy)
            .appendTo($cardBox);

        const $cardFooter = $(document.createElement('div'))
            .addClass('card-footer')
            .appendTo($cardBox);
        
        const $cardNumber = $(document.createElement('div'))
            .addClass('card-number')
            .text(mergimals[name].number)
            .appendTo($cardFooter);

        if (partial == true) {
            $cardType.addClass('grayscale');
            $cardImage.addClass('grayscale');
            $cardText.text('not tamed');
        }

        if ($output) {
            if (!($output instanceof $)) {
                $output = $($output);
            }
            $cardBox.appendTo($output);
        };
    };

    Macro.add('card', {
        handler : function () {
            let selectable = false;
            if (this.args[1]) {
                selectable = this.args[1];
            };

            createCard(this.output, this.args[0], selectable, this.args[2], this.args[3]);
        }
    });

}());