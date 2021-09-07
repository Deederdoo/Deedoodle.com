class Animation{

    constructor(){

    }

    /**
     * When player hit show animation and kill alien that hit player
     * 
     * @param {*} player 
     */
    playerAlienHit(player, aliens, index){

        if(this.playerHitInterval == null){

            player.playerHealth.amount--;
            aliens.splice(index, 1);

            let count = 0;
            let isChanged = false;
            player.imgShip.src = "../img/game/shipHit.png";
            

            this.playerHitInterval = setInterval(() => {

                //  toggle hit player colours
                if(!isChanged){

                    player.imgShip.src = "../img/game/ship.png";
                    isChanged = true;
        
                }else{
        
                    player.imgShip.src = "../img/game/shipHit.png";
                    isChanged = false;
                }

                if(count >= 5){

                    player.imgShip.src = "../img/game/ship.png";
                    clearInterval(this.playerHitInterval);
                    this.playerHitInterval = null;
                }

                count++;

            }, 300);
        }
    }

    healthHeartBeat(array){

        let countGrowth = 0;

        this.heartBeat = setInterval(() => {

            for(let i = 0; i < array.length; i++){

                if(countGrowth <= 60){

                    array[i].xPos += 0.5;
                    array[i].yPos += 0.5;

                    array[i].width -= 1;
                    array[i].height -= 1;

                }else{

                    array[i].xPos -= 0.5;
                    array[i].yPos -= 0.5;

                    array[i].width += 1;
                    array[i].height += 1;
                }

                if(countGrowth >= (120)){

                    countGrowth = 0;
                }

                countGrowth++;
            }

        }, 35);
    }

    openPortal(portal, maxGrowth){

        this.open = setInterval(() => {

            portal.xPos -= 0.5;
            portal.yPos -= 0.5;

            portal.width += 1;
            portal.height += 1;

            if(portal.width >= maxGrowth){

                clearInterval(this.open);
            }

        },10);
    }

    closePortal(portal, ai){

        this.close = setInterval(() => {

            portal.xPos += 0.5;
            portal.yPos += 0.5;

            portal.width -= 1;
            portal.height -= 1;

            if(portal.width <= 0){

                ai.portalArray.splice(0, 1);
                clearInterval(this.close);
            }

        },35);
    }
}