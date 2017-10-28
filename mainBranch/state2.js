// Parvos' Monastery
var demo = demo || {};
var monk2, trigger2a, walls_noWalk2, fixtures_noWalk2b;
var enter;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        
        game.load.spritesheet('monk2', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_parvos', '../assets/tilemaps/files/england_parvos.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('couches', '../assets/tilemaps/tilesets/couches.png');
        game.load.image('door', '../assets/tilemaps/tilesets/door.png');
        game.load.image('furniture2', '../assets/tilemaps/tilesets/furniture2.png');
        game.load.image('paths', '../assets/tilemaps/tilesets/paths.png');
        game.load.image('religious', '../assets/tilemaps/tilesets/religious.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');

        
<<<<<<< HEAD
        game.load.image('npcbox', '../assets/boxes/paper-dialog.png');
        game.load.spritesheet('npc1', '../assets/boxes/wandering_trader1.png', 64, 126);
        game.load.spritesheet('npc2', '../assets/boxes/wandering_trader1.png', 64, 126);
=======
        this.load.image('npcbox', '../assets/boxes/paper-dialog.png');
        this.load.spritesheet('npc1', '../assets/boxes/wandering_trader1.png', 64, 126);
        this.load.spritesheet('npc2', '../assets/boxes/wandering_trader1.png', 64, 126);
        //This is where we load more NPC spritesheets
        
        //load Sprites for HUD
            this.load.spritesheet('red_bar', '../assets/boxes/red_bar.png');
			this.load.spritesheet('black_bar', '../assets/boxes/black_bar.png');
			this.load.spritesheet('blue_bar', '../assets/boxes/blue_bar.png');
            this.load.spritesheet('green_bar', '../assets/boxes/green_bar.png');
			this.load.spritesheet('avatar_box', '../assets/boxes/avatar_monk.png');
>>>>>>> 6b65c5efc48a9112c7fc7e7c6281fb0122f1e4ce
    },
    
    create:function(){
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 400;
                
        //Adjust the camera settings
        game.world.setBounds(0,0, 1320, 1760);
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
        
        // Initialize the monk2 character
        //monk2 = game.add.sprite(0, 0, 'monk2');
        monk2 = game.add.sprite(100, 1450, 'monk2');
        monk2.scale.set(5);
        game.physics.enable(monk2);
        monk2.body.collideWorldBounds = true;
        monk2.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        map.setCollisionBetween(242, 242, true, 'trigger2a');
        map.setCollisionBetween(33, 324, true, 'walls_noWalk2');
        map.setCollisionBetween(23, 1316, true, 'fixtures_noWalk2b');
        
        
        // Adjust the camera
        game.camera.follow(monk2);
        game.camera.deadzone = new Phaser.Rectangle(500, 200, 200, 200);
        
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
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
        
        //create text box and adjust fonts accordingly
        game.styleInfobox0 = {font: '20px Arial', fill: '#000000', fontWeight: 'bold'};
	    game.styleInfobox1 = {font: '40px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
	    game.styleInfobox2 = {font: '30px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
	    game.styleInfobox3 = {font: '30px Book Antiqua', fill: '#0aaaa0', align: 'left', fontWeight: 'bold', fontStyle: 'italic'};
	    
        
   	    //Create 1st NPC Character
//Copy from here to add additional NPCs.....
   	    game.npc1 = game.add.sprite(600, 1450, 'npc1'); //NPC Sprite + where to spawn
        game.physics.arcade.enableBody(game.npc1);
        game.npc1.anchor.setTo(1, 1);
        game.npc1.scale.set(1.75); // Scaling for NPC
        //additional animations to add later
	    //game.npc1.animations.add('idle',[0,1,2,3,4,5], 5 /*fps */, true);
   	    //game.npc1.animations.play('idle');
//.....until here
        
        
        //example to add another NPC
        game.npc2 = game.add.sprite(875, 600, 'npc2'); //NPC Sprite + where to spawn in the game
        game.physics.arcade.enableBody(game.npc2);
        game.npc2.anchor.setTo(1, 1);
        game.npc2.scale.set(1.75); // scaling for NPC
        
        
	    //game.npc1.animations.add('idle',[0,1,2,3,4,5], 5 /*fps */, true);
   	    //game.npc1.animations.play('idle');

        
   	    //box for NPC text-box
   	    game.npcbox = game.add.sprite(2000, 0, 'npcbox');
        game.npcbox.scale.set(2, 1.5);
	    game.physics.arcade.enableBody(game.npcbox);
        game.npcbox.visible = false;
        
        
        //text settings for the character info box
        game.textInfoboxNPC = game.add.text(20,40,'',game.styleInfobox2);
        game.textInfoboxNPC.wordWrapWidth = '780'; //width of container
	    game.textInfoboxNPC.wordWrap = true;
	    game.textInfoboxNPC.inputEnabled = true;
	    game.npcbox.addChild(game.textInfoboxNPC);
        game.textInfoboxNPC.scale.set(0.35); // change textsize if needed
	    
        
	    //text for NPC character name
        game.textInfoboxNPCname = game.add.text(50,10,'',game.styleInfobox3);
        game.textInfoboxNPCname.inputEnabled = true;
	    game.npcbox.addChild(game.textInfoboxNPCname);
        game.textInfoboxNPCname.scale.set(0.5);
	    
	    
	    //array for text sections of the dialog
	    game.npcboxText = new Array();
	    //NPC's name
	    game.npcboxname = '';
        game.npcboxnmame_id = 0;
	    game.npcboxTextPosition = 0;
	    //To check if is necessary to activate the NPC character's info box
	    // 0 = not active
	    // 1 = active
	    // 2 = transition state
	    game.npcboxActive = 0;
         game.time.now = 0;
        game.nextTextNPCBox = game.time.now;
        
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk2, trigger2a, function(){console.log('Battle State'); game.state.start("BootState", true, false, "../assets/BattleAssets.JSON", "BattleState", {});});
        game.physics.arcade.collide(monk2, walls_noWalk2, function(){console.log('walls_noWalk');});
        game.physics.arcade.collide(monk2, fixtures_noWalk2b, function(){console.log('fixtures_noWalk2b');});
        
        // Set movement controls
        if (cursors.up.isDown){
            monk2.body.velocity.y = -vel;
        }
        
        else if (cursors.down.isDown){
            monk2.body.velocity.y = vel;
        }
        
        else{
            monk2.body.velocity.y = 0;
        }
        
        if (cursors.left.isDown){
            monk2.body.velocity.x = -vel;
        }
        
        else if (cursors.right.isDown){
            monk2.body.velocity.x = vel;
        }
        
        else{
            monk2.body.velocity.x = 0;
        }
        
<<<<<<< HEAD
	   		if((game.npcboxActive==1) && (game.npcboxTextPosition <= game.npcboxText.length)){
=======
                //Bring everything to the top
			     this.black_bar.bringToTop();
				this.black2_bar.bringToTop();
				this.blood_bar.bringToTop();
				this.mana_bar.bringToTop();
                this.stamina_bar.bringToTop();
                this.health.bringToTop();
                this.mana.bringToTop();
                this.stamina.bringToTop();
        
	   		if((this.npcboxActive==1) && (this.npcboxTextPosition <= this.npcboxText.length)){
>>>>>>> 6b65c5efc48a9112c7fc7e7c6281fb0122f1e4ce
	   		
	   			
	   			//If the text array is finished, deactivate and set the flag in "transition state", else continue running dialog
	   			if(game.npcboxTextPosition >= game.npcboxText.length){
                    
	   				game.npcboxActive=2;
	   				game.npcbox.visible = false;
					   
					game.npcboxTextPosition = 0;

					//reset the array
					game.npcboxText.length = 0;

					game.textInfoboxNPC.setText("");
                    game.npcboxnmame_id = 0;
	   			    //reset the array
                    game.npcboxText.length = 0;
                    game.time.now = 0;
                    game.nextTextNPCBox = game.time.now;
					game.textInfoboxNPC.setText("");
	   			}
                else{
                    
                    if(game.nextTextNPCBox<game.time.now){
	   				game.textInfoboxNPC.setText(game.npcboxText[game.npcboxTextPosition]);
                    if(enter.isDown){
		   			game.npcboxTextPosition = Math.abs(game.npcboxTextPosition + 1);
                    game.npcboxnamePosition = Math.abs(game.npcboxnamePosition + 1);
                    game.nextTextNPCBox = game.time.now + 400;
                    if(game.npcboxnmame_id == 0)
                        {game.npcboxnmame_id = 1;
                        }
                        else{
                            game.npcboxnmame_id = 0;
                        }
                    }
	   			}
	   		
	   		}
	   		
	   }

				//game adjusts the distance between character and NPC so that dialogue box is triggered
                if(Math.abs(game.npc1.x-200-monk2.x)<50 && Math.abs(game.npc1.y-175-monk2.y)<50){ 
                    
					
                        if(game.npcboxActive<=1){
					
						
						game.npcbox.x=game.npc1.x;
						game.npcbox.y=game.npc1.y; 
						
					
						game.npcbox.visible = true;
					
						game.npcboxActive = 1;
					
						//enter text dialogue here
						game.npcboxText[0]="Hardly comforting or clarifying. Whatever it may mean, Messenger, bring game epistle to the lord of the land.";
						game.npcboxText[1]="Father, send me instead.";
						game.npcboxText[2]="Sweet Parvos, what can you be expected to do—sunder skulls with scrolls and stop wars with communion wafers? Be sensible, child. Messenger, to the lord you go.";
						game.npcboxText[3]="Father, Theo sent specifically for our aid. Perhaps he knows better than us what is needed.";
						game.npcboxText[4]="Yes, and perhaps Master Theo has tumbled into the wine cellar once again.!";
                        game.npcboxText[5]="You know better than I that Theo is a discerning man. Perhaps he senses that game conflict, whatever its nature, is not amenable to the force of Lord William. Please, send me.";
                        game.npcboxText[6]="Give me a moment to contemplate.";
                        game.npcboxText[7]=".........";
                        game.npcboxText[8]="As I departed from his quarters, Sir Theo made great note to deliver game epistle to game abbey, and game abbey alone.";
                        game.npcboxText[9]="Then perhaps that settles the matter.";
                        game.npcboxText[10]="Alright Parvos, collect your things. But for your sake, I will request the arms of Lord William if we receive no word from you. If we ourselves were not embroiled in game miserable groundswell, I would send you in good company.";
                        game.npcboxText[11]="I will be in good company. Bless you, Father.";

                    //check which character is talking
                    if(game.npcboxnmame_id == 0) //Character who starts the conversation
                    {game.npcboxname="Head Abbott"; //change the names depending on the order of who starts the convo
                    }
                    if(game.npcboxnmame_id == 1){
                       game.npcboxname="Parvos";
                       }
                    game.textInfoboxNPCname.setText(game.npcboxname);
					
					
						//bring text dialogue to the top
						game.npcbox.bringToTop();
						
					}

				}

                //example for additional NPC and their conversation
                else if(Math.abs(game.npc2.x-200-monk2.x)<80 && Math.abs(game.npc2.y-175-monk2.y)<50){ 
                    
					
                        if(game.npcboxActive<=1){
					
						
						game.npcbox.x=game.npc2.x;
						game.npcbox.y=game.npc2.y; 
						
					
						game.npcbox.visible = true;
					
						game.npcboxActive = 1;
					
						game.npcboxText[0]="Let's make sure you remember your training!";
						game.npcboxText[1]=".....";
                        

                    if(game.npcboxnmame_id == 0)
                    {game.npcboxname="Theo";
                    }
                    if(game.npcboxnmame_id == 1){
                       game.npcboxname="Parvos";
                       }
                    game.textInfoboxNPCname.setText(game.npcboxname);
					
						game.npcbox.bringToTop();
						
					}

				}
 

					else{
                       //reset dialogue when done
					   game.npcbox.visible = false;
					   
					   game.npcboxTextPosition = 0;
					   game.npcboxActive = 0;
					   //reset the array
					  game.npcboxText.length = 0;

					  game.npcboxname="";
					   game.textInfoboxNPC.setText("");
					   game.textInfoboxNPCname.setText("");
                        game.npcboxnmame_id =0;
				}
    
    
				
    }
};