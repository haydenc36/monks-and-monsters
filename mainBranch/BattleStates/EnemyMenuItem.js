var demo = demo || {};

demo.EnemyMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.EnemyMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.EnemyMenuItem.prototype.constructor = demo.EnemyMenuItem;

demo.EnemyMenuItem.prototype.select = function () {
    "use strict";
    var enemy;
    // get enemy prefab
    enemy = this.game_state.prefabs[this.text];
    // attack selected enemy
    //this.game_state.current_attack.hit(enemy);
    this.game_state.prefabs.attackskills.use_skill(this.game_state.current_attack, enemy);
    this.game_state.prefabs.attackskills_menu.hide();
    this.game_state.prefabs.actions_menu.show();
    // disable menus
    this.game_state.prefabs.enemies_menu.disable();
    this.game_state.prefabs.players_menu.disable();
};