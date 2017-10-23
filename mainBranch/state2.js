// Aristocrat's House
var demo = demo || {};
var walls_noWalk2, furniture_noWalk2;
var enter;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        
        game.load.spritesheet('monk', '../assets/spritesheets/monk.png', 32, 32);
        game.load.tilemap('england_vendor', '../assets/tilemaps/files/england_vendor.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        game.load.image('door', '../assets/tilemaps/tilesets/door.png');
        game.load.image('art', '../assets/tilemaps/tilesets/art.png');
        game.load.image('couches', '../assets/tilemaps/tilesets/couches.png');
        
        this.load.image('npcbox', '../assets/boxes/paper-dialog.png');
        this.load.spritesheet('npc1', '../assets/boxes/wandering_trader1.png', 64, 126);
        this.load.spritesheet('npc2', '../assets/boxes/wandering_trader1.png', 64, 126);
        //This is where we load more NPC spritesheets
        //
    },
    
    create:function(){
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        vel = 700;
                
        //Adjust the camera settings
        game.world.setBounds(0,0, 1320, 1760);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_vendor');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('village_tileset2');
        map.addTilesetImage('door');
        map.addTilesetImage('art');
        map.addTilesetImage('couches');
        
        // Integrate the layers
        var floor2 = map.createLayer('floor2');
        var walls_walk2 = map.createLayer('walls_walk2');
        walls_noWalk2 = map.createLayer('walls_noWalk2');
        var window2 = map.createLayer('window2');
        var furniture_walk2 = map.createLayer('furniture_walk2');
        furniture_noWalk2 = map.createLayer('furniture_noWalk2');
        
        // Scale the layers
        floor2.scale.set(2.75);
        walls_walk2.scale.set(2.75);
        walls_noWalk2.scale.set(2.75);
        furniture_walk2.scale.set(2.75);
        furniture_noWalk2.scale.set(2.75);
        window2.scale.set(2.75);

        
        // Initialize the monk character
        monk = game.add.sprite(580, 105, 'monk');
        monk.scale.set(5);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20]);
        
        // Allow for collisions
        map.setCollisionBetween(34, 47, true, 'walls_noWalk2');
        map.setCollisionBetween(138, 146, true, 'furniture_noWalk2');
        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(340, 300, 800, 100);
        
        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        
        
        
        
        //create text box and adjust fonts accordingly
        this.styleInfobox0 = {font: '20px Arial', fill: '#000000', fontWeight: 'bold'};
	    this.styleInfobox1 = {font: '40px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
	    this.styleInfobox2 = {font: '30px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
	    this.styleInfobox3 = {font: '30px Book Antiqua', fill: '#0aaaa0', align: 'left', fontWeight: 'bold', fontStyle: 'italic'};
	    

        
   	    //Create 1st NPC Character
//Copy from here to add additional NPCs.....
   	    this.npc1 = this.add.sprite(500, 500, 'npc1'); //NPC Sprite + where to spawn
            this.physics.arcade.enableBody(this.npc1);
            this.npc1.anchor.setTo(1, 1);
            this.npc1.scale.set(1.75); // Scaling for NPC
        //additional animations to add later
	    //this.npc1.animations.add('idle',[0,1,2,3,4,5], 5 /*fps */, true);
   	    //this.npc1.animations.play('idle');
//.....until here
        
        //example to add another NPC
        this.npc2 = this.add.sprite(1000, 800, 'npc2'); //NPC Sprite + where to spawn in the game
            this.physics.arcade.enableBody(this.npc2);
            this.npc2.anchor.setTo(1, 1);
            this.npc2.scale.set(1.75); // scaling for NPC
        
	    //this.npc1.animations.add('idle',[0,1,2,3,4,5], 5 /*fps */, true);
   	    //this.npc1.animations.play('idle');

   	    //box for NPC text-box
   	    this.npcbox = this.add.sprite(2000, 0, 'npcbox');
        this.npcbox.scale.set(2, 1.5);
	    this.physics.arcade.enableBody(this.npcbox);
            
            this.npcbox.visible = false;
            //text settings for the character info box
            this.textInfoboxNPC = this.add.text(20,40,'',this.styleInfobox2);
        this.textInfoboxNPC.wordWrapWidth = '780'; //width of container
	    this.textInfoboxNPC.wordWrap = true;
	    this.textInfoboxNPC.inputEnabled = true;
	    this.npcbox.addChild(this.textInfoboxNPC);
        this.textInfoboxNPC.scale.set(0.35); // change textsize if needed
	    
	    //text for NPC character name
            this.textInfoboxNPCname = this.add.text(50,10,'',this.styleInfobox3);
        	    this.textInfoboxNPCname.inputEnabled = true;
	    this.npcbox.addChild(this.textInfoboxNPCname);
        this.textInfoboxNPCname.scale.set(0.5);
	    
	    
	    //array for text sections of the dialog
	    this.npcboxText = new Array();
	    //NPC's name
	    this.npcboxname = '';
        this.npcboxnmame_id = 0;
	    this.npcboxTextPosition = 0;
	    //To check if is necessary to activate the NPC character's info box
	    // 0 = not active
	    // 1 = active
	    // 2 = transition state
	    this.npcboxActive = 0;
         this.time.now = 0;
        this.nextTextNPCBox = this.time.now;
        
    },
    
    update: function(){
        
        game.physics.arcade.collide(monk, walls_noWalk2, function(){console.log('walls_noWalk');});
        game.physics.arcade.collide(monk, furniture_noWalk2, function(){console.log('furniture_noWalk')});
        
        // Set movement controls
        if (cursors.up.isDown){
            monk.body.velocity.y = -vel;
        }
        
        else if (cursors.down.isDown){
            monk.body.velocity.y = vel;
        }
        
        else{
            monk.body.velocity.y = 0;
        }
        
        if (cursors.left.isDown){
            monk.body.velocity.x = -vel;
        }
        
        else if (cursors.right.isDown){
            monk.body.velocity.x = vel;
        }
        
        else{
            monk.body.velocity.x = 0;
        }
        
	   		if((this.npcboxActive==1) && (this.npcboxTextPosition <= this.npcboxText.length)){
	   		
	   			
	   			//If the text array is finished, deactivate and set the flag in "transition state", else continue running dialog
	   			if(this.npcboxTextPosition >= this.npcboxText.length){
                    
	   				this.npcboxActive=2;
	   				this.npcbox.visible = false;
					   
					this.npcboxTextPosition = 0;

					//reset the array
					this.npcboxText.length = 0;

					this.textInfoboxNPC.setText("");
                    this.npcboxnmame_id = 0;
	   			    //reset the array
                    this.npcboxText.length = 0;
                    this.time.now = 0;
                    this.nextTextNPCBox = this.time.now;
					this.textInfoboxNPC.setText("");
	   			}
                else{
                    
                    if(this.nextTextNPCBox<this.time.now){
	   				this.textInfoboxNPC.setText(this.npcboxText[this.npcboxTextPosition]);
                    if(enter.isDown){
		   			this.npcboxTextPosition = Math.abs(this.npcboxTextPosition + 1);
                    this.npcboxnamePosition = Math.abs(this.npcboxnamePosition + 1);
                    this.nextTextNPCBox = this.time.now + 400;
                    if(this.npcboxnmame_id == 0)
                        {this.npcboxnmame_id = 1;
                        }
                        else{
                            this.npcboxnmame_id = 0;
                        }
                    }
	   			}
	   		
	   		}
	   		
	   }

				//this adjusts the distance between character and NPC so that dialogue box is triggered
                if(Math.abs(this.npc1.x-200-monk.x)<50 && Math.abs(this.npc1.y-175-monk.y)<50){ 
                    
					
                        if(this.npcboxActive<=1){
					
						
						this.npcbox.x=this.npc1.x;
						this.npcbox.y=this.npc1.y; 
						
					
						this.npcbox.visible = true;
					
						this.npcboxActive = 1;
					
						//enter text dialogue here
						this.npcboxText[0]="Hardly comforting or clarifying. Whatever it may mean, Messenger, bring this epistle to the lord of the land.";
						this.npcboxText[1]="Father, send me instead.";
						this.npcboxText[2]="Sweet Parvos, what can you be expected to do—sunder skulls with scrolls and stop wars with communion wafers? Be sensible, child. Messenger, to the lord you go.";
						this.npcboxText[3]="Father, Theo sent specifically for our aid. Perhaps he knows better than us what is needed.";
						this.npcboxText[4]="Yes, and perhaps Master Theo has tumbled into the wine cellar once again.!";
                        this.npcboxText[5]="You know better than I that Theo is a discerning man. Perhaps he senses that this conflict, whatever its nature, is not amenable to the force of Lord William. Please, send me.";
                        this.npcboxText[6]="Give me a moment to contemplate.";
                        this.npcboxText[7]=".........";
                        this.npcboxText[8]="As I departed from his quarters, Sir Theo made great note to deliver this epistle to this abbey, and this abbey alone.";
                        this.npcboxText[9]="Then perhaps that settles the matter.";
                        this.npcboxText[10]="Alright Parvos, collect your things. But for your sake, I will request the arms of Lord William if we receive no word from you. If we ourselves were not embroiled in this miserable groundswell, I would send you in good company.";
                        this.npcboxText[11]="I will be in good company. Bless you, Father.";

                    //check which character is talking
                    if(this.npcboxnmame_id == 0) //Character who starts the conversation
                    {this.npcboxname="Head Abbott"; //change the names depending on the order of who starts the convo
                    }
                    if(this.npcboxnmame_id == 1){
                       this.npcboxname="Parvos";
                       }
                    this.textInfoboxNPCname.setText(this.npcboxname);
					
					
						//bring text dialogue to the top
						this.npcbox.bringToTop();
						
					}

				}

                //example for additional NPC and their conversation
                else if(Math.abs(this.npc2.x-200-monk.x)<80 && Math.abs(this.npc2.y-175-monk.y)<50){ 
                    
					
                        if(this.npcboxActive<=1){
					
						
						this.npcbox.x=this.npc2.x;
						this.npcbox.y=this.npc2.y; 
						
					
						this.npcbox.visible = true;
					
						this.npcboxActive = 1;
					
						this.npcboxText[0]="I couldn’t believe it myself! Sweet Parvos, do recall that there was a time many ages ago when saints and priests could inspire peace and moral splendor in their disciples… Now, now there is drunkenness and philandering with the rich, drunkenness and ignorance with our poor! And what am I to do? The people see nothing in us religious any longer. Bread and blood, bread and blood.";
						this.npcboxText[1]="...";
                        

                    if(this.npcboxnmame_id == 0)
                    {this.npcboxname="Theo";
                    }
                    if(this.npcboxnmame_id == 1){
                       this.npcboxname="Parvos";
                       }
                    this.textInfoboxNPCname.setText(this.npcboxname);
					
						this.npcbox.bringToTop();
						
					}

				}
 

					else{
                       //reset dialogue when done
					   this.npcbox.visible = false;
					   
					   this.npcboxTextPosition = 0;
					   this.npcboxActive = 0;
					   //reset the array
					  this.npcboxText.length = 0;

					  this.npcboxname="";
					   this.textInfoboxNPC.setText("");
					   this.textInfoboxNPCname.setText("");
                        this.npcboxnmame_id =0;
				}
    
    
				
    }
};