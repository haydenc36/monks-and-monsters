// A file to control global variables
var demo = demo || {};
var coordinate = 'start';

// Initialize audio variables
var intro, battleSong, chew, death, demon, medievalMusic, sword, thunder, walkAudio, roosterSound, footsteps_outside, footsteps_inside, sonicBoom, sparkle, wineSound;

var monk, cursors, w, a, s, d, trigger2a, walls_noWalk2, fixtures_noWalk2b, enter, tutorial, vel = 400, characterEnergy, characterMana, characterStamina, wineQ, breadQ, charMaxEnergy, charMaxMana, charMaxStamina, timeNow, hintBtn, hintPopup, HintOpen;

var dialogueCheck = [] = ["Self Dialogue","Sicarius To Basement","Oceanus Recommends Brothel","Oceanus Before Battle","Oceanus After Battle","Silva Training","Silva to Cemetery","Seth Recommends Oceanus","Thomas Tutorial","Head Abbot Tutorial"];


// Global variables to control audio
var audioCoordinate;
var battleAudio;

demo.state00 = function(){};
demo.state00.prototype = {
    preload: function()
    {
        // Load Audio Files
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
    },
    
    create:function()
    {
        // Initialize Audio Samples
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
        
        // Play the opening music
        intro.play();
        intro.loopFull(0.6);
        
        this.state.start("state0");
    },
};