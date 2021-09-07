class Projectile{

    constructor(velocity, xPos, yPos){

        this.pWidth = 10;
        this.pHeight = 10;
        this.velocity = velocity;
        this.xPos = xPos;
        this.yPos = yPos;
        this.projImg = document.getElementById("projImg1");
        this.projImg.src = "../img/game/projectile1.png";
        this.hitbox = new Hitbox(this.xPos, this.yPos, this.pWidth, this.pHeight, "box");
    }

    drawProjectile(xPos, yPos, context){

        context.beginPath();
        context.drawImage(this.projImg, xPos - (this.pWidth / 2), this.yPos - (this.pHeight / 2), this.pWidth, this.pHeight);
        context.fill();

        this.hitbox.updatePosition(xPos - (this.pWidth / 2), yPos - (this.pHeight / 2));
    }
}