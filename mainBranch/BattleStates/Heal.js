var demo = demo || {};
 
demo.Heal = function (game_state, name, position, properties) {
    "use strict";
    demo.Skills.call(this, game_state, name, position, properties);
    
    this.health_power = 0.10 * this.game_state.prefabs.Monk.stats.maxHP;
    this.req_mana = 0.05 * this.game_state.prefabs.Monk.stats.maxMP;
};
 
demo.Heal.prototype = Object.create(demo.Skills.prototype);
demo.Heal.prototype.constructor = demo.Heal;
 
demo.Heal.prototype.use = function () {
    "use strict";
    
    //Heal Audio
    sparkle.play();
    
    if (this.game_state.prefabs.Monk.stats.health + this.health_power > this.game_state.prefabs.Monk.stats.maxHP) {
        this.game_state.prefabs.Monk.stats.health = this.game_state.prefabs.Monk.stats.maxHP;
    }
    else {
        this.game_state.prefabs.Monk.stats.health += this.health_power;
    }
    this.game_state.prefabs.Monk.stats.mana -= this.req_mana;
};