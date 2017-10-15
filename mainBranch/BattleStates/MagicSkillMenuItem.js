var demo = demo || {};

demo.MagicSkillMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.MagicSkillMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.MagicSkillMenuItem.prototype.constructor = demo.MagicSkillMenuItem;

demo.MagicSkillMenuItem.prototype.select = function () {
    "use strict";
    // disable skills menu
    this.game_state.prefabs.magicskills_menu.disable();
    // enable player units menu so the player can choose the target
    this.game_state.prefabs.players_menu.enable();
    // save selected item
    this.game_state.current_item = this.text;
};