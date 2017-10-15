// Monastery
var demo = demo || {};

demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_monastery', '../assets/tilemaps/files/england_monastery.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        game.load.image('beautiful', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('floors', '../assets/tilemaps/tilesets/floors.png');
        game.load.image('furniture', '../assets/tilemaps/tilesets/furniture.png');
        game.load.image('furniture2', '../assets/tilemaps/tilesets/furniture2.png');
        game.load.image('monastery', '../assets/tilemaps/tilesets/monastery.png');
        game.load.image('religious', '../assets/tilemaps/tilesets/religious.png');
        game.load.image('spooky', '../assets/tilemaps/tilesets/spooky.png');
        
    },
    
    create:function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 600;
                
        //Adjust the camera settings
        game.world.setBounds(0,0, 2400, 2400);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_monastery');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('village_tileset2');
        map.addTilesetImage('beautiful');
        map.addTilesetImage('floors');
        map.addTilesetImage('furniture');
        map.addTilesetImage('furniture2');
        map.addTilesetImage('monastery');
        map.addTilesetImage('religious');
        map.addTilesetImage('spooky');
        
        // Integrate the layers
        var ground3 = map.createLayer('ground3');
        var walls3_walk = map.createLayer('walls3_walk3');
        var walls3_noWalk = map.createLayer('walls3_noWalk3');
        var furniture3_foreground = map.createLayer('furniture3_foreground3');
        var stairs = map.createLayer('stairs3');
        var buildings3_walk = map.createLayer('buildings3_walk3');
        var buildings3_noWalk = map.createLayer('buildings3_noWalk3');
        var roof3_noWalk = map.createLayer('roof3_noWalk3');
        var windows = map.createLayer('windows3');
        var decor = map.createLayer('decor3');
        var roof3_walk = map.createLayer('roof3_walk3');
        
        // Scale the layers
        ground3.scale.set(1.875);
        walls3_walk.scale.set(1.875);
        walls3_noWalk.scale.set(1.875);
        furniture3_foreground.scale.set(1.875);
        stairs.scale.set(1.875);
        buildings3_walk.scale.set(1.875);
        buildings3_noWalk.scale.set(1.875);
        roof3_noWalk.scale.set(1.875);
        roof3_walk.scale.set(1.875);
        windows.scale.set(1.875);
        decor.scale.set(1.875);
        
        
        // Initialize the monk character
        monk = game.add.sprite(800, 2400, 'monk');
        monk.scale.set(2.9);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        //map.setCollisionBetween(33, 47, true, 'walls_noWalk');
        //map.setCollisionBetween(6, 146, true, 'furniture_noWalk');
        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 1000, 400);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    
    update: function(){
        //Set movement controls
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