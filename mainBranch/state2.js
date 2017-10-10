// Aristocrat's House
var monk2, cursors2, vel2, walls_noWalk2, furniture_noWalk2;

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
        vel2 = 700;
                
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
        monk2 = game.add.sprite(580, 105, 'monk');
        monk2.scale.set(5);
        game.physics.enable(monk2);
        monk2.body.collideWorldBounds = true;
        monk2.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        map.setCollisionBetween(34, 47, true, 'walls_noWalk2');
        map.setCollisionBetween(138, 146, true, 'furniture_noWalk2');
        
        // Adjust the camera
        game.camera.follow(monk2);
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 1000, 400);
        
        // Controls
        cursors2 = game.input.keyboard.createCursorKeys();
        
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk2, walls_noWalk2, function(){console.log('walls_noWalk');});
        game.physics.arcade.collide(monk2, furniture_noWalk2, function(){console.log('furniture_noWalk')});
        
        // Set movement controls
        if (cursors2.up.isDown){
            monk2.body.velocity.y = -vel2;
        }
        
        else if (cursors2.down.isDown){
            monk2.body.velocity.y = vel2;
        }
        
        else{
            monk2.body.velocity.y = 0;
        }
        
        if (cursors2.left.isDown){
            monk2.body.velocity.x = -vel2;
        }
        
        else if (cursors2.right.isDown){
            monk2.body.velocity.x = vel2;
        }
        
        else{
            monk2.body.velocity.x = 0;
        }
    }
};