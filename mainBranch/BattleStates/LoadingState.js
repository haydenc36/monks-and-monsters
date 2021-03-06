var demo = demo || {};

demo.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

demo.LoadingState.prototype = Object.create(Phaser.State.prototype);
demo.LoadingState.prototype.constructor = demo.LoadingState;

demo.LoadingState.prototype.init = function (level_data, next_state, charStats, inventQ) {
    "use strict";
    this.charStats = charStats;
    this.level_data = level_data;
    this.next_state = next_state;
    this.inventQ = inventQ;
};

demo.LoadingState.prototype.preload = function () {
    "use strict";
    var assets, asset_loader, asset_key, asset;
    assets = this.level_data.assets;
    for (asset_key in assets) { // load assets according to asset key
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            }
        }
    }
};

demo.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start(this.next_state, true, false, this.level_data, this.charStats, this.inventQ);
};