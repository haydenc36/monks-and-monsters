var demo = demo || {};

demo.MagicInventoryMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.MagicInventoryMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.MagicInventoryMenuItem.prototype.constructor = demo.MagicInventoryMenuItem;

demo.MagicInventoryMenuItem.prototype.select = function () {
    "use strict";
    
    // disable actions menu
    this.game_state.prefabs.actions_menu.disable();
    this.game_state.prefabs.actions_menu.hide();
    // enable enemy units menu so the player can choose the target
    this.game_state.prefabs.magicskills_menu.show();
    this.game_state.prefabs.magicskills_menu.enable();
};