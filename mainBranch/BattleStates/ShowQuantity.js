var demo = demo || {};

demo.ShowQuantity = function (game_state, name, position, properties) {
    "use strict";
    demo.TextPrefab.call(this, game_state, name, position, properties);
    
    this.prefab = this.game_state.prefabs[properties.prefab];
    this.stats = properties.stat;
};

demo.ShowQuantity.prototype = Object.create(demo.TextPrefab.prototype);
demo.ShowQuantity.prototype.constructor = demo.ShowQuantity;

demo.ShowQuantity.prototype.update = function () {
    "use strict";
    this.text = "x" + this.prefab.stats[this.stats];
};