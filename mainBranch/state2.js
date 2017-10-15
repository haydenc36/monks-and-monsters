// Aristocrat's House
var demo = demo || {};
var walls_noWalk2, furniture_noWalk2;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_vendor', '../assets/tilemaps/files/england_vendor.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        game.load.image('door', '../assets/tilemaps/tilesets/door.png');
        game.load.image('art', '../assets/tilemaps/tilesets/art.png');
        game.load.image('couches', '../assets/tilemaps/tilesets/couches.png');
        

    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 700;
                
        //Adjust the camera settings
        game.world.setBounds(0,0, 1320, 1760);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_vendor');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('village_tileset2');
        map.addTilesetImage('door');
        map.addTilesetImage('art');
        map.addTilesetImage('couches');
        
        // Integrate the layers
        var floor2 = map.createLayer('floor2');
        var walls_walk2 = map.createLayer('walls_walk2');
        walls_noWalk2 = map.createLayer('walls_noWalk2');
        var window2 = map.createLayer('window2');
        var furniture_walk2 = map.createLayer('furniture_walk2');
        furniture_noWalk2 = map.createLayer('furniture_noWalk2');
        
        // Scale the layers
        floor2.scale.set(2.75);
        walls_walk2.scale.set(2.75);
        walls_noWalk2.scale.set(2.75);
        furniture_walk2.scale.set(2.75);
        furniture_noWalk2.scale.set(2.75);
        window2.scale.set(2.75);

        
        // Initialize the monk character
        monk = game.add.sprite(580, 105, 'monk');
        monk.scale.set(5);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        map.setCollisionBetween(34, 47, true, 'walls_noWalk2');
        map.setCollisionBetween(138, 146, true, 'furniture_noWalk2');
        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 1000, 400);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, walls_noWalk2, function(){console.log('walls_noWalk');});
        game.physics.arcade.collide(monk, furniture_noWalk2, function(){console.log('furniture_noWalk')});
        
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