// Brothel / Revolutionary Hangout
var demo = demo || {};
var trigger5, noWalk5;
var bot5, bot6, bot5Walk, bot6Walk;

demo.state5 = function(){};
demo.state5.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
        game.load.tilemap('england_brothel', './assets/tilemaps/files/england_brothel.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('art', './assets/tilemaps/tilesets/art.png');
        game.load.image('beautiful', './assets/tilemaps/tilesets/beautiful.png');
        game.load.image('couches', './assets/tilemaps/tilesets/couches.png');
        game.load.image('floors', './assets/tilemaps/tilesets/floors.png');
        game.load.image('furniture', './assets/tilemaps/tilesets/furniture.png');
        game.load.image('furniture2', './assets/tilemaps/tilesets/furniture2.png');
        game.load.image('religious', './assets/tilemaps/tilesets/religious.png');
        game.load.image('stairs', './assets/tilemaps/tilesets/stairs.png');
        game.load.image('village_tileset', './assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('wallpaper', './assets/tilemaps/tilesets/wallpaper.png');
        game.load.image('windows', './assets/tilemaps/tilesets/windows.png');
        game.load.image('windows2', './assets/tilemaps/tilesets/windows2.png');
        
    },
    
    create:function(){
        
        // Update the coodinate variable
        coordinate = 'brothel';
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //vel = 400; 
        
        //Adjust the camera settings
        bounds_x = 2240; //important to avoid text box overlapping with world borders
        bounds_y = 1680
        game.world.setBounds(0,0, bounds_x, bounds_y);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_brothel');
        map.addTilesetImage('art');
        map.addTilesetImage('beautiful');
        map.addTilesetImage('couches');
        map.addTilesetImage('floors');
        map.addTilesetImage('furniture');
        map.addTilesetImage('furniture2');
        map.addTilesetImage('religious');
        map.addTilesetImage('stairs');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('wallpaper');
        map.addTilesetImage('windows');
        map.addTilesetImage('windows2');
        
        // Integrate the layers
        trigger5 = map.createLayer('trigger5');
        noWalk5 = map.createLayer('noWalk5');
        var floor5 = map.createLayer('floor5');
        var walls5 = map.createLayer('walls5');
        var windows5 = map.createLayer('windows5');
        var furniture5b = map.createLayer('furniture5b');
        var furniture5a = map.createLayer('furniture5a');
        var stairs5 = map.createLayer('stairs5');
        
        // Scale the layers
        trigger5.setScale(3.5);
        noWalk5.setScale(3.5);
        floor5.setScale(3.5);
        walls5.setScale(3.5);
        windows5.setScale(3.5);
        furniture5a.setScale(3.5);
        furniture5b.setScale(3.5);
        stairs5.setScale(3.5);
        
        // Integrate Non-Interactive Bots
        createBot(this, 'Bot1', {"x": 1920, "y": 1560}, 'bot1', 5, true, [8, 9, 10, 11], [4, 5, 6, 7], 5);
        createBot(this, 'Bot2', {"x": 1620, "y": 300}, 'bot1', 3, true, [8, 9, 10, 11], [4, 5, 6, 7], 5);
        
        // Integrate the interactive NPCs
        createNPC(this,"Sicarius",{"x":225, "y":1550},"sicarius",{"x":0.5, "y":0.5});
        if ((BattlesCompleted.indexOf("Serpent") != -1) && (dialogueCheck.indexOf("Self Dialogue") == -1)) {
            createNPC (this,"Parvos",{"x":105, "y": 500},"monk",{"x":-0.5, "y":0.5});
            this.NPCs["Parvos"].spriteObj.visible = false;
            this.NPCs["Parvos"].text.visible = false;
        }
        
        // Create chest
        createChest(this, "chest1", {"x":2000, "y":220},"chest",{"x":2, "y":2});
        
        createChest(this, "chest2", {"x":62, "y":900},"chest",{"x":2, "y":2});
        
        // Initialize the monk character
        if ((!!returnState) && (returnState == "state0")) {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
        }
        else if ((BattlesCompleted.indexOf("Serpent") != -1) && (coordinate = 'battle')) {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
            coordinate = 'brothel';
        }
        else {
            monk = game.add.sprite(1230, 150, 'monk');
        }
        monk.scale.set(0.5);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkRight', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        
        // Allow for collisions
        map.setCollisionBetween(1396, 1396, true, 'trigger5');
        map.setCollisionBetween(1396, 1396, true, 'noWalk5');
        
        //Camera
        game.camera.follow(monk);
        //game.camera.deadzone = new Phaser.Rectangle(300, 300, 800, 200);
        
        createHUD(this);
        createInventory(this);
        createHintBtn(this, function() {
            HintOpen = true;
            getHint();
        });
        HintInfo(this);
        
        createMainMenuBtn(this, "state5", function() {
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
        coordinate = 'brothel';
    
        game.physics.arcade.collide(monk, trigger5, function(){doorSound.play(); deactivateSounds(); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk5, function(){console.log('noWalk5');});
        
        
        // Bot animations
        BotWalk(this, 'Bot1', true, {"turnLeftAt": 2280, "turnRightAt": 1920});
        BotWalk(this, 'Bot2', true, {"turnLeftAt": 2100, "turnRightAt": 1620});        
        
        if ((monk.x <= 160) && (monk.y <= 480) && (monk.y >= 370)) {
            console.log("Location for Battle");
            if ((dialogueCheck.indexOf("Sicarius To Basement") != -1) && (BattlesCompleted.indexOf("Serpent") == -1)) {
                charPosition = {"x": monk.x, "y": monk.y};
                console.log("Went to battle");
                deactivateSounds();
                game.state.start("BootState", true, false, './assets/battleJSONs/BrothelBattle.json', "BattleState", [characterEnergy,characterMana,characterStamina,charMaxEnergy,charMaxMana,charMaxStamina], [wineQ, breadQ,scrollQ]);
            }
        }
        
        cursorControl(0.5);
        updateHUD(this);
        updateInventory(this);
        updateHintBtn();
        AllHintUpdate(this);
        
        distTrigger(this,{"x":-50,"y":-100},{"x":200,"y":150});
        updateDialogue(this,this.currentNPC);
        NPCBoxVis(this,this.currentNPC,{"x":-50,"y":-100},{"x":200,"y":150});
        
        pickup(this,{"x":5,"y":5}, {"x":30,"y":30}, {"x":0.75,"y":0.75});
        
    }
    
};