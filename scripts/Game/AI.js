class AI{

    constructor(context, player){

        this.context = context;
        this.player = player;

        this.portalArray = new Array();

        this.aliens = new Array();

        this.hit = new Animation();
    }

    generateAI(type, amount, xPos, yPos){

        this.portalArray.push(new Portal(this.context, xPos, yPos, amount));
        this.portalArray[this.portalArray.length - 1].spawnPortal(type, this);

        //this.portal = new Portal(this.context, xPos, yPos, amount);
        //this.portal.spawnPortal(type, this);
    }

    checkAiCollider(){

        for(let i = 0; i < this.aliens.length; i++){

            let tempPlayer = this.player.hitbox;
            let tempAlien = this.aliens[i].hitbox;

            if(tempPlayer.xPos < tempAlien.xPos + tempAlien.width &&
                tempPlayer.xPos + tempPlayer.width > tempAlien.xPos &&
                tempPlayer.yPos < tempAlien.yPos + tempAlien.height &&
                tempPlayer.yPos + tempPlayer.height > tempAlien.yPos){

                this.hit.playerAlienHit(this.player, this.aliens, i);   // player, aliens array, index
            }
        }
    }

    //  draw/update
    draw(){

        for(let i = 0; i < this.portalArray.length; i++){

            this.portalArray[i].draw();
        }

        if(this.aliens.length > 0){

            for(let i = 0; i < this.aliens.length; i++){

                if(!this.aliens[i].isDead){

                    this.aliens[i].flock(this.aliens);
                    this.aliens[i].huntPlayer(this.player);
                    this.aliens[i].updatePosition();
                    this.checkAiCollider();
                }
            }
        }
    }
}