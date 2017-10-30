// Countryside
var demo = demo || {};
var trigger7a, trigger7b, noWalk7;

demo.state7 = function(){};
demo.state7.prototype = {
    
    init: function(charStats, invent) {
        if (!!charStats) {
            characterEnergy = charStats[0];
            characterMana = charStats[1];
            characterStamina = charStats[2];
        }
        this.characterEnergy = characterEnergy;
        this.characterMana = characterMana;
        this.characterStamina = characterStamina; 
        
        if (!!invent) {
            wineQ = invent[0];
            breadQ = invent[1];
        }
        this.wineQ = wineQ;
        this.breadQ = breadQ;
        tutorial = false;
    },
    
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk_new.png', 185, 319);
        game.load.tilemap('england_countryside', '../assets/tilemaps/files/england_countryside.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('beautiful', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('paths', '../assets/tilemaps/tilesets/paths.png');
        game.load.image('religious', '../assets/tilemaps/tilesets/religious.png');
        game.load.image('spooky', '../assets/tilemaps/tilesets/spooky.png');
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        
        //load Sprites for HUD
        this.load.spritesheet('red_bar', '../assets/boxes/red_bar.png');
        this.load.spritesheet('black_bar', '../assets/boxes/black_bar.png');
        this.load.spritesheet('blue_bar', '../assets/boxes/blue_bar.png');
        this.load.spritesheet('green_bar', '../assets/boxes/green_bar.png');
        this.load.spritesheet('avatar_box', '../assets/boxes/avatar_monk.png');

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
        //monk.animations.add('walkDown', [0], 10);
        //monk.animations.add('walkRight', [0,1,2], 10);
        //monk.animations.add('walkLeft', [3,4], 10);
        
        // Allow for collisions
        map.setCollisionBetween(1844, 1844, true, 'trigger7a');
        map.setCollisionBetween(1844, 1844, true, 'trigger7b');
        map.setCollisionBetween(1844, 1844, true, 'noWalk7');

        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(500, 200, 200, 200);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        
        //GUI - box that shows character face
        this.avatar_box = this.add.sprite(this.world.centerX, this.world.centerY, 'avatar_box');
        this.physics.arcade.enableBody(this.avatar_box);
        this.avatar_box.anchor.setTo(0, 0);
        this.avatar_box.fixedToCamera = true;
	    this.avatar_box.cameraOffset.x = 15;
	    this.avatar_box.cameraOffset.y = 20;
        this.avatar_box.scale.set(1.75);
            
            //GUI - black bars as background for life and mana
            this.styleHUD = {font: '15px Book Antiqua', fill: '#ffffff', align: 'left', fontWeight: 'bold', stroke: '#000000', strokeThickness: 4};
            this.health = this.add.text(this.world.centerX, this.world.centerY, 'Health', this.styleHUD);
            this.health.fixedToCamera = true;
            this.health.cameraOffset.x = 180;
            this.health.cameraOffset.y = 0;
            this.black_bar = this.add.sprite(this.world.centerX, this.world.centerY, 'black_bar');
            this.physics.arcade.enableBody(this.black_bar);
            this.black_bar.anchor.setTo(0, 0);
            this.black_bar.fixedToCamera = true;
	    this.black_bar.cameraOffset.x = 120;
	    this.black_bar.cameraOffset.y = 20;
        this.black_bar.scale.set(0.5, 1);
        this.mana = this.add.text(this.world.centerX, this.world.centerY, 'Mana', this.styleHUD);
        this.mana.fixedToCamera = true;
        this.mana.cameraOffset.x = 180;
        this.mana.cameraOffset.y = 40;
	    this.black2_bar = this.add.sprite(this.world.centerX, this.world.centerY, 'black_bar');
            this.physics.arcade.enableBody(this.black2_bar);
            this.black2_bar.anchor.setTo(0, 0);
            this.black2_bar.fixedToCamera = true;
        this.black2_bar.scale.set(0.5, 1);
	    this.black2_bar.cameraOffset.x = 120;
	    this.black2_bar.cameraOffset.y = 60;
        this.stamina = this.add.text(this.world.centerX, this.world.centerY, 'Stamina', this.styleHUD);
        this.stamina.fixedToCamera = true;
        this.stamina.cameraOffset.x = 180;
        this.stamina.cameraOffset.y = 80;
        this.black3_bar = this.add.sprite(this.world.centerX, this.world.centerY, 'black_bar');
            this.physics.arcade.enableBody(this.black3_bar);
            this.black3_bar.anchor.setTo(0, 0);
            this.black3_bar.fixedToCamera = true;
	    this.black3_bar.cameraOffset.x = 120;
	    this.black3_bar.cameraOffset.y = 100;
        this.black3_bar.scale.set(0.5, 1);
            //GUI - red bar for health
            this.blood_bar = this.add.sprite(this.world.centerX, this.world.centerY, 'red_bar');
            this.physics.arcade.enableBody(this.blood_bar);
            this.blood_bar.anchor.setTo(0, 0);
            this.blood_bar.fixedToCamera = true;
	    this.blood_bar.cameraOffset.x = 121;
	    this.blood_bar.cameraOffset.y = 21;
        this.blood_bar.scale.set(0.5, 1);
	    //GUI - blue bar for mana
            this.mana_bar = this.add.sprite(this.world.centerX, this.world.centerY, 'blue_bar');
            this.physics.arcade.enableBody(this.mana_bar);
            this.mana_bar.anchor.setTo(0, 0);
            this.mana_bar.fixedToCamera = true;
	    this.mana_bar.cameraOffset.x =121;
	    this.mana_bar.cameraOffset.y = 61;
        this.mana_bar.scale.set(0.5, 1);
        
        //GUI - green bar for stamina
            this.stamina_bar = this.add.sprite(this.world.centerX, this.world.centerY, 'green_bar');
            this.physics.arcade.enableBody(this.stamina_bar);
            this.stamina_bar.anchor.setTo(0, 0);
            this.stamina_bar.fixedToCamera = true;
	    this.stamina_bar.cameraOffset.x = 121;
	    this.stamina_bar.cameraOffset.y = 101;
	    this.stamina_bar.scale.set(0.5, 1);
        
        this.healthscale = this.characterEnergy/2000;
        this.manascale = this.characterMana/2000;
        this.staminascale = this.characterStamina/2000;
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, trigger7a, function(){console.log('Main Village'); game.state.start('state1');});
        game.physics.arcade.collide(monk, trigger7b, function(){console.log('Battle State'); game.state.start("BootState", true, false, "../assets/BattleAssets.JSON", "BattleState", [characterEnergy,characterMana,characterStamina], [wineQ, breadQ], {});});
        game.physics.arcade.collide(monk, noWalk7, function(){console.log('noWalk7');});
        
        // Up and Down
        if (cursors.up.isDown){
            monk.body.velocity.y = -vel;
            monk.animations.play('walkUp');
        }
        else if (cursors.down.isDown){
            monk.body.velocity.y = vel;
            monk.animations.play('walk');
        }
        else {
            monk.body.velocity.y = 0;
        }
        // Right & Left
        if (cursors.right.isDown){
            monk.body.velocity.x = vel;
            monk.scale.set(0.2,0.2);
            monk.animations.play('walk');
            
        }
        else if (cursors.left.isDown){
            monk.body.velocity.x = -vel;
            monk.scale.set(-0.2,0.2);
            monk.animations.play('walk');
        }
        else {
            monk.body.velocity.x = 0;
        }
        
        //Bring everything to the top
			     this.black_bar.bringToTop();
				this.black2_bar.bringToTop();
				this.blood_bar.bringToTop();
				this.mana_bar.bringToTop();
                this.stamina_bar.bringToTop();
                this.health.bringToTop();
                this.mana.bringToTop();
                this.stamina.bringToTop();
        
                this.blood_bar.scale.set(this.healthscale, 1);
                this.mana_bar.scale.set(this.manascale, 1);
                this.stamina_bar.scale.set(this.staminascale, 1);
    }
};