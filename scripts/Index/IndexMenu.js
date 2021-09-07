
class IndexMenu extends GameLoop{

    constructor(){

        super();
    }

    init(myCanvas){

        this.canvas = myCanvas;

        // Input Items color/alpha
        this.inputLoginButton = 1.0;
        this.inputScannerButton = 1.0;
        this.inputGameButton = 1.0;
        this.inputUserName = document.getElementById("username").style.color;
        this.inputPassword = document.getElementById("password").style.color;
        this.inputCancelButton = document.getElementById("cancelButton").style.color;

        // Divide box width by body width and multiply by 100 to get vw or %
        this.bodyWidth = document.getElementById("bodyId").offsetWidth;
        this.currentBoxWidth = document.getElementById("mainBoxId").offsetWidth;
        this.currentBoxWidth = (this.currentBoxWidth / this.bodyWidth) * 100;

        // Divide box height by body height and multiply by 100 to get vh or %
        this.bodyHeight = document.getElementById("bodyId").offsetHeight;
        this.currentBoxHeight = document.getElementById("mainBoxId").offsetHeight;
        this.currentBoxHeight = (this.currentBoxHeight / this.bodyHeight) * 100;

        // This will allow us to return to the old box height/width if cancel button is pressed
        this.oldBoxHeight = this.currentBoxHeight;
        this.oldBoxWidth = this.currentBoxWidth;

        // Speed at which the boxwidth will grow when button clicked
        this.boxWidthGrowth = 0.30;
        // Speed at which the boxheight will grow when button clicked
        this.boxHeightGrowth = 0.30;

        // Maximum size the boxwidth will grow
        this.maxBoxWidth = 30;
        // Maximum size the boxheight will grow
        this.maxBoxHeight = 40;

        this.currentFadeButtons1 = 1.0;
        this.currentFadeButtons2 = 0.0;

        this.inputFadeGrowth = 0.04;
        this.inputFadeShrink = 0.04;

        // This value is used to set the transition alpha value for mainbox background
        this.alpha1 = 0.1;

        // This boolean is used to let the program know it can transition to next page
        this.transitionBoolean = false;

        // Button activated boolean value (Login Button)
        this.loginBool = false;

        // Button activated boolean value (Cancel Button)
        this.cancelBool = false;

        // Button activated boolean value (Scanner Button)
        this.scannerBool = false;

        // Button activated boolean value (Game Button)
        this.gameBool = false;

        // Button activated boolean value (Portfolio Button)
        this.portBool = false;

        // Login Button Click Listener which will call the loginPressed method
        this.loginButton = document.getElementById("loginButton");
        if(this.loginButton.addEventListener){

            this.loginButton.addEventListener("click", () => this.loginPressed(), false);
        }else {

            console.log("Add Event Error for Login Button.");
        }

        // Cancel Button Click Listener which will call the cancelPressed method
        this.cancelButton = document.getElementById("cancelButton");
        if(this.cancelButton.addEventListener){

            this.cancelButton.addEventListener("click", () => this.cancelPressed(), false);
        }else{

            console.log("Add Event Error for Cancel Button.");
        }

        // Scanner Button Click Listener which will call the scannerPressed method
        this.scannerButton = document.getElementById("scannerButton");
        if(this.scannerButton.addEventListener){

            this.scannerButton.addEventListener("click", () => this.scannerPressed(), false);
        }else{

            console.log("Add Even Error for Cancel Button.");
        }

        // Game Button Click Listener which will call the gamePressed method
        this.gameButton = document.getElementById("gameButton");
        if(this.gameButton.addEventListener){

            this.gameButton.addEventListener("click", () => this.gamePressed(), false);
        }else{

            console.log("Add Even Error for Cancel Button.");
        }

        // Portfolio Button Click Listener which will call the portfolioPressed method
        this.portButton = document.getElementById("portButton");
        if(this.portButton.addEventListener){

            this.portButton.addEventListener("click", () => this.portfolioPressed(), false);
        }else{

            console.log("Add Even Error for Cancel Button.");
        }
    }

    draw(){

        // Login Button actions--------------------------------
        if(this.loginBool){

            if(this.currentBoxWidth <= this.maxBoxWidth){
    
                this.currentBoxWidth += this.boxWidthGrowth;
                document.getElementById("mainBoxId").style.width = (this.currentBoxWidth + "vw");
            }

            if(this.currentBoxHeight <= this.maxBoxHeight){

                this.currentBoxHeight += this.boxHeightGrowth;
                document.getElementById("mainBoxId").style.height = (this.currentBoxHeight + "vh");
            }

            if(this.currentFadeButtons1 > 0.0){

                this.currentFadeButtons1 -= this.inputFadeShrink;
                document.getElementById("loginButton").style.opacity = this.currentFadeButtons1;
                document.getElementById("scannerButton").style.opacity = this.currentFadeButtons1;
                document.getElementById("gameButton").style.opacity = this.currentFadeButtons1;
                document.getElementById("portButton").style.opacity = this.currentFadeButtons1;

                if(this.currentFadeButtons1 <= 0.0){

                    document.getElementById("loginButton").style.display = "none";
                    document.getElementById("scannerButton").style.display = "none";
                    document.getElementById("gameButton").style.display = "none";
                    document.getElementById("portButton").style.display = "none";
                }

            }else{

                if(this.currentFadeButtons1 <= 0.0){

                    document.getElementById("labelUsername").style.display = "block";
                    document.getElementById("labelPassword").style.display = "block";
                    document.getElementById("username").style.display = "block";
                    document.getElementById("password").style.display = "block";
                    document.getElementById("cancelButton").style.display = "block";
                }

                this.currentFadeButtons2 += this.inputFadeGrowth;
                document.getElementById("labelUsername").style.opacity = this.currentFadeButtons2;
                document.getElementById("labelPassword").style.opacity = this.currentFadeButtons2;
                document.getElementById("username").style.opacity = this.currentFadeButtons2;
                document.getElementById("password").style.opacity = this.currentFadeButtons2;
                document.getElementById("cancelButton").style.opacity = this.currentFadeButtons2;
                document.getElementById("cancelButton").disabled = true;

                if(this.currentFadeButtons2 >= 1.0){

                    document.getElementById("cancelButton").disabled = false;
                    this.loginBool = false;
                }
            }
        }

        // Cancel button actions----------------------------------
        if(this.cancelBool){

            if(this.currentBoxHeight >= this.oldBoxHeight){

                this.currentBoxHeight -= this.boxHeightGrowth;
                document.getElementById("mainBoxId").style.height = this.currentBoxHeight + "vh";
            }

            if(this.currentBoxWidth >= this.oldBoxWidth){

                this.currentBoxWidth -= this.boxWidthGrowth;
                this.currentBoxWidth2 = this.currentBoxWidth;
                document.getElementById("mainBoxId").style.width = this.currentBoxWidth + "vw";
            }

            if(this.currentFadeButtons2 > 0.0){

                this.currentFadeButtons2 -= this.inputFadeShrink;
                document.getElementById("labelUsername").style.opacity = this.currentFadeButtons2;
                document.getElementById("labelPassword").style.opacity = this.currentFadeButtons2;
                document.getElementById("username").style.opacity = this.currentFadeButtons2;
                document.getElementById("password").style.opacity = this.currentFadeButtons2;
                document.getElementById("cancelButton").style.opacity = this.currentFadeButtons2;

                if(this.currentFadeButtons2 <= 0.0){

                    document.getElementById("labelUsername").style.display = "none";
                    document.getElementById("labelPassword").style.display = "none";
                    document.getElementById("username").style.display = "none";
                    document.getElementById("password").style.display = "none";
                    document.getElementById("cancelButton").style.display = "none";
                }

            }else{

                if(this.currentFadeButtons2 <= 0.0){

                    document.getElementById("loginButton").style.display = "block";
                    document.getElementById("scannerButton").style.display = "block";
                    document.getElementById("gameButton").style.display = "block";
                    document.getElementById("portButton").style.display = "block";
                }

                this.currentFadeButtons1 += this.inputFadeGrowth;
                document.getElementById("loginButton").style.opacity = this.currentFadeButtons1;
                document.getElementById("scannerButton").style.opacity = this.currentFadeButtons1;
                document.getElementById("gameButton").style.opacity = this.currentFadeButtons1;
                document.getElementById("portButton").style.opacity = this.currentFadeButtons1;
                document.getElementById("loginButton").disabled = true;
                document.getElementById("scannerButton").disabled = true;
                document.getElementById("gameButton").disabled = true;
                document.getElementById("portButton").disabled = true;

                if(this.currentFadeButtons1 >= 1.0){

                    document.getElementById("loginButton").disabled = false;
                    document.getElementById("scannerButton").disabled = false;
                    document.getElementById("gameButton").disabled = false;
                    document.getElementById("portButton").disabled = false;
                    this.cancelBool = false;
                }
            }
        }

        // Scanner Button Actions
        if(this.scannerBool){

            if(this.inputLoginButton >= 0.0 && this.inputScannerButton >= 0.0 && this.inputGameButton >= 0.0){

                this.inputLoginButton -= 0.05;
                document.getElementById("loginButton").style.opacity = this.inputLoginButton;
                document.getElementById("scannerButton").style.opacity = this.inputLoginButton;
                document.getElementById("gameButton").style.opacity = this.inputLoginButton;
                document.getElementById("portButton").style.opacity = this.inputLoginButton;
            }

            if(document.getElementById("mainBoxId").offsetHeight <= this.bodyHeight){

                this.currentBoxHeight += 1;
                document.getElementById("mainBoxId").style.height = this.currentBoxHeight + "vh";
            }

            if(document.getElementById("mainBoxId").offsetWidth <= this.bodyWidth){

                this.currentBoxWidth += 1;
                document.getElementById("mainBoxId").style.width = this.currentBoxWidth + "vw";
            }

            if(document.getElementById("mainBoxId").offsetHeight >= this.bodyHeight && document.getElementById("mainBoxId").offsetWidth >= this.bodyWidth){

                if(this.alpha1 <= 1.0){

                    this.alpha1 += 0.01;
                    document.getElementById("mainBoxId").style.backgroundColor = "rgba(0,0,0," + this.alpha1 + ")";

                }else{

                    console.log("Finished Transition..");
                    this.scannerBool = false;
                    window.location = ("https://deedoodle.com/main/menu.html");
                }
            }
        }

        // Game Button Actions
        if(this.gameBool){

            if(this.inputLoginButton >= 0.0){

                this.inputLoginButton -= 0.05;
                document.getElementById("loginButton").style.opacity = this.inputLoginButton;
                document.getElementById("scannerButton").style.opacity = this.inputLoginButton;
                document.getElementById("gameButton").style.opacity = this.inputLoginButton;
                document.getElementById("portButton").style.opacity = this.inputLoginButton;
            }

            if(document.getElementById("mainBoxId").offsetHeight <= this.bodyHeight){

                this.currentBoxHeight += 1;
                document.getElementById("mainBoxId").style.height = this.currentBoxHeight + "vh";
            }

            if(document.getElementById("mainBoxId").offsetWidth <= this.bodyWidth){

                this.currentBoxWidth += 1;
                document.getElementById("mainBoxId").style.width = this.currentBoxWidth + "vw";
            }

            if(document.getElementById("mainBoxId").offsetHeight >= this.bodyHeight && document.getElementById("mainBoxId").offsetWidth >= this.bodyWidth){

                if(this.alpha1 <= 1.0){

                    this.alpha1 += 0.01;
                    document.getElementById("mainBoxId").style.backgroundColor = "rgba(0,0,0," + this.alpha1 + ")";

                }else{

                    console.log("Finished Transition..");
                    this.gameBool = false;
                    window.location = ("https://deedoodle.com/main/game.html");
                }
            }
        }

        // Portfolio Button Actions
        if(this.portBool){

            if(this.inputLoginButton >= 0.0 && this.inputScannerButton >= 0.0 && this.inputGameButton >= 0.0){

                this.inputLoginButton -= 0.05;
                document.getElementById("loginButton").style.opacity = this.inputLoginButton;
                document.getElementById("scannerButton").style.opacity = this.inputLoginButton;
                document.getElementById("gameButton").style.opacity = this.inputLoginButton;
                document.getElementById("portButton").style.opacity = this.inputLoginButton;
            }

            if(document.getElementById("mainBoxId").offsetHeight <= this.bodyHeight){

                this.currentBoxHeight += 1;
                document.getElementById("mainBoxId").style.height = this.currentBoxHeight + "vh";
            }

            if(document.getElementById("mainBoxId").offsetWidth <= this.bodyWidth){

                this.currentBoxWidth += 1;
                document.getElementById("mainBoxId").style.width = this.currentBoxWidth + "vw";
            }

            if(document.getElementById("mainBoxId").offsetHeight >= this.bodyHeight && document.getElementById("mainBoxId").offsetWidth >= this.bodyWidth){

                if(this.alpha1 <= 1.0){

                    this.alpha1 += 0.01;
                    document.getElementById("mainBoxId").style.backgroundColor = "rgba(0,0,0," + this.alpha1 + ")";

                }else{

                    console.log("Finished Transition..");
                    this.portBool = false;
                    window.location = ("https://deedoodle.com/main/portfolio.html");
                }
            }
        }
    }

    loginPressed(){

        this.loginBool = true;
    }

    cancelPressed(){

        this.cancelBool = true;
    }

    scannerPressed(){

        this.scannerBool = true;
    }

    gamePressed(){

        this.gameBool = true;
    }

    portfolioPressed(){

        this.portBool = true;
    }
}
