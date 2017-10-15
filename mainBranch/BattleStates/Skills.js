var demo = demo || {};

demo.Skills = function (game_state, name, position, properties) {
    "use strict";
    demo.Prefab.call(this, game_state, name, position, properties);
    
    this.stats = Object.create(properties.stats);
};

demo.Skills.prototype = Object.create(demo.Prefab.prototype);
demo.Skills.prototype.constructor = demo.Skills;

demo.Skills.prototype.show_message = function (target, damage) {
   "use strict";
    var action_message_position, action_message_text, attack_message;
    // show attack message
    action_message_position = new Phaser.Point(this.game_state.game.world.width / 2, this.game_state.game.world.height * 0.1);
    action_message_text = this.game_state.current_unit.name + " attacks " + target.name + " with " + damage + " damage";
    attack_message = new demo.ActionMessage(this.game_state, this.name + "_action_message", action_message_position, {group: "hud", texture: "rectangle_image", scale: {x: 0.85, y: 0.2}, duration: 1, message: action_message_text});

};