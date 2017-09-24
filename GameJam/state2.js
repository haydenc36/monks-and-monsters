// ENGLAND BUILDING
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        
        game.load.tilemap('england_building', '../assets/tilemaps/england_building.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('magecity', '../assets/tilemaps/magecity.png');
    },
    
    create:function(){
    
        var map = game.add.tilemap('england_building');
        map.addTilesetImage('magecity');
        
        var floor = map.createLayer('floor');
        var wall = map.createLayer('wall');
        var furniture = map.createLayer('furniture');
        var windows = map.createLayer('windows');
        var statue = map.createLayer('statue');
        var food_drink = map.createLayer('food_drink');
        var hidden_furniture = map.createLayer('hidden_furniture');
        
    },
    
    update: function(){}
};