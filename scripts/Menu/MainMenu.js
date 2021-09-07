window.onload = loadStart;

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

function loadStart(){

    window.onbeforeunload = function () {
        
        window.scrollTo(0, 0);
    }

    console.log("Menu Page Starting...");

    fps = 60;
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    this.menuGameLoop = new MenuGameLoop();
    this.menuGameLoop.init();
    window.requestAnimationFrame(loop);
}

function loop(timeStamp){

    window.requestAnimationFrame(loop);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);
        menuGameLoop.draw();
    }
    
}

