// A file to control global variables
var demo = demo || {};
var coordinate = 'start';

// Initialize audio variables
var intro, outro, bg, battleSong, chew, death, demon, medievalMusic, sword, thunder, walkAudio, roosterSound, footsteps_outside, footsteps_inside, sonicBoom, sparkle, wineSound, scrollSound, parvosTalk, NPCTalk;

var monk, cursors, w, a, s, d, trigger2a, walls_noWalk2, fixtures_noWalk2b, enter, tutorial, vel = 275, characterEnergy, characterMana, characterStamina, wineQ, breadQ, charMaxEnergy, charMaxMana, charMaxStamina, timeNow, hintBtn, hintPopup, HintOpen, returnState, charPosition;

var dialogueCheck = []/*["Silva to Cemetery","Silva Training","Oceanus After Battle","Oceanus Before Battle","Self Dialogue","Sicarius To Basement","Oceanus Recommends Brothel","Seth Recommends Oceanus","Thomas Tutorial","Head Abbot Tutorial"]*/;


// Global variables to control audio
var audioCoordinate;
var battleAudio;

demo.state00 = function(){};
demo.state00.prototype = {
    preload: function()
    {
        // Load Audio Files
        game.load.audio('parvosTalk', '../assets/audio/Parvos.m4a');
        game.load.audio('NPCTalk', '../assets/audio/NPC.m4a');
        game.load.audio('battleSong', '../assets/audio/battleSong.mp3');
        game.load.audio('chew', '../assets/audio/chew.m4a');
        game.load.audio('death', '../assets/audio/death.wav');
        game.load.audio('intro', '../assets/audio/intro.mp3');
        game.load.audio('medievalMusic', '../assets/audio/medieval.m4a');
        game.load.audio('sword', '../assets/audio/sword.wav');
        game.load.audio('timpani', '../assets/audio/timpani.wav');
        game.load.audio('walkAudio', '../assets/audio/walk.wav');
        game.load.audio('doorSound', '../assets/audio/doorSound.wav');
        game.load.audio('roosterSound', '../assets/audio/roosterSound.wav');
        game.load.audio('footsteps_outside', '../assets/audio/footsteps_outside.wav');
        game.load.audio('footsteps_inside', '../assets/audio/footsteps_inside.m4a');
        game.load.audio('sonicBoom', '../assets/audio/sonicBoom.wav');
        game.load.audio('thunder', '../assets/audio/thunder.wav');
        game.load.audio('sparkle', '../assets/audio/sparkle.wav');
        game.load.audio('wineSound', '../assets/audio/wineSound.m4a');
        game.load.audio('picked', '../assets/audio/itempicked.mp3');
        game.load.audio('snake', '../assets/audio/snake.wav');
        game.load.audio('scrollSound', '../assets/audio/scrollSound.wav');
        game.load.audio('outro', '../assets/audio/outro.m4a');
    },
    
    create:function()
    {
        // Initialize Audio Samples
        parvosTalk = game.add.audio('parvosTalk');
        parvosTalk.volume = 0.2;
        NPCTalk = game.add.audio('NPCTalk');
        NPCTalk.volume = 0.2;
        
        
        battleSong = game.add.audio('battleSong');
        chew = game.add.audio('chew');
        death = game.add.audio('death');
        intro = game.add.audio('intro');
        medievalMusic = game.add.audio('medievalMusic');
        sword = game.add.audio('sword');
        timpani = game.add.audio('timpani');
        walkAudio = game.add.audio('walkAudio');
        doorSound = game.add.audio('doorSound');
        roosterSound = game.add.audio('roosterSound');
        footsteps_inside = game.add.audio('footsteps_inside');
        footsteps_outside = game.add.audio('footsteps_outside');
        sonicBoom = game.add.audio('sonicBoom');
        thunder = game.add.audio('thunder');
        sparkle = game.add.audio('sparkle');
        wineSound = game.add.audio('wineSound');
        pickupSound = game.add.audio('picked');
        snake = game.add.audio('snake');
        scrollSound = game.add.audio('scrollSound');
        outro = game.add.audio('outro');
        
        // Play the opening music
        intro.play();
        intro.loopFull(0.6);
        
        this.state.start("state0");
    },
};