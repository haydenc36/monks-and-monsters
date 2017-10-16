var demo = demo || {};
 
demo.miraclesInventory = function (game_state, name, position, properties) {
    "use strict";
    demo.Prefab.call(this, game_state, name, position, properties);
    this.miracles = [];
    this.game_state.groups["selfskills"].forEach(function(item_object){
        this.miracles.push(item_object);
    }, this);
};
 
demo.miraclesInventory.prototype = Object.create(demo.Prefab.prototype);
demo.miraclesInventory.prototype.constructor = demo.miraclesInventory;

demo.miraclesInventory.prototype.create_menu = function (position) {
    "use strict";
    var menu_items, miracles_index, miraclesskill, menu_item, miraclesskills_menu;
    // create miracles skills menu items
    miracles_index = 0;
    menu_items = [];
    for (miracles_index = 0; miracles_index < this.miracles.length; miracles_index += 1) {
        miraclesskill = this.miracles[miracles_index];
        menu_item = new demo.miraclesSkillMenuItem(this.game_state, miraclesskill.name + "_menu_item", {x: position.x, y: position.y + miracles_index * 50}, {group: "hud", text: miraclesskill.name, style: Object.create(this.game_state.TEXT_STYLE)});
        menu_items.push(menu_item);
    };
    
    menu_item = new demo.ReturnMenuItem(this.game_state, "Return_menu_item", {x: position.x, y: position.y + miracles_index * 50}, {group: "hud", text: "Return", style: Object.create(this.game_state.TEXT_STYLE)})
    menu_items.push(menu_item);
    
    // create units menu
    miraclesskills_menu = new demo.Menu(this.game_state, "miraclesskills_menu", position, {group: "hud", menu_items: menu_items});
    miraclesskills_menu.hide();
};
 
demo.miraclesInventory.prototype.use_skill = function (skill_name, target) {
    "use strict";
    var miracles_index;
    // remove item from items list
    for (miracles_index = 0; miracles_index < this.miracles.length; miracles_index += 1) {
        if (this.miracles[miracles_index].name === skill_name) {
            this.miracles[miracles_index].use(target);
            break;
        }
    }
};