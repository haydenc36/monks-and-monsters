var demo = demo || {};

demo.Item = function (game_state, name, position, properties) {
    "use strict";
    demo.Prefab.call(this, game_state, name, position, properties);
    
    this.stats = Object.create(properties.stats);
};

demo.Item.prototype = Object.create(demo.Prefab.prototype);
demo.Item.prototype.constructor = demo.Item;

demo.Item.prototype.use = function () {
    "use strict";
    this.game_state.prefabs[this.name].stats.quantity -= 1;
};