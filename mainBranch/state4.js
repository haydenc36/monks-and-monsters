// Peasant's house
var demo = demo || {};
var noWalk4, trigger4;

demo.state4 = function(){};
demo.state4.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
        
        game.load.tilemap('england_peasant', '../assets/tilemaps/files/england_peasant.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('beautiful', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('floors', '../assets/tilemaps/tilesets/floors.png');
        game.load.image('poor_art', '../assets/tilemaps/tilesets/poor_art.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        
        game.load.spritesheet('oceanus', '../assets/sprites/oceanus.png', 159, 319);
        
    },
    
    create:function(){
        
        // Update the coodinate variable
        coordinate = 'hut';
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //vel = 800; 
        
        //Adjust the camera settings
        bounds_x = 1280; //important to avoid text box overlapping with world borders
        bounds_y = 1280;
        game.world.setBounds(0,0, bounds_x, bounds_y);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_peasant');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('poor_art');
        map.addTilesetImage('floors');
        map.addTilesetImage('beautiful');
        
        // Integrate the layers
        noWalk4 = map.createLayer('noWalk4');
        trigger4 = map.createLayer('trigger4');
        var floor4 = map.createLayer('floor4');
        var walls4 = map.createLayer('walls4');
        var background_decor4 = map.createLayer('background_decor4');
        var foreground_decor4 = map.createLayer('foreground_decor4');
        
        // Scale the layers
        noWalk4.setScale(5);
        trigger4.setScale(5);
        floor4.setScale(5);
        walls4.setScale(5);
        background_decor4.setScale(5);
        foreground_decor4.setScale(5);
        
        // Initialize the monk character
        monk = game.add.sprite(635, 110, 'monk');
        monk.scale.set(0.6);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        
        // Allow for collisions
        map.setCollisionBetween(94, 94, true, 'trigger4');
        map.setCollisionBetween(93, 93, true, 'noWalk4');
        
        //Camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(340, 300, 800, 100);
        
        createHUD(this);
        createInventory(this);
        createNPC(this,"Oceanus",{"x":1000, "y":700},"oceanus",{"x":2, "y":2},"");
        createDialogueBox(this,{"x":3000, "y":0},"npcbox",{"x":2, "y":1.5});
        initInfoBox(this);
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, trigger4, function(){console.log('Main Village'); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk4, function(){console.log('noWalk4');});
        
        cursorControl(0.6);
        updateHUD(this);
        updateInventory(this);
        distTrigger(this,{"x":-170,"y":-85},{"x":80,"y":35});
        updateDialogue(this,this.currentNPC);
        NPCBoxVis(this,this.currentNPC,{"x":-170,"y":-85},{"x":80,"y":35});
        
    }
};