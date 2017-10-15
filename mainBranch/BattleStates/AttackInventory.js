var demo = demo || {};
 
demo.AttackInventory = function (game_state, name, position, properties) {
    "use strict";
    demo.Prefab.call(this, game_state, name, position, properties);
    this.skills = [];
    this.game_state.groups["attackskills"].forEach(function(item_object){
        this.skills.push(item_object);
    }, this);
};
 
demo.AttackInventory.prototype = Object.create(demo.Prefab.prototype);
demo.AttackInventory.prototype.constructor = demo.AttackInventory;

demo.AttackInventory.prototype.create_menu = function (position) {
    "use strict";
    var menu_items, attack_index, attackskill, menu_item, attackskills_menu;
    // create Magic skills menu items
    attack_index = 0;
    menu_items = [];
    for (attack_index = 0; attack_index < this.skills.length; attack_index += 1) {
        attackskill = this.skills[attack_index];
        menu_item = new demo.AttackSkillMenuItem(this.game_state, attackskill.name + "_menu_item", {x: position.x, y: position.y + attack_index * 50}, {group: "hud", text: attackskill.name, style: Object.create(this.game_state.TEXT_STYLE)});
        menu_items.push(menu_item);
    };
    
    menu_item = new demo.ReturnMenuItem(this.game_state, "Return_menu_item", {x: position.x, y: position.y + attack_index * 50}, {group: "hud", text: "Return", style: Object.create(this.game_state.TEXT_STYLE)})
    menu_items.push(menu_item);
    
    // create units menu
    attackskills_menu = new demo.Menu(this.game_state, "attackskills_menu", position, {group: "hud", menu_items: menu_items});
    attackskills_menu.hide();
};

demo.AttackInventory.prototype.use_skill = function (skill_name, target) {
    "use strict";
    var attack_index;
    // remove item from items list
    for (attack_index = 0; attack_index < this.skills.length; attack_index += 1) {
        if (this.skills[attack_index].name === skill_name) {
            this.skills[attack_index].hit(target);
            break;
        }
    }
};