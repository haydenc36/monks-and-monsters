// English Village
var demo = {};
var monk, cursors, vel, buildings2_noWalk, buildings1_noWalk, mountains_nowalking;

demo.state1 = function(){};
demo.state1.prototype = {
    
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
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
        
    },
    
    create: function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 600;
        vel = 100;
        //addChangeStateEventListeners();
        
        //Adjust camera settings
        game.world.setBounds(0, 0, 2400, 2400);
        //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
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
        
        // Integrate the layers
        var grass = map.createLayer('grass');
        var path2 = map.createLayer('path2');
        var grass2 = map.createLayer('grass2');
        var path1 = map.createLayer('path1');
        var montains_walking = map.createLayer('montains_walking');
        buildings2_noWalk = map.createLayer('buildings2_noWalk');
        var buildings2_walk = map.createLayer('buildings2_walk');
        buildings1_noWalk = map.createLayer('buildings1_noWalk');
        var buildings1_walk = map.createLayer('buildings1_walk');
        mountains_nowalking = map.createLayer('mountains_nowalking');
        
        // Initialize the monk character
        monk = game.add.sprite(0, 2100, 'monk');
        monk.scale.set(2);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        map.setCollisionBetween(265, 14627, true, 'buildings2_noWalk');
        map.setCollisionBetween(265, 13506, true, 'buildings1_noWalk');
        map.setCollisionBetween(11830, 12070, true, 'mountains_nowalking');
        
        
        // Adjust the camera
        //game.camera.follow(monk);
        //game.camera.deadzone = new Phaser.Rectangle(100, 100, 1000, 500);
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(140, 100, 1000, 400);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, buildings2_noWalk, function(){console.log('buildings2');});
        game.physics.arcade.collide(monk, buildings1_noWalk, function(){console.log('buildings1')});
        game.physics.arcade.collide(monk, mountains_nowalking, function(){console.log('mountains');});
        
        // Set movement controls
        if (cursors.up.isDown){
            monk.body.velocity.y = -vel;
        }
        
        else if (cursors.down.isDown){
            monk.body.velocity.y = vel;
        }
        
        else{
            monk.body.velocity.y = 0;
        }
        
        if (cursors.left.isDown){
            monk.body.velocity.x = -vel;
        }
        
        else if (cursors.right.isDown){
            monk.body.velocity.x = vel;
        }
        
        else{
            monk.body.velocity.x = 0;
        }
    }
};