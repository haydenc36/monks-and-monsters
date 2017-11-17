var demo = demo || {};

// Tutorial Battle
game.load.audio('battleSong', '../assets/audio/battleSong.mp3');
var battleSong = game.add.audio('battleSong');
battleSong.play();
battleSong.loopFull(0.6); 

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
    
    this.TEXT_STYLE = {font: "20px Zapfino", fill: "#FFFFFF"};
    
    this.textStyle = {font: "18px Zapfino", fill: "#FFFFFF", lineHeight: "10%"};
};

demo.BattleState.prototype = Object.create(Phaser.State.prototype);
demo.BattleState.prototype.constructor = demo.BattleState;

demo.BattleState.prototype.init = function (level_data, charStats, inventQ) {
    "use strict";
    this.level_data = level_data;
    this.charHealth = charStats[0];
    this.charMana = charStats[1];
    this.charStamina = charStats[2];
    this.charMaxHealth = charStats[3];
    this.charMaxMana = charStats[4];
    this.charMaxStamina = charStats[5];
    
    this.wineQ = inventQ[0];
    this.breadQ = inventQ[1];
    
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    coordinate = 'battle'
};

demo.BattleState.prototype.create = function () {
    "use strict";
    var group_name, prefab_name, player_unit_name, enemy_unit_name;
    
    console.log();
    
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
    
    // Miracles list
    if (this.miraclesskills) {
        this.prefabs.miraclesskills = this.attackskills;
    } else {
        this.prefabs.miraclesskills = new demo.miraclesInventory(this, "miraclesskills", {x: 477, y: 480}, {group: "skills"});
    }
    
    // Attack Skills list
    if (this.attackskills) {
        this.prefabs.attackskills = this.attackskills;
    } else {
        this.prefabs.attackskills = new demo.AttackInventory(this, "attackskills", {x: 477, y: 480}, {group: "skills"});
    }
    
    // Sword Scroll Requirements
    if (this.SwordReq){
        this.prefabs.SwordReq = this.SwordReq;
        this.prefabs.SwordReq.visible = false;
    } else {
        this.prefabs.SwordReq = game.add.text(904, 465, "Sword Scroll requires " + this.prefabs.attackskills.skills[0].req_stam + " stamina points to increase user attack by 25% ", this.textStyle);
        this.prefabs.SwordReq.wordWrapWidth = "350";
        this.prefabs.SwordReq.wordWrap = true;
        this.prefabs.SwordReq.visible = false;
    }
    
    // Miracles Requirements
    if (this.MiraclesReq){
        this.prefabs.MiraclesReq = this.MiraclesReq;
        this.prefabs.MiraclesReq.visible = false;
    } else {
        this.prefabs.MiraclesReq = game.add.text(904, 465, "Miracle requires " + this.prefabs.attackskills.skills[1].req_mana + " mana points to increase user attack by 50% ", this.textStyle);
        this.prefabs.MiraclesReq.wordWrapWidth = "350";
        this.prefabs.MiraclesReq.wordWrap = true;
        this.prefabs.MiraclesReq.visible = false;
    }
    
    // Angel of Death Requirements
    if (this.AODReq){
        this.prefabs.AODReq = this.AODReq;
        this.prefabs.AODReq.visible = false;
    } else {
        this.prefabs.AODReq = game.add.text(904, 465, "Angel of Death requires " + this.prefabs.attackskills.skills[2].req_mana + " mana points to reduce the enemies current health by half ", this.textStyle);
        this.prefabs.AODReq.wordWrapWidth = "350";
        this.prefabs.AODReq.wordWrap = true;
        this.prefabs.AODReq.visible = false;
    }
    
    // Heal Requirements
    if (this.HealReq){
        this.prefabs.HealReq = this.HealReq;
        this.prefabs.HealReq.visible = false;
    } else {
        this.prefabs.HealReq = game.add.text(904, 465, "Heal requires " + this.prefabs.miraclesskills.miracles[0].req_mana + " mana points to restore " + this.prefabs.miraclesskills.miracles[0].health_power + " health points ", this.textStyle);
        this.prefabs.HealReq.wordWrapWidth = "350";
        this.prefabs.HealReq.wordWrap = true;
        this.prefabs.HealReq.visible = false;
    }
    
    // Wine Requirements
    if (this.WineReq){
        this.prefabs.WineReq = this.WineReq;
        this.prefabs.WineReq.visible = false;
    } else {
        this.prefabs.WineReq = game.add.text(904, 465, "Wine restores " + this.prefabs.Wine.mana_power + " mana points ", this.textStyle);
        this.prefabs.WineReq.wordWrapWidth = "350";
        this.prefabs.WineReq.wordWrap = true;
        this.prefabs.WineReq.visible = false;
    }
    
    // Bread Requirements
    if (this.BreadReq){
        this.prefabs.BreadReq = this.BreadReq;
        this.prefabs.BreadReq.visible = false;
    } else {
        this.prefabs.BreadReq = game.add.text(904, 465, "Bread restores " + this.prefabs.Bread.health_power + " health points ", this.textStyle);
        this.prefabs.BreadReq.wordWrapWidth = "350";
        this.prefabs.BreadReq.wordWrap = true;
        this.prefabs.BreadReq.visible = false;
    }
    
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
    
    this.prefabs.Monk.stats.health = this.charHealth;
    this.prefabs.Monk.stats.mana = this.charMana;
    this.prefabs.Monk.stats.stamina = this.charStamina;
    
    this.prefabs.Monk.stats.maxHP = this.charMaxHealth;
    this.prefabs.Monk.stats.maxMP = this.charMaxMana;
    this.prefabs.Monk.stats.maxSP = this.charMaxStamina;
    
    this.prefabs.Wine.stats.quantity = this.wineQ;
    this.prefabs.Bread.stats.quantity = this.breadQ;
    
    this.init_hud();
    
    this.next_turn();
};

demo.BattleState.prototype.update = function (){
    this.healthscale = 0.5 * this.prefabs.Monk.stats.health / this.prefabs.Monk.stats.maxHP;
    this.manascale = 0.5 * this.prefabs.Monk.stats.mana / this.prefabs.Monk.stats.maxMP;
    this.staminascale = 0.5 * this.prefabs.Monk.stats.stamina / this.prefabs.Monk.stats.maxSP;
    
    this.blood_bar.scale.set(this.healthscale, 1);
    this.mana_bar.scale.set(this.manascale, 1);
    this.stamina_bar.scale.set(this.staminascale, 1);
    
    this.enemyhealthscale = 3.5 * this.enemy.stats.health / this.enemy.stats.maxHP;
    
    this.enemyblood_bar.scale.set(this.enemyhealthscale, 1.5);
    
}

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
    
    // show player units
    this.make_units("players", {x: 50, y: 465}, demo.PlayerMenuItem.prototype.constructor);
    
    // show enemy units
    this.make_units("enemies", {x: 904, y: 465}, demo.EnemyMenuItem.prototype.constructor);
    
    // create items menu
    this.prefabs.inventory.create_menu({x: 477, y: 465});
    
    // create miraclesSkills menu
    this.prefabs.miraclesskills.create_menu({x: 477, y: 465});
    
    // create AttackSkills menu
    this.prefabs.attackskills.create_menu({x: 477, y: 465});
    
    // show player actions
    this.show_player_actions({x: 50, y: 465});
    this.showPlayerStats();
    
    this.label_stats();
    this.showEnemyHealth(this.enemy);
};

demo.BattleState.prototype.make_units = function (group_name, position, menu_item_constructor) {
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
    units_menu.hide();
    
    if (group_name == "enemies") {
        this.groups["enemies"].forEach(function (unit) {
            this.enemy = unit;
        },this);
    }
};

demo.BattleState.prototype.label_stats = function () {
    game.add.text(258, 342, "Health: ", {font: "10px Zapfino", fill: "#FFFFFF"});
    game.add.text(455, 366, "/" + this.prefabs.Monk.stats.maxHP, {font: '10px Book Antiqua', fill: '#ffffff'});
    game.add.text(261, 372, "Mana: ", {font: "10px Zapfino", fill: "#FFFFFF"});
    game.add.text(455, 396, "/" + this.prefabs.Monk.stats.maxMP, {font: '10px Book Antiqua', fill: '#ffffff'});
    game.add.text(253, 402, "Stamina: ", {font: "10px Zapfino", fill: "#FFFFFF"});
    game.add.text(455, 426, "/" + this.prefabs.Monk.stats.maxSP, {font: '10px Book Antiqua', fill: '#ffffff'});
}

demo.BattleState.prototype.show_player_actions = function (position) {
    "use strict";
    var actions, actions_menu_items, action_index, actions_menu;
    // available actions
    actions = [{text: "Attacks", item_constructor: demo.AttackInventoryMenuItem.prototype.constructor},
               {text: "Miracles", item_constructor: demo.miraclesInventoryMenuItem.prototype.constructor},
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

demo.BattleState.prototype.showPlayerStats = function () {
    "use strict";
    //GUI - black bars as background for life and mana
    this.black_bar = this.add.sprite(308, 350, 'blackBar');
    this.physics.arcade.enableBody(this.black_bar);
    this.black_bar.anchor.setTo(0, 0);
    this.black_bar.scale.set(0.5, 1);
    
    this.black2_bar = this.add.sprite(308, 380, 'blackBar');
    this.physics.arcade.enableBody(this.black2_bar);
    this.black2_bar.anchor.setTo(0, 0);
    this.black2_bar.scale.set(0.5, 1);
    
    this.black3_bar = this.add.sprite(308, 410, 'blackBar');
    this.physics.arcade.enableBody(this.black3_bar);
    this.black3_bar.anchor.setTo(0, 0);
    this.black3_bar.scale.set(0.5, 1);
    
    //GUI - red bar for health
    this.blood_bar = this.add.sprite(308, 350, 'redBar');
    this.physics.arcade.enableBody(this.blood_bar);
    this.blood_bar.anchor.setTo(0, 0);
    this.blood_bar.scale.set(0.5, 1);
    
    //GUI - blue bar for mana
    this.mana_bar = this.add.sprite(308, 380, 'blueBar');
    this.physics.arcade.enableBody(this.mana_bar);
    this.mana_bar.anchor.setTo(0, 0);
    this.mana_bar.scale.set(0.5, 1);
    
    //GUI - green bar for stamina
    this.stamina_bar = this.add.sprite(308, 410, 'greenBar');
    this.physics.arcade.enableBody(this.stamina_bar);
    this.stamina_bar.anchor.setTo(0, 0);
    this.stamina_bar.scale.set(0.5, 1);
    
    this.healthscale = 0.5 * this.prefabs.Monk.stats.health/ this.prefabs.Monk.stats.maxHP;
    this.manascale = 0.5 * this.prefabs.Monk.stats.mana/ this.prefabs.Monk.stats.maxMP;
    this.staminascale = 0.5 * this.prefabs.Monk.stats.stamina/ this.prefabs.Monk.stats.maxSP;
}

demo.BattleState.prototype.showEnemyHealth = function (enemy) {
    "use strict";
    //GUI - black bars as background for life and mana
    this.black_bar = this.add.sprite(0, 0, 'blackBar');
    this.physics.arcade.enableBody(this.black_bar);
    this.black_bar.anchor.setTo(0, 0);
    this.black_bar.scale.set(3.65, 2);
    
    //GUI - red bar for health
    this.enemyblood_bar = this.add.sprite(25, 4, 'redBar');
    this.physics.arcade.enableBody(this.enemyblood_bar);
    this.enemyblood_bar.anchor.setTo(0, 0);
    this.enemyblood_bar.scale.set(3.5, 2);
    
    this.enemyhealthscale = 3.5 * enemy.stats.health / enemy.stats.maxHP;
    
}

demo.BattleState.prototype.next_turn = function () {
    "use strict";
    if ((this.groups.enemies.countLiving() === 0) || (this.groups.players.countLiving() === 0)) {
        // if all enemy units are dead, go back to the world state
        if (this.groups.enemies.countLiving() === 0) {
            this.end_battle();
        }

        // if all player units are dead, restart the game
        if (this.groups.players.countLiving() === 0) {
            this.game_over();
        }
    }
    else {
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
    }
};

demo.BattleState.prototype.game_over = function () {
    "use strict";
    // go back to WorldState restarting the player position
    this.prefabs.attackskills_menu = null;
    this.prefabs.actions_menu = null;
    this.prefabs.items_menu = null;
    this.prefabs.miraclesskills_menu = null;
    
    this.game.world.removeAll();
    
    this.game.state.start(this.level_data.extraInfo.prevState, true, false, [this.prefabs.Monk.stats.health + 10, this.prefabs.Monk.stats.mana, this.prefabs.Monk.stats.stamina, this.prefabs.Monk.stats.maxHP, this.prefabs.Monk.stats.maxMP, this.prefabs.Monk.stats.maxSP], [this.prefabs.Wine.stats.quantity,this.prefabs.Bread.stats.quantity]);
};

demo.BattleState.prototype.end_battle = function () {
    "use strict";
    this.enemy.stats.reward.items.forEach(function (item_object){
        this.prefabs.inventory.collect_item(item_object);
    }, this);
    
    this.prefabs.attackskills_menu = null;
    this.prefabs.actions_menu = null;
    this.prefabs.items_menu = null;
    this.prefabs.miraclesskills_menu = null;
    
    BattlesCompleted.push(this.enemy.name);
    
    this.game.world.removeAll();
    
    // go back to WorldState with the current party data
    if (tutorial) {
        this.game.state.start(this.level_data.extraInfo.nextState, true, false, [this.prefabs.Monk.stats.maxHP + this.level_data.extraInfo.HPIncrease, this.prefabs.Monk.stats.maxMP + this.level_data.extraInfo.MPIncrease, this.prefabs.Monk.stats.maxSP + this.level_data.extraInfo.SPIncrease, this.prefabs.Monk.stats.maxHP + this.level_data.extraInfo.HPIncrease, this.prefabs.Monk.stats.maxMP + this.level_data.extraInfo.MPIncrease, this.prefabs.Monk.stats.maxSP + this.level_data.extraInfo.SPIncrease],[10,10]);
    }
    else {
        this.game.state.start(this.level_data.extraInfo.nextState, true, false, [this.prefabs.Monk.stats.health + this.level_data.extraInfo.HPIncrease, this.prefabs.Monk.stats.mana + this.level_data.extraInfo.MPIncrease, this.prefabs.Monk.stats.stamina + this.level_data.extraInfo.SPIncrease, this.prefabs.Monk.stats.maxHP + this.level_data.extraInfo.HPIncrease, this.prefabs.Monk.stats.maxMP + this.level_data.extraInfo.MPIncrease, this.prefabs.Monk.stats.maxSP + this.level_data.extraInfo.SPIncrease],[this.prefabs.Wine.stats.quantity,this.prefabs.Bread.stats.quantity]);
    }
    
};