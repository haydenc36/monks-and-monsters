// Countryside
var demo = demo || {};

demo.state7 = function(){};
demo.state7.prototype = {
    
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('countryside', '../assets/tilemaps/files/countryside.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('countryside', '../assets/backgrounds/countryside.png');
        
    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 400;
        //addChangeStateEventListeners();
        
        //Adjust camera settings
        game.world.setBounds(0, 0, 2400, 2400);
        //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Initialize the map
        var map = game.add.tilemap('countryside');
        map.addTilesetImage('countryside');
        
        var sky = map.createLayer('sky');
        var grass = map.createLayer('grass');
        var trees = map.createLayer('trees');
        var path = map.createLayer('path');
        
        // Allow for collisions
        map.setCollisionBetween(1, 203, true, 'trees');
        
        // Initialize the monk character
        monk = game.add.sprite(0, 2000, 'monk');
        monk.scale.set(2.5);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Adjust the camera
        //game.camera.follow(monk);
        //game.camera.deadzone = new Phaser.Rectangle(100, 400, 1000, 1000);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, buildings);
        
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