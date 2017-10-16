game.Story = function() 
{
   game.state1.call(this);
    
    // List of characters in convo
    this.characters = {};
    this.character_templates = {
        'Monk': {
            image: '', //monk face image
            name: 'Monk',
            side: game.Story.SIDES.LEFT,
            colour: 0x00EE00,
            colour2: 0x0d4607,
        },
        'Villager': {
            image: '', //villager image
            name: 'Villager',
            side: game.Story.SIDES.RIGHT,
            colour: 0xa30000,
            colour2: 0x360000,
        },
    };
    
    this.cutscenes = [];
    this.setupStory();
    
};

game.Story.prototype = Object.create(game.state1.prototype);
game.Story.prototype.constructor = game.Story;

game.Story.prototype.setupStory = function()
{
    var scene1 = [
        {
            command: game.Story.COMMANDS.DELAY,
            duration: 2000,
        },
        {
            command: game.Story.COMMANDS.LINE,
            text: 'Hello good sir. Welcome to our town.',
            name: 'Villager',
        },
        {
            command: game.Story.COMMANDS.LINE,
            text: 'Have you noticed anything strange recently?',
            name: 'Monk',
        },
        {
            command: game.Story.COMMANDS.LINE,
            text: 'Now that you mention it, there has been a series of sinister and evil presences passing by Outtertown',
            name: 'Villager',
        },
        
    ];
       
    this.cutscenes.push(scene1);
};


game.Story.prototype.reset = function()
{

    this.current_command = -1;
    
    this.done = false;
    
    this.arrow.visible = false;
};

