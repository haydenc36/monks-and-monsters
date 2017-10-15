// Peasant's house
var demo = demo || {};
var walls_noWalk4, furniture_noWalk4;

demo.state4 = function(){};
demo.state4.prototype = {
    preload: function(){
        
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_peasant', '../assets/tilemaps/files/england_peasant.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('beautiful', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('floors', '../assets/tilemaps/tilesets/floors.png');
        game.load.image('poor_art', '../assets/tilemaps/tilesets/poor_art.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        
    },
    
    create:function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 800; 
        
        //Adjust the camera settings
        game.world.setBounds(0,0, 1280, 1280);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_peasant');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('poor_art');
        map.addTilesetImage('floors');
        map.addTilesetImage('beautiful');
        
        // Integrate the layers
        var floor = map.createLayer('floor');
        var walls_walk = map.createLayer('walls_walk');
        walls_noWalk4 = map.createLayer('walls_noWalk4');
        furniture_noWalk4 = map.createLayer('furniture_noWalk4');
        var background_decor = map.createLayer('background_decor');
        var furniture_walk = map.createLayer('furniture_walk');
        var foreground_decor = map.createLayer('foreground_decor');
        
        // Scale the layers
        floor.scale.set(9.375);
        walls_walk.scale.set(9.375);
        walls_noWalk4.scale.set(9.375);
        furniture_walk.scale.set(9.375);
        furniture_noWalk4.scale.set(9.375);
        background_decor.scale.set(9.375);
        foreground_decor.scale.set(9.375);
        
        
        // Initialize the monk character
        monk = game.add.sprite(500, 500, 'monk');
        monk.scale.set(16);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        map.setCollisionBetween(1387, 1387, true, 'walls_noWalk4');
        map.setCollisionBetween(296, 1031, true, 'furniture_noWalk4');
        
        //Camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(140, 100, 1000, 300);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, walls_noWalk4, function(){console.log('walls');});
        game.physics.arcade.collide(monk, furniture_noWalk4, function(){console.log('furniture')});
        
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