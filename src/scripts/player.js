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
        this.version = props.version | 'fusion';
        this.difficulty = props.version | 'normal';
		this.lastPassage = ''

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
        let playerName = this.args[0];
        if (!playerName) throw new Error('no player name specified');
        if (!State.variables.players[playerName]) throw new Error('player does not exist: create one first')
        let characterName = this.args[1];
        if (!characterName) throw new Error('no character name specified');
        if (State.variables.players[playerName].characters[characterName]) {
            throw new Error('character already created');
        }
        State.variables.players[playerName].characters[characterName] = new Character({name:characterName});
    }
});
