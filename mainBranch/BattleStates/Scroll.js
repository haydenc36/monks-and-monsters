var demo = demo || {};
 
demo.Scroll = function (game_state, name, position, properties) {
    "use strict";
    demo.Item.call(this, game_state, name, position, properties);
    this.stam_power = 0.25 * this.game_state.charMaxStamina;;
};
 
demo.Scroll.prototype = Object.create(demo.Item.prototype);
demo.Scroll.prototype.constructor = demo.Scroll;
 
demo.Scroll.prototype.use = function () {
    "use strict";
    
    // Sword Audio
    scrollSound.play();
    
    if (this.game_state.prefabs[this.name].stats.quantity > 0){
        if (this.game_state.prefabs.Monk.stats.stamina < this.game_state.prefabs.Monk.stats.maxSP) {
            // Scroll Audio ?
            
            demo.Item.prototype.use.call(this);
            if (this.game_state.prefabs.Monk.stats.stamina + this.mana_power > this.game_state.prefabs.Monk.stats.maxSP) {
                this.game_state.prefabs.Monk.stats.stamina = this.game_state.prefabs.Monk.stats.maxSP;
            }
            else {
                this.game_state.prefabs.Monk.stats.stamina += this.stam_power;
            }
        }
    }
};