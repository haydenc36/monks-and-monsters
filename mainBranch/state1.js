// English Village
var demo = {};
var monk, vel, cursors;

demo.state1 = function(){};
demo.state1.prototype = {
    
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_village', '../assets/tilemaps/england_village.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset', '../assets/tilemaps/village_tileset.png');
        game.load.image('village_tileset2', '../assets/tilemaps/village_tileset2.png');
    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        speed = 10; 
        
        //Adjust camera settings
        game.world.setBounds(0,0, 3200, 3200);
        //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var map = game.add.tilemap('england_village');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('village_tileset2');
        
        var grass = map.createLayer('grass');
        var trees = map.createLayer('trees');
        var paths = map.createLayer('paths');
        var city_gate = map.createLayer('city_gate');
        var leaves = map.createLayer('leaves');
        var fences = map.createLayer('fences');
        var windows = map.createLayer('windows');
        var stairs = map.createLayer('stairs');
        var buildings = map.createLayer('buildings');
        
        // Allow for collisions
        map.setCollisionBetween()
        
        // Initialize the monk character
        monk = game.add.sprite(3200, 1632, 'monk');
        monk.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Adjust the camera
        game.camera.follow(monk);
        //game.camera.deadzone = new Phaser.Rectange(0, 800, 800, 800);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        
        // Set movement controls
        // MOVING
        if (cursors.up.isDown){
            monk.body.velocity.y = -vel;
        }
        
        else if (cursors.down.isDown){
            monk.body.velocity.y = vel;
        }
        
        else{
            monk.body.velocity.y = 0;
        }
        
        if (cursors.up.isDown){
            monk.body.velocity.x = -vel;
        }
        
        else if (cursors.up.isDown){
            monk.body.velocity.x = vel;
        }
        
        else{
            monk.body.velocity.x = 0;
        }
        
        
        
//        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
//
//            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
//                monk.y -= speed;
//                monk.animations.play('walk', 5, true);
//            }
//            else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
//                monk.y += speed;
//                monk.animations.play('walk', 5, true);
//            }
//
//            // LEFT AND RIGHT
//            if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
//                monk.scale.setTo(-1, 1);
//                monk.x += speed;
//                monk.animations.play('walk', 5, true);
//            }
//            else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
//                monk.scale.setTo(1, 1);
//                monk.x -= speed;
//                monk.animations.play('walk', 5, true);
//            }
//        }
//
//        // NOT MOVING
//        else{
//            monk.animations.stop('walk');
//            monk.frame = 0;
        //}
    }
};