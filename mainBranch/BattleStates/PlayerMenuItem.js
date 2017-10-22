var demo = demo || {};

demo.PlayerMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
    
    this.player_unit_health = new demo.ShowStat(this.game_state, this.text + "_health", {x: this.x + 165, y: this.y}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "health"});
    
    this.player_unit_mana = new demo.ShowStat(this.game_state, this.text + "_mana", {x: this.x + 275, y: this.y}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "mana"});
};

demo.PlayerMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.PlayerMenuItem.prototype.constructor = demo.PlayerMenuItem;

demo.PlayerMenuItem.prototype.select = function () {
    "use strict";
    var player_unit;
    // get selected player unit
    player_unit = this.game_state.prefabs[this.text];
    // use current selected item on selected unit
    this.game_state.prefabs.inventory.use_item(this.game_state.current_item, player_unit);
    this.game_state.prefabs.miraclesskills.use_skill(this.game_state.current_item, player_unit);
    
    // hide items menu
    this.game_state.prefabs.items_menu.hide();
    this.game_state.prefabs.items_menu.disable();
    // hide miracles skills menu
    this.game_state.prefabs.miraclesskills_menu.hide();
    this.game_state.prefabs.miraclesskills_menu.disable();
    // hide attack skills menu
    this.game_state.prefabs.attackskills_menu.hide();
    this.game_state.prefabs.attackskills_menu.disable();

    this.game_state.prefabs.players_menu.disable();
    
    // show actions menu
    this.game_state.prefabs.actions_menu.show();
    this.game_state.prefabs.actions_menu.enable();
};