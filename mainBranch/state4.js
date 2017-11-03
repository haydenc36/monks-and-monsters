// Peasant's house
var demo = demo || {};
var noWalk4, trigger4;

demo.state4 = function(){};
demo.state4.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
        
        game.load.tilemap('england_peasant', '../assets/tilemaps/files/england_peasant.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('beautiful', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('floors', '../assets/tilemaps/tilesets/floors.png');
        game.load.image('poor_art', '../assets/tilemaps/tilesets/poor_art.png');
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        
        this.load.image('npcbox', '../assets/boxes/paper-dialog.png');
        this.load.spritesheet('npc1', '../assets/boxes/wandering_trader1.png', 64, 126);
        
    },
    
    create:function(){
        
        // Update the coodinate variable
        coordinate = 'hut';
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //vel = 800; 
        
        //Adjust the camera settings
        game.world.setBounds(0,0, 1280, 1280);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_peasant');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('poor_art');
        map.addTilesetImage('floors');
        map.addTilesetImage('beautiful');
        
        // Integrate the layers
        noWalk4 = map.createLayer('noWalk4');
        trigger4 = map.createLayer('trigger4');
        var floor4 = map.createLayer('floor4');
        var walls4 = map.createLayer('walls4');
        var background_decor4 = map.createLayer('background_decor4');
        var foreground_decor4 = map.createLayer('foreground_decor4');
        
        // Scale the layers
        noWalk4.setScale(5);
        trigger4.setScale(5);
        floor4.setScale(5);
        walls4.setScale(5);
        background_decor4.setScale(5);
        foreground_decor4.setScale(5);
        
        // Initialize the monk character
        monk = game.add.sprite(635, 110, 'monk');
        monk.scale.set(0.6);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        
        // Allow for collisions
        map.setCollisionBetween(94, 94, true, 'trigger4');
        map.setCollisionBetween(93, 93, true, 'noWalk4');
        
        //Camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(340, 300, 800, 100);
        
        createHUD(this);
        
        //create text box and adjust fonts accordingly
        this.styleInfobox0 = {font: '20px Arial', fill: '#000000', fontWeight: 'bold'};
	    this.styleInfobox1 = {font: '40px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
	    this.styleInfobox2 = {font: '30px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
	    this.styleInfobox3 = {font: '30px Book Antiqua', fill: '#0aaaa0', align: 'left', fontWeight: 'bold', fontStyle: 'italic'};
	    
        //Create 1st NPC Character
//Copy from here to add additional NPCs.....
   	    this.npc1 = this.add.sprite(1000, 700, 'npc1'); //NPC Sprite + where to spawn
            this.physics.arcade.enableBody(this.npc1);
            this.npc1.anchor.setTo(1, 1);
            this.npc1.scale.set(2); // Scaling for NPC
        //additional animations to add later
	    //this.npc1.animations.add('idle',[0,1,2,3,4,5], 5 /*fps */, true);
   	    //this.npc1.animations.play('idle');
//.....until here
        
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
        
        game.physics.arcade.collide(monk, trigger4, function(){console.log('Main Village'); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk4, function(){console.log('noWalk4');});
        
        cursorControl(0.6);
        updateHUD(this);
        
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
                if(Math.abs(this.npc1.x-170-monk.x)<80 && Math.abs(this.npc1.y-85-monk.y)<35){ 
                    
					
                        if(this.npcboxActive<=1){
					
						
						this.npcbox.x=this.npc1.x;
						this.npcbox.y=this.npc1.y; 
						
					
						this.npcbox.visible = true;
					
						this.npcboxActive = 1;
					
						//enter text dialogue here
						this.npcboxText[0]="A guest! We don’t see many travelers in these parts. Although I regret to inform you that you have chosen the wrong moon by which to visit, honorable sir.";
						this.npcboxText[1]="I was told that you may have insights into the kidnapping of Lord Silva’s family, my good man.";
						this.npcboxText[2]="An outrage. I tell you that God will have his vengeance upon those hellraisers. And yes, those devils are known to haunt the brothel. But what good is that to a dove?";
						this.npcboxText[3]="I only wish to reason with the fellows.";
						this.npcboxText[4]="Commendable, yes. Terribly mistaken. You noted the butchery atop the valley, I imagine. I can’t send you into that den of wolves. Not me.";
                        this.npcboxText[5]="The brothel, you said?";
                        this.npcboxText[6]="You don’t intend to go? Be sensible.";
                        this.npcboxText[7]="Farewell, kind Oceanus! Pray for this insensible fool.";

                    //check which character is talking
                    if(this.npcboxnmame_id == 0) //Character who starts the conversation
                    {this.npcboxname="Oceanus"; //change the names depending on the order of who starts the convo
                    }
                    if(this.npcboxnmame_id == 1){
                       this.npcboxname="Parvos";
                       }
                    this.textInfoboxNPCname.setText(this.npcboxname);
					
					
						//bring text dialogue to the top
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