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
    else if (this.text == "ScrollSword"){
        this.showmenu = this.game_state.prefabs.SwordReq;
        this.showmenu.visible = true;
    }
    else if (this.text == "Miracle"){
        this.showmenu = this.game_state.prefabs.MiraclesReq;
        this.showmenu.visible = true;
    }
    else if (this.text == "AngelofDeath"){
        this.showmenu = this.game_state.prefabs.AODReq;
        this.showmenu.visible = true;
    }
    else if (this.text == "Heal"){
        this.showmenu = this.game_state.prefabs.HealReq;
        this.showmenu.visible = true;
    }
    else if (this.text == "Wine"){
        this.showmenu = this.game_state.prefabs.WineReq;
        this.showmenu.visible = true;
    }
    else if (this.text == "Bread"){
        this.showmenu = this.game_state.prefabs.BreadReq;
        this.showmenu.visible = true;
    }
};
 
demo.MenuItem.prototype.selection_out = function () {
    "use strict";
    this.fill = "#FFF";
    if (!!this.showmenu) {
        if ((this.showmenu == this.game_state.prefabs.SwordReq) || (this.showmenu == this.game_state.prefabs.MiraclesReq) || (this.showmenu == this.game_state.prefabs.AODReq) || (this.showmenu == this.game_state.prefabs.HealReq) || (this.showmenu == this.game_state.prefabs.WineReq) || (this.showmenu == this.game_state.prefabs.BreadReq)) {
            this.showmenu.visible = false;
        }
        else {
            this.showmenu.hide();
        }
    }
};