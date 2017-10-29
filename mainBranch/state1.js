// English Village
var demo = demo || {};
var monk, cursors, vel = 200, trigger1a, trigger1b, trigger1c, buildings2_noWalk1, buildings1_noWalk1, mountains_nowalking1;

demo.state1 = function(){};
demo.state1.prototype = {
    
    preload: function(){
        
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_village', '../assets/tilemaps/files/england_village.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        game.load.image('barracks', '../assets/tilemaps/tilesets/barracks.png');
        game.load.image('castle', '../assets/tilemaps/tilesets/castle.png');
        game.load.image('castle1', '../assets/tilemaps/tilesets/castle1.png');
        game.load.image('chapel', '../assets/tilemaps/tilesets/chapel.png');
        game.load.image('door', '../assets/tilemaps/tilesets/door.png');
        game.load.image('farmhouse', '../assets/tilemaps/tilesets/farmhouse.png');
        game.load.image('hut2', '../assets/tilemaps/tilesets/hut.png');
        game.load.image('huts', '../assets/tilemaps/tilesets/hut2.png');
        game.load.image('lodges', '../assets/tilemaps/tilesets/lodge.png');
        game.load.image('lodges2', '../assets/tilemaps/tilesets/lodge2.png');
        game.load.image('monastery', '../assets/tilemaps/tilesets/monastery.png');
        game.load.image('mountain', '../assets/tilemaps/tilesets/paths.png');
        game.load.image('pub', '../assets/tilemaps/tilesets/pub.png');
        game.load.image('sawmill', '../assets/tilemaps/tilesets/sawmill.png');
        game.load.image('stable2', '../assets/tilemaps/tilesets/stable.png');
        game.load.image('stonehut', '../assets/tilemaps/tilesets/hut3.png');
        game.load.image('timbered', '../assets/tilemaps/tilesets/timbered.png');
        game.load.image('town', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('walltowers', '../assets/tilemaps/tilesets/towers.png');
        game.load.image('brothel', '../assets/tilemaps/tilesets/brothel.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('sky', '../assets/tilemaps/tilesets/sky.png');
        
        //load Sprites for HUD
            this.load.spritesheet('red_bar', '../assets/boxes/red_bar.png');
			this.load.spritesheet('black_bar', '../assets/boxes/black_bar.png');
			this.load.spritesheet('blue_bar', '../assets/boxes/blue_bar.png');
            this.load.spritesheet('green_bar', '../assets/boxes/green_bar.png');
			this.load.spritesheet('avatar_box', '../assets/boxes/avatar_monk.png');
        
    },
    
    create: function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //Adjust camera settings
        game.world.setBounds(0, 0, 2400, 2400);
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        
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
        
        
        // Initialize the monk character
        monk = game.add.sprite(0, 2036, 'monk');
        monk.scale.set(2);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkDown', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkRight', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkLeft', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        
        
        // Allow for collisions
        map.setCollisionBetween(11472, 15192, true, 'buildings2_noWalk1');
        map.setCollisionBetween(2025, 15714, true, 'buildings1_noWalk1');
        map.setCollisionBetween(53, 15471, true, 'mountains_nowalking1');
        map.setCollisionBetween(15408, 15408, true, 'trigger1a');
        map.setCollisionBetween(15408, 15408, true, 'trigger1b');
        map.setCollisionBetween(15408, 15408, true, 'trigger1c');
        
        
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
        
            //depletion of bars
            this.characterEnergy=0.5;
            this.characterMana=0.25;
            this.characterStamina=0.75;
        this.healthscale = this.characterEnergy/2;
        this.manascale = this.characterMana/2;
        this.staminascale = this.characterStamina/2;
        
    },
    
    
    update: function(){
        
        // Enabling collisions
        game.physics.arcade.collide(monk, buildings2_noWalk1, function(){console.log('buildings2');});
        game.physics.arcade.collide(monk, buildings1_noWalk1, function(){console.log('buildings1')});
        game.physics.arcade.collide(monk, mountains_nowalking1, function(){console.log('mountains');});
        
        
        // Transitioning between maps
        game.physics.arcade.collide(monk, trigger1a, function(){console.log('Peasants House'); game.state.start('state4')});
        game.physics.arcade.collide(monk, trigger1b, function(){console.log('Brothel'); game.state.start('state5')});
        game.physics.arcade.collide(monk, trigger1c, function(){console.log('Monastery'); game.state.start('state3')});
        
        
        // Up and Down
        if (cursors.up.isDown){
            monk.body.velocity.y = -vel;
            monk.animations.play('walkUp');
        }
        else if (cursors.down.isDown){
            monk.body.velocity.y = vel;
            monk.animations.play('walkDown');
        }
        else {
            monk.body.velocity.y = 0;
        }
        // Right & Left
        if (cursors.right.isDown){
            monk.body.velocity.x = vel;
            monk.animations.play('walkRight');
            monk.scale.set(2,2);
        }
        else if (cursors.left.isDown){
            monk.body.velocity.x = -vel;
            monk.animations.play('walkLeft');
            monk.scale.set(-2,2);
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
    },
    
    
    //render: function () {
        //game.debug.cameraInfo(game.camera, 32, 32);
        //game.debug.spriteCoords(monk, 32, 500);
    //}
};