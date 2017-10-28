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

        
        game.load.image('npcbox', '../assets/boxes/paper-dialog.png');
        game.load.spritesheet('npc1', '../assets/boxes/wandering_trader1.png', 64, 126);
        game.load.spritesheet('npc2', '../assets/boxes/wandering_trader1.png', 64, 126);
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
        trigger2a.scale.set(2.75)
        floor2.scale.set(2.75);
        walls_walk2.scale.set(2.75);
        walls_noWalk2.scale.set(2.75);
        fixtures_walk2b.scale.set(2.75);
        fixtures_noWalk2b.scale.set(2.75);
        fixtures_walk2a.scale.set(2.75);
        
        
        // Initialize the monk character
        monk2 = game.add.sprite(100, 1450, 'monk2');
        monk2.scale.set(5);
        game.physics.enable(monk2);
        monk2.body.collideWorldBounds = true;
        monk2.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        
        // Allow for collisions
        map.setCollisionBetween(242, 242, true, 'trigger2a');
        map.setCollisionBetween(33, 324, true, 'walls_noWalk2');
        map.setCollisionBetween(99, 1316, true, 'fixtures_noWalk2b');
        
        
        // Adjust the camera
        game.camera.follow(monk2);
        game.camera.deadzone = new Phaser.Rectangle(340, 300, 800, 100);
        
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        
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
        
        game.physics.arcade.collide(monk2, trigger2a, function(){console.log('Battle State'); game.state.start('')});
        game.physics.arcade.collide(monk2, walls_noWalk2, function(){console.log('walls_noWalk');});
        game.physics.arcade.collide(monk2, fixtures_noWalk2b, function(){console.log('fixtures_noWalk2b')});
        
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
        
	   		if((game.npcboxActive==1) && (game.npcboxTextPosition <= game.npcboxText.length)){
	   		
	   			
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