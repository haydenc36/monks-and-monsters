var demo = demo || {};

demo.AttackInventoryMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.AttackInventoryMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.AttackInventoryMenuItem.prototype.constructor = demo.AttackInventoryMenuItem;

demo.AttackInventoryMenuItem.prototype.select = function () {
    "use strict";
    
    // disable actions menu
    this.game_state.prefabs.actions_menu.disable();
    this.game_state.prefabs.actions_menu.hide();
    // enable enemy units menu so the player can choose the target
    this.game_state.prefabs.attackskills_menu.show();
    this.game_state.prefabs.attackskills_menu.enable();
};