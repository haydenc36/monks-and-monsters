var demo = demo || {};

demo.intro = function(){};

demo.intro.prototype = {
    
     init: function(charStats, invent)
    {
        changeStatsInvent(charStats,invent);
    },
    
preload: function()
    {
        game.load.spritesheet('fade', '../assets/sprites/blackBox.jpg');
        game.load.spritesheet('paper', '../assets/boxes/paper-dialog.png');
        //game.load.audio('introsound', '../assets/audio/intro.mp3');

    },
create: function()
    {
        var bg = game.add.sprite(0,-100,'Barcelona');
        bg.scale.set(0.45);
        
        bounds_x = 1320;
        game.world.setBounds(0,0, bounds_x, 1760);
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        //Add paper background for text
        this.intro_layout = game.add.sprite(game.world.centerX, game.world.centerY,'paper');
        this.intro_layout.fixedToCamera = true;
        this.intro_layout.cameraOffset.x = 200;
        this.intro_layout.cameraOffset.y = -40;
        this.intro_layout.scale.set(3, 7);
        this.fade = game.add.sprite(-500, -500, 'fade');
        this.fade.scale.set(10);
        this.fade.alpha = 1;
        
        //Add text
        this.intro_textstyle = {font: '35px Book Antiqua', fontStyle: 'italic', fill: '#4c3e2e', align: 'center', fontWeight: 'bold'};

        this.intro_text = game.add.text(game.world.centerX - 400, 800 , 'The year is 1381, and kingdoms throughout Europe are reeling from the savagery and cost of what historians would later call The Hundred Years War. Lords struggle to finance ongoing battle efforts. Peasants watch helplessly as their sons vanish into the war and their daughters suffer unspeakable abuses by enemy warriors. New taxes are enacted, work days are lengthened, and the sutures of communities slowly tear.\n\nAs a fierce undercurrent and response to this continental drama, heretical movements are sweeping across Europe. Landed gentry quote holy scriptures to ennoble their brutal enforcement of new taxes, increased labor, and the Medieval pecking order. Peasants have come to believe that the world rightly belongs to them alone, that violence from rulers must be overwhelmed with violence from God’s People, that the Kingdom of Heaven belongs on Earth, and that this Kingdom belongs to the People.\n\n Invisibly, devils have claimed control of Europe, spawning Heresy Monsters that have come to rule the continent’s villages and kingdoms. To reclaim the continent, these Monsters must be annihilated one by one, and their Dark Lords too must be committed to the abyss!', this.intro_textstyle);
        this.intro_text.wordWrapWidth = '800';
        this.intro_text.wordWrap = true;
        this.intro_text.inputEnabled = true;
    },
    
update : function()
    {
        if(this.intro_text.y<= -1100)
            {
                this.fade.alpha = this.fade.alpha + 0.012;
                
                if(this.fade.alpha>=1)
                {
                    intro.stop();
                    game.state.start("state2"); 
                }
            }
        
        else
        {

            if(this.fade.alpha <= 0)
            {
                this.intro_text.y = this.intro_text.y - 0.75;
            }

            else
            {
                this.fade.alpha = this.fade.alpha - 0.01;
            }
        }
    },
};