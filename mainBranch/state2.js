// Parvos' Monastery
var demo = demo || {};

var BattlesCompleted = [];

demo.state2 = function(){};
demo.state2.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats,invent);
    },
    
    preload: function(){
        
        game.load.spritesheet('monk', '../assets/spritesheets/monk_new.png', 185, 319);
        game.load.tilemap('england_parvos', '../assets/tilemaps/files/england_parvos.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('couches', '../assets/tilemaps/tilesets/couches.png');
        game.load.image('door', '../assets/tilemaps/tilesets/door.png');
        game.load.image('furniture2', '../assets/tilemaps/tilesets/furniture2.png');
        game.load.image('paths', '../assets/tilemaps/tilesets/paths.png');
        game.load.image('religious', '../assets/tilemaps/tilesets/religious.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');

        game.load.image('npcbox', '../assets/boxes/paper-dialog.png');

        //load Sprites for HUD
        game.load.spritesheet('red_bar', '../assets/boxes/red_bar.png');
		game.load.spritesheet('black_bar', '../assets/boxes/black_bar.png');
		game.load.spritesheet('blue_bar', '../assets/boxes/blue_bar.png');
        game.load.spritesheet('green_bar', '../assets/boxes/green_bar.png');
		game.load.spritesheet('avatar_box', '../assets/boxes/avatar_monk.png');
        game.load.image('ideaBtn', '../assets/sprites/hintBtn.png');
        game.load.image('hintPopup', '../assets/boxes/hintPopup.png');
        game.load.image('exitHint', '../assets/sprites/exitHintBtn.png');
        game.load.image('settings', '../assets/sprites/SettingsIcon.png');
        
        //Hint Maps
        game.load.image('tutorialHA', '../assets/backgrounds/hintHAEx.png');
        game.load.image('tutorialThomas', '../assets/backgrounds/hintThEx.png');
        game.load.image('tutorialBattle', '../assets/backgrounds/hintBattle.png');
        game.load.image('hintMonastery', '../assets/backgrounds/hintMonastery.png');
        game.load.image('hintBrothel', '../assets/backgrounds/hintBrothel.png');
        game.load.image('hintHut', '../assets/backgrounds/hintHut.png');
        game.load.image('hintBasement', '../assets/backgrounds/hintBasement.png');
        game.load.image('hintCountry', '../assets/backgrounds/hintCountry.png');
        game.load.image('hintCave', '../assets/backgrounds/hintCave.png');
        
        //Load Interactive NPCs
        game.load.spritesheet('thomas', '../assets/boxes/wandering_trader1.png', 64, 128);
        game.load.spritesheet('father', '../assets/sprites/father.png', 124, 319);
        game.load.spritesheet('seth', '../assets/sprites/seth.png', 124, 319);
        game.load.spritesheet('silva', '../assets/sprites/silva.png', 117, 319);
        game.load.spritesheet('oceanus', '../assets/sprites/oceanus.png', 159, 319);
        game.load.spritesheet('sicarius', '../assets/sprites/sicarius.png', 119, 319);
        game.load.spritesheet('typhon', '../assets/sprites/typhon.png', 752, 1063);
        
        // Load Non-Interactive NPCs
        game.load.spritesheet('bot1', '../assets/spritesheets/bot1.png', 32, 53);
        //game.load.spritesheet('bot1', '../assets/spritesheets/bot1.png', 32, 53);
        
        //Load Enemies
        game.load.image('QMark', '../assets/sprites/QMark.png');
        game.load.image('tutorialEnemy', '../assets/sprites/priest.png');
        game.load.image('heresy', '../assets/sprites/heresymonster.png')
        
        //load Sprites for inventory
        game.load.spritesheet('inventory_base', '../assets/sprites/scroll_menu.png');
        game.load.spritesheet('slot', '../assets/sprites/slot.png');
        //load Items for inventory
        game.load.spritesheet('bread', '../assets/sprites/bread.png');
        game.load.spritesheet('wine', '../assets/sprites/wine.png');
        game.load.spritesheet('scroll', '../assets/sprites/scroll_menu.png');
        game.load.spritesheet('key', '../assets/sprites/key.png');
        
        game.load.spritesheet('shiny', '../assets/sprites/shiny.png');
        
        //load chest
        game.load.spritesheet('chest', '../assets/sprites/chest.png',32,32);
        
    },
    
    create:function(){
        
        // AUDIO
        timpani.play();
        medievalMusic.play();
        medievalMusic.loopFull(0.6);         
        
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //Adjust the camera settings
        bounds_x = 1320; //important to avoid textbox overlapping with world borders
        bounds_y = 1760;
        game.world.setBounds(0,0, bounds_x, bounds_y);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_parvos');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('door');
        map.addTilesetImage('couches');
        map.addTilesetImage('furniture2');
        map.addTilesetImage('paths');
        map.addTilesetImage('religious');
        
        
        // Integrate the layers
        trigger2a = map.createLayer('trigger2a');
        var floor2 = map.createLayer('floor2');
        var walls_walk2 = map.createLayer('walls_walk2');
        walls_noWalk2 = map.createLayer('walls_noWalk2');
        var fixtures_walk2b = map.createLayer('fixtures_walk2b');
        fixtures_noWalk2b = map.createLayer('fixtures_noWalk2b');
        var fixtures_walk2a = map.createLayer('fixtures_walk2a');
        
        // Scale the layers
        trigger2a.setScale(2.75);
        floor2.setScale(2.75);
        walls_walk2.setScale(2.75);
        walls_noWalk2.setScale(2.75);
        fixtures_walk2b.setScale(2.75);
        fixtures_noWalk2b.setScale(2.75);
        fixtures_walk2a.setScale(2.75);
        
        createNPC(this,"Head Abbot",{"x":600, "y":1450},"father",{"x":-0.65, "y":0.65});
        createNPC(this,"Thomas",{"x":875, "y":600},"thomas",{"x":1.75, "y":1.75});
        
        // Create chest
        createChest(this, "chest1", {"x":150, "y":450},"chest",{"x":2, "y":2});
        chest_state7 = false;
        
        
        // Initialize the monk character
        if ((!!returnState) && (returnState == "state0")) {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
        }
        else {
            monk = game.add.sprite(170, 1450, 'monk');
        }
        monk.scale.set(0.6);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        
        // Allow for collisions
        map.setCollisionBetween(242, 242, true, 'trigger2a');
        map.setCollisionBetween(33, 324, true, 'walls_noWalk2');
        map.setCollisionBetween(23, 1316, true, 'fixtures_noWalk2b');
        
        // Adjust the camera
        game.camera.follow(monk);
        //game.camera.deadzone = new Phaser.Rectangle(500, 200, 200, 200);
        
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        createHUD(this);
        createInventory(this);
        createHintBtn(this, function() {
            HintOpen = true;
            getHint();
        });
        HintInfo(this);
        
        createMainMenuBtn(this, "state2", function() {
            charPosition = {"x": monk.x, "y": monk.y};
            game.state.start("state0");
        });
        
        createDialogueBox(this,{"x":3000, "y":0},"npcbox",{"x":2, "y":1.5});
        initInfoBox(this);
      
        
        // Audio Variable
        audioCoordinate = "inside";

    },
    
    update: function(){
        intro.stop();
                 
        //Skip to any state for testing
        //game.state.start("state7");
        
        tutorial = true;
    
        if (dialogueCheck.indexOf("Thomas Tutorial") != -1) {
            game.physics.arcade.collide(monk, trigger2a, function(){doorSound.play(); battleAudio = "tutorial"; deactivateSounds(); game.state.start("BootState", true, false, "../assets/battleJSONs/Tutorial.JSON", "BattleState", [characterEnergy,characterMana,characterStamina,charMaxEnergy,charMaxMana,charMaxStamina], [wineQ, breadQ,scrollQ],{},tutorial);});
            
            // Play the door sound
            //doorSound.play();
        }
        
        game.physics.arcade.collide(monk, walls_noWalk2);
        game.physics.arcade.collide(monk, fixtures_noWalk2b);
        
        cursorControl(0.6);
        updateHUD(this);
        updateInventory(this);
        updateHintBtn();
        AllHintUpdate(this);
        
        // Update Dialogue list if met requirements (multiple sets of dialogue within one state)
        if (!!this.currentNPC){
            if ((this.currentNPC.name == "Thomas") && (dialogueCheck.indexOf("Head Abbot Tutorial") != -1)) {
                dialogueList(this, this.currentNPC,"Thomas");
                this.currentNPC.readDialogue = false;
            }
        }
        
        distTrigger(this,{"x":-50,"y":-100},{"x":200,"y":150});
        updateDialogue(this,this.currentNPC);
        NPCBoxVis(this,this.currentNPC,{"x":-50,"y":-100},{"x":200,"y":150});
        pickup(this,{"x":5,"y":5}, {"x":40,"y":40}, {"x":0.75,"y":0.75});
    }
};