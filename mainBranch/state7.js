// Countryside
var demo = demo || {};

demo.state7 = function(){};
demo.state7.prototype = {
    
    preload: function(){
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
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
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 400;
        
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
        var grass = map.createLayer('grass');
        var path = map.createLayer('path');
        var cave_walk = map.createLayer('cave_walk');
        var objects_noWalk = map.createLayer('objects_noWalk');
        var objects_walk = map.createLayer('objects_walk');
        var flowers = map.createLayer('flowers');
        var cave_noWalk = map.createLayer('cave_noWalk');
        var tree_walk = map.createLayer('tree_walk');
        var trees_noWalk = map.createLayer('trees_noWalk');
        var buildings_noWalk = map.createLayer('buildings_noWalk');
        var buildings_walk = map.createLayer('buildings_walk');
        
        // Initialize the monk character
        monk = game.add.sprite(0, 420, 'monk');
        monk.scale.set(2.5);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkDown', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkRight', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        monk.animations.add('walkLeft', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 31);
        
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
    },
    
    update: function(){
        
        //game.physics.arcade.collide(monk, buildings);
        
//        // Set movement controls
//        if (cursors.up.isDown){
//            monk.body.velocity.y = -vel;
//        }
//        
//        else if (cursors.down.isDown){
//            monk.body.velocity.y = vel;
//        }
//        
//        else{
//            monk.body.velocity.y = 0;
//        }
//        
//        if (cursors.left.isDown){
//            monk.body.velocity.x = -vel;
//        }
//        
//        else if (cursors.right.isDown){
//            monk.body.velocity.x = vel;
//        }
//        
//        else{
//            monk.body.velocity.x = 0;
//        }
        
        
        // Up and Down
        if (cursors.up.isDown){
            //console.log("UP");
            monk.body.velocity.y = -vel;
            monk.animations.play('walkUp');
        }
        else if (cursors.down.isDown){
            //console.log("DOWN");
            monk.body.velocity.y = vel;
            monk.animations.play('walkDown');
        }
        else {
            monk.body.velocity.y = 0;
        }
        // Right & Left
        if (cursors.right.isDown){
            //console.log("RIGHT");
            monk.body.velocity.x = vel;
            monk.animations.play('walkRight');
            monk.scale.set(2,2);
        }
        else if (cursors.left.isDown){
            //console.log("LEFT");
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
        
        
    }
};