var demo = demo || {};
 
demo.MenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.TextPrefab.call(this, game_state, name, position, properties);
};
 
demo.MenuItem.prototype = Object.create(demo.TextPrefab.prototype);
demo.MenuItem.prototype.constructor = demo.MenuItem;
 
demo.MenuItem.prototype.selection_over = function (curs) {
    "use strict";
    this.fill = "#CCF";
    if (this.text == "Attacks") {
        this.showmenu = this.game_state.prefabs.attackskills_menu;
        this.showmenu.show();
    }
    else if (this.text == "Miracles") {
        this.showmenu = this.game_state.prefabs.miraclesskills_menu;
        this.showmenu.show();
    }
    else if (this.text == "Item") {
        this.showmenu = this.game_state.prefabs.items_menu;
        this.showmenu.show();
    }
};
 
demo.MenuItem.prototype.selection_out = function () {
    "use strict";
    this.fill = "#FFF";
    if (!!this.showmenu) {
        this.showmenu.hide();
    }
};