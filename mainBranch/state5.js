// Brothel / Revolutionary Hangout
var demo = demo || {};
demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_brothel', '../assets/tilemaps/files/england_brothel.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('art', '../assets/tilemaps/tilesets/art.png');
        game.load.image('couches', '../assets/tilemaps/tilesets/couches.png');
        game.load.image('floors', '../assets/tilemaps/tilesets/floors.png');
        game.load.image('furniture', '../assets/tilemaps/tilesets/furniture.png');
        game.load.image('furniture2', '../assets/tilemaps/tilesets/furniture2.png');
        game.load.image('religious', '../assets/tilemaps/tilesets/religious.png');
        game.load.image('stairs', '../assets/tilemaps/tilesets/stairs.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('wallpaper', '../assets/tilemaps/tilesets/wallpaper.png');
        game.load.image('windows', '../assets/tilemaps/tilesets/windows.png');
        game.load.image('windows2', '../assets/tilemaps/tilesets/windows2.png');
        
    },
    
    create:function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 800; 
        
        //Adjust the camera settings
        game.world.setBounds(0,0, 2240, 1680);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_brothel');
        map.addTilesetImage('art');
        map.addTilesetImage('couches');
        map.addTilesetImage('floors');
        map.addTilesetImage('furniture');
        map.addTilesetImage('furniture2');
        map.addTilesetImage('religious');
        map.addTilesetImage('stairs');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('wallpaper');
        map.addTilesetImage('windows');
        map.addTilesetImage('windows2');
        
        // Integrate the layers
        var floor = map.createLayer('floor');
        var walls_noWalk = map.createLayer('walls_noWalk');
        var walls_walk = map.createLayer('walls_walk');
        var windows = map.createLayer('windows');
        var furniture_walk = map.createLayer('furniture_walk');
        var furniture_noWalk = map.createLayer('furniture_noWalk');
        var stairs = map.createLayer('stairs');
        
        // Scale the layers
        floor.scale.set(3.5);
        walls_walk.scale.set(3.5);
        walls_noWalk.scale.set(3.5);
        windows.scale.set(3.5);
        furniture_walk.scale.set(3.5);
        furniture_noWalk.scale.set(3.5);
        stairs.scale.set(3.5);
        
        
        // Initialize the monk character
        monk = game.add.sprite(1230, 150, 'monk');
        monk.scale.set(5);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        //map.setCollisionBetween(1387, 1387, true, 'walls_noWalk4');
        //map.setCollisionBetween(296, 1031, true, 'furniture_noWalk4');
        
        //Camera
        game.camera.follow(monk);
        monk.
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 1000, 400);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    
    update: function(){
        
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