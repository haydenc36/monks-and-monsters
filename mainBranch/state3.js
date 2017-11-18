// Monastery
var demo = demo || {};
var noWalk3;

demo.state3 = function(){};
demo.state3.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
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
        
        game.load.spritesheet('seth', '../assets/sprites/seth.png', 124, 319);
        game.load.spritesheet('silva', '../assets/sprites/silva.png', 117, 319);
        
    },
    
    create:function(){
        
        // Update the coodinate variable
        coordinate = 'monastery';
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
                
        //Adjust the camera settings
        bounds_x = 2400; // important to avoid text box overlapping with borders
        bounds_y = 2400;
        game.world.setBounds(0,0, bounds_x, bounds_y);
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
        noWalk3 = map.createLayer('noWalk3');
        trigger3 = map.createLayer('trigger3');
        var ground3 = map.createLayer('ground3');
        var walls3 = map.createLayer('walls3');
        var stairs3 = map.createLayer('stairs3');
        var furniture3 = map.createLayer('furniture3');
        var buildings3 = map.createLayer('buildings3');
        var fixtures3a = map.createLayer('fixtures3a');
        var fixtures3b = map.createLayer('fixtures3b');
        var garden = map.createLayer('garden');
        var roof3 = map.createLayer('roof3');
        
        // Scale the layers
        noWalk3.setScale(1.875);
        trigger3.setScale(1.875);
        ground3.setScale(1.875);
        walls3.setScale(1.875);
        stairs3.setScale(1.875);
        furniture3.setScale(1.875);
        buildings3.setScale(1.875);
        fixtures3a.setScale(1.875);
        fixtures3b.setScale(1.875);
        garden.setScale(1.875);
        roof3.setScale(1.875);
        
        //Check for checkpoint before Silva Appears
	    if (dialogueCheck.indexOf("Oceanus After Battle") != -1){
            createNPC(this,"Silva",{"x":700, "y":700},"silva",{"x":-0.50, "y":0.50});
        }
        else {
            createNPC(this,"Seth",{"x":700, "y":700},"seth",{"x":-0.40, "y":0.40});
            
        }
        
        // Initialize the monk character
        if ((BattlesCompleted.indexOf("Silva") != -1) && (coordinate = 'battle')) {
            //Somewhere in front of Silva
            monk = game.add.sprite(594, 647, 'monk');
            coordinate = 'monastery';
        }
        else {
            monk = game.add.sprite(1175, 2300, 'monk');
        }
        monk.scale.set(0.35);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        
        // Allow for collisions
        map.setCollisionBetween(2236, 2236, true, 'noWalk3');
        map.setCollisionBetween(2234, 2234, true, 'trigger3');
        
        // Adjust the camera
        game.camera.follow(monk);
        //game.camera.deadzone = new Phaser.Rectangle(300, 300, 800, 200);
        
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        createHUD(this);
        createInventory(this);
        
        createDialogueBox(this,{"x":3000, "y":0},"npcbox",{"x":2, "y":1.5});
        initInfoBox(this);
        
        
        // Audio Variable
        audioCoordinate = "inside";
    },
    
    update: function(){
        if ((dialogueCheck.indexOf("Silva Training") != -1)  && (BattlesCompleted.indexOf("Silva") == -1)) 
        {
            game.state.start("BootState", true, false, "../assets/SilvaBattle.JSON", "BattleState", [characterEnergy,characterMana,characterStamina,charMaxEnergy,charMaxMana,charMaxStamina], [wineQ, breadQ]);
            
            deactivateSounds();
        }
        game.physics.arcade.collide(monk, trigger3, function(){console.log('Main Village'); deactivateSounds(); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk3, function(){console.log('noWalk3');});
        
        cursorControl(0.35);
        
        updateHUD(this);
        updateInventory(this);
        distTrigger(this,{"x":-150,"y":-50},{"x":50,"y":100});
        updateDialogue(this,this.currentNPC);
        NPCBoxVis(this,this.currentNPC,{"x":-150,"y":-50},{"x":50,"y":100});
    },
    render: function () {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(monk, 32, 500);
    }
};