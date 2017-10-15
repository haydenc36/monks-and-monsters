var demo = demo || {};

demo.ItemMenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.MenuItem.call(this, game_state, name, position, properties);
    
    this.item_quantity = new demo.ShowQuantity(this.game_state, this.text + "_quantity", {x: this.x + 250, y: this.y}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "quantity"});
};

demo.ItemMenuItem.prototype = Object.create(demo.MenuItem.prototype);
demo.ItemMenuItem.prototype.constructor = demo.ItemMenuItem;

demo.ItemMenuItem.prototype.select = function () {
    "use strict";
    // disable actions menu
    this.game_state.prefabs.items_menu.disable();
    // enable player units menu so the player can choose the target
    this.game_state.prefabs.players_menu.enable();
    // save selected item
    this.game_state.current_item = this.text;
};