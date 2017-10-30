// Brothel / Revolutionary Hangout
var demo = demo || {};
var trigger5, noWalk5;

demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        
        game.load.spritesheet('monk', '../assets/spritesheets/monk_new.png', 185, 319);
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
        
        //load Sprites for HUD
        this.load.spritesheet('red_bar', '../assets/boxes/red_bar.png');
        this.load.spritesheet('black_bar', '../assets/boxes/black_bar.png');
        this.load.spritesheet('blue_bar', '../assets/boxes/blue_bar.png');
        this.load.spritesheet('green_bar', '../assets/boxes/green_bar.png');
        this.load.spritesheet('avatar_box', '../assets/boxes/avatar_monk.png');
        
    },
    
    create:function(){
        
        // Update the coodinate variable
        coordinate = 'brothel';
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 800; 
        
        //Adjust the camera settings
        game.world.setBounds(0,0, 2240, 1680);
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
        monk.animations.add('walk', [1,2,0], 5);
        
        // Allow for collisions
        map.setCollisionBetween(1396, 1396, true, 'trigger5');
        map.setCollisionBetween(1396, 1396, true, 'noWalk5');
        
        //Camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(300, 300, 800, 200);
        
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
        
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, trigger5, function(){console.log('Main Village'); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk5, function(){console.log('noWalk5');});
        
        // Set movement controls
        if (cursors.up.isDown){
            monk.body.velocity.y = -vel;
            monk.animations.play('walkUp');
        }
        
        else if (cursors.down.isDown){
            monk.body.velocity.y = vel;
            monk.animations.play('walk');
        }
        
        else{
            monk.body.velocity.y = 0;
        }
        
        if (cursors.left.isDown){
            monk.body.velocity.x = -vel;
            monk.scale.set(-0.5,0.5);
            monk.animations.play('walk');
        }
        
        else if (cursors.right.isDown){
            monk.body.velocity.x = vel;
            monk.scale.set(0.5,0.5);
            monk.animations.play('walk');
        }
        
        else{
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
        
    }
    
};