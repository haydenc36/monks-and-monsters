var demo = demo || {};

demo.ReturnMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.ReturnMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.ReturnMenuItem.prototype.constructor = demo.ReturnMenuItem;

demo.ReturnMenuItem.prototype.select = function () {
    "use strict";
    // hide items
    if ((!!this.game_state.prefabs.items_menu) && (!!this.game_state.prefabs.miraclesskills_menu) && (!!this.game_state.prefabs.attackskills_menu) && (!!this.game_state.prefabs.actions_menu)) {
        this.game_state.prefabs.items_menu.hide();
        this.game_state.prefabs.items_menu.disable();

        // hide miracles skills menu
        this.game_state.prefabs.miraclesskills_menu.hide();
        this.game_state.prefabs.miraclesskills_menu.disable();

        // hide attack skills menu
        this.game_state.prefabs.attackskills_menu.hide();
        this.game_state.prefabs.attackskills_menu.disable();

        // show actions menu
        this.game_state.prefabs.actions_menu.show();
        this.game_state.prefabs.actions_menu.enable();
    }
};