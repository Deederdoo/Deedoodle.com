class Health{

    /**
     * 
     * @param {*} amount 
     */
    constructor(context, amount){

        this.context = context;
        this.amount = amount;

        //  Health Image variables
        this.isLoaded = false;
        this.img = document.getElementById("healthHeart");
        this.healthImages = new Array();
    }

    loadImage(){

        let myCanvas = document.getElementById('gameCanvas');
        myCanvas.width = myCanvas.clientWidth;
        myCanvas.height = myCanvas.clientHeight;

        //  Once image is fully loaded set boolean to true so that
        //  we're able to draw the image to the canvas
        this.img.onload = (() => {

            this.isLoaded = true;
        });

        this.img.src = "../img/game/heart.png";

        //  Width and Height of hearts
        let width = (myCanvas.height / 100) * 6;
        let height = width;

        //  xPosition and yPosition of first heart
        let xPos = ((myCanvas.width / 100) * 90) - (width / 2);
        let yPos = (myCanvas.height / 100) * 90;

        for(let i = 0; i < this.amount; i++){

            this.healthImages.push(new ImageObj(this.img, xPos, yPos, width, height));

            //  Distance between hearts
            xPos -= width + (width / 4);
        }

        let heartBeat = new Animation();
        heartBeat.healthHeartBeat(this.healthImages);   
    }

    draw(){

        if(this.isLoaded){

            for(let i = 0; i < this.amount; i++){

                let tempObj = this.healthImages[i];

                this.context.drawImage(tempObj.img, tempObj.xPos, tempObj.yPos, tempObj.width, tempObj.height);
            }
        }
    }
}