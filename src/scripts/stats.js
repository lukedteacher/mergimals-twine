window.checkDraggables = function () {
    // finds all draggables with data-stat attribute
    let $statDraggables = $('.draggable[data-stat]');
    if ($statDraggables.length < 4) {
        return false;
    } else {
        // after validating, set stats to selected values
        let stats = State.getVar('$stats');
        $.each($statDraggables, function () {
            let $this = $(this);
            let stat = $this.attr('data-stat');
            let value = $this.text();
            stats[stat] = value;
        });
        return true;
    };
};