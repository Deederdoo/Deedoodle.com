
class Canvas extends GameLoop{

    constructor(){
    
        super();

        this.xStarSpeed;
        this.yStarSpeed;
    }

    init(){

        this.xStarSpeed = 0.9;
        this.yStarSpeed = 0.6;
        this.starCount  = 200;
        this.boopArray = new Array();
        this.myCanvas = document.getElementById('backCanvas');
        this.myCanvas.width = this.myCanvas.clientWidth;
        this.myCanvas.height = this.myCanvas.clientHeight;
        this.context = this.myCanvas.getContext('2d');

        for(var i = 0; i < this.starCount; i++){

            this.boopArray.push(new Boop(this.context, Math.random() * this.myCanvas.width, Math.random() * this.myCanvas.height, i));
            this.boopArray[i].spawnBoop();
        }
    }

    draw(){

        this.context.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);

        for(var i = 0; i < this.boopArray.length; i++){
    
            if(this.boopArray[i].xPos < this.myCanvas.width){
                
                this.boopArray[i].updateBoop(this.boopArray[i].xPos += this.xStarSpeed, this.boopArray[i].yPos -= this.yStarSpeed);
    
            }else{
    
                this.boopArray[i].updateBoop(0, Math.random() * this.myCanvas.height);
            }
    
            if(this.boopArray[i].yPos <= 0){
    
                this.boopArray[i].updateBoop(this.boopArray[i].xPos, this.myCanvas.height);
            }
    
            if(i > (this.starCount / 10) * 9){   // Draw a bigger star 1/10 times
    
                this.context.save();
                this.context.beginPath();
                this.context.lineWidth = 1;
                this.context.fillStyle = "#f4dc59";
                this.context.arc(this.boopArray[i].xPos, this.boopArray[i].yPos, (Math.random() * 1) + 5, 0, 2 * Math.PI); // Math.random at the size param allows for the star flicker effect
                this.context.stroke();
                this.context.fill();
                this.context.restore();
    
            }else{  // Draw small stars
    
                this.context.save();
                this.context.beginPath();
                this.context.lineWidth = 1;
                this.context.fillStyle = "#e4cb42";
                this.context.arc(this.boopArray[i].xPos, this.boopArray[i].yPos, Math.random() * 3, 0, 2 * Math.PI); // Math.random at the size param allows for the star flicker effect
                this.context.stroke();
                this.context.fill();
                this.context.restore();
            }
        }
    }
}
