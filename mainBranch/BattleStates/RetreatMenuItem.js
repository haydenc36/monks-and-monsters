var demo = demo || {};

demo.RetreatMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.RetreatMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.RetreatMenuItem.prototype.constructor = demo.RetreatMenuItem;

demo.RetreatMenuItem.prototype.select = function () {
    "use strict";
    //this.game_state.current_unit.stats.health = 50;
    //this.game_state.current_unit.stats.mana = 50;
    //this.game_state.current_unit.stats.stamina = 50;
    this.game.state.start("state1", true, false, [this.game_state.prefabs.Monk.stats.health, this.game_state.prefabs.Monk.stats.mana, this.game_state.prefabs.Monk.stats.stamina], [this.game_state.prefabs.Wine.stats.quantity,this.game_state.prefabs.Bread.stats.quantity]);
};