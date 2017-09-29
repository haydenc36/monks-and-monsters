// Monster's Lair
demo.state8 = function(){};
demo.state8.prototype = {
    preload: function(){
        game.load.image('monster-lair', '../assets/backgrounds/monster-lair.png');
        game.load.image('ezio', '../assets/sprites/ezio.png', 1000, 1000);
        game.load.image('devil', '../assets/sprites/devil.png', 500, 500);

    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        speed = 10; 
        
        //Adjust camera settings
        game.world.setBounds(0,0, 3200, 1079);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        game.add.sprite(0, 0, 'monster-lair');
        game.add.sprite(75, 275, 'ezio');
        game.add.sprite(1500, 175, 'devil');
    },
    
    update: function(){
        
    }
};