// Monastery
var demo = demo || {};
var noWalk3;

demo.state3 = function(){};
demo.state3.prototype = {
    
    init: function(charStats, invent) {
        changeStatsInvent(charStats, invent);
        tutorial = false;
    },
    
    preload: function(){
        game.load.tilemap('england_monastery', '../assets/tilemaps/files/england_monastery.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('village_tileset', '../assets/tilemaps/tilesets/village_tileset.png');
        game.load.image('village_tileset2', '../assets/tilemaps/tilesets/village_tileset2.png');
        game.load.image('beautiful', '../assets/tilemaps/tilesets/beautiful.png');
        game.load.image('floors', '../assets/tilemaps/tilesets/floors.png');
        game.load.image('furniture', '../assets/tilemaps/tilesets/furniture.png');
        game.load.image('furniture2', '../assets/tilemaps/tilesets/furniture2.png');
        game.load.image('monastery', '../assets/tilemaps/tilesets/monastery.png');
        game.load.image('religious', '../assets/tilemaps/tilesets/religious.png');
        game.load.image('spooky', '../assets/tilemaps/tilesets/spooky.png');
        
        this.load.image('npcbox', '../assets/boxes/paper-dialog.png');
        this.load.spritesheet('npc1', '../assets/boxes/wandering_trader1.png', 64, 126);
    },
    
    create:function(){
        
        // Update the coodinate variable
        coordinate = 'monastery';
        
        // Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //vel = 300;
                
        //Adjust the camera settings
        game.world.setBounds(0,0, 2400, 2400);
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        // Initialize the tilemap and tilesets
        var map = game.add.tilemap('england_monastery');
        map.addTilesetImage('village_tileset');
        map.addTilesetImage('village_tileset2');
        map.addTilesetImage('beautiful');
        map.addTilesetImage('floors');
        map.addTilesetImage('furniture');
        map.addTilesetImage('furniture2');
        map.addTilesetImage('monastery');
        map.addTilesetImage('religious');
        map.addTilesetImage('spooky');
        
        // Integrate the layers
        noWalk3 = map.createLayer('noWalk3');
        trigger3 = map.createLayer('trigger3');
        var ground3 = map.createLayer('ground3');
        var walls3 = map.createLayer('walls3');
        var stairs3 = map.createLayer('stairs3');
        var furniture3 = map.createLayer('furniture3');
        var buildings3 = map.createLayer('buildings3');
        var fixtures3a = map.createLayer('fixtures3a');
        var fixtures3b = map.createLayer('fixtures3b');
        var garden = map.createLayer('garden');
        var roof3 = map.createLayer('roof3');
        
        // Scale the layers
        noWalk3.setScale(1.875);
        trigger3.setScale(1.875);
        ground3.setScale(1.875);
        walls3.setScale(1.875);
        stairs3.setScale(1.875);
        furniture3.setScale(1.875);
        buildings3.setScale(1.875);
        fixtures3a.setScale(1.875);
        fixtures3b.setScale(1.875);
        garden.setScale(1.875);
        roof3.setScale(1.875);
        
        // Initialize the monk character
        monk = game.add.sprite(1175, 2300, 'monk');
        monk.scale.set(0.35);
        game.physics.enable(monk);
        monk.body.collideWorldBounds = true;
        monk.anchor.setTo(0.5, 0.5);
        monk.animations.add('walkUp', [5, 6], 5);
        monk.animations.add('walk', [1,2], 5);
        //monk.animations.add('walkDown', [0], 10);
        //monk.animations.add('walkRight', [0,1,2], 10);
        //monk.animations.add('walkLeft', [3,4], 10);
        
        // Allow for collisions
        map.setCollisionBetween(2236, 2236, true, 'noWalk3');
        map.setCollisionBetween(2234, 2234, true, 'trigger3');
        
        // Adjust the camera
        game.camera.follow(monk);
        game.camera.deadzone = new Phaser.Rectangle(300, 300, 800, 200);
        
        createHUD(this);
        
        //create text box and adjust fonts accordingly
        this.styleInfobox0 = {font: '20px Arial', fill: '#000000', fontWeight: 'bold'};
	    this.styleInfobox1 = {font: '40px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
	    this.styleInfobox2 = {font: '30px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
	    this.styleInfobox3 = {font: '30px Book Antiqua', fill: '#0aaaa0', align: 'left', fontWeight: 'bold', fontStyle: 'italic'};
	    
        //Create 1st NPC Character
//Copy from here to add additional NPCs.....
   	    this.npc1 = this.add.sprite(700, 700, 'npc1'); //NPC Sprite + where to spawn
            this.physics.arcade.enableBody(this.npc1);
            this.npc1.anchor.setTo(1, 1);
            this.npc1.scale.set(1); // Scaling for NPC
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
        game.physics.arcade.collide(monk, trigger3, function(){console.log('Main Village'); game.state.start('state1');});
        game.physics.arcade.collide(monk, noWalk3, function(){console.log('noWalk3');});
        
        cursorControl(0.35);
        
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
                if(Math.abs(this.npc1.x-150-monk.x)<50 && Math.abs(this.npc1.y-85-monk.y)<35){ 
                    
					
                        if(this.npcboxActive<=1){
					
						
						this.npcbox.x=this.npc1.x;
						this.npcbox.y=this.npc1.y; 
						
					
						this.npcbox.visible = true;
					
						this.npcboxActive = 1;
					
						//enter text dialogue here
						this.npcboxText[0]="Father, I am looking for the monk named Theo.";
						this.npcboxText[1]="Theo? Theo? Theo! That precious little man, what had he done? That’s all I’ve thought all night.. ‘Good God, Theo?’ I ask, ‘Theo!’ I can’t understand it… Perhaps the poor of our village could take the weights no longer? But Theo? One tiff between a duke and a laborer, then the village was swallowed in flames!";
						this.npcboxText[2]="Don’t cry, Father! Let the dead bury their dead, but let us honor the dead.";
						this.npcboxText[3]="A wise heart you have—";
						this.npcboxText[4]="Thats very kind of you, father.";
                        this.npcboxText[5]="A wise heart indeed. Yes, yes. Well how may we honor them? Their bodies dangle from trees: ‘strange fruit,’ as those accustomed to agony have said.";
                        this.npcboxText[6]="Tell me more about the conflict. What crimes were committed, by whom, against whom?";
                        this.npcboxText[7]="Oh mercy, there were hangings—as you no doubt witnessed—decapitations, slit throats. I tell the truth, reports tell that even one of our village’s finest was dragged by horses to the brothel down in the valley. A motley of henchmen—Can I even say it?—no, no, I could not say it aloud. Suffice it to say that they performed a minor decapitation in full view of that establishment.";
                        this.npcboxText[8]="These were other villagers committing such atrocities?";
                        this.npcboxText[9]="I couldn’t believe it myself! Sweet Parvos, do recall that there was a time many ages ago when saints and priests could inspire peace and moral splendor in their disciples… Now, now there is drunkenness and philandering with the rich, drunkenness and ignorance with our poor! And what am I to do? The people see nothing in us religious any longer. Bread and blood, bread and blood.";
                        this.npcboxText[10]="Seems like an inopportune moment to withhold God from the people.";
                        this.npcboxText[11]="What was I to do? I am a simple man—what was I to do? Stealing the blood of Christ—despicable! It could not stand; no, I could not let it stand. ‘This won’t stand,’ I said to them, the peasants. ‘Expose the thief or suffer excommunication.’ So for months, they went without the Mass. What was I to do? It could not stand!";
                        this.npcboxText[12]="You are not to blame father. Alas, do you know a man by the name of Oceanus? I would like to have a word with him.";
                        this.npcboxText[13]="Oceanus, yes, a good man if ever there was one! A well-connected man, I may add. I could not see all faces from the turrets, but I did not see his among the rabble rousers. If you can win his heart, he can persuade the others to return Lady Silva and the young princes. He sometimes conducts business from his hut in the lower part of the village. You may find him there.";
                        this.npcboxText[14]="Your help is greatly appreciated!";

                    //check which character is talking
                    if(this.npcboxnmame_id == 0) //Character who starts the conversation
                    {this.npcboxname="Parvos"; //change the names depending on the order of who starts the convo
                    }
                    if(this.npcboxnmame_id == 1){
                       this.npcboxname="Typhon";
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
        