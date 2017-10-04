<<<<<<< HEAD
var game = new Phaser.Game(2400, 2400, Phaser.AUTO);
=======
var game = new Phaser.Game(1280, 1280, Phaser.AUTO);
>>>>>>> 33e7888674cf5a588ccb6dd274397ef05aabc8df
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.add('state4', demo.state4);
game.state.add('state5', demo.state5);
game.state.add('state6', demo.state6);
game.state.add('state7', demo.state7);
game.state.add('state8', demo.state8);
game.state.add('state9', demo.state9);
game.state.start('state1');