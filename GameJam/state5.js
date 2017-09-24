//Monster Lair
demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.tilemap('MonsterLair', '../assets/tilemaps/MonsterLair.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ground', '../assets/tilemaps/ground_tiles.png');
        game.load.image('obj', '../assets/tilemaps/object-layer.png');
    },
    create:function(){
        var map = game.add.tilemap('MonsterLair');
        map.addTilesetImage('ground');
        map.addTilesetImage('obj');
        
        var sand = map.createLayer('Sand');
        var sanddeets = map.createLayer('SandDetails');
        var rocks = map.createLayer('Rock');
        var bar = map.createLayer('Barrel');
    },
    update: function(){}
};