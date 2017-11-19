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
        
        // Update the coodinate variable
        coordinate = 'country';
        
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
        
        // Initialize the monk character
        monk = game.add.sprite(2382, 407, 'monk');
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
        
        createHUD(this);
        createInventory(this);
        
        
        // Audio Variable
        audioCoordinate = "outside";
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, trigger7a, function(){console.log('Main Village'); deactivateSounds(); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk7, function(){console.log('noWalk7'); deactivateSounds;});
        
        game.physics.arcade.collide(monk, trigger7b, function(){console.log('Battle State'); battleAudio = "heresyMonster"; deactivateSounds(); game.state.start("BootState", true, false, "../assets/battleJSONs/CountryBattle.JSON", "BattleState", [characterEnergy,characterMana,characterStamina,characterMaxEnergy,characterMaxMana,characterMaxStamina], [wineQ, breadQ]);});
        
        cursorControl(0.2);
        updateHUD(this);
        updateInventory(this);
    }
};