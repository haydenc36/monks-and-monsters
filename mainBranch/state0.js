// Main Menu
var demo = demo || {};
var coordinate = 'start';

// Initialize audio variables
var intro, battleSong, chew, death, demon, medievalMusic, sword, thunder, walk, roosterSound, footsteps_outside, footsteps_inside;

// Global variables to control audio
var audioCoordinate;

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        this.load.image('Barcelona','../assets/backgrounds/Barcelona.png');
        this.load.image('button','../assets/sprites/scroll_menu.png');
        
        // Load Audio Files
        game.load.audio('battleSong', '../assets/audio/battleSong.mp3');
        game.load.audio('chew', '../assets/audio/chew.mp3');
        game.load.audio('death', '../assets/audio/death.wav');
        game.load.audio('demon', '../assets/audio/demon.mp3');
        game.load.audio('intro', '../assets/audio/intro.mp3');
        game.load.audio('medievalMusic', '../assets/audio/medieval.m4a');
        game.load.audio('sword', '../assets/audio/sword.wav');
        game.load.audio('timpani', '../assets/audio/timpani.wav');
        game.load.audio('walk', '../assets/audio/walk.wav');
        game.load.audio('doorSound', '../assets/audio/doorSound.wav');
        game.load.audio('roosterSound', '../assets/audio/roosterSound.wav');
        game.load.audio('footsteps_outside', '../assets/audio/footsteps_outside.wav');
        game.load.audio('footsteps_inside', '../assets/audio/footsteps_inside.wav');
        
    },
    create:function(){
        
        // Initialize Audio Samples
        intro = game.add.audio('intro');
        intro.play();
        intro.loopFull(0.6);
        
        footsteps_inside = game.add.audio('footsteps_inside');
        footsteps_outside = game.add.audio('footsteps_outside');
        
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        var bg = game.add.sprite(0,-100,'Barcelona');
        bg.scale.set(0.45);
        
        var title = game.add.text(600, 200, "Monks & Monsters");
        title.anchor.set(0.5,0.5);
        title.align = 'center';
        title.font = 'Book Antiqua';
        title.fontSize = 100;
        title.fontWeight = 'bold';
        title.fontVariant = 'small-caps';
        title.fontStyle = 'italic';
        title.fill = '#fff';
        title.setShadow(5, 0, 'rgba(0,0,0,0.5)', 0);
        title.shadowBlur = 5;
        
        this.createButton(40, "Play", 600, 375, 400, 200, function(){
            this.state.start("state2", true, false, [100,100,100,100,100,100], [1,1]);
            //this.state.start("BootState", true, false, "../assets/BrothelBattle.JSON", "BattleState", [100,100,100,100,100,100], [1,1], {},tutorial);
        });
        
        this.createButton(25, "Instructions", 600, 500, 300, 100, function(){
            this.state.start("state6");
        });
    },
    
    createButton:function(s, string, x, y, w, h, callback){
        var btn = game.add.button(x,y,'button',callback,this,2,1,0);
        
        btn.anchor.setTo(0.5,0.5);
        btn.width = w;
        btn.height = h;
        
        var txt = game.add.text(btn.x, btn.y, string, {
            font: "Book Antiqua",
            fontStyle: "italic",
            fontSize: s,
            fontVariant: 'small-caps',
            fontWeight:"bold",
            fill:'#4d2800', 
            align:'center'
        });
        
        txt.setShadow(2.5, 0, 'rgba(0,0,0,0.5)', 0);
        txt.shadowBlur = 5;
        txt.anchor.setTo(0.5,0.5);
        
        btn.alpha = 0.9;
        txt.alpha = 0.9;
    }
};