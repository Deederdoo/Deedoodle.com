// Credit for the frame cap functionality
// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

window.onload = loadStart;

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

function loadStart(){

    console.log("Load Starting...");
    fps = 60;
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    gameLoop = new GameLoop();
    gameLoop.init();
    window.requestAnimationFrame(loop);
}

function loop(timeStamp){

    window.requestAnimationFrame(loop);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);
        gameLoop.draw();
    }
}