// Merchant's House
var monk;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_building', '../assets/tilemaps/england_building.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('magecity', '../assets/tilemaps/magecity.png');
        
    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        speed = 6; 
        
        //Adjust camera settings
        game.world.setBounds(0,0, 2400, 3400);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var map = game.add.tilemap('england_building');
        map.addTilesetImage('magecity');
        
        var floor = map.createLayer('floor');
        var wall = map.createLayer('wall');
        var furniture = map.createLayer('furniture');
        var windows = map.createLayer('windows');
        var statue = map.createLayer('statue');
        var food_drink = map.createLayer('food_drink');
        var hidden_furniture = map.createLayer('hidden_furniture');
        
        floor.scale.set(5);
        wall.scale.set(5);
        furniture.scale.set(5);
        windows.scale.set(5);
        statue.scale.set(5);
        food_drink.scale.set(5);
        hidden_furniture.scale.set(5);
        
        // Initialize the monk character
        monk = game.add.sprite(0, 0, 'monk');
        monk.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
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