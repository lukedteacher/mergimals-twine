(function () {
    // v1.0
    'use strict';

    function createDice($output, id, diceType) {
        const $diceBox = $(document.createElement('div'))
            .addClass('dice-box');

        const _$span = $(document.createElement('span'))
            .attr('id', id)
            .addClass('dice-span')
            .attr('data-dice', diceType)
            .text(diceType)
            .appendTo($diceBox);

        if ($output) {
            if (!($output instanceof $)) {
                $output = $($output);
            }
            $diceBox.appendTo($output);
        }

        return $diceBox;
    }

    function randResult(dice) {
        const max = Number(dice.slice(1));

        return Math.floor(Math.random() * max) + 1;
    }

    function roll(targetID) {
        const $target = $(targetID);

        shake($target, 10, newResult);
    }

    function shake($target, intensity = 5, callback = () => {}) {
        const duration = 50;
    
        const applyTransform = (tx, ty, rot, onComplete) => {
            $target.css({
                transition: `transform ${duration}ms linear`,
                transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`
            });
            setTimeout(onComplete, duration);
        };
    
        let i = 0;
        const nextFrame = () => {
            if (i < 9) {
                const rot = randomRange(-10 * intensity, 10 * intensity);
                const tx = randomRange(-intensity, intensity);
                const ty = randomRange(-intensity, intensity);
                applyTransform(tx, ty, rot, nextFrame);
                i++;
            } else {
                applyTransform(0, 0, 0, () => callback($target));
            }
        };
        nextFrame();
    }

    function newResult($target) {
        const diceType = $target.attr('data-dice');
        const result = randResult(diceType);
        const polymathString = `${result}_on_${diceType}`;
        $target.text(polymathString);
    }

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    Macro.add('dice', {
        handler: function () {
            const target = this.args[0];
            const diceType = this.args[1];
            createDice(this.output, target, diceType);
        },
    });

    Macro.add('roll', {
        handler: function () {
            const targetID = this.args[0];
            roll(targetID);
        },
    });

    setup.dice = createDice;
    setup.roll = roll;
})();
