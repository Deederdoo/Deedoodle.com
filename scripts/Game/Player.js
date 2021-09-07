class Player extends GameGameLoop{

    constructor(context, xPos, yPos){

        super();

        this.context = context;

        this.myCanvas = document.getElementById('gameCanvas');
        this.myCanvas.width = this.myCanvas.clientWidth;
        this.myCanvas.height = this.myCanvas.clientHeight;

        //  Player position, width and height
        this.position = new Victor(xPos, yPos);
        this.pWidth = 50;
        this.pHeight = 50;
        this.centerX = this.position.x + 0.5 * this.pWidth;
        this.centerY = this.position.y + 0.5 * this.pHeight;

        //  Player ship img and damaged image
        this.imgShip = document.getElementById("playerShip");

        //  Keystroke booleans
        this.wKey = false;
        this.sKey = false;
        this.aKey = false;
        this.dKey = false;

        //  Mouse coords
        this.xMouse;
        this.yMouse;
        this.xMouseClick;
        this.yMouseClick;

        //  Projectiles
        this.playerProjectiles = new Array();
        this.playerAngle;

        //  Player hitbox
        this.hitbox = new Hitbox(this.position.x, this.position.y, this.pWidth, this.pHeight, "box");

        //  Player Health
        this.playerHealth = new Health(this.context, 3);

        //  Player Score
        this.playerScore = 0;
    }

    spawn(){

        this.imgShip.onload = (() => {

            //  Set a boolean or progress
        });

        this.imgShip.src = "../img/game/ship.png";

        this.loadPlayerInput();
        this.playerHealth.loadImage();
    }

    /**
     * 
     * 
     */
    loadPlayerInput(){

        //  keyboard listeners
        document.addEventListener('keypress', () =>  this.keyPressed(event));
        document.addEventListener('keyup', () => this.keyReleased(event));

        //  mouse listeners
        document.addEventListener('mousemove', () => this.mouseLocation(event));
        document.addEventListener('click', () => this.mouseLeftClick(event));
    }

    /**
     * 
     * @param {keypress} event 
     */
    keyPressed(event){

        if (event.key === 'w') {
            this.wKey = true;
        }
        if (event.key === 's') {
            this.sKey = true;
        }
        if (event.key === 'a') {
            this.aKey = true;
        }
        if (event.key === 'd') {
            this.dKey = true;
        }
    }

    /**
     * 
     * @param {keyup} event 
     */
    keyReleased(event){

        if (event.key === 'w') {
            this.wKey = false;
        }
        if (event.key === 's') {
            this.sKey = false;
        }
        if (event.key === 'a') {
            this.aKey = false;
        }
        if (event.key === 'd') {
            this.dKey = false;
        }
    }

    /**
     * 
     * @param {mousemove} event 
     */
    mouseLocation(event){

        // if(event.offsetX) {
        //     this.xMouse = event.offsetX;
        //     this.yMouse = event.offsetY;
        // }
        // else if(event.layerX) {
        //     this.xMouse = event.layerX;
        //     this.yMouse = event.layerY;
        // }

        let cRect = this.myCanvas.getBoundingClientRect();
        this.xMouse = Math.round(event.clientX - cRect.left);
        this.yMouse = Math.round(event.clientY - cRect.top);
    }

    /**
     * 
     * @param {click} event 
     */
    mouseLeftClick(event){

        this.xMouseClick = this.xMouse;
        this.yMouseClick = this.yMouse;

        this.playerShoot(20);
    }

    /**
     * 
     * 
     */
    playerShoot(projectileSpeed){

        let velocityInstance = new Victor(0, 0);
        let deltaX = this.xMouse - (this.position.x + this.pWidth / 2);
        let deltaY = this.yMouse - (this.position.y + this.pHeight / 2);
        let magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        let velocityScale = projectileSpeed / magnitude;
        velocityInstance.x = deltaX * velocityScale;
        velocityInstance.y = deltaY * velocityScale;

        this.playerProjectiles.push(new Projectile(velocityInstance, this.centerX, this.centerY));
    }

    /**
     * 
     * 
     */
    updateProjectiles(){

        if(this.playerProjectiles.length > 0){

            for(let i = 0; i < this.playerProjectiles.length; i++){
                
                this.playerProjectiles[i].xPos += this.playerProjectiles[i].velocity.x;
                this.playerProjectiles[i].yPos += this.playerProjectiles[i].velocity.y;

                this.playerProjectiles[i].drawProjectile(this.playerProjectiles[i].xPos
                    , this.playerProjectiles[i].yPos
                    , this.context);
            }

            if(this.playerProjectiles.length >= 20){

                this.playerProjectiles.splice(0, 1);
            }
        }
    }

    checkPositionBounds(){

        if(this.position.x > this.myCanvas.width){
                
            this.position.x = 0;
        }

        if(this.position.x < (0 - this.pWidth)){

            this.position.x = this.myCanvas.width;
        }

        if(this.position.y > this.myCanvas.height){

            this.position.y = 0;
        }

        if(this.position.y < (0 - this.pHeight)){

            this.position.y = this.myCanvas.height;
        }
    }

    /**
     * 
     * 
     */
    updatePosition(){

        this.checkPositionBounds();

        //  Important to update the current player center position
        this.centerX = this.position.x + 0.5 * this.pWidth;
        this.centerY = this.position.y + 0.5 * this.pHeight;

        let angleDeg = Math.atan2(this.yMouse - this.centerY, this.xMouse - this.centerX) * 180 / Math.PI;
        this.playerAngle = angleDeg;

        this.context.save();
        this.context.beginPath();
        this.context.translate(this.centerX, this.centerY);
        this.context.rotate((Math.PI / 180) * angleDeg);
        this.context.translate(-this.centerX, -this.centerY);
        this.context.drawImage(this.imgShip, this.position.x, this.position.y, this.pWidth, this.pHeight);
        this.context.restore();

        this.hitbox.updatePosition(this.position.x, this.position.y);
    }

    /**
     * 
     * 
     */
    updateAimPosition(){

        this.context.save();
        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.strokeStyle = "red";
        this.context.moveTo(this.centerX, this.centerY);
        this.context.lineTo(this.xMouse, this.yMouse);
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }

    draw(){

        //  Key inputs for player movement
        if(this.wKey){
            this.position.y -= 5;
            this.centerY -= 5;
        }
        if(this.sKey){
            this.position.y += 5;
            this.centerY += 5;
        }
        if(this.aKey){
            this.position.x -= 7;
            this.centerX -= 7;
        }
        if(this.dKey){
            this.position.x += 7;
            this.centerX -= 7;
        }

        this.context.font = "30px Arial";
        this.context.fillStyle = "#e4cb42";
        this.context.fillText(this.playerScore, 50, 50);
        this.playerHealth.draw();
        this.updateAimPosition();
        this.updateProjectiles();
        this.updatePosition();
    }
}