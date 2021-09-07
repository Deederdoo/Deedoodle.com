
class GameLoop{

    constructor(){

    }

    init(){

        //  INDEX
        this.canvas = new Canvas();
        this.canvas.init();

        this.indexMenu = new IndexMenu();
        this.indexMenu.init(this.canvas);
    }

    draw(){

        this.canvas.draw();
        this.indexMenu.draw();
    }
}