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
        game.world.setBounds(0,0, 2400, 809);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        monlair = game.add.sprite(0, 0, 'monster-lair');
        ezio = game.add.sprite(75, 275, 'ezio');
        devil = game.add.sprite(1125, 175, 'devil');
        
        monlair.scale.set(0.75);
        ezio.scale.set(0.75);
        devil.scale.set(0.75);
        
    },
    
    update: function(){
        
    }
};