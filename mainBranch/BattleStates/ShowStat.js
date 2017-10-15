var demo = demo || {};

demo.ShowStat = function (game_state, name, position, properties) {
    "use strict";
    demo.TextPrefab.call(this, game_state, name, position, properties);
    this.prefab = this.game_state.prefabs[properties.prefab];
    this.stat = properties.stat;
};

demo.ShowStat.prototype = Object.create(demo.TextPrefab.prototype);
demo.ShowStat.prototype.constructor = demo.ShowStat;

demo.ShowStat.prototype.update = function () {
    "use strict";
    this.text = this.prefab.stats[this.stat];
};

demo.ShowStat.prototype.hide = function(){
    this.text.visible = false;
}