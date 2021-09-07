class AboutPage{

    constructor(){

        this.currentPictureIndex;
        this.currentPicture;
        this.pictureSourceArray = new Array();
    }

    init(){

        //  Image
        this.currentPictureIndex = 0;
        this.pictureSourceArray.splice(0, this.pictureSourceArray.length);

        this.currentPicture = document.getElementById("portImage");
        this.currentPicture.onload = (() => {

            document.getElementById("loader").style.display = "none";
            document.getElementById("midPicContainer").style.display = "block";
        });
        this.pictureSourceArray.push("../img/portfolio/about/dustin_algon_prog.png");
        this.pictureSourceArray.push("../img/portfolio/about/hoby.png");
        this.currentPicture.src = this.pictureSourceArray[0];

        //  Text/Description
        document.getElementById("midDesc").innerHTML = DescHelper.aboutDesc(this.currentPictureIndex);
        
    }

    leftPressed(){

        document.getElementById("midPicContainer").style.display = "none";
        document.getElementById("loader").style.display = "block";

        this.currentPictureIndex--;
        document.getElementById("buttonRightNav").disabled = false;
        this.currentPicture.src = this.pictureSourceArray[this.currentPictureIndex];

        if(this.currentPictureIndex < 1){

            document.getElementById("buttonLeftNav").disabled = true;
        }
    }

    rightPressed(){

        document.getElementById("midPicContainer").style.display = "none";
        document.getElementById("loader").style.display = "block";

        this.currentPictureIndex++;
        document.getElementById("buttonLeftNav").disabled = false;
        this.currentPicture.src = this.pictureSourceArray[this.currentPictureIndex];

        if(this.currentPictureIndex == this.pictureSourceArray.length - 1){

            document.getElementById("buttonRightNav").disabled = true;
        }
    }
}