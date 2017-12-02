// Countryside
var demo = demo || {};
var trigger7a, trigger7b, noWalk7;

demo.state7 = function(){};
demo.state7.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
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
        //vel = 200;
        
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
        trigger7a = map.createLayer('trigger7a');
        trigger7b = map.createLayer('trigger7b');
        noWalk7 = map.createLayer('noWalk7');
        var grass7 = map.createLayer('grass7');
        var path7 = map.createLayer('path7');
        var cave7 = map.createLayer('cave7');
        var objects7 = map.createLayer('objects7');
        var flowers7 = map.createLayer('flowers7');
        var tree7 = map.createLayer('tree7');
        var buildings7 = map.createLayer('buildings7');
               
        // Create chest
         createChest(this, "chest1", {"x":600, "y":200},"chest",{"x":1, "y":1});
        chest_state7 = true;
        
        // Initialize the monk character
        if ((!!returnState) && (returnState == "state0")) {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
        }
        else if ((BattlesCompleted.indexOf("Heresy Monster") != -1) && (coordinate == "battle")) {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
            coordinate = 'country';
        }
        else {
            monk = game.add.sprite(2382, 407, 'monk');
        }
        monk.scale.set(-0.2,0.2);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        
        // Allow for collisions
        map.setCollisionBetween(1844, 1844, true, 'trigger7a');
        map.setCollisionBetween(1844, 1844, true, 'trigger7b');
        map.setCollisionBetween(1844, 1844, true, 'noWalk7');

        
        // Adjust the camera
        game.camera.follow(monk);
        //game.camera.deadzone = new Phaser.Rectangle(500, 200, 200, 200);
    
        
        createNPC(this,"",{"x":150, "y":450},"",{"x":0.3, "y":0.3});
        createHUD(this);
        createInventory(this);
        createDialogueBox(this,{"x":3000, "y":0},"npcbox",{"x":1, "y":1});
        initInfoBox(this);
        this.textInfoboxNPC = this.add.text(70,70,'',this.styleInfobox1);
        this.textInfoboxNPC.scale.set(0.5);
        this.NPCBox.addChild(this.textInfoboxNPC);
        
        createHUD(this);
        createInventory(this);
        createHintBtn(this, function() {
            console.log("Getting the Hint");
            HintOpen = true;
            getHint();
        });
        HintInfo(this);
        
        createMainMenuBtn(this, "state7", function() {
            charPosition = {"x": monk.x, "y": monk.y};
            game.state.start("state0");
        });
        
        // Audio Variable
        audioCoordinate = "outside";
    },
    
    update: function(){
        
        // Update the coodinate variable
        coordinate = 'country';
        
        console.log(coordinate);
        
        game.physics.arcade.collide(monk, trigger7a, function(){console.log('Main Village'); roosterSound.play(); deactivateSounds(); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk7, function(){console.log('noWalk7'); deactivateSounds;});
        if(keyQ==1){
             game.physics.arcade.collide(monk, trigger7b, function(){
                 charPosition = {"x": monk.x, "y": monk.y};
                 console.log('Battle State'); 
                 battleAudio = "heresyMonster"; 
                 deactivateSounds(); 
                 game.state.start("BootState", true, false, "../assets/battleJSONs/CountryBattle.JSON", "BattleState", [characterEnergy,characterMana,characterStamina,charMaxEnergy,charMaxMana,charMaxStamina], [wineQ, breadQ,scrollQ]);}
                );
        }
        else{
        game.physics.arcade.collide(monk, trigger7b, function(){console.log('NoKey');});
        distTrigger(this,{"x":-10,"y":-200},{"x":50,"y":140});
        updateDialogue(this,this.currentNPC);
        NPCBoxVis(this,this.currentNPC,{"x":-10,"y":-200},{"x":50,"y":140});
        }
        
        cursorControl(0.2);
        updateHUD(this);
        updateInventory(this);
        updateHintBtn();
        AllHintUpdate(this);
         pickup(this,{"x":5,"y":5}, {"x":30,"y":30}, {"x":0.5,"y":0.5});
    }/*,
    render: function () {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(monk, 32, 500);
    }*/
};