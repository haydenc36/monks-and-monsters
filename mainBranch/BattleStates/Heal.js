var demo = demo || {};
 
demo.Heal = function (game_state, name, position, properties) {
    "use strict";
    demo.Skills.call(this, game_state, name, position, properties);
    
    this.health_power = this.game_state.prefabs[this.name].stats.health_power;
    this.req_mana = this.game_state.prefabs[this.name].stats.req_mana;
};
 
demo.Heal.prototype = Object.create(demo.Skills.prototype);
demo.Heal.prototype.constructor = demo.Heal;
 
demo.Heal.prototype.use = function (target) {
    "use strict";
    target.stats.health += this.health_power;
    target.stats.mana -= this.req_mana;
};