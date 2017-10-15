var demo = demo || {};

demo.RetreatMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
};

demo.RetreatMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.RetreatMenuItem.prototype.constructor = demo.RetreatMenuItem;

demo.RetreatMenuItem.prototype.select = function () {
    "use strict";
    this.game_state.current_unit.stats.health = 0;
    this.game.state.start("BootState", true, false, "../assBattleAssets.JSON", "state1");
};