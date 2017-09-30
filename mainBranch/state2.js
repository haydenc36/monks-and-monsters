// Merchant's House
var vel;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_vendor', '../assets/tilemaps/england_vendor.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset', '../assets/tilemaps/village_tileset.png');
        
    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 500; 
        
        //Adjust the camera settings
        game.world.setBounds(0,0, 2400, 3200);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Initialize the map
        var map = game.add.tilemap('england_vendor');
        map.addTilesetImage('village_tileset');
        var floor = map.createLayer('floor');
        var walls = map.createLayer('walls');
        floor.scale.set(5);
        walls.scale.set(5);
        
        // Initialize the monk character
        monk = game.add.sprite(0, 0, 'monk');
        monk.scale.set(10);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(100, 400, 2400, 1600);
        
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