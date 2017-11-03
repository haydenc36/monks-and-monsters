// English Village
var demo = demo || {};
var monk, cursors, vel = 200, trigger1a, trigger1b, trigger1c, buildings2_noWalk1, buildings1_noWalk1, mountains_nowalking1, characterEnergy, characterMana, characterStamina, wineQ, breadQ;

demo.state1 = function(){};
demo.state1.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
        game.load.tilemap('england_village', '../assets/tilemaps/files/england_village.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        game.load.image('barracks', '../assets/tilemaps/tilesets/barracks.png');
        game.load.image('castle', '../assets/tilemaps/tilesets/castle.png');
        game.load.image('castle1', '../assets/tilemaps/tilesets/castle1.png');
        game.load.image('chapel', '../assets/tilemaps/tilesets/chapel.png');
        game.load.image('door', '../assets/tilemaps/tilesets/door.png');
        game.load.image('farmhouse', '../assets/tilemaps/tilesets/farmhouse.png');
        game.load.image('hut2', '../assets/tilemaps/tilesets/hut.png');
        game.load.image('huts', '../assets/tilemaps/tilesets/hut2.png');
        game.load.image('lodges', '../assets/tilemaps/tilesets/lodge.png');
        game.load.image('lodges2', '../assets/tilemaps/tilesets/lodge2.png');
        game.load.image('monastery', '../assets/tilemaps/tilesets/monastery.png');
        game.load.image('mountain', '../assets/tilemaps/tilesets/paths.png');
        game.load.image('pub', '../assets/tilemaps/tilesets/pub.png');
        game.load.image('sawmill', '../assets/tilemaps/tilesets/sawmill.png');
        game.load.image('stable2', '../assets/tilemaps/tilesets/stable.png');
        game.load.image('stonehut', '../assets/tilemaps/tilesets/hut3.png');
        game.load.image('timbered', '../assets/tilemaps/tilesets/timbered.png');
        game.load.image('town', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('walltowers', '../assets/tilemaps/tilesets/towers.png');
        game.load.image('brothel', '../assets/tilemaps/tilesets/brothel.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('sky', '../assets/tilemaps/tilesets/sky.png');        
    },
    
    create: function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //Adjust camera settings
        game.world.setBounds(0, 0, 2400, 2400);
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        
        // Integrate the map
        var map = game.add.tilemap('england_village');
        
        
        // Integrate the tilesets into the map
        map.addTilesetImage('village_tileset2');
        map.addTilesetImage('barracks');
        map.addTilesetImage('castle');
        map.addTilesetImage('castle1');
        map.addTilesetImage('chapel');
        map.addTilesetImage('door');
        map.addTilesetImage('farmhouse');
        map.addTilesetImage('hut2');
        map.addTilesetImage('huts');
        map.addTilesetImage('lodges');
        map.addTilesetImage('lodges2');
        map.addTilesetImage('monastery');
        map.addTilesetImage('mountain');
        map.addTilesetImage('pub');
        map.addTilesetImage('sawmill');
        map.addTilesetImage('stable2');
        map.addTilesetImage('stonehut');
        map.addTilesetImage('timbered');
        map.addTilesetImage('town');
        map.addTilesetImage('walltowers');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('sky');
        map.addTilesetImage('brothel');
        
        
        // Integrate the layers
        trigger1a = map.createLayer('trigger1a');
        trigger1b = map.createLayer('trigger1b');
        trigger1c = map.createLayer('trigger1c');
        trigger1d = map.createLayer('trigger1d');
        var grass = map.createLayer('grass1');
        var skies1 = map.createLayer('skies1');
        var path2 = map.createLayer('path1_b');
        var grass2 = map.createLayer('grass1_b');
        var path1 = map.createLayer('path1_a');
        mountains_nowalking1 = map.createLayer('mountains_nowalking1');
        var montains_walking = map.createLayer('montains_walking1');
        buildings2_noWalk1 = map.createLayer('buildings2_noWalk1');
        var buildings2_walk1 = map.createLayer('buildings2_walk1');
        buildings1_noWalk1 = map.createLayer('buildings1_noWalk1');
        var buildings1_walk1 = map.createLayer('buildings1_walk1');
        var flowers1 = map.createLayer('flowers1');
        
        
        // Initialize the monk character
        if (coordinate == 'start')
            {
                monk = game.add.sprite(5, 1200, 'monk');
            }
        else if (coordinate == 'monastery')
            {
                monk = game.add.sprite(700, 1100, 'monk');
            }
        else if (coordinate == 'hut')
            {
                monk = game.add.sprite(511, 1968, 'monk');
            }
        else if (coordinate == 'country')
            {
                monk = game.add.sprite(15, 2036, 'monk');
            }
        else if (coordinate == 'brothel')
            {
                monk = game.add.sprite(2012, 500, 'monk');
            }
        
        monk.scale.set(0.3);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        //monk.animations.add('walkDown', [0], 10);
        monk.animations.add('walk', [1,2], 5);
        //monk.animations.add('walkRight', [0,1,2], 10);
        //monk.animations.add('walkLeft', [3,4], 10);
        
        
        // Allow for collisions
        map.setCollisionBetween(11472, 15192, true, 'buildings2_noWalk1');
        map.setCollisionBetween(2025, 15714, true, 'buildings1_noWalk1');
        map.setCollisionBetween(53, 15471, true, 'mountains_nowalking1');
        map.setCollisionBetween(15408, 15408, true, 'trigger1a');
        map.setCollisionBetween(15408, 15408, true, 'trigger1b');
        map.setCollisionBetween(15408, 15408, true, 'trigger1c');
        map.setCollisionBetween(15408, 15408, true, 'trigger1d');
        
        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(500, 200, 200, 200);
        
        createHUD(this);
    },
    
    
    update: function(){
        
        // Enabling collisions
        game.physics.arcade.collide(monk, buildings2_noWalk1, function(){console.log('buildings2');});
        game.physics.arcade.collide(monk, buildings1_noWalk1, function(){console.log('buildings1')});
        game.physics.arcade.collide(monk, mountains_nowalking1, function(){console.log('mountains');});
        
        
        // Transitioning between maps
        game.physics.arcade.collide(monk, trigger1a, function(){console.log('Peasants House'); game.state.start('state4');});
        game.physics.arcade.collide(monk, trigger1b, function(){console.log('Brothel'); game.state.start('state5');});
        game.physics.arcade.collide(monk, trigger1c, function(){console.log('Monastery'); game.state.start('state3');});
        game.physics.arcade.collide(monk, trigger1d, function(){console.log('Country'); game.state.start('state7');});
        
        
        cursorControl(0.3);
        updateHUD(this);
    }/*,
    
    
    render: function () {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(monk, 32, 500);
    }*/
};