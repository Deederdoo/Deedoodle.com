class Boop{

    constructor(context, xPos, yPos, name){

        this.context = context;
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
    }

    spawnBoop(){

        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.arc(this.xPos, this.yPos, 15, 0, 2 * Math.PI);
        this.context.stroke();
    }

    updateBoop(newXPos, newYPos){

        this.xPos = newXPos;
        this.yPos = newYPos;
    }
}