var demo = demo || {};

demo.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

demo.BootState.prototype = Object.create(Phaser.State.prototype);
demo.BootState.prototype.constructor = demo.BootState;

demo.BootState.prototype.init = function (level_file, next_state, charStats, inventQ) {
    "use strict";
    this.charStats = charStats;
    this.level_file = level_file;
    this.next_state = next_state;
    this.inventQ = inventQ;
};

demo.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("LevelFile", this.level_file);
};

demo.BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("LevelFile");
    level_data = JSON.parse(level_text);
    this.game.state.start("LoadingState", true, false, level_data, this.next_state, this.charStats, this.inventQ);
};