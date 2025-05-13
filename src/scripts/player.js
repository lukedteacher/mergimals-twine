window.Player = class Player {
	constructor(props) {
		// set data properties to defaults
        this.name = props.name;
        this.pronouns = 'they';
        this.characters = {};

		// clone the given config object's own properties into our own properties.
		//
		// NOTE: use the SugarCube built-in `clone()` function to make deep
		// copies of each of the properties' values.
		Object.keys(props).forEach(prop => {
			this[prop] = clone(props[prop]);
		});
	}

	clone() {
		// return a new instance of this class
		return new this.constructor(this);
	}

	toJSON() {
		// return a code string that will create a new instance containing our
		// own data.
		//
		// NOTE: Supplying `this` directly as the `reviveData` parameter to the
		// `Serial.createReviver()` call will trigger out of control recursion in
		// the serializer, so we must pass it a clone of our own data instead.
		var ownData = {};
		Object.keys(this).forEach(prop => {
			ownData[prop] = clone(this[prop]);
		});
		return Serial.createReviver(`new ${this.constructor.name}($ReviveData$)`, ownData);
	}
};

window.Character = class Character {
	constructor(props) {
		// set data properties to defaults
    this.name = props.name;
    this.pronouns = 'they';
    this.color = props.color;
		this.portraitNumber = props.portraitNumber;
		this.portrait = 'images/characters/portrait_' + props.portraitNumber + '.webp';
    this.version = props.version | 'fusion' | 'fission';
    this.difficulty = props.difficulty | 'normal';
		this.lastPassage = 'start'
		this.stats = props.stats | {attention: 'd4', grit: 'd4', memory: 'd4', empathy: 'd4'};
    this.starter = '';
		this.energy = 4;
		this.injuries = 0;
		this.backpack = {coin: 0, mergiball: 0, charm: 0, bandage: 0, tool: 0, battery: 0};
    this.journal = [];
		this.keywords = [];
    this.worldMapPosition = 'b3';
    this.explored = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]];
		this.mergipedia = {};
		const mergimals = Object.keys(State.variables.mergimals);
		mergimals.forEach(mergimal => {
			this.mergipedia[mergimal] = 'unknown';
		});
		// clone the given config object's own properties into our own properties.
		//
		// NOTE: use the SugarCube built-in `clone()` function to make deep
		// copies of each of the properties' values.
		Object.keys(props).forEach(prop => {
			// TODO figure out why this is being called a bunch
			this[prop] = clone(props[prop]);
		});
	}

	clone() {
		// return a new instance of this class
		return new this.constructor(this);
	}

	toJSON() {
		// return a code string that will create a new instance containing our
		// own data.
		//
		// NOTE: Supplying `this` directly as the `reviveData` parameter to the
		// `Serial.createReviver()` call will trigger out of control recursion in
		// the serializer, so we must pass it a clone of our own data instead.
		var ownData = {};
		Object.keys(this).forEach(prop => {
			ownData[prop] = clone(this[prop]);
		});
		return Serial.createReviver(`new ${this.constructor.name}($ReviveData$)`, ownData);
	}

  explore(mapCoordinate) {
    const gridCoordinate = this.mapToGrid(mapCoordinate);
    this.explored[gridCoordinate.row][gridCoordinate.column] = 1;
  }

  // convert map coordinate to array coordinate (e.g. b4 -> 1,3)
  mapToGrid (mapCoordinate) {
    const row = mapCoordinate.slice(1) - 1;
    const column = mapCoordinate.charCodeAt(0) - 97;
    return {row: row, column: column}
  }

	createCharacterBox($output, character, selectable = false) {
		const $characterBox = $(document.createElement('div'))
			.addClass('char-info-box')
			.attr('data-name', character.name);
		
		const $characterLabel = $(document.createElement('h2'))
			.addClass('char-info-label')
			.text(character.name)
			.appendTo($characterBox);

		const $characterPortrait = $(document.createElement('div'))
			.addClass('char-info-portrait bg-' + character.color + '-lt')
			.attr('style', 'background-image: url("' + character.portrait + '")')
			.appendTo($characterBox);
		
		if (selectable) {
			$characterBox.addClass('selectable');
			$characterBox.click(() => {
				$characterBox.toggleClass('selected').siblings().removeClass('selected');
				State.temporary.newActiveCharacter = character.name;
			});
			if (State.variables.activeCharacter == character.name) {
				$characterBox.addClass('selected');
			}
		}
		
		if ($output) {
            if (!($output instanceof $)) {
                $output = $($output);
            }
            $characterBox.appendTo($output);
        };
	}
};

Macro.add('newplayer', {
    handler : function () {
        let playerName = this.args[0];
        if (!playerName) throw new Error('no player name specified');
        // create the players variable if this is the first player
        if (!State.variables.players) {
            State.variables.players = {};
        } else if (State.variables.players[playerName]) {
            throw new Error('player already created');
        }
        State.variables.players[playerName] = new Player({name: playerName});
    }
});

Macro.add('newcharacter', {
  handler: function() {
  const playerName = this.args[0];
  if (!playerName) throw new Error('no player name specified');
  if (!State.variables.players[playerName]) throw new Error('player does not exist: create one first')
  const characterName = this.args[1];
  if (!characterName) throw new Error('no character name specified');
  if (State.variables.players[playerName].characters[characterName]) {
    throw new Error('character already created');
  }
  const characterColor = this.args[2];
  const characterPortraitNumber = this.args[3];
  const characterStats = this.args[4];
  if (!characterStats) console.log('no stats entered; using default');
  State.variables.players[playerName].characters[characterName] = new Character({name: characterName, color: characterColor, portraitNumber: characterPortraitNumber, stats: characterStats});
  console.log(characterName + ' successfully created');
  }
});


Macro.add('characterbox', {
	handler: function() {
		const characterName = this.args[0];
		const activePlayer = State.variables.activePlayer;
		const players = State.variables.players;
		const character = players[activePlayer].characters[characterName];
		if (!character) {
			throw new Error('no character by that name defined');
		}
		const selectable = this.args[1];
		character.createCharacterBox(this.output, character, selectable);
	}
});