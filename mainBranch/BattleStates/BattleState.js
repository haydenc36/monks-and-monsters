var demo = demo || {};

demo.BattleState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {
        "background": demo.TilePrefab.prototype.constructor,
        "rectangle": demo.Prefab.prototype.constructor,
        "player_unit": demo.PlayerUnit.prototype.constructor,
        "enemy_unit": demo.EnemyUnit.prototype.constructor,
        "inventory": demo.Inventory.prototype.constructor,
        "wine": demo.Wine.prototype.constructor,
        "bread": demo.Bread.prototype.constructor,
        "heal": demo.Heal.prototype.constructor,
        "scroll": demo.SwordScroll.prototype.constructor,
        "miracle": demo.Miracle.prototype.constructor,
        "aod": demo.AngelOfDeath.prototype.constructor,
    };
    
    this.TEXT_STYLE = {font: "30px Impact", fill: "#FFFFFF"};
};

demo.BattleState.prototype = Object.create(Phaser.State.prototype);
demo.BattleState.prototype.constructor = demo.BattleState;

demo.BattleState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    this.level_data = level_data;
    //this.encounter = extra_parameters.encounter;
    //this.party_data = extra_parameters.party_data;
    this.inventory = extra_parameters.inventory;
    
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};

demo.BattleState.prototype.preload = function () {
    "use strict";
    //this.load.text("experience_table", "assets/levels/experience_table.json");
};

demo.BattleState.prototype.create = function () {
    "use strict";
    var group_name, prefab_name, player_unit_name, enemy_unit_name;
    
    // create groups
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    // create prefabs
    this.prefabs = {};
    for (prefab_name in this.level_data.prefabs) {
        if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
            // create prefab
            this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
        }
    };
    
    // if there is no inventory from WorldState, create an empty one
    if (this.inventory) {
        this.prefabs.inventory = this.inventory;
    } else {
        this.prefabs.inventory = new demo.Inventory(this, "inventory", {x: 477, y: 480}, {group: "items"});
    }
    
    // Magic Skills list
    if (this.magicskills) {
        this.prefabs.magicskills = this.attackskills;
    } else {
        this.prefabs.magicskills = new demo.MagicInventory(this, "magicskills", {x: 477, y: 480}, {group: "skills"});
    }
    
    // Attack Skills list
    if (this.attackskills) {
        this.prefabs.attackskills = this.attackskills;
    } else {
        this.prefabs.attackskills = new demo.AttackInventory(this, "attackskills", {x: 477, y: 480}, {group: "skills"});
    }
    
    // create enemy units
    /*for (enemy_unit_name in this.encounter.enemy_data) {
        if (this.encounter.enemy_data.hasOwnProperty(enemy_unit_name)) {
            // create enemy units
            this.create_prefab(enemy_unit_name, this.encounter.enemy_data[enemy_unit_name]);
        }
    }
    
    // create player units
    for (player_unit_name in this.party_data) {
        if (this.party_data.hasOwnProperty(player_unit_name)) {
            // create player units
            this.create_prefab(player_unit_name, this.party_data[player_unit_name]);
        }
    }
    
    // save experience table
    this.experience_table = JSON.parse(this.game.cache.getText("experience_table"));*/
    
    this.init_hud();
    
    // store units in a priority queue which compares the units act turn
    this.units = new PriorityQueue({comparator: function (unit_a, unit_b) {
        return unit_a.act_turn - unit_b.act_turn;
    }});
    this.groups.players.forEach(function (unit) {
        unit.calculate_act_turn(0);
        this.units.queue(unit);
    }, this);
    this.groups.enemies.forEach(function (unit) {
        unit.calculate_act_turn(0);
        this.units.queue(unit);
    }, this);
    
    this.next_turn();
};

demo.BattleState.prototype.create_prefab = function (prefab_name, prefab_data) {
    "use strict";
    var prefab;
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, Object.create(prefab_data.properties));
    }
};

demo.BattleState.prototype.init_hud = function () {
    "use strict";
    var unit_index, player_unit_health;
    
    // show player actions
    this.show_player_actions({x: 477, y: 480});
    
    // show player units
    this.show_units("players", {x: 50, y: 480}, demo.PlayerMenuItem.prototype.constructor);
    
    // show enemy units
    this.show_units("enemies", {x: 904, y: 480}, demo.EnemyMenuItem.prototype.constructor);
    
    // create items menu
    this.prefabs.inventory.create_menu({x: 477, y: 480});
    
    // create MagicSkills menu
    this.prefabs.magicskills.create_menu({x: 477, y: 480});
    
    // create AttackSkills menu
    this.prefabs.attackskills.create_menu({x: 477, y: 480});
};

demo.BattleState.prototype.show_units = function (group_name, position, menu_item_constructor) {
    "use strict";
    var unit_index, menu_items, unit_menu_item, units_menu;
    
    // create units menu items
    unit_index = 0;
    menu_items = [];
    this.groups[group_name].forEach(function (unit) {
        unit_menu_item = new menu_item_constructor(this, unit.name + "_menu_item", {x: position.x, y: position.y + unit_index * 50}, {group: "hud", text: unit.name, style: Object.create(this.TEXT_STYLE)});
        unit_index += 1;
        menu_items.push(unit_menu_item);
    }, this);
    // create units menu
    units_menu = new demo.Menu(this, group_name + "_menu", position, {group: "hud", menu_items: menu_items});
};

demo.BattleState.prototype.show_player_actions = function (position) {
    "use strict";
    var actions, actions_menu_items, action_index, actions_menu;
    // available actions
    actions = [{text: "Attacks", item_constructor: demo.AttackInventoryMenuItem.prototype.constructor},
               {text: "Magic Skills", item_constructor: demo.MagicInventoryMenuItem.prototype.constructor},
               {text: "Item", item_constructor: demo.InventoryMenuItem.prototype.constructor},
               {text: "Retreat", item_constructor: demo.RetreatMenuItem.prototype.constructor}
              ];
    actions_menu_items = [];
    action_index = 0;
    // create a menu item for each action
    actions.forEach(function (action) {
        actions_menu_items.push(new action.item_constructor(this, action.text + "_menu_item", {x: position.x, y: position.y + action_index * 50}, {group: "hud", text: action.text, style: Object.create(this.TEXT_STYLE)}));
        action_index += 1;
    }, this);
    actions_menu = new demo.Menu(this, "actions_menu", position, {group: "hud", menu_items: actions_menu_items});
};

demo.BattleState.prototype.next_turn = function () {
    "use strict";
    // if all enemy units are dead, go back to the world state
    if (this.groups.enemies.countLiving() === 0) {
        //this.end_battle();
    }
    
    // if all player units are dead, restart the game
    if (this.groups.players.countLiving() === 0) {
        //this.game_over();
    }
    
    // takes the next unit
    this.current_unit = this.units.dequeue();
    // if the unit is alive, it acts, otherwise goes to the next turn
    if (this.current_unit.alive) {
        this.current_unit.act();
        this.current_unit.calculate_act_turn(this.current_unit.act_turn);
        this.units.queue(this.current_unit);
    } else {
        this.next_turn();
    }
};

demo.BattleState.prototype.game_over = function () {
    "use strict";
    // go back to WorldState restarting the player position
    this.game.state.start("state1", true, false, {restart_position: true});
};

demo.BattleState.prototype.end_battle = function () {
    "use strict";
    var received_experience;
    
    // receive battle reward
    received_experience = this.encounter.reward.experience;
    this.groups.players.forEach(function (player_unit) {
        // receive experience from enemy
        player_unit.receive_experience(received_experience / this.groups.players.children.length);
        // save current party stats
        this.party_data[player_unit.name].properties.stats = player_unit.stats;
    }, this);
    
    
    this.encounter.reward.items.forEach(function (item_object) {
        this.prefabs.inventory.collect_item(item_object);
    }, this);
    
    // go back to WorldState with the current party data
    this.game.state.start("state1", true, false, {party_data: this.party_data});
};
