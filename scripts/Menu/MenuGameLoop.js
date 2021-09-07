class MenuGameLoop{

    constructor(){

    }

    init(){

        //  MENU
        this.menu = new Menu();
        this.menu.init();
    }

    draw(){

        this.menu.draw();
    }
}