// Merchant's House
var vel, walls_noWalk, furniture_noWalk;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_vendor', '../assets/tilemaps/files/england_vendor.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        game.load.image('door', '../assets/tilemaps/tilesets/door.png');

    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 700; 
        
        //Adjust the camera settings
        game.world.setBounds(0,0, 2400, 3600);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_vendor');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('village_tileset2');
        map.addTilesetImage('door');
        
        // Integrate the layers
        var floor = map.createLayer('floor');
        var walls_walk = map.createLayer('walls_walk');
        walls_noWalk = map.createLayer('walls_noWalk');
        var furniture_walk = map.createLayer('furniture_walk');
        furniture_noWalk = map.createLayer('furniture_noWalk');
        
        // Scale the layers
        floor.scale.set(5);
        walls_walk.scale.set(5);
        walls_noWalk.scale.set(5);
        furniture_walk.scale.set(5);
        furniture_noWalk.scale.set(5);
        
        // Initialize the monk character
        monk = game.add.sprite(1000, 1000, 'monk');
        monk.scale.set(10);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        map.setCollisionBetween(33, 45, true, 'walls_noWalk');
        map.setCollisionBetween(6, 145, true, 'furniture_noWalk');
        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(100, 400, 2400, 1600);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, walls_noWalk, function(){console.log('walls');});
        game.physics.arcade.collide(monk, furniture_noWalk, function(){console.log('furniture')});
        
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