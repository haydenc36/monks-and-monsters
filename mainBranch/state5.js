// Brothel / Revolutionary Hangout
var demo = demo || {};
var trigger5, noWalk5;

demo.state5 = function(){};
demo.state5.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
        game.load.tilemap('england_brothel', '../assets/tilemaps/files/england_brothel.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('art', '../assets/tilemaps/tilesets/art.png');
        game.load.image('beautiful', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('couches', '../assets/tilemaps/tilesets/couches.png');
        game.load.image('floors', '../assets/tilemaps/tilesets/floors.png');
        game.load.image('furniture', '../assets/tilemaps/tilesets/furniture.png');
        game.load.image('furniture2', '../assets/tilemaps/tilesets/furniture2.png');
        game.load.image('religious', '../assets/tilemaps/tilesets/religious.png');
        game.load.image('stairs', '../assets/tilemaps/tilesets/stairs.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('wallpaper', '../assets/tilemaps/tilesets/wallpaper.png');
        game.load.image('windows', '../assets/tilemaps/tilesets/windows.png');
        game.load.image('windows2', '../assets/tilemaps/tilesets/windows2.png');
        
        this.load.image('npcbox', '../assets/boxes/paper-dialog.png');
        this.load.spritesheet('npc1', '../assets/boxes/wandering_trader1.png', 64, 126);
        
    },
    
    create:function(){
        
        // Update the coodinate variable
        coordinate = 'brothel';
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //vel = 400; 
        
        //Adjust the camera settings
        bounds_x = 2240; //important to avoid text box overlapping with world borders
        game.world.setBounds(0,0, bounds_x, 1680);
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
        
        
        // Initialize the monk character
        monk = game.add.sprite(1230, 150, 'monk');
        monk.scale.set(0.5);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        
        // Allow for collisions
        map.setCollisionBetween(1396, 1396, true, 'trigger5');
        map.setCollisionBetween(1396, 1396, true, 'noWalk5');
        
        //Camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(300, 300, 800, 200);
        
        createHUD(this);
        createInventory(this);
        createNPC(this,"Sicarius",{"x":225, "y":1550},"npc",{"x":-1.5, "y":1.5});
        createDialogueBox(this,{"x":2000, "y":0},"npcbox",{"x":2, "y":1.5});
        initInfoBox(this);
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, trigger5, function(){console.log('Main Village'); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk5, function(){console.log('noWalk5');});
        
        cursorControl(0.5);
        
        updateHUD(this);
        updateInventory(this);
        distTrigger(this,{"x":100,"y":-85},{"x":50,"y":35});
        updateDialogue(this,this.currentNPC);
        NPCBoxVis(this,this.currentNPC,{"x":100,"y":-85},{"x":50,"y":35});
        
    }
    
};