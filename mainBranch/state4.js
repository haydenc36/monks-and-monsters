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
        
        game.load.tilemap('england_peasant', './assets/tilemaps/files/england_peasant.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('beautiful', './assets/tilemaps/tilesets/beautiful.png');
        game.load.image('floors', './assets/tilemaps/tilesets/floors.png');
        game.load.image('poor_art', './assets/tilemaps/tilesets/poor_art.png');
        game.load.image('village_tileset', './assets/tilemaps/tilesets/village_tileset.png');
        
    },
    
    create:function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
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
        
        createNPC(this,"Oceanus",{"x":1000, "y":700},"oceanus",{"x":-0.65, "y":0.65});
        // Create chest
         createChest(this, "chest1", {"x":1107, "y":870},"chest",{"x":2, "y":2});
        
        // Initialize the monk character
        if ((!!returnState) && (returnState == "state0")) {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
        }
        else if ((BattlesCompleted.indexOf("Oceanus") != -1) && (coordinate == 'battle')) {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
            coordinate = 'hut';
        }
        else {
            monk = game.add.sprite(635, 110, 'monk');
        }
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
        //game.camera.deadzone = new Phaser.Rectangle(340, 300, 800, 100);
        
        createHUD(this);
        createInventory(this);
        createHintBtn(this, function() {
            console.log("Getting the Hint");
            HintOpen = true;
            getHint();
        });
        HintInfo(this);
        
        createMainMenuBtn(this, "state4", function() {
            charPosition = {"x": monk.x, "y": monk.y};
            game.state.start("state0");
        });
        
        createDialogueBox(this,{"x":3000, "y":0},"npcbox",{"x":2, "y":1.5});
        initInfoBox(this);
        
        // Audio Variable
        audioCoordinate = "inside";
    
    },
    
    update: function(){
        
        // Update the coodinate variable
        coordinate = 'hut';
        
        game.physics.arcade.collide(monk, trigger4, function(){console.log('Main Village'); doorSound.play(); deactivateSounds(); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk4, function(){console.log('noWalk4');});
        
        if ((dialogueCheck.indexOf("Oceanus Before Battle") != -1)  && (BattlesCompleted.indexOf("Oceanus") == -1)) {
            charPosition = {"x": monk.x, "y": monk.y};
            game.state.start("BootState", true, false, './assets/battleJSONs/OceanusBattle.json', "BattleState", [characterEnergy,characterMana,characterStamina,charMaxEnergy,charMaxMana,charMaxStamina], [wineQ, breadQ,scrollQ]);
        }
        
        cursorControl(0.6);
        updateHUD(this);
        updateInventory(this);
        updateHintBtn();
        AllHintUpdate(this);
        
        distTrigger(this,{"x":-50,"y":-100},{"x":200,"y":150});
        updateDialogue(this,this.currentNPC);
        NPCBoxVis(this,this.currentNPC,{"x":-50,"y":-100},{"x":200,"y":150});
        
        pickup(this,{"x":5,"y":5}, {"x":30,"y":30}, {"x":0.75,"y":0.75});
        
    }/*,
    render: function () {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(monk, 32, 500);
    }*/
};