let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // console.log('My Character is', world.character);

}

function toogleFullScreen() {
    let elem = document.querySelector("canvas");

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => {
            alert(
                `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
            );
        });
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        console.log("button Left was clicked");
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        console.log("button Left was clicked");
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        console.log("button Right was clicked");
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        console.log("button Right was clicked");
        keyboard.RIGHT = true;
    });
});


document.addEventListener('keydown', (event) => {
    // console.log(event);
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = true;
        // console.log("Left");
    }
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = true;
        // console.log("Right");
    }
    if (event.key == "ArrowUp") {
        keyboard.UP = true;
        // console.log("Up");
    }
    if (event.key == "ArrowDown") {
        keyboard.DOWN = true;
        // console.log("Down");
    }
    if (event.key == ' ') {
        keyboard.SPACE = true;
        // console.log("Space");
    }
    if (event.key == 'd') {
        keyboard.KEYD = true;
        // console.log("d");
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.key === "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.key === "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.key === "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (event.key === " ") {
        keyboard.SPACE = false;
    }
    if (event.key === "d") {
        keyboard.KEYD = false;
    }
});



// document.addEventListener('keyup', (event) => {
//     // console.log(event);
//     if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "d" || event.key === " ") {
//         keyboard.LEFT = false;
//         keyboard.RIGHT = false;
//         keyboard.UP = false;
//         keyboard.DOWN = false;
//         keyboard.SPACE = false;
//         keyboard.KEYD = false;
//         // console.log("all false");
//     }
// });