class Hitbox{

    constructor(xPos, yPos, width, height, type){

        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    updatePosition(xPos, yPos){

        this.xPos = xPos;
        this.yPos = yPos;
    }
}