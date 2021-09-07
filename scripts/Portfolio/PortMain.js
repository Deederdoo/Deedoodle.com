window.onload = loadStart;

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

function loadStart(){

    console.log("PortMain Starting...");

    fps = 60;
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    this.portMenu = new PortMenu();
    this.portMenu.init();
    window.requestAnimationFrame(loop);
}

function loop(timeStamp){

    window.requestAnimationFrame(loop);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);
        this.portMenu.draw();
    }
    
}