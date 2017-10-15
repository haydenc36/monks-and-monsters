var demo = demo || {};
 
demo.Wine = function (game_state, name, position, properties) {
    "use strict";
    demo.Item.call(this, game_state, name, position, properties);
    this.mana_power = this.game_state.prefabs[this.name].stats.mana_power;
};
 
demo.Wine.prototype = Object.create(demo.Item.prototype);
demo.Wine.prototype.constructor = demo.Wine;
 
demo.Wine.prototype.use = function (target) {
    "use strict";
    if (this.game_state.prefabs[this.name].stats.quantity > 0){
        demo.Item.prototype.use.call(this);
        target.stats.mana += this.mana_power;
    }
    else {
        //Message
    }
};