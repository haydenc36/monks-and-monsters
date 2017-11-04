// Changes stats and inventory after battle
changeStatsInvent = function (charStats, invent) {
    if (!!charStats) {
        characterEnergy = charStats[0];
        characterMana = charStats[1];
        characterStamina = charStats[2];
    }
    
    if (!!invent) {
        wineQ = invent[0];
        breadQ = invent[1];
        scrollQ = 1; //use invent[2] when existing!!!
    }
};

// Controls
cursorControl = function (scale) {
    if (cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown) {
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
            monk.scale.set(-scale,scale);
            monk.animations.play('walk');
        }

        else if (cursors.right.isDown){
            monk.body.velocity.x = vel;
            monk.scale.set(scale,scale);
            monk.animations.play('walk');
        }

        else{
            monk.body.velocity.x = 0;
        }
    }
    else {
        monk.frame = 0;
        monk.body.velocity.x = 0;
        monk.body.velocity.y = 0;
    }
};

// Show HUD
createHUD = function (game_state) {
    //GUI - box that shows character face
    game_state.avatar_box = game.add.sprite(game.world.centerX, game.world.centerY, 'avatar_box');
    game.physics.arcade.enableBody(game_state.avatar_box);
    game_state.avatar_box.anchor.setTo(0, 0);
    game_state.avatar_box.fixedToCamera = true;
    game_state.avatar_box.cameraOffset.x = 15;
    game_state.avatar_box.cameraOffset.y = 20;
    game_state.avatar_box.scale.set(1.75);
            
    //GUI - black bars as background for life and mana
    game_state.styleHUD = {font: '15px Book Antiqua', fill: '#ffffff', align: 'left', fontWeight: 'bold', stroke: '#000000', strokeThickness: 4};
    game_state.health = game.add.text(game.world.centerX, game.world.centerY, 'Health', game_state.styleHUD);
    game_state.health.fixedToCamera = true;
    game_state.health.cameraOffset.x = 180;
    game_state.health.cameraOffset.y = 0;
    game_state.black_bar = game.add.sprite(game.world.centerX, game.world.centerY, 'black_bar');
    game.physics.arcade.enableBody(game_state.black_bar);
    game_state.black_bar.anchor.setTo(0, 0);
    game_state.black_bar.fixedToCamera = true;
    game_state.black_bar.cameraOffset.x = 120;
    game_state.black_bar.cameraOffset.y = 20;
    game_state.black_bar.scale.set(0.5, 1);
    game_state.mana = game.add.text(game.world.centerX, game.world.centerY, 'Mana', game_state.styleHUD);
    game_state.mana.fixedToCamera = true;
    game_state.mana.cameraOffset.x = 180;
    game_state.mana.cameraOffset.y = 40;
    game_state.black2_bar = game.add.sprite(game.world.centerX, game.world.centerY, 'black_bar');
    game.physics.arcade.enableBody(game_state.black2_bar);
    game_state.black2_bar.anchor.setTo(0, 0);
    game_state.black2_bar.fixedToCamera = true;
    game_state.black2_bar.scale.set(0.5, 1);
    game_state.black2_bar.cameraOffset.x = 120;
    game_state.black2_bar.cameraOffset.y = 60;
    game_state.stamina = game.add.text(game.world.centerX, game.world.centerY, 'Stamina', game_state.styleHUD);
    game_state.stamina.fixedToCamera = true;
    game_state.stamina.cameraOffset.x = 180;
    game_state.stamina.cameraOffset.y = 80;
    game_state.black3_bar = game.add.sprite(game.world.centerX, game.world.centerY, 'black_bar');
    game.physics.arcade.enableBody(game_state.black3_bar);
    game_state.black3_bar.anchor.setTo(0, 0);
    game_state.black3_bar.fixedToCamera = true;
    game_state.black3_bar.cameraOffset.x = 120;
    game_state.black3_bar.cameraOffset.y = 100;
    game_state.black3_bar.scale.set(0.5, 1);
            
    //GUI - red bar for health
    game_state.blood_bar = game.add.sprite(game.world.centerX, game.world.centerY, 'red_bar');
    game.physics.arcade.enableBody(game_state.blood_bar);
    game_state.blood_bar.anchor.setTo(0, 0);
    game_state.blood_bar.fixedToCamera = true;
    game_state.blood_bar.cameraOffset.x = 121;
    game_state.blood_bar.cameraOffset.y = 21;
    game_state.blood_bar.scale.set(0.5, 1);
    
    //GUI - blue bar for mana
    game_state.mana_bar = game.add.sprite(game.world.centerX, game.world.centerY, 'blue_bar');
    game.physics.arcade.enableBody(game_state.mana_bar);
    game_state.mana_bar.anchor.setTo(0, 0);
    game_state.mana_bar.fixedToCamera = true;
    game_state.mana_bar.cameraOffset.x =121;
    game_state.mana_bar.cameraOffset.y = 61;
    game_state.mana_bar.scale.set(0.5, 1);
        
    //GUI - green bar for stamina
    game_state.stamina_bar = game.add.sprite(game.world.centerX, game.world.centerY, 'green_bar');
    game.physics.arcade.enableBody(game_state.stamina_bar);
    game_state.stamina_bar.anchor.setTo(0, 0);
    game_state.stamina_bar.fixedToCamera = true;
	game_state.stamina_bar.cameraOffset.x = 121;
	game_state.stamina_bar.cameraOffset.y = 101;
	game_state.stamina_bar.scale.set(0.5, 1);
    
    // Scales
    game_state.healthscale = characterEnergy/2000;
    game_state.manascale = characterMana/2000;
    game_state.staminascale = characterStamina/2000;
    
    /*/ Bring to Top
    game_state.black_bar.bringToTop();
    game_state.black2_bar.bringToTop();
    game_state.blood_bar.bringToTop();
    game_state.mana_bar.bringToTop();
    game_state.stamina_bar.bringToTop();
    game_state.health.bringToTop();
    game_state.mana.bringToTop();
    game_state.stamina.bringToTop();*/ // Is bringToTop(); Necessary?
};

// Update HUD (If Necessary)
updateHUD = function (game_state) {
    
     // Scales(important, else not working!!!)
    game_state.healthscale = characterEnergy/2000;
    game_state.manascale = characterMana/2000;
    game_state.staminascale = characterStamina/2000;
    
    
    game_state.blood_bar.scale.set(game_state.healthscale, 1);
    game_state.mana_bar.scale.set(game_state.manascale, 1);
    game_state.stamina_bar.scale.set(game_state.staminascale, 1);
};

// Create an NPC Sprite
createNPC = function (game_state, npcName, position, sprite, scale) {
    var checkNPC = false;
    game_state.NPCs = game_state.NPCs || [];
    game_state.NPCs.forEach (function (key) {
        if (key.name == npcName) {
            checkNPC = true;
            return;
        }
    }, this);
    
    if (!checkNPC) {
        var newNPC = Object();
        newNPC.name = npcName;
        newNPC.x = position.x;
        newNPC.y = position.y;
        newNPC.spriteObj = game_state.add.sprite(position.x, position.y, sprite);
        game_state.physics.arcade.enableBody(newNPC.spriteObj);
        newNPC.spriteObj.scale.set(scale.x,scale.y);
        if (scale.x < 0) {
            newNPC.spriteObj.anchor.setTo(0,1);
        }
        else {
            newNPC.spriteObj.anchor.setTo(1,1);
        }
        //newNPC.spriteObj.animations.add('idle', [0,1,2,3,4,5], 5, true);
        //newNPC.spriteObj.animations.play('idle');
        dialogueList(game_state, newNPC, npcName);
        game_state.NPCs.push(newNPC);
    }
};

// Create Dialogue Box for further use
createDialogueBox = function (game_state, position, sprite, scale) {
    game_state.NPCBox = game_state.add.sprite(position.x,position.y,sprite);
    game_state.NPCBox.scale.set(scale.x,scale.y);
    game_state.physics.arcade.enableBody(game_state.NPCBox);
    
    game_state.NPCBox.visibile = false;
    
};

// Initialize the Information Box
initInfoBox = function (game_state) {
    game_state.styleInfobox0 = {font: '20px Arial', fill: '#000000', fontWeight: 'bold'};
    game_state.styleInfobox1 = {font: '40px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
    game_state.styleInfobox2 = {font: '30px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
    game_state.styleInfobox3 = {font: '30px Book Antiqua', fill: '#0aaaa0', align: 'left', fontWeight: 'bold', fontStyle: 'italic'};
    
    game_state.textInfoboxNPC = game_state.add.text(20,40,'',game_state.styleInfobox2);
    game_state.textInfoboxNPC.wordWrapWidth = '780';
    game_state.textInfoboxNPC.wordWrap = true;
    game_state.textInfoboxNPC.inputEnabled = true;
    game_state.NPCBox.addChild(game_state.textInfoboxNPC);
    game_state.textInfoboxNPC.scale.set(0.35);
    
    game_state.textInfoboxNPCname = game_state.add.text(50,10,'',game_state.styleInfobox3);
    game_state.textInfoboxNPCname.inputEnabled = true;
    game_state.NPCBox.addChild(game_state.textInfoboxNPCname);
    game_state.textInfoboxNPCname.scale.set(0.5);
    
    game_state.NPCBoxNameID = 0;
    game_state.NPCBoxName = '';
    game_state.NPCBoxTextPosition = 0;
    game_state.NPCBoxActive = 0;
    game_state.time.now = 0;
    game_state.nextTextNPCBox = game_state.time.now;
    game_state.newConvo = true;
    game_state.NPCSpeak = true;
};

// Determines which NPC you trigger the NPC
distTrigger = function (game_state,shift,atleast) {
    game_state.NPCs.forEach (function (NPC) {
        if ((Math.abs(NPC.x + shift.x - monk.x) < atleast.x) && (Math.abs(NPC.y + shift.y - monk.y) < atleast.y)) {
            game_state.currentNPC = NPC;
        }
    });
}

// Make Visible the NPC chat
NPCBoxVis = function (game_state, NPC,shift,atleast) {
    if (!!NPC){
        if ((Math.abs(NPC.x + shift.x - monk.x) < atleast.x) && (Math.abs(NPC.y + shift.y - monk.y) < atleast.y)) {
            if(game_state.NPCBoxActive <= 1) {
                
                //check if text box is overlapping with  game_state bounds
                              if(NPC.x+650 <= bounds_x)
						{
                            //if not just take the normal coordinates ...
                             game_state.NPCBox.x = NPC.x;
                        }
                        else if(NPC.x+650 > bounds_x) {
                            // ... else subtract the difference from usual coordinates and spawn the text box offset
                            npcdifference = (NPC.x+650) - bounds_x;
                            game_state.NPCBox.x = NPC.x - npcdifference;
						      
                        } 
                       
			    game_state.NPCBox.y = NPC.y;
                
                game_state.NPCBox.visible = true;
                game_state.NPCBoxActive = 1;
                game_state.NPCBox.bringToTop();
            }
        }
        else {
            game_state.NPCBox.visible = false;
            game_state.NPCBoxTextPosition = 0;
            game_state.NPCBoxActive = 0;
            game_state.NPCBoxName = '';
            game_state.textInfoboxNPC.setText('');
            game_state.textInfoboxNPCname.setText('');
            game_state.NPCBoxNameID = 0;
            game_state.newConvo = true;
            game_state.NPCSpeak = true;
        }
    }
};

// Updates Chat when select Enter
updateDialogue = function (game_state, NPC) {
    if ((game_state.NPCBoxActive == 1) && (game_state.NPCBoxTextPosition <= Object.keys(NPC.dialogue).length)) {
        if (game_state.nextTextNPCBox < game_state.time.now) {
            if (game_state.NPCBoxTextPosition >= Object.keys(NPC.dialogue).length) {
                game_state.NPCBoxActive = 2;
                game_state.NPCBox.visible = false;
                
                game_state.NPCBoxTextPosition = 0;
                
                game_state.textInfoboxNPC.setText('');
                game_state.NPCBoxNameID = 0;
                game_state.time.now = 0;
                game_state.nextTextNPCBox = game_state.time.now;
            }
            else {
                if (game_state.nextTextNPCBox < game_state.time.now) {
                    chooseStr(game_state,NPC);
                }
            }
        }
    }
};

// Choose which statement to show
chooseStr = function (game_state,NPC,npcName) {
    var st;
    if (game_state.newConvo) {
        if (game_state.NPCSpeak) {
            if (!!NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue) {
                st = NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue;
                game_state.NPCBoxName = NPC.name;
                game_state.textInfoboxNPC.setText(st);
                game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
            }
            game_state.NPCSpeak = false;
        }
        else {
            if (!!NPC.dialogue[game_state.NPCBoxTextPosition].charResponse) {
                st = NPC.dialogue[game_state.NPCBoxTextPosition].charResponse;
                game_state.NPCBoxName = "Parvos";
                game_state.textInfoboxNPC.setText(st);
                game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
            }
            game_state.NPCSpeak = true;
            game_state.NPCBoxTextPosition = Math.abs(game_state.NPCBoxTextPosition + 1);
        }
        game_state.newConvo = false;
        game_state.nextTextNPCBox = game_state.time.now + 400;
    }
    else {
        if (enter.isDown){
            if (Object.keys(NPC.dialogue[game_state.NPCBoxTextPosition]).length < 2){
                if (!!NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue){
                    st = NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue;
                    game_state.NPCBoxName = NPC.name;
                    game_state.textInfoboxNPC.setText(st);
                    game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
                    game_state.NPCSpeak = true;
                    game_state.NPCBoxTextPosition = Math.abs(game_state.NPCBoxTextPosition + 1);
                    game_state.nextTextNPCBox = game_state.time.now + 400;
                }
                else if (!!NPC.dialogue[game_state.NPCBoxTextPosition].charResponse){
                    console.log();
                    st = NPC.dialogue[game_state.NPCBoxTextPosition].charResponse;
                    game_state.NPCBoxName = "Parvos";
                    game_state.textInfoboxNPC.setText(st);
                    game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
                    game_state.NPCSpeak = true;
                    game_state.NPCBoxTextPosition = Math.abs(game_state.NPCBoxTextPosition + 1);
                    game_state.nextTextNPCBox = game_state.time.now + 400;
                }
                else {
                    return;
                }
            }
            else {
                if (game_state.NPCSpeak) {
                    if (!!NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue) {
                        st = NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue;
                        game_state.NPCBoxName = NPC.name;
                        game_state.textInfoboxNPC.setText(st);
                        game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
                    }
                    game_state.NPCSpeak = false;
                }
                else {
                    if (!!NPC.dialogue[game_state.NPCBoxTextPosition].charResponse) {
                        st = NPC.dialogue[game_state.NPCBoxTextPosition].charResponse;
                        game_state.NPCBoxName = "Parvos";
                        game_state.textInfoboxNPC.setText(st);
                        game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
                    }
                    game_state.NPCSpeak = true;
                    game_state.NPCBoxTextPosition = Math.abs(game_state.NPCBoxTextPosition + 1);
                }

                game_state.nextTextNPCBox = game_state.time.now + 400;
            }
        }
    }
};

// List of all the Dialogue
dialogueList = function (game_state, NPC, npcName) {
    if(game_state.key == "state1") {/*NPC's and their dialogue*/}
    else if (game_state.key == "state2") {
        if (npcName == "Head Abbot"){
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "Hardly comforting or clarifying. Whatever it may mean, Messenger, bring this epistle to the lord of the land.",
                    "charResponse":"Father, send me instead."
                },
                "1": {
                    "npcDialogue": "Sweet Parvos, what can you be expected to do—sunder skulls with scrolls and stop wars with communion wafers? Be sensible, child. Messenger, to the lord you go.",
                    "charResponse": "Father, Theo sent specifically for our aid. Perhaps he knows better than us what is needed."
                },
                "2": {
                    "npcDialogue": "Yes, and perhaps Master Theo has tumbled into the wine cellar once again.!",
                    "charResponse": "You know better than I that Theo is a discerning man. Perhaps he senses that this conflict, whatever its nature, is not amenable to the force of Lord William. Please, send me."
                },
                "3": {
                    "npcDialogue": "Give me a moment to contemplate.",
                    "charResponse": "........."
                },
                "4": {
                    "npcDialogue": "As I departed from his quarters, Sir Theo made great note to deliver this epistle to this abbey, and this abbey alone.",
                    "charResponse": "Then perhaps that settles the matter."
                },
                "5": {
                    "npcDialogue": "Alright Parvos, collect your things. But for your sake, I will request the arms of Lord William if we receive no word from you. If we ourselves were not embroiled in this miserable groundswell, I would send you in good company.",
                    "charResponse": "I will be in good company. Bless you, Father."
                },
                "6": {
                    "npcDialogue": "Before you leave, meet with Thomas at the door. He will ensure that you haven’t forgotten your training!",
                    "charResponse": ""
                }
            };
        }
        else if (npcName == "Thomas") {
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "Alright, show me what you remember!",
                    "charResponse": "....."
                },
                "1": {
                    "charResponse": "....."
                }
            };
        }
    }
    else if (game_state.key == "state3") {
        if (npcName == "Typhon") {
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "*Sobbing*",
                    "charResponse": "Father, I am looking for the monk named Theo."
                },
                "1": {
                    "npcDialogue": "Theo? Theo? Theo! That precious little man, what had he done? That’s all I’ve thought all night.. ‘Good God, Theo?’ I ask, ‘Theo!’ I can’t understand it… Perhaps the poor of our village could take the weights no longer? But Theo? One tiff between a duke and a laborer, then the village was swallowed in flames!",
                    "charResponse": "Don’t cry, Father! Let the dead bury their dead, but let us honor the dead."
                },
                "2": {
                    "npcDialogue": "A wise heart you have—",
                    "charResponse": "Thats very kind of you, father."
                },
                "3": {
                    "npcDialogue": "A wise heart indeed. Yes, yes. Well how may we honor them? Their bodies dangle from trees: ‘strange fruit,’ as those accustomed to agony have said.",
                    "charResponse": "Tell me more about the conflict. What crimes were committed, by whom, against whom?"
                },
                "4": {
                    "npcDialogue": "Oh mercy, there were hangings—as you no doubt witnessed—decapitations, slit throats. I tell the truth, reports tell that even one of our village’s finest was dragged by horses to the brothel down in the valley. A motley of henchmen—Can I even say it?—no, no, I could not say it aloud. Suffice it to say that they performed a minor decapitation in full view of that establishment.",
                    "charResponse": "These were other villagers committing such atrocities?"
                },
                "5": {
                    "npcDialogue": "I couldn’t believe it myself! Sweet Parvos, do recall that there was a time many ages ago when saints and priests could inspire peace and moral splendor in their disciples… Now, now there is drunkenness and philandering with the rich, drunkenness and ignorance with our poor! And what am I to do? The people see nothing in us religious any longer. Bread and blood, bread and blood.",
                    "charResponse": "Seems like an inopportune moment to withhold God from the people."
                },
                "6": {
                    "npcDialogue": "What was I to do? I am a simple man—what was I to do? Stealing the blood of Christ—despicable! It could not stand; no, I could not let it stand. ‘This won’t stand,’ I said to them, the peasants. ‘Expose the thief or suffer excommunication.’ So for months, they went without the Mass. What was I to do? It could not stand!",
                    "charResponse": "You are not to blame father. Alas, do you know a man by the name of Oceanus? I would like to have a word with him."
                },
                "7": {
                    "npcDialogue": "Oceanus, yes, a good man if ever there was one! A well-connected man, I may add. I could not see all faces from the turrets, but I did not see his among the rabble rousers. If you can win his heart, he can persuade the others to return Lady Silva and the young princes. He sometimes conducts business from his hut in the lower part of the village. You may find him there.",
                    "charResponse": "Your help is greatly appreciated!"
                },
                "8": {
                    "charResponse": "Your help is greatly appreciated!"
                }
            };
        }
    }
    else if (game_state.key == "state4") {
        if (npcName == "Oceanus") {
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "A guest! We don’t see many travelers in these parts. Although I regret to inform you that you have chosen the wrong moon by which to visit, honorable sir.",
                    "charResponse": "I was told that you may have insights into the kidnapping of Lord Silva’s family, my good man."
                },
                "1": {
                    "npcDialogue": "An outrage. I tell you that God will have his vengeance upon those hellraisers. And yes, those devils are known to haunt the brothel. But what good is that to a dove?",
                    "charResponse": "I only wish to reason with the fellows."
                },
                "2": {
                    "npcDialogue": "Commendable, yes. Terribly mistaken. You noted the butchery atop the valley, I imagine. I can’t send you into that den of wolves. Not me.",
                    "charResponse": "The brothel, you said?"
                },
                "3": {
                    "npcDialogue": "You don’t intend to go? Be sensible.",
                    "charResponse": "Farewell, kind Oceanus! Pray for this insensible fool."
                },
                "4": {
                    "charResponse": "Farewell, kind Oceanus! Pray for this insensible fool."
                }
            };
        }
    }
    else if (game_state.key == "state5") {
        if (npcName == "Sicarius") {
            NPC.dialogue = {
                "0": {
                    "npcDialogue":"",
                    "charResponse": ""
                },
                "1": {
                    "npcDialogue":"",
                    "charResponse": ""
                },
                "2": {
                    "npcDialogue":"",
                    "charResponse": ""
                }
            };
        }
    }
    else if (game_state.key == "state6") {/*NPC's and their dialogue*/}
    else if (game_state.key == "state7") {/*NPC's and their dialogue*/}
};


createInventory = function (game_state){

          //spacebar toggles the inventory
          toggle_inventory = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
	
	   //GUI - the background image for the inventory
	   game_state.inventory_base = game_state.add.sprite(game.world.centerX, game.world.centerY,  'inventory_base');
	   game_state.inventory_base.fixedToCamera = true;
	   game_state.inventory_base.cameraOffset.x = 500;
	   game_state.inventory_base.cameraOffset.y = 500;
        game_state.inventory_base.visible = false;
        game_state.inventory_base.scale.set(1.5);
        
        game_state.styleInventory = {font: '20px Book Antiqua', fill: '#000000', wordWrap: true, wordWrapWidth: 220, align: 'center', fontWeight: 'bold'};
        game_state.styleInventory2 = {font: '15px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
         game_state.styleInventory3 = {font: '15px Book Antiqua', fill: '#000000', align: 'center', fontWeight: 'bold', stroke: '#ffffff', strokeThickness: 3};
        
        //create empty slots
        game_state.slot1 = game_state.add.sprite(90, 80, 'slot');
        game_state.inventory_base.addChild(game_state.slot1);
        game_state.slot1.scale.set(1.25);
      
        game_state.slot2 = game_state.add.sprite(170, 80, 'slot');
        game_state.inventory_base.addChild(game_state.slot2);
        game_state.slot2.scale.set(1.25);
        
        
        game_state.slot3 = game_state.add.sprite(250, 80, 'slot');
        game_state.inventory_base.addChild(game_state.slot3);
        game_state.slot3.scale.set(1.25);
        
        
        game_state.slot4 = game_state.add.sprite(90, 160, 'slot');
        game_state.inventory_base.addChild(game_state.slot4);
        game_state.slot4.scale.set(1.25);
        
        
         game_state.slot5 = game_state.add.sprite(170, 160, 'slot');
        game_state.inventory_base.addChild(game_state.slot5);
        game_state.slot5.scale.set(1.25);
         
        game_state.slot6 = game_state.add.sprite(250, 160, 'slot');
        game_state.inventory_base.addChild(game_state.slot6);
        game_state.slot6.scale.set(1.25);
                
        game_state.item_name = game_state.add.text(170,240, '', game_state.styleInventory);
        game_state.inventory_base.addChild(game_state.item_name); 
        game_state.item_description = game_state.add.text(90, 270, '', game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.item_description);
         
        usageText = '';
        game_state.usedItem = game.add.text(100,70,usageText, game_state.styleInventory3);
        game_state.inventory_base.addChild(game_state.usedItem);
        	                   
        game_state.delay_inventory = game_state.time.now;

                        
        //Item traits for inventory stored in array
        game_state.items = new Array();
        // Slot empty/full (0/1)
	   game_state.items[0] = new Array(); //not used yet (for auto-sort)
	   // Item name
	   game_state.items[1] = new Array();
	   // Item image
	   game_state.items[2] = new Array();
	   // Quantity of items
	   game_state.items[3] = new Array();
        //Text for numbers
        game_state.items[4] = new Array();
	   // Description
	   game_state.items[5] = new Array(); 	   
        
        //Item 1
        game_state.items[1][0] = "Bread";
        game_state.items[2][0] = game_state.add.button(game_state.slot1.x, game_state.slot1.centerY-10,  'bread', useBread);
        game_state.items[2][0].alpha = 0.5;
        game_state.items[2][0].scale.set(0.2);
        game_state.items[2][0].onInputOver.add(over_bread, this);
        game_state.items[2][0].onInputOut.add(out, this);
        game_state.inventory_base.addChild(game_state.items[2][0]);
        game_state.items[3][0] = breadQ;
        game_state.items[4][0] = game_state.add.text(game_state.slot1.centerX+20, game_state.slot1.centerY+20, game_state.items[3][0], game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.items[4][0]);
        game_state.items[5][0] = "Restores 50% health once";
        //Item 2
        game_state.items[1][1] ="Wine";
        game_state.items[2][1] = game_state.add.button(game_state.slot2.centerX-20, game_state.slot2.centerY-20,  'wine', useWine);
        game_state.items[2][1].alpha = 0.5;
        game_state.items[2][1].scale.set(0.1);
        game_state.items[2][1].onInputOver.add(over_wine, this);
        game_state.items[2][1].onInputOut.add(out, this);
        game_state.inventory_base.addChild(game_state.items[2][1]);
        game_state.items[3][1] = wineQ;
        game_state.items[4][1] = game_state.add.text(game_state.slot2.centerX+20, game_state.slot2.centerY+20, game_state.items[3][1], game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.items[4][1]);
        game_state.items[5][1] = "Restores 50% mana once";
        //Item 3
        game_state.items[1][2] ="Scrolls";
        game_state.items[2][2] = game_state.add.button(game_state.slot3.centerX-20, game_state.slot3.centerY-20,  'scroll', useScroll);
        game_state.items[2][2].alpha = 0.5;
        game_state.items[2][2].scale.set(0.1);
        game_state.items[2][2].onInputOver.add(over_scroll, this);
        game_state.items[2][2].onInputOut.add(out, this);
        game_state.inventory_base.addChild(game_state.items[2][2]);
        game_state.items[3][2] = scrollQ;
        game_state.items[4][2] = game_state.add.text(game_state.slot3.centerX+20, game_state.slot3.centerY+20, game_state.items[3][2], game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.items[4][2]);
        game_state.items[5][2] = "Restores 50% stamina once";
        
        //Global function variables
    
        hover_bread = false;
        hover_wine = false;
        hover_scroll = false;            
	  
}
//Hover functions to highlight selected item
function over_bread(){
    hover_bread = true;
}
function over_wine() {
    hover_wine = true;
}
function over_scroll() {
    hover_scroll = true;
}
function out(){
    hover_bread = false;
    hover_wine = false;
    hover_scroll = false;
}

//Functions for item use
function useBread(){
    if(characterEnergy<1000){
        breadQ = breadQ - 1;
        temp_Restore = 1000 - characterEnergy;
        if(characterEnergy<=500){
        characterEnergy = characterEnergy + 500;
        }
        else{
            characterEnergy=characterEnergy + temp_Restore; // check how much is left to fill
        }
        }
    else{
       usageText = 'You are already fully healed!';
        game.time.events.add(1500, function () { usageText='';}, self);        
        
        }
        
}
function useWine(){
    if(characterMana<1000){
        wineQ = wineQ - 1;
        temp_Restore = 1000 - characterMana;
        if(characterMana<=500){
            characterMana = characterMana + 500;
        }
        else{
            characterMana=characterMana + temp_Restore;
        }
    }
    else{
        usageText = 'You have already full mana!';
        game.time.events.add(1500, function () { usageText='';}, self);   
    }
    
}
function useScroll(){
    if(characterStamina<1000){
        scrollQ = scrollQ -1;
        temp_Restore = characterStamina + 500;
        temp_characterStamina = 1000 - characterStamina;
        if(characterStamina<=500){
            characterStamina = characterStamina + 500;
        }
         else{
            characterStamina=characterStamina + temp_Restore;
        }
    }
     else{
        usageText = 'You have already full stamina!';
        game.time.events.add(1500, function () { usageText='';}, self);   
    }
    
}

updateInventory = function (game_state){
    
    
        //Update quantity
        game_state.items[3][0] = breadQ;
        game_state.items[3][1] = wineQ;
        game_state.items[3][2] = scrollQ;
    
        game_state.items[4][0].setText(game_state.items[3][0]);
        game_state.items[4][1].setText(game_state.items[3][1]);
        game_state.items[4][2].setText(game_state.items[3][2]);
        
        game_state.usedItem.setText(usageText);
    
              
          //Inventory toggle
      if(toggle_inventory.isDown){
          if(game_state.delay_inventory<game_state.time.now){
          if(game_state.inventory_base.visible == false)
              {
              game_state.inventory_base.visible = true;
             game_state.game.physics.arcade.isPaused=true;
              }
          else{
              game_state.inventory_base.visible = false;
              game_state.game.physics.arcade.isPaused=false;
            }
            game_state.delay_inventory = game_state.time.now + 400; //Delay to prevent fast pressing of spacebar
          }
      }  

    if(game_state.inventory_base.visible == true)
        {
            
            game_state.inventory_base.bringToTop();

               //Update hovered item        
                if(hover_bread == true){
               game_state.item_name_text= game_state.items[1][0];
                game_state.item_description_text = game_state.items[5][0];
                game_state.items[2][0].alpha = 1;
                }
            
            else if(hover_wine == true){
              game_state.item_name_text= game_state.items[1][1];
              game_state.item_description_text = game_state.items[5][1];
              game_state.items[2][1].alpha = 1;
              }
            
            else if(hover_scroll == true){
              game_state.item_name_text= game_state.items[1][2];
                game_state.item_description_text = game_state.items[5][2];
                game_state.items[2][2].alpha = 1;
                }
            
            else{
                game_state.item_name_text= '';
                game_state.item_description_text = '';
                 for(var u=0; u<3; u++)
                {
                game_state.items[2][u].alpha = 0.5;
                };
               }
            game_state.item_name.setText(game_state.item_name_text);
            game_state.item_description.setText(game_state.item_description_text);
            for(var i=0; i<7; i++)
                {
                //Remove item from inventory if quantity is 0
                if(game_state.items[3][i]==0)
                    {
                    game_state.items[2][i].visible = false;
                    game_state.items[4][i].visible = false;
                    }
                };
        }
};