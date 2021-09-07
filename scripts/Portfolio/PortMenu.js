class PortMenu{

    constructor(){

        this.currentView;

        // Port API Button
        this.apiButton = document.getElementById("buttonAPI");
        this.apiButton.addEventListener("click", () => this.apiPressed(), false);

        // Port Pool Pump Button
        this.poolButton = document.getElementById("buttonPool");
        this.poolButton.addEventListener("click", () => this.poolPressed(), false);

        // Port About Button
        this.aboutButton = document.getElementById("buttonAbout");
        this.aboutButton.addEventListener("click", () => this.aboutPressed(), false);

        // Left Nav Button
        this.leftButton = document.getElementById("buttonLeftNav");
        this.leftButton.addEventListener("click", () => this.leftPressed(), false);
        
        // Right Nav Button
        this.rightButton = document.getElementById("buttonRightNav");
        this.rightButton.addEventListener("click", () => this.rightPressed(), false);
    }

    init(){

        //  Start page with API
        this.apiPressed();
    }

    apiPressed(){

        document.getElementById("midPicContainer").style.display = "none";
        document.getElementById("loader").style.display = "block";
        let initAPI = new APIPage();
        initAPI.init();
        this.currentView = initAPI;
        this.resetButtonStates();
    }

    poolPressed(){

        // document.getElementById("midPicContainer").style.display = "none";
        // document.getElementById("loader").style.display = "block";
    }

    aboutPressed(){

        document.getElementById("midPicContainer").style.display = "none";
        document.getElementById("loader").style.display = "block";
        let initAbout = new AboutPage();
        initAbout.init();
        this.currentView = initAbout;
        this.resetButtonStates();
    }

    rightPressed(){

        this.currentView.rightPressed();
    }

    leftPressed(){

        this.currentView.leftPressed();
    }

    resetButtonStates(){

        //  Reset to original state
        document.getElementById("buttonLeftNav").disabled = true;
        document.getElementById("buttonRightNav").disabled = false;
    }

    draw(){

    }
}