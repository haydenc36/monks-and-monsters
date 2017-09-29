// England Monster Lair
var monk, speed;

demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32); 
        game.load.tilemap('MonsterLair', '../assets/tilemaps/MonsterLair.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ground', '../assets/tilemaps/ground_tiles.png');
        game.load.image('obj', '../assets/tilemaps/object-layer.png');
    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        speed = 5;
        
        //Adjust camera settings
        game.world.setBounds(0,0, 800, 800);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var map = game.add.tilemap('MonsterLair');
        map.addTilesetImage('ground');
        map.addTilesetImage('obj');
        
        var sand = map.createLayer('Sand');
        var sanddeets = map.createLayer('SandDetails');
        var rocks = map.createLayer('Rock');
        var bar = map.createLayer('Barrel');
        
        // Initialize the monk character
        monk = game.add.sprite(0, 0, 'monk');
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
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
                monk.y -= speed;
                monk.animations.play('walk', 5, true);
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
                monk.y += speed;
                monk.animations.play('walk', 5, true);
            }

            // LEFT AND RIGHT
            if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                monk.scale.setTo(-1, 1);
                monk.x += speed;
                monk.animations.play('walk', 5, true);
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
                monk.scale.setTo(1, 1);
                monk.x -= speed;
                monk.animations.play('walk', 5, true);
            }
        }

        // NOT MOVING
        else{
            monk.animations.stop('walk');
            monk.frame = 0;
        }
    }
};