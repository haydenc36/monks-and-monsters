var demo = demo || {};

demo.PlayerUnit = function (game_state, name, position, properties) {
    "use strict";
    demo.Unit.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
};

demo.PlayerUnit.prototype = Object.create(demo.Unit.prototype);
demo.PlayerUnit.prototype.constructor = demo.PlayerUnit;

demo.PlayerUnit.prototype.act = function () {
    "use strict";
    var unit_index, players_menu_items;
    // search for the index of this unit in the players_menu
    unit_index = this.game_state.prefabs.players_menu.find_item_index(this.name);
    this.game_state.prefabs.players_menu.move_selection(unit_index);
    
    // enable menu for choosing the action
    this.game_state.prefabs.actions_menu.enable();
};

demo.PlayerUnit.prototype.kill = function () {
    "use strict";
    var menu_item_index, menu_item;
    Phaser.Sprite.prototype.kill.call(this);
    // remove from the menu
    menu_item_index = this.game_state.prefabs.players_menu.find_item_index(this.name);
    this.game_state.prefabs.players_menu.menu_items[menu_item_index].alpha = 0.5;
};