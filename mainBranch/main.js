var game = new Phaser.Game(2400, 2400, Phaser.AUTO);

game.state.add('state00', demo.state00);
game.state.add('state0', demo.state0);
game.state.add('intro', demo.intro);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.add('state4', demo.state4);
game.state.add('state5', demo.state5);
game.state.add('state6', demo.state6);
game.state.add('state7', demo.state7);
game.state.add('BootState', demo.BootState);
game.state.add('LoadingState', demo.LoadingState);
game.state.add('BattleState', demo.BattleState);
game.state.add('outro', demo.outro);

game.state.start('state00');