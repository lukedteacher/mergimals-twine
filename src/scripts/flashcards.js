(function () {
  // v0.3
  'use strict';

  let facts = new Map;

  function createFacts () {
    let number = 1;
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        const factName = i + ' x ' + j;
        const fact = {factor1: i, factor2: j, product: i * j};
        facts.set(factName, fact);
        number++;
      };
    };
  }

  Macro.add('setupfacts', {
    handler: function () {
      createFacts()
      State.variables[facts] = facts;
    }
  });

  function createEqualGroup($output, groups, items, object) {
    const $groupBox = $(document.createElement('div'))
        .addClass('equal-groups-box');


    for (let i = 0; i < groups; i++) {
      const $groupCircle = $(document.createElement('div'))
        .addClass('equal-groups-group group-circle')
        .appendTo($groupBox);

      if (groups > 8) {
        $groupCircle.addClass('group-small')
      } else if (groups > 4) {
        $groupCircle.addClass('group-medium')
      } else {
        $groupCircle.addClass('group-large')
      }

      for (let j = 0; j < items; j++) {
        const $groupObject = $(document.createElement('div'))
          .addClass('object-' + object)
          .appendTo($groupCircle);
        
        if (items > 8) {
          $groupObject.addClass('object-small')
        } else if (items > 4) {
          $groupObject.addClass('object-medium')
        } else {
          $groupObject.addClass('object-large')
        }
      };
    };
    
    $groupBox.appendTo($output);
  }

  Macro.add('equalgroup', {
    handler: function () {
      createEqualGroup(this.output, this.args[0], this.args[1])
    }
  });

  function createArray($output, rows, columns, object) {
    const $arrayBox = $(document.createElement('div'))
        .addClass('array-box')
        .attr('style', 'grid: repeat(' + rows + ', 1fr) / repeat(' + columns + ', 1fr)');

    for (let i = 0; i < rows; i++) {      
      for (let j = 0; j < columns; j++) {
        const $arrayCell = $(document.createElement('div'))
          .addClass('array-cell')
          .appendTo($arrayBox);
        
        const $arrayObject = $(document.createElement('div'))
          .addClass('object-' + object)
          .appendTo($arrayCell);
      };
    };

    $arrayBox.appendTo($output);
  }

  Macro.add('array', {
    handler: function () {
      createArray(this.output, this.args[0], this.args[1])
    }
  });

  function createFlashCard ($output, factor1, factor2, model, object) {

    const $cardBox = $(document.createElement('div'))
      .addClass('flashcard-box flashcard-md');

    const $cardCard = $(document.createElement('div'))
      .addClass('flashcard-card')
      .appendTo($cardBox);
    
    $cardBox.click(() => {$cardCard.toggleClass('flipped');})

    const $cardSide1 = $(document.createElement('div'))
      .addClass('flashcard-front')
      .appendTo($cardCard);

    if (model != 'array' && model != 'equal groups') {
      throw new Error('invalid model for flashcard')
    } else if (model == 'array') {
      createArray($cardSide1, factor1, factor2, object);
    } else if (model == 'equal groups') {
      createEqualGroup($cardSide1, factor1, factor2, object);
    }

    const $cardSide1Text = $(document.createElement('div'))
      .addClass('flashcard-front-text')
      .text(factor1 + ' x ' + factor2)
      .appendTo($cardSide1);

    const $cardSide2 = $(document.createElement('div'))
      .addClass('flashcard-back')
      .text(factor1 * factor2)
      .appendTo($cardCard);

    if ($output) {
      if (!($output instanceof $)) {
        $output = $($output);
      }
      $cardBox.appendTo($output);
    };
  };

  Macro.add('flashcard', {
    handler: function () {
      if (!Number.isFinite(this.args[0]) || !Number.isFinite(this.args[1])) {
        throw new Error('the flash card macro requires a number as the first two arguments')
      }

      const object = this.args[3];

      if (
        object != 'circle' &&
        object != 'triangle' &&
        object != 'square' &&
        object != 'rectangle'
      ) {
          throw new Error('invalid object type for flashcard model')
      }
      createFlashCard(this.output, this.args[0], this.args[1], this.args[2], this.args[3])
    }
  })

}());