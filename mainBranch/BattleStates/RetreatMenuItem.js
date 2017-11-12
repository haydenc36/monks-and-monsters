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
    
    if ((!!this.game_state.prefabs.attackskills_menu) && (!!this.game_state.prefabs.actions_menu) && (!!this.game_state.prefabs.items_menu) && (!!this.game_state.prefabs.miraclesskills_menu)) {
        this.game_state.prefabs.attackskills_menu = null;
        this.game_state.prefabs.actions_menu = null;
        this.game_state.prefabs.items_menu = null;
        this.game_state.prefabs.miraclesskills_menu = null;



        this.game.state.start(this.game_state.prevState, true, false, [this.game_state.prefabs.Monk.stats.health, this.game_state.prefabs.Monk.stats.mana, this.game_state.prefabs.Monk.stats.stamina, this.game_state.prefabs.Monk.stats.maxHP, this.game_state.prefabs.Monk.stats.maxMP, this.game_state.prefabs.Monk.stats.maxSP], [this.game_state.prefabs.Wine.stats.quantity,this.game_state.prefabs.Bread.stats.quantity]);
    }
};