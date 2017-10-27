// Countryside
var demo = demo || {};

demo.state7 = function(){};
demo.state7.prototype = {
    
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_countryside', '../assets/tilemaps/files/england_countryside.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('beautiful', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('paths', '../assets/tilemaps/tilesets/paths.png');
        game.load.image('religious', '../assets/tilemaps/tilesets/religious.png');
        game.load.image('spooky', '../assets/tilemaps/tilesets/spooky.png');
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        
    },
    
    create:function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 400;
        
        //Adjust camera settings
        game.world.setBounds(0, 0, 2400, 640);
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Integrate the map
        var map = game.add.tilemap('england_countryside');
        
        // Integrate the tilesets
        map.addTilesetImage('beautiful');
        map.addTilesetImage('paths');
        map.addTilesetImage('religious');
        map.addTilesetImage('spooky');
        map.addTilesetImage('village_tileset2');
        
        // Integrate the layers
        var grass = map.createLayer('grass');
        var path = map.createLayer('path');
        var cave_walk = map.createLayer('cave_walk');
        var objects_noWalk = map.createLayer('objects_noWalk');
        var objects_walk = map.createLayer('objects_walk');
        var flowers = map.createLayer('flowers');
        var cave_noWalk = map.createLayer('cave_noWalk');
        var tree_walk = map.createLayer('tree_walk');
        var trees_noWalk = map.createLayer('trees_noWalk');
        var buildings_noWalk = map.createLayer('buildings_noWalk');
        var buildings_walk = map.createLayer('buildings_walk');
        
        // Initialize the monk character
        monk = game.add.sprite(0, 0, 'monk');
        monk.scale.set(2.5);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkDown', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkRight', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkLeft', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(500, 200, 200, 200);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
        
        //game.physics.arcade.collide(monk, buildings);
        
//        // Set movement controls
//        if (cursors.up.isDown){
//            monk.body.velocity.y = -vel;
//        }
//        
//        else if (cursors.down.isDown){
//            monk.body.velocity.y = vel;
//        }
//        
//        else{
//            monk.body.velocity.y = 0;
//        }
//        
//        if (cursors.left.isDown){
//            monk.body.velocity.x = -vel;
//        }
//        
//        else if (cursors.right.isDown){
//            monk.body.velocity.x = vel;
//        }
//        
//        else{
//            monk.body.velocity.x = 0;
//        }
        
        
        // Up and Down
        if (cursors.up.isDown){
            //console.log("UP");
            monk.body.velocity.y = -vel;
            monk.animations.play('walkUp');
        }
        else if (cursors.down.isDown){
            //console.log("DOWN");
            monk.body.velocity.y = vel;
            monk.animations.play('walkDown');
        }
        else {
            monk.body.velocity.y = 0;
        }
        // Right & Left
        if (cursors.right.isDown){
            //console.log("RIGHT");
            monk.body.velocity.x = vel;
            monk.animations.play('walkRight');
            monk.scale.set(2,2);
        }
        else if (cursors.left.isDown){
            //console.log("LEFT");
            monk.body.velocity.x = -vel;
            monk.animations.play('walkLeft');
            monk.scale.set(-2,2);
        }
        else {
            monk.body.velocity.x = 0;
        }
        
        
    }
};