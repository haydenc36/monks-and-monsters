var demo = demo || {};
 
demo.Bread = function (game_state, name, position, properties) {
    "use strict";
    demo.Item.call(this, game_state, name, position, properties);
    
    this.health_power = this.game_state.prefabs[this.name].stats.health_power;
};
 
demo.Bread.prototype = Object.create(demo.Item.prototype);
demo.Bread.prototype.constructor = demo.Bread;
 
demo.Bread.prototype.use = function () {
    "use strict";
    if (this.game_state.prefabs[this.name].stats.quantity > 0){
        demo.Item.prototype.use.call(this);
        if (this.game_state.prefabs.Monk.stats.health + this.health_power > this.game_state.prefabs.Monk.stats.maxHP) {
            this.game_state.prefabs.Monk.stats.health = this.game_state.prefabs.Monk.stats.maxHP;
        }
        else {
            this.game_state.prefabs.Monk.stats.health += this.health_power;
        }
    }
    else {
        //Message
    }
};