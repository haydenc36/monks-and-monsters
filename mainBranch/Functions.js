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
    }
}

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
    game_state.blood_bar.scale.set(game_state.healthscale, 1);
    game_state.mana_bar.scale.set(game_state.manascale, 1);
    game_state.stamina_bar.scale.set(game_state.staminascale, 1);
}
