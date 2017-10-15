var demo = demo || {};
 
demo.MenuItem = function (game_state, name, position, properties) {
    "use strict";
    demo.TextPrefab.call(this, game_state, name, position, properties);
};
 
demo.MenuItem.prototype = Object.create(demo.TextPrefab.prototype);
demo.MenuItem.prototype.constructor = demo.MenuItem;
 
demo.MenuItem.prototype.selection_over = function () {
    "use strict";
    this.fill = "#CCF";
};
 
demo.MenuItem.prototype.selection_out = function () {
    "use strict";
    this.fill = "#FFF";
};