var demo = demo || {};

demo.miraclesSkillMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.miraclesSkillMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.miraclesSkillMenuItem.prototype.constructor = demo.miraclesSkillMenuItem;

demo.miraclesSkillMenuItem.prototype.select = function () {
    "use strict";
    // disable skills menu
    this.game_state.prefabs.miraclesskills_menu.disable();
    // enable player units menu so the player can choose the target
    //this.game_state.prefabs.players_menu.enable();
    this.game_state.current_item = this.text;
    this.game_state.prefabs.miraclesskills.use_skill(this.game_state.current_item);
    this.game_state.prefabs.actions_menu.enable();
    this.game_state.prefabs.miraclesskills_menu.hide();
};