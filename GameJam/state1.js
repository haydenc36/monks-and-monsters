var demo = {};
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        
        game.load.tilemap('england_village', '../assets/tilemaps/england_village.tmx', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('magecity', '../assets/tilemaps/magecity.png');
        game.load.image('tileset', '../assets/tilemaps/wood_tileset.png');
        
    },
    create:function(){
        game.state.backgroundColor = '#DDDDDD';

        var map = game.add.tilemap('england_village');
        map.addTilesetImage('magecity');
        map.addTilesetImage('tileset');
        
        var grass = map.createLayer('grass');
        var trees = map.createLayer('trees');
        var paths = map.createLayer('paths');
        var city_gate = map.createLayer('city_gate');
        var leaves = map.createLayer('leaves');
        var fences = map.createLayer('fences');
        var windows = map.createLayer('windows');
        var stairs = map.createLayer('stairs');
        var buildings = map.createLayer('buildings');
        
    },
    update: function(){}
};