// English Village
var monk1, cursors1, vel1, buildings2_noWalk1, buildings1_noWalk1, mountains_nowalking1;

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
        game.load.image('brothel', '../assets/tilemaps/tilesets/brothel.png')
        
    },
    
    create: function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel1 = 600;
        //addChangeStateEventListeners();
        
        //Adjust camera settings
        game.world.setBounds(0, 0, 2400, 2400);
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
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
        map.addTilesetImage('brothel');
        
        // Integrate the layers
        var grass = map.createLayer('grass1');
        var path2 = map.createLayer('path1_b');
        var grass2 = map.createLayer('grass1_b');
        var path1 = map.createLayer('path1_a');
        mountains_nowalking1 = map.createLayer('mountains_nowalking1');
        var montains_walking = map.createLayer('montains_walking1');
        buildings2_noWalk1 = map.createLayer('buildings2_noWalk1');
        var buildings2_walk1 = map.createLayer('buildings2_walk1');
        buildings1_noWalk1 = map.createLayer('buildings1_noWalk1');
        var buildings1_walk1 = map.createLayer('buildings1_walk1');
        
        // Initialize the monk character
        monk1 = game.add.sprite(0, 2100, 'monk');
        monk1.scale.set(2);
        game.physics.enable(monk1);
        monk1.body.collideWorldBounds = true;
        monk1.anchor.setTo(0.5, 0.5);
        monk1.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        map.setCollisionBetween(265, 14627, true, 'buildings2_noWalk1');
        map.setCollisionBetween(265, 13506, true, 'buildings1_noWalk1');
        map.setCollisionBetween(11830, 12070, true, 'mountains_nowalking1');
        
        // Adjust the camera
        game.camera.follow(monk1);
        //game.camera.follow(monk, Phaser.Camera.FOLLOW_SMOOTH);
        //game.camera.deadzone = new Phaser.Rectangle(100, 100, 1000, 500);
        game.camera.deadzone = new Phaser.Rectangle(140, 100, 1000, 300);
        
        // Controls
        cursors1 = game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk1, buildings2_noWalk1, function(){console.log('buildings2');});
        game.physics.arcade.collide(monk1, buildings1_noWalk1, function(){console.log('buildings1')});
        game.physics.arcade.collide(monk1, mountains_nowalking1, function(){console.log('mountains');});
        
        // Set movement controls
        if (cursors1.up.isDown){
            monk1.body.velocity.y = -vel1;
        }
        
        else if (cursors1.down.isDown){
            monk1.body.velocity.y = vel1;
        }
        
        else{
            monk1.body.velocity.y = 0;
        }
        
        if (cursors1.left.isDown){
            monk1.body.velocity.x = -vel1;
        }
        
        else if (cursors1.right.isDown){
            monk1.body.velocity.x = vel1;
        }
        
        else{
            monk1.body.velocity.x = 0;
        }
    }
};