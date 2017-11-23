// Instructions
var demo = demo || {};
var coordinate = 'start';

console.log(introBool);

demo.state6 = function(){};
demo.state6.prototype = {
    preload: function(){
        this.load.image('monastery','../assets/backgrounds/monastery2.jpg');
        this.load.image('button','../assets/sprites/scroll_menu.png');
        this.load.image('instructions', '../assets/backgrounds/instructions.png');
    },
    create:function(){
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        var bg = game.add.sprite(0,-100,'monastery');
        bg.scale.set(0.45);
        
        var title = game.add.text(650, 100, "Instructions");
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
        
        var scroll = game.add.sprite(60, 60, 'button');
        scroll.width = 1200;
        scroll.height = 800;
        
        var instructions = game.add.sprite(320, 220, 'instructions');
        
        this.createButton(40, "Main Menu", 650, 770, 400, 200, function(){
            //this.state.start("intro", true, false, [1000,1000,1000], [10,10]);
            this.state.start("state0", true, false, [1000,1000,1000,1000,1000,1000], [10,10]);
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