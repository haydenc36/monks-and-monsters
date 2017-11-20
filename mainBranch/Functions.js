// Changes stats and inventory after battle
changeStatsInvent = function (charStats, invent) {
    if (!!charStats) {
        characterEnergy = charStats[0];
        characterMana = charStats[1];
        characterStamina = charStats[2];
        charMaxEnergy = charStats[3];
        charMaxMana = charStats[4];
        charMaxStamina = charStats[5];
    }
    
    if (!!invent) {
        wineQ = invent[0];
        breadQ = invent[1];
        keyQ = 0;
        if (!!invent[2]) {
            scrollQ = invent[2];
        }
        else {
            scrollQ = 1;
        }
    }
};

// Controls
// avoidInfinite allows the walking variable to active once, at the beginning of a walk
var avoidInfinite = 0;
cursorControl = function (scale) {
    if (cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown || a.isDown || d.isDown || w.isDown || s.isDown) {
        
        // This nest controls walking sounds
        if (avoidInfinite == 0)
        {
            if (audioCoordinate == "inside")
            {
                footsteps_inside.play();
                footsteps_inside.loopFull(0.6);
            }

            else if (audioCoordinate == "outside")
            {
                footsteps_outside.play();
                footsteps_outside.loopFull(0.6);
            }
            avoidInfinite += 1;
        }
        
        if (cursors.up.isDown || w.isDown){
            monk.body.velocity.y = -vel;
            if (cursors.left.isDown || a.isDown || cursors.right.isDown || d.isDown) {
                monk.animations.play('walk');
            }
            else {
                monk.animations.play('walkUp');
            }
        }

        else if (cursors.down.isDown || s.isDown){
            monk.body.velocity.y = vel;
            monk.animations.play('walk');
        }

        else{
            monk.body.velocity.y = 0;
        }

        if (cursors.left.isDown || a.isDown){
            monk.body.velocity.x = -vel;
            monk.scale.set(-scale,scale);
            monk.animations.play('walk');
        }

        else if (cursors.right.isDown || d.isDown){
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
        footsteps_inside.stop();
        footsteps_outside.stop();
        avoidInfinite = 0;
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
    
    // Bring to Top
    game_state.black_bar.bringToTop();
    game_state.black2_bar.bringToTop();
    game_state.blood_bar.bringToTop();
    game_state.mana_bar.bringToTop();
    game_state.stamina_bar.bringToTop();
    game_state.health.bringToTop();
    game_state.mana.bringToTop();
    game_state.stamina.bringToTop();
};

// Update HUD (If Necessary)
updateHUD = function (game_state) {
    
     // Scales(important, else not working!!!)
    game_state.healthscale = (0.5) * (characterEnergy/charMaxEnergy);
    game_state.manascale = (0.5) * (characterMana/charMaxMana);
    game_state.staminascale = (0.5) * (characterStamina/charMaxStamina);
    
    
    game_state.blood_bar.scale.set(game_state.healthscale, 1);
    game_state.mana_bar.scale.set(game_state.manascale, 1);
    game_state.stamina_bar.scale.set(game_state.staminascale, 1);
};

// Create an NPC Sprite
createNPC = function (game_state, npcName, position, sprite, scale) {
    
    game_state.NPCs = game_state.NPCs || {};
    
    var newNPC = Object();
    newNPC.name = npcName;
    newNPC.x = position.x;
    newNPC.y = position.y;
    newNPC.spriteObj = game_state.add.sprite(position.x, position.y, sprite);
    game_state.physics.arcade.enableBody(newNPC.spriteObj);
    newNPC.spriteObj.scale.set(scale.x,scale.y);
    if (scale.x < 0) {
        newNPC.spriteObj.anchor.setTo(0,1);
        newNPC.text = game_state.add.text(position.x, position.y + 5, npcName, {
            font: "Book Antiqua",
            fontSize: "20px",
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#FFF', 
            align:'center'
        });
        newNPC.text.anchor.setTo(1,0);
        newNPC.text.setShadow(5, 0, 'rgba(0,0,0,0.5)', 0);
        newNPC.text.shadowBlur = 5;
    }
    else {
        newNPC.spriteObj.anchor.setTo(1,1);
        newNPC.text = game_state.add.text(position.x, position.y + 5, npcName, {
            font: "Book Antiqua",
            fontSize: "20px",
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#FFF', 
            align:'center'
        });
        newNPC.text.anchor.setTo(1,0);
        newNPC.text.setShadow(5, 0, 'rgba(0,0,0,0.5)', 0);
        newNPC.text.shadowBlur = 5;
    }
    //newNPC.spriteObj.animations.add('idle', [0,1,2,3,4,5], 5, true);
    //newNPC.spriteObj.animations.play('idle');
    dialogueList(game_state, newNPC, npcName);
    newNPC.readDialogue = false;
    game_state.NPCs[npcName] = newNPC;
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
    for (var NPC in game_state.NPCs) {
        if ((Math.abs(game_state.NPCs[NPC].x + shift.x - monk.x) < atleast.x) && (Math.abs(game_state.NPCs[NPC].y + shift.y - monk.y) < atleast.y)) {
            game_state.currentNPC = game_state.NPCs[NPC];
        }
    }
}

// Make Visible the NPC chat
NPCBoxVis = function (game_state, NPC,shift,atleast) {
    if (!!NPC){
        if (Object.keys(NPC.dialogue).length != 0) {
        if ((Math.abs(NPC.x + shift.x - monk.x) < atleast.x) && (Math.abs(NPC.y + shift.y - monk.y) < atleast.y)) {
            if(game_state.NPCBoxActive <= 1) {
                
                //check if text box is overlapping with  game_state bounds
                if(NPC.x+650 <= bounds_x) {
                    //if not just take the normal coordinates ...
                    game_state.NPCBox.x = NPC.x;
                }
                else if(NPC.x+650 > bounds_x) {
                    // ... else subtract the difference from usual coordinates and spawn the text box offset
                    npcdifference = (NPC.x+650) - bounds_x;
                    game_state.NPCBox.x = NPC.x - npcdifference;
                } 
                
                if (NPC.y + 270 <= bounds_y) {
                    game_state.NPCBox.y = NPC.y;
                }
                else if (NPC.y + 270 > bounds_y) {
                    npcdiff = (NPC.y + 270) - bounds_y;
                    game_state.NPCBox.y = NPC.y - npcdiff;
                }
                
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
    }}
};

// Updates Chat when select Enter
updateDialogue = function (game_state, NPC) {
    if ((game_state.NPCBoxActive == 1) && (game_state.NPCBoxTextPosition <= Object.keys(NPC.dialogue).length)) {
        if (game_state.nextTextNPCBox < game_state.time.now) {
            if (game_state.NPCBoxTextPosition >= Object.keys(NPC.dialogue).length) {
                if ((NPC.checkpointID != "Default")  && (dialogueCheck.indexOf(NPC.checkpointID) == -1)){
                    dialogueCheck.push(NPC.checkpointID);
                    console.log(dialogueCheck);
                }
                
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
                    if (game_state.key == "state1") {
                        if (NPC.name == "Typhon"){
                            chooseStr(game_state,NPC,"Seth");
                        }
                        else {
                            chooseStr(game_state,NPC);
                        }
                    }
                    else if (game_state.key == "state2") {
                        if(NPC.name == "Head Abbot"){
                            chooseStr(game_state,NPC,"Messenger");
                        }
                        else {
                            chooseStr(game_state,NPC);
                        }
                    }
                    else {
                        chooseStr(game_state,NPC);
                    }
                    
                }
            }
        }
    }
};

// Choose which statement to show
chooseStr = function (game_state,NPC,extraNPC) {
    var st;
    if (game_state.newConvo) {
        if (game_state.NPCSpeak) {
            if (Object.keys(NPC.dialogue[game_state.NPCBoxTextPosition]).length < 2){
                if (!!NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue) {
                    st = NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue;
                    game_state.NPCBoxName = NPC.name;
                    game_state.textInfoboxNPC.setText(st);
                    game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
                    game_state.NPCSpeak = false;
                }
                else if (!!NPC.dialogue[game_state.NPCBoxTextPosition].charResponse) {
                    st = NPC.dialogue[game_state.NPCBoxTextPosition].charResponse;
                    game_state.NPCBoxName = "Parvos";
                    game_state.textInfoboxNPC.setText(st);
                    game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
                }
            }
            else {
                if (!!NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue) {
                    st = NPC.dialogue[game_state.NPCBoxTextPosition].npcDialogue;
                    game_state.NPCBoxName = NPC.name;
                    game_state.textInfoboxNPC.setText(st);
                    game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
                    game_state.NPCSpeak = false;
                }
            }
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
                    st = NPC.dialogue[game_state.NPCBoxTextPosition].charResponse;
                    game_state.NPCBoxName = "Parvos";
                    game_state.textInfoboxNPC.setText(st);
                    game_state.textInfoboxNPCname.setText(game_state.NPCBoxName);
                    game_state.NPCSpeak = true;
                    game_state.NPCBoxTextPosition = Math.abs(game_state.NPCBoxTextPosition + 1);
                    game_state.nextTextNPCBox = game_state.time.now + 400;
                }
                else if (!!NPC.dialogue[game_state.NPCBoxTextPosition].extra){
                    st = NPC.dialogue[game_state.NPCBoxTextPosition].extra;
                    game_state.NPCBoxName = extraNPC;
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
                    else if (!!NPC.dialogue[game_state.NPCBoxTextPosition].extra) {
                        st = NPC.dialogue[game_state.NPCBoxTextPosition].extra;
                        game_state.NPCBoxName = extraNPC;
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
    if(game_state.key == "state1") {
        if (npcName == "Seth") {
            if (dialogueCheck.indexOf("Heresy Monster After Battle") != -1) {
                //Scene 9: Seth/Typhon
                NPC.checkpointID = "Seth is Typhon";
                NPC.dialogue = {
                    "0": {
                        "charResponse": "Seth, explain yourself."
                    },
                    "1": {
                        "extra": "You’ve ruined everything! The church is ruined! I am ruined!"
                    },
                    "2": {
                        "charResponse": "What have you done?"
                    },
                    "3": {
                        "extra": "I had to, I had to! I framed the poor for the theft; I poisoned Theo; I provoked the lords."
                    },
                    "4": {
                        "charResponse": "But why?"
                    },
                    "5": {
                        "extra": "I only wished to cleanse the church—of louts and idiots and adulterers! ‘After violence and upheaval, finally the people will return to the church. They will need Her,’ I thought! But now, he is not pleased."
                    },
                    "6": {
                        "charResponse": "Who—?"
                    },
                    "7": {
                        "extra": "*Screaming*"
                    }
                };
            }
            else {
                NPC.checkpointID = "Default"
                NPC.dialogue = {
                    "0": {
                        "npcDialogue": "I believe Father Hopko wishes to see you.",
                        "charResponse": ""
                    }
                };
            }
        }
        else if (npcName == "Typhon") {
            if (dialogueCheck.indexOf("Seth is Typhon") != -1) {
                NPC.checkpointID = "Typhon Mastermind";
                NPC.dialogue = {
                    "0": {
                        "npcDialogue": "Scum!",
                        "charResponse": "Identify yourself."
                    },
                    "1": {
                        "npcDialogue": "I am the one whom the gods wished to lock away. I am the god of devastating winds, of volcanoes, and of serpents. And you are the puny minister of the Evil One who has stolen my slaves.",
                        "charResponse": "This village no longer belongs to you. You will be crushed alongside your minions."
                    },
                    "2": {
                        "charResponse": "This village no longer belongs to you. You will be crushed alongside your minions."
                    }
                };
            }
            else {
                NPC.checkpointID = "Default"
                NPC.dialogue = {
                    "0": {
                        "npcDialogue": "I believe Father Hopko wishes to see you.",
                        "charResponse": ""
                    }
                };
            }
        }
    }
    else if (game_state.key == "state2") {
        if (npcName == "Head Abbot"){
            // Scene 1: Tutorial; 3 people Talking
            NPC.checkpointID = "Head Abbot Tutorial";
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "I've just received an epistle from Theo. Whatever it may mean, bring it to the lord of the land.",
                    "charResponse":"Father, send me."
                },
                "1": {
                    "npcDialogue": "Sweet Parvos, what can you be expected to do—sunder skulls with scrolls and stop wars with communion wafers? Be sensible, child.",
                    "charResponse": "Father, Theo sent specifically for our aid. Perhaps he knows better than us what is needed."
                },
                "2": {
                    "npcDialogue": "Yes, and perhaps Master Theo has tumbled into the wine cellar once again.",
                    "charResponse": "Perhaps he senses that this conflict is not amenable to the force of Lord William. Send me."
                },
                "3": {
                    "npcDialogue": "That said... Theo specifically requested your assistance. Fine. Go. But if we receive no word, I will send the arms of Lord William.",
                    "charResponse": "I will be in good company. Bless you, Father."
                },
                "4": {
                    "npcDialogue": "Meet with Thomas at the door. He will review your training!",
                    "charResponse": ""
                }
            }; 
        }
        else if (npcName == "Thomas") {
            if (dialogueCheck.indexOf("Head Abbot Tutorial") != -1) {
            NPC.checkpointID = "Thomas Tutorial";
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "Alright, get whatever you need from that chest and show me what you remember!",
                    "charResponse": ""
                }
            };
            }
            else {
            NPC.checkpointID = "Default"
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "I believe Father Hopko wishes to see you.",
                    "charResponse": ""
                }
            };
            }
        }
    }
    else if (game_state.key == "state3") {
        if (npcName == "Seth") {
            // Scene 2
            if (dialogueCheck.indexOf("Thomas Tutorial") != -1) {
            NPC.checkpointID = "Seth Recommends Oceanus";
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "*Sobbing*",
                    "charResponse": "Father, I am looking for the monk named Theo."
                },
                "1": {
                    "npcDialogue": "Theo? Theo? Theo! That precious little man, what had he done? That’s all I’ve thought all night.. ‘Good God, Theo?’ I ask, ‘Theo!’",
                    "charResponse": "What has happened, Father—?"
                },
                "2": {
                    "npcDialogue": "Father Seth. And Theo was murdered!",
                    "charResponse": "God forbid! What happened?"
                },
                "3": {
                    "npcDialogue": "Hangings, decapitations, slit throats, castrations. What didn't happen?! And good Theo is among the corpses!",
                    "charResponse": "Other villagers committing such atrocities?"
                },
                "4": {
                    "npcDialogue": "I couldn’t believe it myself! And what am I to do? The people see nothing in us religious any longer. Bread and blood, bread and blood. In all truth, the peasants have been banned from this church for months.",
                    "charResponse": "A time like this hardly seems like the moment to keep folks from the church."
                },
                "5": {
                    "npcDialogue": "What was I to do? I am a simple man—what was a simple man to do? Someone stole the blood of Christ! ‘This won’t stand,’ I said to them, the peasants. ‘Expose the thief or suffer excommunication.’ So for months, they went without the Mass. What was I to do? It could not stand!",
                    "charResponse": "Well I must do something? What villager could help me solve this crisis?"
                },
                "6": {
                    "npcDialogue": "Oceanus! Oceanus, yes, a good man if ever there was one! A well-connected man, I may add. I could not see all faces from the turrets, but I did not see his among the rabble rousers. He lives in the south-west corner of the village. Win him, win the people!",
                    "charResponse": "Your help is greatly appreciated!"
                },
                "7": {
                    "charResponse": "Your help is greatly appreciated!"
                }
            };
            }
            else {
            NPC.checkpointID = "Default"
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "Do I know you?",
                    "charResponse": "You're too fat to be the man I'm seeking. Apologies!"
                },
                "1": {
                    "charResponse": "You're too fat to be the man I'm seeking. Apologies!"
                }
            };
            }
        }
        else if (npcName == "Silva"){
            //Scene 6: After Duel
            if (dialogueCheck.indexOf("Silva Training") != -1) {
                NPC.checkpointID = "Silva to Cemetery";
                NPC.dialogue = {
                    "0": {
                        "npcDialogue": "Alright, alright! Perhaps you are right, but this is already out of my hands. My spies spotted peasants surrounding the monastery, and my men are already stationed outside Oceanus’ home.",
                        "charResponse": "This has gone far beyond any man… There’s only one way an entire village could be possessed in this way. So tell me, where do you bury your dead?"
                    },
                    "1": {
                        "npcDialogue": "Pardon?",
                        "charResponse": "I must go to the dead to find hints about your true master."
                    },
                    "2": {
                        "npcDialogue": "There’s a cemetery to the west of the peasant’s quarters.. Continue along the dirt road.",
                        "charResponse": ""
                    }
                };
            }
            //Scene 6: Before Duel
            else if (dialogueCheck.indexOf("Oceanus After Battle") != -1) {
                NPC.checkpointID = "Silva Training";
                NPC.dialogue = {
                    "0": {
                        "charResponse": "Lord Silva?"
                    },
                    "1": {
                        "npcDialogue": "Ah! You must be the little man who dreams of pacifying a revolution.",
                        "charResponse": "Lord Silva, you must flee the village."
                    },
                    "2": {
                        "npcDialogue": "Do you think I’m unaware of their next target? I am neither hiding nor fleeing. I am waiting for vengeance.",
                        charResponse: "The bloodshed must end."
                    },
                    "3": {
                        "npcDialogue": "Do you suppose I am pleased? I could have gone on happily with my studies and my ladies. Have you seen the bellibones hereabouts? Bedswervers, they are. No, I am merely reacting to barbarism.",
                        "charResponse": "The poor have endured their burdens long enough, and you know this."
                    },
                    "4": {
                        "npcDialogue": "Do you suppose they would have homes or breath in their lungs without my knights? Who do you prevented the Franks from raping, pillaging, and decimating this town? Farmers?",
                        "charResponse": "Nonetheless, revenge will only lead to greater disorder."
                    },
                    "5": {
                        "npcDialogue": "You are a sweet man, I see. But the strong must triumph.",
                        "charResponse": ""
                    }
                };
            }
            else {
            NPC.checkpointID = "Default"
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "[Default Dialogue]",
                    "charResponse": ""
                }
            };
            }
        }
    }
    else if (game_state.key == "state4") {
        if (npcName == "Oceanus") {
            //Scene 5: After Battle with Oceanus
            if (dialogueCheck.indexOf("Oceanus Before Battle") != -1) {
                NPC.checkpointID = "Oceanus After Battle";
                NPC.dialogue = {
                "0": {
                    "npcDialogue": "Fine, fine. Perhaps I have been in error. But of what use is that? The wheels of revolution have already begun spinning ahead of me.",
                    "charResponse": "In what sense?"
                },
                "1": {
                    "npcDialogue": "As we speak, men prepare to take the lives of Silva and Seth.",
                    "charResponse": "And I suppose you would be too late to stop this plot?"
                },
                "2": {
                    "npcDialogue": "I am not privy to a single detail regarding the plans, except that they will occur when Silva comes for confession.",
                    "charResponse": "Then I must warn Silva and Seth to flee! Farewell, Master Oceanus. Dissuade who you can; you owe those families your life."
                },
                "3": {
                    "charResponse": "Then I must warn Silva and Seth to flee! Farewell, Master Oceanus. Dissuade who you can; you owe those families your life."
                }
            };
            }
            /// Scene 5: Before Battle with Oceanus
            else if (dialogueCheck.indexOf("Self Dialogue") != -1) {
                NPC.checkpointID = "Oceanus Before Battle";
                NPC.dialogue = {
                "0":{
                    "npcDialogue": "Parvos! Uh… What a pleasant surprise! So I see your encounter—",
                    "charResponse": "*Shows the head of the snake.*"
                },
                "1": {
                    "charResponse": "Was this the leader you hoped for me to meet?"
                },
                "2": {
                    "npcDialogue": "*Speechless*",
                    "charResponse": "I will permit two replies. You may deceive me again or you may reveal the truth. In the former case, the Angel of Death will decide your fate."
                },
                "3": {
                    "npcDialogue": "*Looking at the serpent’s head*"
                },
                "4": {
                    "npcDialogue": "...I led the revolt.",
                    "charResponse": "Surely that is old news. You stole life. You are drenched in blood."
                },
                "5": {
                    "npcDialogue": "Because we have been despised long enough. It is high time that the lords of this land, the illegitimate masters of this hell, drown in a sea of resistance.",
                    "charResponse": "We?"
                },
                "6": {
                    "npcDialogue": "Decent folk. Peasants, as they say.",
                    "charResponse": "I will be the last to deny the sorry state of laborers in this age. But what distance does that grievance go towards alleviating your guilt?"
                },
                "7": {
                    "npcDialogue": "The new tax, the lengthened days, all weights on our shoulders. Sure, we could take the fatigue and the scorn. But have you heard what the tax collectors would do to women?! And cutting us off from Mass?",
                    "charResponse": "Cutting you from the Mass?"
                },
                "8": {
                    "npcDialogue": "The gentlemen convinced Brentwood clergy that we’re a horde of drunks, swindlers, and louts. So the moment wine vanished from the tabernacle, we looked to be the perfect scapegoats. We were excommunicated until a thief was turned over.",
                    "charResponse": "And at what point were fathers, mothers, sons, and daughters murdered? Over the span of four decades, from the time I was wee, I have not once observed Father Theo dipping into the holy wine."
                },
                "9": {
                    "npcDialogue": "Those innocents lived in a world of blood. With all respect, a good man would not associate with scum like Seth or Silva. We did not murder. We initiated our redemption! Affiliates of evil share graves when the roof caves.",
                    "charResponse": "You’re spreading lies."
                },
                "10": {
                    "npcDialogue": "The meek inheriting the earth, the last becoming first. Are you calling Christ a liar?",
                    "charResponse": ""
                }
            };
            }
            // Scene 3
            else if (dialogueCheck.indexOf("Seth Recommends Oceanus") != -1) {
                NPC.checkpointID = "Oceanus Recommends Brothel";
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
                        "npcDialogue": "Well that simply won’t due! At the very least, tell the rebels who are there that you under my aegis.",
                        "charResponse": "Will do."
                    },
                    "5": {
                        "charResponse": "Will do."
                    }
                };
            }
            else {
            NPC.checkpointID = "Default"
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "[Default Dialogue]",
                    "charResponse": ""
                }
            };
            }
        }
    }
    else if (game_state.key == "state5") {
        if (npcName == "Sicarius") {
            if (dialogueCheck.indexOf("Oceanus Recommends Brothel") != -1){
            NPC.checkpointID = "Sicarius To Basement";
            NPC.dialogue = {
                "0": {
                    "npcDialogue":"*Whistling*",
                    "charResponse": "Good sir, are you the leader of this rabble?"
                },
                "1": {
                    "npcDialogue":"Rabble? What business do you have here, little man? And do you presume that God will protect you?",
                    "charResponse": "In a sense, but in another sense, Master Oceanus sent me beneath his aegis."
                },
                "2": {
                    "npcDialogue":"Ah, Master Oceanus! That being the case, may I ask again, what brings you to these lowly quarters, good sir?",
                    "charResponse": "I wish to speak with the leader of yesterday’s massacre."
                },
                "3": {
                    "npcDialogue":"Have you not spoken with him yet?",
                    "charResponse": "I certainly hope not."
                },
                "4": {
                    "npcDialogue":"Certainly not. You are a lucky monk. Had I not known of your friendship with Oceanus, this encounter would have ended sourly for you. That aside, you will find our leader in the basement, hiding.",
                    "charResponse": "Many thanks."
                },
                "5": {
                    "charResponse": "Many thanks."
                }
            };
            }
            else {
            NPC.checkpointID = "Default"
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "[Default Dialogue]",
                    "charResponse": ""
                }
            };
            }
        }
        else if (npcName == "Parvos"){
            if (dialogueCheck.indexOf("Oceanus After Battle") != -1) {
                NPC.checkpointID = "Default";
                NPC.dialogue = {}
            }
            else if (dialogueCheck.indexOf("Sicarius To Basement") != -1) {
                NPC.checkpointID = "Self Dialogue";
                NPC.dialogue = {
                    "0": {
                        "npcDialogue": "Let’s pay another visit to dear Oceanus.",
                        "charResponse": ""
                    }
                }
            }
            else {
                NPC.checkpointID = "Default";
                NPC.dialogue = {}
            }
        }
    }
    else if (game_state.key == "state7") {
            NPC.checkpointID = "Self Dialogue";
            NPC.dialogue = {
                "0": {
                    "npcDialogue": "The cave is locked!",
                }

                }
     }
};

createInventory = function (game_state){

          //Spacebar toggles the inventory
          toggle_inventory = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
	
	   //GUI - the background image for the inventory
	   game_state.inventory_base = game_state.add.sprite(game.world.centerX, game.world.centerY,  'inventory_base');
	   game_state.inventory_base.fixedToCamera = true;
	   game_state.inventory_base.cameraOffset.x = 365;
	   game_state.inventory_base.cameraOffset.y = 190;
        game_state.inventory_base.visible = false;
        game_state.inventory_base.scale.set(1.5);
        
        game_state.styleInventory = {font: '20px Book Antiqua', fill: '#000000', wordWrap: true, wordWrapWidth: 220, align: 'center', fontWeight: 'bold'};
        game_state.styleInventory2 = {font: '15px Book Antiqua', fill: '#000000', align: 'left', fontWeight: 'bold'};
         game_state.styleInventory3 = {font: '15px Book Antiqua', fill: '#000000', align: 'center', fontWeight: 'bold', stroke: '#ffffff', strokeThickness: 3};
        
        //Create empty slots
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
        //Slot empty/full (0/1)
	   game_state.items[0] = new Array(); //not used yet (for auto-sort)
	   //Item name
	   game_state.items[1] = new Array();
	   //Item image
	   game_state.items[2] = new Array();
	   //Quantity of items
	   game_state.items[3] = new Array();
        //Text for numbers
        game_state.items[4] = new Array();
	   //Description
	   game_state.items[5] = new Array(); 	   
       //Slot X
        game_state.items[6] = new Array();
        //Slot Y
        game_state.items[7] = new Array();
        //Item SlotID
        game_state.items[8] = new Array();
        //Item ID
        game_state.items[9] = new Array();
    
        
        //Auto sort function      
        
        //Slot 1
        game_state.items[6][0] = game_state.slot1.centerX
        game_state.items[7][0] = game_state.slot1.centerY
        //Slot 2
        game_state.items[6][1] = game_state.slot2.centerX
        game_state.items[7][1] = game_state.slot2.centerY
        //Slot 3
        game_state.items[6][2] = game_state.slot3.centerX
        game_state.items[7][2] = game_state.slot3.centerY
        //Slot 4
        game_state.items[6][3] = game_state.slot4.centerX
        game_state.items[7][3] = game_state.slot4.centerY
        //Slot 5
        game_state.items[6][4] = game_state.slot5.centerX
        game_state.items[7][4] = game_state.slot5.centerY
        //Slot 6
        game_state.items[6][5] = game_state.slot6.centerX
        game_state.items[7][5] = game_state.slot6.centerY
    
        //Item 1
        game_state.items[1][0] = "Bread";
        game_state.items[2][0] = game_state.add.button(game_state.items[6][0]-30, game_state.items[7][0]-10,  'bread', useBread);
        game_state.items[2][0].alpha = 0.5;
        game_state.items[2][0].scale.set(0.2);
        game_state.items[2][0].onInputOver.add(over_bread, this);
        game_state.items[2][0].onInputOut.add(out, this);
        game_state.inventory_base.addChild(game_state.items[2][0]);
        game_state.items[3][0] = breadQ;
        game_state.items[4][0] = game_state.add.text(game_state.items[6][0]+20, game_state.items[7][0]+20, game_state.items[3][0], game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.items[4][0]);
        game_state.items[5][0] = "Restores 50% health once";
        game_state.items[8][0] = 1; //slot 1 (inital)
        game_state.items[9][0] = 1; //ITEM 1
        
        //Item 2
        game_state.items[1][1] ="Wine";
        game_state.items[2][1] = game_state.add.button(game_state.items[6][1]-20, game_state.items[7][1]-20,  'wine', useWine);
        game_state.items[2][1].alpha = 0.5;
        game_state.items[2][1].scale.set(0.1);
        game_state.items[2][1].onInputOver.add(over_wine, this);
        game_state.items[2][1].onInputOut.add(out, this);
        game_state.inventory_base.addChild(game_state.items[2][1]);
        game_state.items[3][1] = wineQ;
        game_state.items[4][1] = game_state.add.text(game_state.items[6][1]+20, game_state.items[7][1]+20, game_state.items[3][1], game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.items[4][1]);
        game_state.items[5][1] = "Restores 50% mana once";
        game_state.items[8][1] = 2; //slot 2 (inital)
        game_state.items[9][1] = 2; //ITEM 2
        
        //Item 3
        game_state.items[1][2] ="Scrolls";
        game_state.items[2][2] = game_state.add.button(game_state.items[6][2]-20, game_state.items[7][2]-20,  'scroll', useScroll);
        game_state.items[2][2].alpha = 0.5;
        game_state.items[2][2].scale.set(0.1);
        game_state.items[2][2].onInputOver.add(over_scroll, this);
        game_state.items[2][2].onInputOut.add(out, this);
        game_state.inventory_base.addChild(game_state.items[2][2]);
        game_state.items[3][2] = scrollQ;
        game_state.items[4][2] = game_state.add.text(game_state.items[6][2]+20, game_state.items[7][2]+20, game_state.items[3][2], game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.items[4][2]);
        game_state.items[5][2] = "Restores 50% stamina once";
        game_state.items[8][2] = 3; //slot 3 (inital)
        game_state.items[9][2] = 3; //ITEM 3

        
        //Item 4
        game_state.items[1][3] ="Key";
        game_state.items[2][3] = game_state.add.button(game_state.items[6][3]-30, game_state.items[7][3]-30,  'key');
        game_state.items[2][3].alpha = 0.5;
        game_state.items[2][3].scale.set(0.25);
        game_state.items[2][3].onInputOver.add(over_key, this);
        game_state.items[2][3].onInputOut.add(out, this);
        game_state.inventory_base.addChild(game_state.items[2][3]);
        game_state.items[3][3] = keyQ;
        game_state.items[4][3] = game_state.add.text(game_state.items[6][3]+20, game_state.items[7][3]+20, game_state.items[3][3], game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.items[4][3]);
        game_state.items[5][3] = "Opens the cave for the Boss Battle";
        game_state.items[8][3] = 4;
        game_state.items[9][3] = 4;
        
        //Empty item
        //Item 5
        game_state.items[1][4] ="";
        game_state.items[2][4] = game_state.add.button(game_state.items[6][4]-20, game_state.items[7][4]-20,  '');
        game_state.items[2][4].alpha = 0.5;
        game_state.items[2][4].scale.set(0.5);
        game_state.items[2][4].onInputOver.add(over_scroll, this);
        game_state.items[2][4].onInputOut.add(out, this);
        game_state.inventory_base.addChild(game_state.items[2][4]);
        game_state.items[3][4] = 0;
        game_state.items[4][4] = game_state.add.text(game_state.items[6][4]+20, game_state.items[7][4]+20, game_state.items[3][4], game_state.styleInventory2);
        game_state.inventory_base.addChild(game_state.items[4][4]);
        game_state.items[5][4] = "";
        game_state.items[8][4] = 5; //slot 4 (inital)
        game_state.items[9][4] = 5; //ITEM 4
        
        //Global function variables
    
        hover_bread = false;
        hover_wine = false;
        hover_scroll = false; 
        hover_key = false;
	  
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
function over_key(){
    hover_key = true;
}
function out(){
    hover_bread = false;
    hover_wine = false;
    hover_scroll = false;
    hover_key = false;
}

//Functions for item use
function useBread(){
    hover_bread = false;
    hover_wine = false;
    hover_scroll = false;
    hover_key = false;
    if(characterEnergy < charMaxEnergy){
        breadQ = breadQ - 1;
        temp_Restore = charMaxEnergy / 2;
        if(characterEnergy + temp_Restore > charMaxEnergy){
            characterEnergy = charMaxEnergy;
        }
        else{
            characterEnergy = characterEnergy + temp_Restore; //Check how much is left to fill
        }
    }
    else{
        usageText = 'You are already fully healed!';
        game.time.events.add(1500, function () { usageText='';}, self);        
        
    }    
}
function useWine(){
    hover_bread = false;
    hover_wine = false;
    hover_scroll = false;
    hover_key = false;
    if(characterMana < charMaxMana){
        wineQ = wineQ - 1;
        temp_Restore = charMaxMana / 2;
        if(characterMana + temp_Restore > charMaxMana){
            characterMana = charMaxMana;
        }
        else{
            characterMana = characterMana + temp_Restore;
        }
    }
    else{
        usageText = 'You have already full mana!';
        game.time.events.add(1500, function () { usageText='';}, self);   
    }
    
}
function useScroll(){
    hover_bread = false;
    hover_wine = false;
    hover_scroll = false;
    hover_key = false;
    if(characterStamina < charMaxStamina){
        scrollQ = scrollQ -1;
        temp_Restore = charMaxStamina / 2;
        if(characterStamina + temp_Restore > charMaxStamina){
            characterStamina = charMaxStamina;
        }
        else{
            characterStamina = characterStamina + temp_Restore;
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
        game_state.items[3][3] = keyQ;
    
        game_state.items[4][0].setText(game_state.items[3][0]);
        game_state.items[4][1].setText(game_state.items[3][1]);
        game_state.items[4][2].setText(game_state.items[3][2]);
        game_state.items[4][3].setText(game_state.items[3][3]);
        
        
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
              //Reset if inventory is invisble
                hover_bread = false;
                hover_wine = false;
                hover_scroll = false;
                hover_key = false;
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
            else if(hover_key == true){
              game_state.item_name_text= game_state.items[1][3];
                game_state.item_description_text = game_state.items[5][3];
                game_state.items[2][3].alpha = 1;
                }
            
            else{
                game_state.item_name_text= '';
                game_state.item_description_text = '';
                 for(var u=0; u<5; u++)
                {
                game_state.items[2][u].alpha = 0.5;
                };
               }
            game_state.item_name.setText(game_state.item_name_text);
            game_state.item_description.setText(game_state.item_description_text);
            for(var i=0; i<5; i++)
                {
                //Remove item from inventory if quantity is 0
                if(game_state.items[3][i]==0)
                    {
                    game_state.items[2][i].visible = false;
                    game_state.items[4][i].visible = false;
                    }
                else if(game_state.items[3][i]>0) {
                    
                    game_state.items[2][i].visible = true;
                    game_state.items[4][i].visible = true;
                }
                };
        }
};

wait = function(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
};

pickup = function (game_state){    
if(chest_state7 == true){
    if (((chest.x <= monk.x) && chest.x+30>= monk.x) && ((chest.y <= monk.y) && chest.y+30 >=monk.y)&& chest.active == true) {
    keyQ = 1;
    chest_state7 == false;
    chest.active = false;
    chest.frame = 1;
}
}
    else{
if (((chest.x <= monk.x) && chest.x+100>= monk.x) && ((chest.y <= monk.y) && chest.y+100 >=monk.y)&& chest.active == true) {
 
   chest.frame = 1;
pickedItem = Math.round(game_state.rnd.integerInRange(1, 3),0);
      chest.active = false;
 
    if(pickedItem==1)
        {
            breadQ = breadQ + 1;
        }
    else if(pickedItem == 2){
        
        wineQ = wineQ + 1;
    }
    else if(pickedItem == 3){
        scrollQ = scrollQ +1;
    }
}
}
};

/*/     //Auto sort
        for(var i=0; i<5; i++)
            {
            //Set slots to empty
            if(game_state.items[3][i]==0){
                
                if(game_state.items[8][i]==1)
                {game_state.items[0][0]=0;
                }
                else if(game_state.items[8][i]==2)
                {game_state.items[0][1]=0;
                }
                else if(game_state.items[8][i]==3)
                {game_state.items[0][2]=0;
                }
            }
                //Set slots to full
                else{

                if(game_state.items[8][i]==1)
                {game_state.items[0][0]=1;
                }
                else if(game_state.items[8][i]==2)
                {game_state.items[0][1]=1;
                }
                else if(game_state.items[8][i]==3)
                {game_state.items[0][2]=1;
                }
                }
                
                //Search for empty slot
                if(game_state.items[0][i]==0){
                    if(game_state.items[0][i+1]==1){
                game_state.items[0][i] = 1; 
                game_state.items[0][i+1] = 0;

                if(i==0){
                slotID = 1;
                }
                else if(i==1){
                slotID = 2;
                }
                else if(i==2){
                slotID = 3;
                } for(var u=0; u<3; u++)
                    {
                        if(game_state.items[8][u]==slotID){
                            ID = u;
                        }
                    }  
                game_state.items[8][ID] = game_state.items[8][i+1];
                game_state.items[8][i+1] = 1;
                temp_slot_button = game_state.items[2][i+1].x;
                temp_slot_number = game_state.items[4][i+1].x
                game_state.items[2][i+1].x = game_state.items[2][ID].x;
                game_state.items[4][i+1].x = game_state.items[4][ID].x;
                game_state.items[2][ID].x = temp_slot_button;
                game_state.items[4][ID].x = temp_slot_number;
                    }
                 else if(game_state.items[0][i+1]==0){
                       game_state.items[0][i] = 1; 
                        game_state.items[0][i+2] = 0;

                if(i==0){
                slotID = 1;
                }
                else if(i==1){
                slotID = 2;
                }
                else if(i==2){
                slotID = 3;
                } for(var u=0; u<3; u++)
                    {
                        if(game_state.items[8][u]==slotID){
                            ID = u;
                        }
                    }  
                game_state.items[8][ID] = game_state.items[8][i+2];
                game_state.items[8][i+2] = 1;
                temp_slot_button = game_state.items[2][i+2].x;
                temp_slot_number = game_state.items[4][i+2].x
                game_state.items[2][i+2].x = game_state.items[2][ID].x;
                game_state.items[4][i+2].x = game_state.items[4][ID].x;
                game_state.items[2][ID].x = temp_slot_button;
                game_state.items[4][ID].x = temp_slot_number;
                   }
                }
                  
            }
            /*/

createHintBtn = function (game_state, callback) {
    HintOpen = false;
    hintBtn = new Object();
    hintBtn.button = game.add.button(game.world.centerX,game.world.centerY,'ideaBtn', callback, this);
    hintBtn.button.input.enabled = false;
    hintBtn.button.anchor.setTo(0, 0);
    hintBtn.button.fixedToCamera = true;
	hintBtn.button.cameraOffset.x = 15;
	hintBtn.button.cameraOffset.y = 120;
    hintBtn.button.alpha = 0.35;
    
    hintBtn.txt = game.add.text(game.world.centerX, game.world.centerY, "Hint", {
            font: "Book Antiqua",
            fontSize: 20,
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#FFF', 
            align:'center'
        });
    hintBtn.txt.anchor.setTo(0, 0.25);
    hintBtn.txt.fixedToCamera = true;
	hintBtn.txt.cameraOffset.x = 90;
	hintBtn.txt.cameraOffset.y = 159;
    hintBtn.txt.alpha = 0.35;
    
    hintBtn.button.bringToTop();
    hintBtn.txt.bringToTop();
    hintBtn.timer = new Date().getTime();
    hintBtn.timer += 1000;
};

updateHintBtn = function () {
    timeNow = new Date().getTime();
    if (hintBtn.timer <= timeNow) {
        hintBtn.button.input.enabled = true;
        hintBtn.button.alpha = 1;
        hintBtn.txt.alpha = 1;
    }
};

HintInfo = function (game_state) {
    hintPopup = new Object();
    hintPopup.background = game_state.add.sprite(game.world.centerX, game.world.centerY, 'hintPopup');
    hintPopup.background.anchor.setTo(0, 0);
    hintPopup.background.fixedToCamera = true;
    hintPopup.background.cameraOffset.x = 60;
	hintPopup.background.cameraOffset.y = 0;
    
    hintPopup.Title = game_state.add.text(game.world.centerX, game.world.centerY, "Hint", {
            font: "Book Antiqua",
            fontSize: "100px",
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#4d2800', 
            align:'center'
        });
    hintPopup.Title.anchor.setTo(0, 0);
    hintPopup.Title.fixedToCamera = true;
	hintPopup.Title.cameraOffset.x = 200;
	hintPopup.Title.cameraOffset.y = 50;
    
    hintPopup.Task = game_state.add.text(game.world.centerX, game.world.centerY, "Task: ", {
            font: "Book Antiqua",
            fontSize: "50px",
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#4d2800', 
            align:'center'
        });
    hintPopup.Task.anchor.setTo(0, 0);
    hintPopup.Task.fixedToCamera = true;
    hintPopup.Task.cameraOffset.x = 200;
	hintPopup.Task.cameraOffset.y = 250;
    
    hintPopup.NPCName = game_state.add.text(game.world.centerX, game.world.centerY, "Talk to Head Abbot", {
            font: "Book Antiqua",
            fontSize: "35px",
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#4d2800', 
            align:'center'
        });
    hintPopup.NPCName.anchor.setTo(0, 0);
    hintPopup.NPCName.fixedToCamera = true;
	hintPopup.NPCName.cameraOffset.x = 300;
	hintPopup.NPCName.cameraOffset.y = 350;
    
    hintPopup.NPCImage = game_state.add.sprite(game.world.centerX, game.world.centerY, "father");
    hintPopup.NPCImage.anchor.setTo(0.5, 0.5);
    hintPopup.NPCImage.fixedToCamera = true;
	hintPopup.NPCImage.cameraOffset.x = 450;
	hintPopup.NPCImage.cameraOffset.y = 600;
    
    hintPopup.location = game_state.add.text(game.world.centerX, game.world.centerY, "Location: ", {
            font: "Book Antiqua",
            fontSize: "50px",
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#4d2800', 
            align:'center'
        });
    hintPopup.location.anchor.setTo(0, 0);
    hintPopup.location.fixedToCamera = true;
    hintPopup.location.cameraOffset.x = 700;
	hintPopup.location.cameraOffset.y = 250;
    
    hintPopup.locationName = game_state.add.text(game.world.centerX, game.world.centerY, "Tutorial", {
            font: "Book Antiqua",
            fontSize: "35px",
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#4d2800', 
            align:'center'
        });
    hintPopup.locationName.anchor.setTo(0, 0);
    hintPopup.locationName.fixedToCamera = true;
    hintPopup.locationName.cameraOffset.x = 800;
	hintPopup.locationName.cameraOffset.y = 350;
    
    hintPopup.locationImg = game_state.add.sprite(game.world.centerX, game.world.centerY, "tutorialHA");
    hintPopup.locationImg.anchor.setTo(0, 0);
    hintPopup.locationImg.fixedToCamera = true;
	hintPopup.locationImg.cameraOffset.x = 710;
	hintPopup.locationImg.cameraOffset.y = 400;
    
    hintPopup.exit = game_state.add.button(game.world.centerX,game.world.centerY,'exitHint', function () {
        hintPopup.exit.input.enabled = false;
        hintPopup.background.alpha = 0;
        hintPopup.NPCImage.alpha = 0;
        hintPopup.exit.alpha = 0;
        hintPopup.Title.alpha = 0;
        hintPopup.Task.alpha = 0;
        hintPopup.location.alpha = 0;
        hintPopup.locationImg.alpha = 0;
        hintPopup.locationName.alpha = 0;
        hintPopup.NPCName.alpha = 0;
        HintOpen = false;
    });
    hintPopup.exit.anchor.setTo(0, 0);
    hintPopup.exit.fixedToCamera = true;
	hintPopup.exit.cameraOffset.x = 1090;
	hintPopup.exit.cameraOffset.y = 40;
    
    hintPopup.exit.input.enabled = false;
    hintPopup.background.alpha = 0;
    hintPopup.NPCImage.alpha = 0;
    hintPopup.exit.alpha = 0;
    hintPopup.Title.alpha = 0;
    hintPopup.Task.alpha = 0;
    hintPopup.location.alpha = 0;
    hintPopup.locationImg.alpha = 0;
    hintPopup.locationName.alpha = 0;
    hintPopup.NPCName.alpha = 0;
};

updateHint = function(game_state, talk, npcName, npcScaleX, npcScaleY, npcID, buildingName, spriteID) {
    if (!HintOpen) {
        if (talk) {
            hintPopup.NPCName = game_state.add.text(game.world.centerX, game.world.centerY, "Talk to " + npcName, {
                font: "Book Antiqua",
                fontSize: "35px",
                fontVariant: 'small-caps',
                fontWeight:"bold",
                fill:'#4d2800', 
                align:'center'
            });
        }
        else {
            hintPopup.NPCName = game_state.add.text(game.world.centerX, game.world.centerY, "Battle the " + npcName, {
                font: "Book Antiqua",
                fontSize: "35px",
                fontVariant: 'small-caps',
                fontWeight:"bold",
                fill:'#4d2800', 
                align:'center'
            });
        }
        
        hintPopup.NPCName.anchor.setTo(0, 0);
        hintPopup.NPCName.fixedToCamera = true;
        hintPopup.NPCName.cameraOffset.x = 300;
        hintPopup.NPCName.cameraOffset.y = 350;

        hintPopup.NPCImage = game_state.add.sprite(game.world.centerX, game.world.centerY, npcID);
        hintPopup.NPCImage.scale.set(npcScaleX, npcScaleY);
        hintPopup.NPCImage.anchor.setTo(0.5, 0.5);
        hintPopup.NPCImage.fixedToCamera = true;
        hintPopup.NPCImage.cameraOffset.x = 450;
	   hintPopup.NPCImage.cameraOffset.y = 600;

        hintPopup.locationName = game_state.add.text(game.world.centerX, game.world.centerY, buildingName, {
                font: "Book Antiqua",
                fontSize: "35px",
                fontVariant: 'small-caps',
                fontWeight:"bold",
                fill:'#4d2800', 
                align:'center'
            });
        hintPopup.locationName.anchor.setTo(0, 0);
        hintPopup.locationName.fixedToCamera = true;
        hintPopup.locationName.cameraOffset.x = 800;
        hintPopup.locationName.cameraOffset.y = 350;

        hintPopup.locationImg  = game_state.add.sprite(game.world.centerX, game.world.centerY, spriteID);
        hintPopup.locationImg.anchor.setTo(0, 0);
        hintPopup.locationImg.fixedToCamera = true;
        hintPopup.locationImg.cameraOffset.x = 710;
        hintPopup.locationImg.cameraOffset.y = 400;

        hintPopup.exit = game_state.add.button(game.world.centerX,game.world.centerY,'exitHint', function () {
            hintPopup.exit.input.enabled = false;
            hintPopup.background.alpha = 0;
            hintPopup.NPCImage.alpha = 0;
            hintPopup.exit.alpha = 0;
            hintPopup.Title.alpha = 0;
            hintPopup.Task.alpha = 0;
            hintPopup.location.alpha = 0;
            hintPopup.locationImg.alpha = 0;
            hintPopup.locationName.alpha = 0;
            hintPopup.NPCName.alpha = 0; 
            HintOpen = false;
        });
        hintPopup.exit.anchor.setTo(0, 0);
        hintPopup.exit.fixedToCamera = true;
        hintPopup.exit.cameraOffset.x = 1090;
        hintPopup.exit.cameraOffset.y = 40;
        hintPopup.exit.input.enabled = false;
        hintPopup.exit.alpha = 0;

        hintPopup.NPCImage.alpha = 0;
        hintPopup.locationImg.alpha = 0;
        hintPopup.locationName.alpha = 0;
        hintPopup.NPCName.alpha = 0;
        }
};

getHint = function () {
    hintPopup.exit.input.enabled = true;
    hintPopup.background.alpha = 1;
    hintPopup.NPCImage.alpha = 1;
    hintPopup.exit.alpha = 1;
    hintPopup.Title.alpha = 1;
    hintPopup.Task.alpha = 1;
    hintPopup.location.alpha = 1;
    hintPopup.locationImg.alpha = 1;
    hintPopup.locationName.alpha = 1;
    hintPopup.NPCName.alpha = 1;
};

AllHintUpdate = function (game_state) {
    if ((dialogueCheck.indexOf("Head Abbot Tutorial") != -1) && (dialogueCheck.indexOf("Thomas Tutorial") == -1)) {
        updateHint(game_state, true, 'Thomas', 3, 3, 'thomas', 'Tutorial', 'tutorialThomas');
    }
    
    if ((dialogueCheck.indexOf("Thomas Tutorial") != -1) && (BattlesCompleted.indexOf("Young Devil") == -1)){
        updateHint(game_state, false, 'Young Devil', 0.75, 0.75, 'tutorialEnemy', 'Tutorial', 'tutorialBattle');
    }
    
    if ((BattlesCompleted.indexOf("Young Devil") != -1) && (dialogueCheck.indexOf("Seth Recommends Oceanus") == -1)){
        updateHint(game_state, true, 'Seth', 1, 1, 'seth', 'Monastery', 'hintMonastery');
    }
    
    if ((dialogueCheck.indexOf("Seth Recommends Oceanus") != -1) && (dialogueCheck.indexOf("Oceanus Recommends Brothel") == -1)){
        updateHint(game_state, true, 'Oceanus', 1, 1, 'oceanus', 'Peasant\'s House', 'hintHut');
    }
    
    if ((dialogueCheck.indexOf("Oceanus Recommends Brothel") != -1) && (dialogueCheck.indexOf("Sicarius To Basement") == -1)){
        updateHint(game_state, true, 'Sicarius', 1, 1, 'sicarius', 'Brothel', 'hintBrothel');
    }
    
    if ((dialogueCheck.indexOf("Sicarius To Basement") != -1) && (BattlesCompleted.indexOf("Serpent") == -1)){
        updateHint(game_state, false, 'Serpent', 0.75, 0.75, 'serpent', 'Basement of the Brothel', 'hintBasement');
    }
    
    if ((BattlesCompleted.indexOf("Serpent") != -1) && (dialogueCheck.indexOf("Oceanus Before Battle") == -1)){
        updateHint(game_state, true, 'Oceanus', 1, 1, 'oceanus', 'Peasant\'s House', 'hintHut');
    }
    
    if ((dialogueCheck.indexOf("Oceanus After Battle") != -1) && (dialogueCheck.indexOf("Silva Training") == -1)){
        updateHint(game_state, true, 'Oceanus', 1, 1, 'oceanus', 'Peasant\'s House', 'hintHut');
    }
    
    //Go to the Cemetery
    if ((dialogueCheck.indexOf("Silva to Cemetery") != -1) && (dialogueCheck.indexOf("Silva Training") == -1)){
        updateHint(game_state, true, 'Oceanus', 1, 1, 'oceanus', 'Peasant\'s House', 'hintHut');
    }
    
    
}