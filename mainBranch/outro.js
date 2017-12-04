var demo = demo || {};

demo.outro = function(){};

demo.outro.prototype = {
    
     init: function(charStats, invent)
    {
        changeStatsInvent(charStats,invent);
    },
    
preload: function()
    {
        game.load.spritesheet('fade', '../assets/sprites/blackBox.jpg');
        game.load.spritesheet('paper', '../assets/boxes/intro-paper.png');
    },
create: function()
    {   
        intro.stop();
        medievalMusic.stop();
        
        //Play outro music
        outro.play();
        
        var bg = game.add.sprite(0,-100,'Barcelona');
        bg.scale.set(0.45);
        
        bounds_x = 1320;
        game.world.setBounds(0,0, bounds_x, 1760);
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        //Add paper background for text
        this.outro_layout = game.add.sprite(game.world.centerX, game.world.centerY,'paper');
        this.outro_layout.fixedToCamera = true;
        this.outro_layout.cameraOffset.x = 200;
        this.outro_layout.cameraOffset.y = -40;
        this.outro_layout.scale.set(3, 7);
        this.fade = game.add.sprite(-500, -500, 'fade');
        this.fade.scale.set(10);
        this.fade.alpha = 1;
        
        //Add text
        this.outro_textstyle = {font: '35px Book Antiqua', fontStyle: 'italic', fill: '#4c3e2e', align: 'center', fontWeight: 'bold'};

        this.outro_text = game.add.text(game.world.centerX - 400, 800 ,'Credits \n \n \n \n Creators: \n \n Hayden Cowart – Aesthetics \n Cheryl Loy – Backend Programming \n Zhenyu Zeng – Frontend Programming \n\n\n Supervisors: \n\n Dr. Paul Toprac \n Louis Dongwook \n Gahwon Lee \n\n\n Graphics:\n\n Reiner “Tiles” Prokein at reinerstilesets.de\n“Barracks”\n“Castle”\n“Chapel”\n“Farmhouse”\n“Foresters Lodge”\n“Half-Timbered House”\n“Pub”\n“Sawmill”\n“Simple Hut”\n“Stone Hut” \n\n\n Ayene-chan at DeviantArt.com \n\n “RPG Maker VX – Small Paintings”\n“RPG Maker VX – Inn”\n“RPG Maker VX – Ace”\n“RPG Maker VX – Sofas”\n“RPG Maker VX – Tile”\n“RPG Maker VX – Tables”\n“RPG Maker VX – Stairs”\n“RPG Maker VX – Benches”\n“RPG Maker VX – Big Beds”\nRPG Maker VX – Wooden Floor” \n \n\n Daniel Cook at OpenGameArt.org \n\n “2D Lost Garden Tileset Transition to Jetrel’s Wood Tileset”\n“2D Lost Garden Zelda Style”\n\n\n Hyptosis at OpenGameArt.org - “Mage City Arcanos” \n\n Soruve at rmGameMaterial.wordpress.com - “VX First Seed Material”\n\n Selvans at SmiteGame.com - “Typhon, the Fire Demon \n\n\n Audio\n\n Battle Audio: "The End of All Things" by Howard Shore\n\n\n Navigation Audio: "La Ciel et la terre (Heaven and earth)" by Azam Ali \n\n\n Remaining Audio from FreeSound.org \n\n\n InspectorJ \n\n “Door, Church, Close”\n“Footsteps, Stones” \n “Footsteps, Concrete" \n\n\n Robinhood76 \n\n “Huge Close Thunder”\n“Vampire Hiss”\n“Hardwood Walking \n\n\n Vendarro - “Signal-Ring 1” \n\n Audione - “Sword-01” \n\n Nick121087 - “Demonic Woman Scream”\n\n Philip1789 - “Chew Food” \n\n Shmeepz - “Timpani Epix” \n\n Cabled_mess - “Rooster Crowing” \n\n Cornica_S - “Sonic Boom” \n\n Alex@vsi.tv - “Royal Sparkle Whoosh” \n\n Eelke - “Pooring Wine” \n\n Jamius - “SnakeAttackVerbPuls” \n\n Marissrar - “Paper Tear”', this.outro_textstyle);
        this.outro_text.wordWrapWidth = '800';
        this.outro_text.wordWrap = true;
        this.outro_text.inputEnabled = true;
    },
    
update : function()
    {
        if(this.outro_text.y<= -4500)
            {
                this.fade.alpha = this.fade.alpha + 0.012;
                
                if(this.fade.alpha>=1)
                {
                    outro.stop();
                    resetGame();
                    this.state.start("state0", true, true);
                }
            }
        
        else
        {

            if(this.fade.alpha <= 0)
            {
                this.outro_text.y = this.outro_text.y - 1;
            }

            else
            {
                this.fade.alpha = this.fade.alpha - 0.01;
            }
        }
    },
};