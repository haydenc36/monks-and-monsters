var demo = demo || {};
 
demo.MagicInventory = function (game_state, name, position, properties) {
    "use strict";
    demo.Prefab.call(this, game_state, name, position, properties);
    this.magic = [];
    this.game_state.groups["selfskills"].forEach(function(item_object){
        this.magic.push(item_object);
    }, this);
};
 
demo.MagicInventory.prototype = Object.create(demo.Prefab.prototype);
demo.MagicInventory.prototype.constructor = demo.MagicInventory;

demo.MagicInventory.prototype.create_menu = function (position) {
    "use strict";
    var menu_items, magic_index, magicskill, menu_item, magicskills_menu;
    // create Magic skills menu items
    magic_index = 0;
    menu_items = [];
    for (magic_index = 0; magic_index < this.magic.length; magic_index += 1) {
        magicskill = this.magic[magic_index];
        menu_item = new demo.MagicSkillMenuItem(this.game_state, magicskill.name + "_menu_item", {x: position.x, y: position.y + magic_index * 50}, {group: "hud", text: magicskill.name, style: Object.create(this.game_state.TEXT_STYLE)});
        menu_items.push(menu_item);
    };
    
    menu_item = new demo.ReturnMenuItem(this.game_state, "Return_menu_item", {x: position.x, y: position.y + magic_index * 50}, {group: "hud", text: "Return", style: Object.create(this.game_state.TEXT_STYLE)})
    menu_items.push(menu_item);
    
    // create units menu
    magicskills_menu = new demo.Menu(this.game_state, "magicskills_menu", position, {group: "hud", menu_items: menu_items});
    magicskills_menu.hide();
};
 
demo.MagicInventory.prototype.use_skill = function (skill_name, target) {
    "use strict";
    var magic_index;
    // remove item from items list
    for (magic_index = 0; magic_index < this.magic.length; magic_index += 1) {
        if (this.magic[magic_index].name === skill_name) {
            this.magic[magic_index].use(target);
            break;
        }
    }
};