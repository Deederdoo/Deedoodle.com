class Alien{

    constructor(context, xPos, yPos){

        this.myCanvas = document.getElementById('gameCanvas');
        this.myCanvas.width = this.myCanvas.clientWidth;
        this.myCanvas.height = this.myCanvas.clientHeight;

        this.alienType = document.getElementById("alienType1");
        this.spawn();

        this.context = context;
        this.width = 35;
        this.height = 35;

        this.position = new Victor(xPos, yPos);
        this.velocity = new Victor();
        this.acceleration = new Victor();
        this.maxForce = 0.2;
        this.maxSpeed = 6;
        this.scoreOnDeath = 35;

        this.huntPerceptionRadius = 50;

        //  Alien hitbox
        this.hitbox = new Hitbox(this.position.x, this.position.y, this.width, this.height, "box");

        this.isDead = false;
    }

    spawn(){

        let type = Math.random() * (3 - 0) + 0;

        if(type > 1){

            this.alienType = document.getElementById("alienType1");
            this.alienType.src = "../img/game/alien1.png";

        }else{

            this.alienType = document.getElementById("alienType2");
            this.alienType.src = "../img/game/alien2.png";
        }
    }

    checkPositionBounds(){

        if(this.position.x > this.myCanvas.width){
                
            this.position.x = 0;
        }

        if(this.position.x < (0 - this.width)){

            this.position.x = this.myCanvas.width;
        }

        if(this.position.y > this.myCanvas.height){

            this.position.y = 0;
        }

        if(this.position.y < (0 - this.height)){

            this.position.y = this.myCanvas.height;
        }
    }

    huntPlayer(player){

        let steering = new Victor();

        let distance = this.position.distance(player.position);

        if(distance < this.huntPerceptionRadius){

            let difference = new Victor(this.position.x, this.position.y);
            difference.subtract(player.position);
            difference.divide(new Victor(distance, distance));
            steering.subtract(difference);

            steering.x *= (this.maxSpeed / steering.length());
            steering.y *= (this.maxSpeed / steering.length());

            steering.subtract(this.velocity);

            if(steering.length() > this.maxForce){
                steering.x *= 1.05;
                steering.y *= 1.05;
            }

            this.acceleration.add(steering);
        }
    }

    align(aliens){

        let perceptionRadius = 60;
        let steering = new Victor();
        let total = 0;

        for(let other of aliens){

            let distance = this.position.distance(other.position);

            if(other != this && distance < perceptionRadius){

                steering.add(other.velocity);
                total++;
            }
        }

        if(total > 0){

            let totalVector = new Victor(total, total);
            steering.divide(totalVector);

            steering.x *= (this.maxSpeed / steering.length());
            steering.y *= (this.maxSpeed / steering.length());

            steering.subtract(this.velocity);

            // if(steering.length() > this.maxForce){
            //     steering.x *= this.maxForce;
            //     steering.y *= this.maxForce;
            // }
            steering.limit(this.maxForce, 0.75);
        }

        return steering;
    }

    cohesion(aliens){

        let perceptionRadius = 60;
        let steering = new Victor();
        let total = 0;

        for(let other of aliens){

            let distance = this.position.distance(other.position);

            if(other != this && distance < perceptionRadius){

                steering.add(other.position);
                total++;
            }
        }

        if(total > 0){

            let totalVector = new Victor(total, total);
            steering.divide(totalVector);
            steering.subtract(this.position);

            steering.x *= (this.maxSpeed / steering.length());
            steering.y *= (this.maxSpeed / steering.length());

            steering.subtract(this.velocity);

            if(steering.length() > this.maxForce){
                steering.x *= this.maxForce;
                steering.y *= this.maxForce;
            }
        }

        return steering;
    }

    separation(aliens){

        let perceptionRadius = 60;
        let steering = new Victor();
        let total = 0;

        for(let other of aliens){

            let distance = this.position.distance(other.position);

            if(other != this && distance < perceptionRadius){

                let difference = new Victor(this.position.x, this.position.y);
                difference.subtract(other.position);
                difference.divide(new Victor(distance, distance));
                steering.add(difference);
                total++;
            }
        }

        if(total > 0){

            let totalVector = new Victor(total, total);
            steering.divide(totalVector);

            steering.x *= (this.maxSpeed / steering.length());
            steering.y *= (this.maxSpeed / steering.length());

            steering.subtract(this.velocity);

            if(steering.length() > this.maxForce){
                steering.x *= this.maxForce;
                steering.y *= this.maxForce;
            }
        }

        return steering;
    }

    flock(aliens){

        let alignment = this.align(aliens);
        let cohesion = this.cohesion(aliens);
        let separation = this.separation(aliens);
        this.acceleration.add(separation);
        //this.acceleration.add(alignment);
        //this.acceleration.add(cohesion);
    }

    updatePosition(){

        this.checkPositionBounds();

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed, 0.75);
        this.acceleration.subtract(this.acceleration);

        this.context.save();
        this.context.beginPath();
        this.context.drawImage(this.alienType, this.position.x, this.position.y, this.width, this.height);
        this.context.restore();

        this.hitbox.updatePosition(this.position.x, this.position.y);
    }
}