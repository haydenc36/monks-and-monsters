var demo = demo || {};
 
demo.Miracle = function (game_state, name, position, properties) {
    "use strict";
    demo.Skills.call(this, game_state, name, position, properties);
    
    this.attack_mult = this.game_state.prefabs[this.name].stats.attack_mult;
    this.req_mana = this.game_state.prefabs[this.name].stats.req_mana;
};
 
demo.Miracle.prototype = Object.create(demo.Skills.prototype);
demo.Miracle.prototype.constructor = demo.Miracle;
 
demo.Miracle.prototype.hit = function (target) {
    "use strict";
    var damage, attack_multiplier, defense_multiplier, action_message_position, action_message_text, attack_message;
    // the attack multiplier for Sword attacks is higher
    attack_multiplier = this.game_state.game.rnd.realInRange(0.9, 1.3);
    defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    // calculate damage using the Sword attack stat
    damage = Math.max(0, Math.round((this.attack_mult * attack_multiplier * this.game_state.current_unit.stats.magic_attack) - (defense_multiplier * target.stats.defense)));
    // apply damage
    target.receive_damage(damage);
    
    // reduce the unit mana
    this.game_state.current_unit.stats.mana -= this.req_mana;
    
    this.show_message(target, damage);
};