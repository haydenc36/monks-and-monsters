var demo = demo || {};

demo.AttackSkillMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.AttackSkillMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.AttackSkillMenuItem.prototype.constructor = demo.AttackSkillMenuItem;

demo.AttackSkillMenuItem.prototype.select = function () {
    
    "use strict";
    // disable actions menu
    this.game_state.prefabs.attackskills_menu.disable();
    // enable player units menu so the player can choose the target
    this.game_state.prefabs.enemies_menu.enable();
    // save selected item
    this.game_state.current_attack = this.text;
};