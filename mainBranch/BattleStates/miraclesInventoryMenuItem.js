var demo = demo || {};

demo.miraclesInventoryMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.miraclesInventoryMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.miraclesInventoryMenuItem.prototype.constructor = demo.miraclesInventoryMenuItem;

demo.miraclesInventoryMenuItem.prototype.select = function () {
    "use strict";
    
    // disable actions menu
    if ((!!this.game_state.prefabs.actions_menu) && (!!this.game_state.prefabs.miraclesskills_menu)) {
        this.game_state.prefabs.actions_menu.disable();
        
        // enable enemy units menu so the player can choose the target
        this.game_state.prefabs.miraclesskills_menu.show();
        this.game_state.prefabs.miraclesskills_menu.enable();
    }
};