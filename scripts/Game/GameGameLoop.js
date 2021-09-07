class GameGameLoop{

    constructor(){

        this.isOn = false;
        this.submitCount = 0;
    }

    init(){

        //  Buttons for the ui menu

        this.playButton = document.getElementById("playButton");
        this.playButton.addEventListener("click", () => this.playPressed(), false);

        //  Menu button 1
        this.menuButton1 = document.getElementById("menuButton");
        this.menuButton1.addEventListener("click", () => this.menuPressed(1), false);

        // Menu button 2
        this.menuButton2 = document.getElementById("scoreMenuButton");
        this.menuButton2.addEventListener("click", () => this.menuPressed(2), false);

        //  Scoreboard button
        this.scoreButton = document.getElementById("scoresButton");
        this.scoreButton.addEventListener("click", () => this.scorePressed(), false);

        this.submitButton = document.getElementById("submitButton");
        this.submitButton.addEventListener("click", () => this.submitPressed(), false);

        this.resetButton = document.getElementById("resetButton");
        this.resetButton.addEventListener("click", () => this.resetPressed(), false);
    }

    playPressed(){

        document.getElementById("uiContainer").style.display = "none";
        document.getElementById("uiMidContainer1").style.display = "none";
        document.getElementById("uiMidContainer2").style.display = "block";
        this.canvas = new Canvas();
        this.canvas.init();
        this.start();
    }

    menuPressed(menuButtonType){

        switch(menuButtonType){

            case 1:

                this.stop();
                this.init();
                document.getElementById("uiMidContainer1").style.display = "block";
                document.getElementById("uiMidContainer2").style.display = "none";

            break;

            case 2:

                this.stop();
                this.init();
                document.getElementById("uiMidContainer1").style.display = "block";
                document.getElementById("uiMidContainerScoreboard").style.display = "none";
                document.getElementById("uiTopContainerScoreboard").style.display = "none";

            break;

            default:

            break;
        }
    }

    submitPressed(){

        if(this.submitCount < 1){

            this.submitCount++;
            let newUsername = document.getElementById("insertScore").value;

            if(newUsername != "" && newUsername != null){

                let url = "https://deedoodle.com/API_Scoreboard/webapi/spacegamescore_resource/inscore";
                let newScore = this.canvas.player.playerScore;
                let newDate = new Date();
                let dateString = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

                let newPlayerScore = new Score(newUsername, newScore, dateString);

                let con = new HttpConnection();
                con.connectPost(url, true, newPlayerScore);

                document.getElementById("uiMidContainer2").style.display = "none";

                setTimeout(() => {
                    
                    this.submitCount = 0;
                    this.displayScoreboard();

                }, 500);
            }
        }
    }

    resetPressed(){

        this.canvas = new Canvas();
        this.canvas.init();
        document.getElementById("uiContainer").style.display = "none";
    }

    scorePressed(){

        document.getElementById("uiMidContainer1").style.display = "none";
        this.displayScoreboard();
    }

    displayScoreboard(){

        document.getElementById("loader").style.display = "block";

        let url = "https://deedoodle.com/API_Scoreboard/webapi/spacegamescore_resource/allscores/desc";
        let con = new HttpConnection();
        con.connect(url, true);
        
        setTimeout(() => {

            if(con.getIsReady()){

                let scores = con.getAmountDropped();
                let scoreTable = document.getElementById("scoreTable");
                //  Make sure to clear table if one previously existed
                scoreTable.innerHTML = "";

                //  This is the decription/header row
                let newRow = scoreTable.insertRow(0);
                let cellRank = newRow.insertCell(0);
                let cellUser = newRow.insertCell(1);
                let cellScore = newRow.insertCell(2);
                let cellDate = newRow.insertCell(3);
                cellRank.innerHTML = "Rank";
                cellUser.innerHTML = "Username";
                cellScore.innerHTML = "Score";
                cellDate.innerHTML = "Date";

                for(let i = 0; i < scores.length; i++){

                    let newRow = scoreTable.insertRow(i + 1);
                    let cellRank = newRow.insertCell(0);
                    let cellUser = newRow.insertCell(1);
                    let cellScore = newRow.insertCell(2);
                    let cellDate = newRow.insertCell(3);

                    cellRank.innerHTML = (i + 1);
                    cellUser.innerHTML = scores[i].username;
                    cellScore.innerHTML = scores[i].score;
                    cellDate.innerHTML = scores[i].date;
                }

                document.getElementById("loader").style.display = "none";
                document.getElementById("uiMidContainerScoreboard").style.display = "block";
                document.getElementById("uiTopContainerScoreboard").style.display = "block";
            }
        }, 2000);
    }

    start(){

        this.isOn = true;
    }

    stop(){

        this.isOn = false;
    }

    draw(){

        if(this.isOn){

            this.canvas.draw();
        }
    }
}