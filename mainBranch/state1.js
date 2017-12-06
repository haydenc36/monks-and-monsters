// English Village
var demo = demo || {};
var trigger1a, trigger1b, trigger1c, buildings2_noWalk1, buildings1_noWalk1, mountains_nowalking1, makeTyphon = true;
var sethSprite, sethSpriteTxt;

var bot1, bot1Walk = 'walkRight', bot2, bot2Walk = 'walkUp';

demo.state1 = function(){};
demo.state1.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
        game.load.tilemap('england_village', './assets/tilemaps/files/england_village.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset2', './assets/tilemaps/tilesets/village_tileset2.png');
        game.load.image('barracks', './assets/tilemaps/tilesets/barracks.png');
        game.load.image('castle', './assets/tilemaps/tilesets/castle.png');
        game.load.image('castle1', './assets/tilemaps/tilesets/castle1.png');
        game.load.image('chapel', './assets/tilemaps/tilesets/chapel.png');
        game.load.image('door', './assets/tilemaps/tilesets/door.png');
        game.load.image('farmhouse', './assets/tilemaps/tilesets/farmhouse.png');
        game.load.image('hut2', './assets/tilemaps/tilesets/hut.png');
        game.load.image('huts', './assets/tilemaps/tilesets/hut2.png');
        game.load.image('lodges', './assets/tilemaps/tilesets/lodge.png');
        game.load.image('lodges2', './assets/tilemaps/tilesets/lodge2.png');
        game.load.image('monastery', './assets/tilemaps/tilesets/monastery.png');
        game.load.image('mountain', './assets/tilemaps/tilesets/paths.png');
        game.load.image('pub', './assets/tilemaps/tilesets/pub.png');
        game.load.image('sawmill', './assets/tilemaps/tilesets/sawmill.png');
        game.load.image('stable2', './assets/tilemaps/tilesets/stable.png');
        game.load.image('stonehut', './assets/tilemaps/tilesets/hut3.png');
        game.load.image('timbered', './assets/tilemaps/tilesets/timbered.png');
        game.load.image('town', './assets/tilemaps/tilesets/beautiful.png');
        game.load.image('walltowers', './assets/tilemaps/tilesets/towers.png');
        game.load.image('brothel', './assets/tilemaps/tilesets/brothel.png');
        game.load.image('village_tileset', './assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('sky', './assets/tilemaps/tilesets/sky.png');
    },
    
    create: function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //Adjust camera settings
        game.world.setBounds(0, 0, 2400, 2400);
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        
        // Integrate the map
        var map = game.add.tilemap('england_village');
        
        
        // Integrate the tilesets into the map
        map.addTilesetImage('village_tileset2');
        map.addTilesetImage('barracks');
        map.addTilesetImage('castle');
        map.addTilesetImage('castle1');
        map.addTilesetImage('chapel');
        map.addTilesetImage('door');
        map.addTilesetImage('farmhouse');
        map.addTilesetImage('hut2');
        map.addTilesetImage('huts');
        map.addTilesetImage('lodges');
        map.addTilesetImage('lodges2');
        map.addTilesetImage('monastery');
        map.addTilesetImage('mountain');
        map.addTilesetImage('pub');
        map.addTilesetImage('sawmill');
        map.addTilesetImage('stable2');
        map.addTilesetImage('stonehut');
        map.addTilesetImage('timbered');
        map.addTilesetImage('town');
        map.addTilesetImage('walltowers');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('sky');
        map.addTilesetImage('brothel');
        
        
        // Integrate the layers
        trigger1a = map.createLayer('trigger1a');
        trigger1b = map.createLayer('trigger1b');
        trigger1c = map.createLayer('trigger1c');
        trigger1d = map.createLayer('trigger1d');
        var grass = map.createLayer('grass1');
        var skies1 = map.createLayer('skies1');
        var path2 = map.createLayer('path1_b');
        var grass2 = map.createLayer('grass1_b');
        var path1 = map.createLayer('path1_a');
        mountains_nowalking1 = map.createLayer('mountains_nowalking1');
        var montains_walking = map.createLayer('montains_walking1');
        buildings2_noWalk1 = map.createLayer('buildings2_noWalk1');
        var buildings2_walk1 = map.createLayer('buildings2_walk1');
        buildings1_noWalk1 = map.createLayer('buildings1_noWalk1');
        var buildings1_walk1 = map.createLayer('buildings1_walk1');
        var flowers1 = map.createLayer('flowers1');
        
        if (BattlesCompleted.indexOf("Typhon") != -1) {
            createNPC(this,"Silva",{"x":750, "y":1200},"silva",{"x": 0.35, "y":0.27});
            createNPC(this,"Oceanus",{"x":700, "y":1250},"oceanus",{"x": 0.35, "y":0.27});
        }
        else if (BattlesCompleted.indexOf("Heresy Monster") != -1) {
            createNPC(this,"Typhon",{"x":800, "y":1200},"typhon",{"x": -0.27, "y":0.27});
            if (dialogueCheck.indexOf("Seth is Typhon") == -1) {
                this.NPCs["Typhon"].spriteObj.visible = false;
                this.NPCs["Typhon"].text.visible = false;
                sethSprite = game.add.sprite(800, 1200, 'seth');
                sethSprite.scale.set(0.35);
                sethSprite.anchor.setTo(1,1);
                sethSpriteTxt = game.add.text(800, 1205, "Seth", {
                    font: "Book Antiqua",
                    fontSize: "20px",
                    fontVariant: 'small-caps',
                    fontWeight:"bold",
                    fill:'#FFF', 
                    align:'center'
                });
                sethSpriteTxt.anchor.setTo(1,0);
                sethSpriteTxt.setShadow(5, 0, 'rgba(0,0,0,0.5)', 0);
                sethSpriteTxt.shadowBlur = 5;
            }
        }
        
        
        // Integrate the bots
        //Create Bot that goes left and right: createBot(this, botName, {"x": x, "y": y}, sprite, scale, true, RightFrames, LeftFrames, frameRate);
        createBot(this, 'Bot1', {"x": 32, "y": 1654}, 'bot1', 1.5, true, [8, 9, 10, 11], [4, 5, 6, 7], 5);
        
        //Create Bot that goes up and down: createBot(this, botName, {"x": x, "y": y}, sprite, scale, false, UpFrames, DownFrames, frameRate);
        createBot(this, 'Bot2', {"x": 1632, "y": 1376}, 'bot1', 1.5, false, [12, 13, 14, 15], [0, 1, 2, 3], 5);
        
        // Initialize the monk character
        if ((!!returnState) && (returnState == "state0")) {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
        }
        else if (((BattlesCompleted.indexOf("Typhon") != -1) && (coordinate == 'battle')) || (!makeTyphon)){
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
        }
        else if (coordinate == 'outside') {
            monk = game.add.sprite(charPosition.x, charPosition.y, 'monk');
        }
        else if ((coordinate == 'start') || (coordinate == 'battle'))
            {
                monk = game.add.sprite(5, 1200, 'monk');
            }
        else if (coordinate == 'monastery')
            {
                monk = game.add.sprite(700, 1100, 'monk');
            }
        else if (coordinate == 'hut')
            {
                monk = game.add.sprite(511, 1968, 'monk');
            }
        else if (coordinate == 'country')
            {
                monk = game.add.sprite(15, 2036, 'monk');
            }
        else if (coordinate == 'brothel')
            {
                monk = game.add.sprite(2012, 500, 'monk');
            }
        
        
        // Controlling physics and animations
        monk.scale.set(0.3);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        
        
        // Allow for collisions
        map.setCollisionBetween(11472, 15192, true, 'buildings2_noWalk1');
        map.setCollisionBetween(2025, 15714, true, 'buildings1_noWalk1');
        map.setCollisionBetween(53, 15471, true, 'mountains_nowalking1');
        map.setCollisionBetween(15408, 15408, true, 'trigger1a');
        map.setCollisionBetween(15408, 15408, true, 'trigger1b');
        map.setCollisionBetween(15408, 15408, true, 'trigger1c');
        map.setCollisionBetween(15408, 15408, true, 'trigger1d');
        
        
        // Adjust the camera
        game.camera.follow(monk);
        //game.camera.deadzone = new Phaser.Rectangle(500, 200, 200, 200);
        
        // Audio Variable
        audioCoordinate = "outside";
        
        
        // HUD and Inventory
        createHUD(this);
        createInventory(this);
        createHintBtn(this, function() {HintOpen = true; getHint();});
        HintInfo(this);
        
        createMainMenuBtn(this, "state1", function() {
            charPosition = {"x": monk.x, "y": monk.y};
            game.state.start("state0");
        });
        
        createDialogueBox(this,{"x":3000, "y":0},"npcbox",{"x":2, "y":1.5});
        initInfoBox(this);
    },
    
    
    update: function(){
        
        // Update the coodinate variable
        coordinate = 'outside';
        
        // Bot animations
        //Bot Walking left and right: BotWalk(this, botName, true, {"turnRightAt": SmallestX, "turnLeftAt": LargestX});
        BotWalk(this, 'Bot1', true, {"turnLeftAt": 288, "turnRightAt": 15});
        
        //Bot Walking up and down: BotWalk(this, botName, false, {"turnDownAt": SmallestY, "turnUpAt": LargestY});
        BotWalk(this, 'Bot2', false, {"turnDownAt": 1376, "turnUpAt": 1952});
        
        // Enabling collisions
        game.physics.arcade.collide(monk, buildings2_noWalk1, function(){});
        game.physics.arcade.collide(monk, buildings1_noWalk1, function(){});
        game.physics.arcade.collide(monk, mountains_nowalking1, function(){});
        
        // Transitioning between maps
        game.physics.arcade.collide(monk, trigger1a, function(){doorSound.play(); battleAudio = "oceanus"; deactivateSounds(); game.state.start('state4');});
        game.physics.arcade.collide(monk, trigger1b, function(){doorSound.play(); battleAudio = "serpent"; deactivateSounds(); game.state.start('state5');});
        game.physics.arcade.collide(monk, trigger1c, function(){doorSound.play(); deactivateSounds(); game.state.start('state3');});
        game.physics.arcade.collide(monk, trigger1d, function(){roosterSound.play(); deactivateSounds(); game.state.start('state7');});
        
        if ((BattlesCompleted.indexOf("Heresy Monster") != -1) && (dialogueCheck.indexOf("Seth is Typhon") != -1) && (makeTyphon) && (BattlesCompleted.indexOf("Typhon") == -1)) {
            makeTyphon = false;
            charPosition = {"x": monk.x, "y": monk.y};
            game.state.start('state1',true,false);
        }
        
        if ((dialogueCheck.indexOf("Typhon Mastermind") != -1)  && (BattlesCompleted.indexOf("Typhon") == -1)) {
            charPosition = {"x": monk.x, "y": monk.y};
            game.state.start("BootState", true, false, './assets/battleJSONs/FinalBattle.json', "BattleState", [characterEnergy,characterMana,characterStamina,charMaxEnergy,charMaxMana,charMaxStamina], [wineQ, breadQ,scrollQ]);
        }
        
        if (dialogueCheck.indexOf("Last Dialogue") != -1) {
            game.state.start("outro", true, false);
        }

        cursorControl(0.3);
        updateHUD(this);
        updateInventory(this);
        updateHintBtn();
        AllHintUpdate(this);
        
        distTrigger(this,{"x":50,"y":50},{"x":150,"y":100});
        updateDialogue(this,this.currentNPC);
        NPCBoxVis(this,this.currentNPC,{"x":50,"y":50},{"x":150,"y":100});
        
        pickup(this);
        
    }/*,
    render: function () {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(monk, 32, 500);
    }*/
};

function deactivateSounds()
{
    monk.frame = 0;
    monk.body.velocity.x = 0;
    monk.body.velocity.y = 0;
    footsteps_inside.stop();
    footsteps_outside.stop();
    avoidInfinite = 1;
}