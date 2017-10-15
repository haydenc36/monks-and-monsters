var demo = demo || {};
 
demo.Inventory = function (game_state, name, position, properties) {
    "use strict";
    demo.Prefab.call(this, game_state, name, position, properties);
    
    this.item_classes = {
        "wine": demo.Wine.prototype.constructor,
        "bread": demo.Bread.prototype.constructor
    };
    
    this.items = [];
    
    this.game_state.groups["items"].forEach(function(item_object){
        if (item_object.name != "inventory"){
            this.items.push(item_object);
        }
    }, this);
};
 
demo.Inventory.prototype = Object.create(demo.Prefab.prototype);
demo.Inventory.prototype.constructor = demo.Inventory;

demo.Inventory.prototype.create_menu = function (position) {
    "use strict";
    var menu_items, item_index, item, menu_item, items_menu;
    // create units menu items
    item_index = 0;
    menu_items = [];
    for (item_index = 0; item_index < this.items.length; item_index += 1) {
        item = this.items[item_index];
        menu_item = new demo.ItemMenuItem(this.game_state, item.name + "_menu_item", {x: position.x, y: position.y + item_index * 50}, {group: "hud", text: item.name, style: Object.create(this.game_state.TEXT_STYLE)});
        menu_items.push(menu_item);
    };
    
    menu_item = new demo.ReturnMenuItem(this.game_state, "Return_menu_item", {x: position.x, y: position.y + item_index * 50}, {group: "hud", text: "Return", style: Object.create(this.game_state.TEXT_STYLE)})
    menu_items.push(menu_item);
    
    // create units menu
    items_menu = new demo.Menu(this.game_state, "items_menu", position, {group: "hud", menu_items: menu_items});
    items_menu.hide();
};
 
demo.Inventory.prototype.collect_item = function (item_object) {
    "use strict";
    var item;
    // create item prefab
    item = new this.item_classes[item_object.type](this.game_state, item_object.type + this.items.length, {x: 0, y: 0}, item_object.properties);
    this.items.push(item);
};
 
demo.Inventory.prototype.use_item = function (item_name, target) {
    "use strict";
    var item_index;
    // remove item from items list
    for (item_index = 0; item_index < this.items.length; item_index += 1) {
        if (this.items[item_index].name === item_name) {
            this.items[item_index].use(target);
            break;
        }
    }
};