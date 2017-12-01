var demo = demo || {};
 
demo.Wine = function (game_state, name, position, properties) {
    "use strict";
    demo.Item.call(this, game_state, name, position, properties);
    this.mana_power = 0.25 * this.game_state.charMaxMana;;
};
 
demo.Wine.prototype = Object.create(demo.Item.prototype);
demo.Wine.prototype.constructor = demo.Wine;
 
demo.Wine.prototype.use = function () {
    "use strict";
    
    
    
    if (this.game_state.prefabs[this.name].stats.quantity > 0){
        if (this.game_state.prefabs.Monk.stats.mana < this.game_state.prefabs.Monk.stats.maxMP) {
            // Wine Audio
            wineSound.play();
            demo.Item.prototype.use.call(this);
            if (this.game_state.prefabs.Monk.stats.mana + this.mana_power > this.game_state.prefabs.Monk.stats.maxMP) {
                this.game_state.prefabs.Monk.stats.mana = this.game_state.prefabs.Monk.stats.maxMP;
            }
            else {
                this.game_state.prefabs.Monk.stats.mana += this.mana_power;
            }
        }
    }
};