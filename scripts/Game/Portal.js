class Portal{

    constructor(context, xPos, yPos, amount){

        this.context = context;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = 0;
        this.height = 0;
        this.amount = amount;
        this.count = 0;
        this.imgPortal = document.getElementById("alienPortal");
    }

    spawnPortal(type, ai){

        switch(type){

            case "alien":

                this.imgPortal.onload = (() => {

                    let open = new Animation();
                    open.openPortal(this, 70);    //  Portal, maxGrowth

                    let max = 5;
                    let min = -5;
                    let increasePerceptionRadius = 0;
                    let myCanvas = document.getElementById('gameCanvas');
                    myCanvas.height = myCanvas.clientHeight;
                    
                    this.spawnAI = setInterval(() => {

                        increasePerceptionRadius += (myCanvas.height / this.amount);

                        ai.aliens.push(new Alien(this.context, this.xPos + (this.width / 2), this.yPos + (this.height / 2)));
                        //ai.aliens[ai.aliens.length - 1].spawn();    // Spawn will decide what type the alien will be
                        ai.aliens[ai.aliens.length - 1].velocity.x = Math.random() * (max - min) + min;
                        ai.aliens[ai.aliens.length - 1].velocity.y = Math.random() * (max - min) + min;
                        for(let i = 0; i < ai.aliens.length; i++){
                            ai.aliens[i].huntPerceptionRadius = increasePerceptionRadius;
                        }
                        this.count++;

                        if(this.count >= this.amount){
                            
                            let close = new Animation();
                            close.closePortal(this, ai);
                            clearInterval(this.spawnAI);
                        }

                    }, 200);
                });
        
                this.imgPortal.src = "../img/game/portal.png";

            break;

            default:

            break;
        }  
    }

    draw(){

        if(this.width > 0 || this.height > 0){

            this.context.drawImage(this.imgPortal, this.xPos, this.yPos, this.width, this.height);
        }
    }
}