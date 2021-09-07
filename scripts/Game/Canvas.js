class Canvas extends GameGameLoop{

    constructor(){
    
        super();
    }

    init(){

        this.myCanvas = document.getElementById('gameCanvas');
        this.context = this.myCanvas.getContext('2d');
        this.myCanvas.width = this.myCanvas.clientWidth;
        this.myCanvas.height = this.myCanvas.clientHeight;

        this.player = new Player(this.context, (this.myCanvas.clientWidth / 2), (this.myCanvas.clientHeight / 2)); //    (Context, x Position, y Position)
        this.player.spawn();

        this.ai = new AI(this.context, this.player);
        this.randomPortalSpawner();
    }

    randomPortalSpawner(){

        let aiAmount = 2;

        let maxW = this.myCanvas.width - 30;
        let minW = 30;
        let maxH = this.myCanvas.height - 30;
        let minH = 30

        this.generatePortal = setInterval(() => {

            let randomX = Math.random() * (maxW - minW) + minW;
            let randomY = Math.random() * (maxH - minH) + minH;

            this.ai.generateAI("alien", aiAmount, randomX, randomY);  //  type, amount, xpos, ypos

            if(aiAmount <= 16){

                aiAmount += 1;
            }

        }, 4000);
    }

    /**
     * 
     * Check if player projectiles hit ai
     * 
     */
    checkProjectileHitboxes(){

        for(let i = 0; i < this.player.playerProjectiles.length; i++){

            let tempProj = this.player.playerProjectiles[i].hitbox;

             for(let j = 0; j < this.ai.aliens.length; j++){

                let tempAlien = this.ai.aliens[j].hitbox;

                if (tempProj.xPos < tempAlien.xPos + tempAlien.width &&
                    tempProj.xPos + tempProj.width > tempAlien.xPos &&
                    tempProj.yPos < tempAlien.yPos + tempAlien.height &&
                    tempProj.yPos + tempProj.height > tempAlien.yPos){

                        this.ai.aliens[j].alienColour = "red";
                        this.player.playerScore += this.ai.aliens[j].scoreOnDeath;
                        this.ai.aliens[j].isDead = true;
                        this.ai.aliens.splice(j, 1);
                        this.player.playerProjectiles.splice(i, 1);
                    }
            }
        }
    }

    draw(){

        this.context.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);

        if(this.player.playerHealth.amount > 0){

            this.ai.draw();
            this.player.draw();
            this.checkProjectileHitboxes();

        }else{

            this.stop();
            document.getElementById("finalScore").innerHTML = this.player.playerScore;
            document.getElementById("uiContainer").style.display = "block";
        }
    }
}