var demo = demo || {};
 
demo.AngelOfDeath = function (game_state, name, position, properties) {
    "use strict";
    demo.Skills.call(this, game_state, name, position, properties);
};
 
demo.AngelOfDeath.prototype = Object.create(demo.Skills.prototype);
demo.AngelOfDeath.prototype.constructor = demo.AngelOfDeath;
 
demo.AngelOfDeath.prototype.hit = function (target) {
    "use strict";
    var damage, action_message_position, action_message_text, attack_message;
    //damage using the Angel of Death attack
    damage = target.stats.health;
    target.receive_damage(damage);
    
    // reduce the unit mana
    this.game_state.current_unit.stats.mana = 0;
    
    this.show_message(target, damage);
};