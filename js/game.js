let canvas;
let world;
let keyboard = new Keyboard();
let rewardsNeededToGetEndboss = 50;

const slider = document.getElementById("heavinessSlider");
const output = document.getElementById("heavinessSliderValue");

slider.addEventListener("input", () => {
    output.textContent = slider.value;
    rewardsNeededToGetEndboss = slider.value;
});


function checkDevice() {
    let isMobile = /Mobi|iPhone|iPad|Android/i.test(navigator.userAgent);
    let isPortrait = window.innerHeight > window.innerWidth;

    if (isMobile && isPortrait) {
        document.querySelector(".landscapeScreen").style.display = "flex";
    } else {
        document.querySelector(".landscapeScreen").style.display = "none";
    }
}

window.addEventListener("resize", checkDevice);


function setLevelNbr() {
    document.getElementById('showLevelNbr').innerHTML = `Level ${levelNbr}`;
}

function init(gameLevel) {
    // document.getElementById('epl').classList.remove('d_none');
    document.getElementById('biggerScreen').style.display = "flex";
    document.getElementById('startScreen').style.display = "none";
    // document.getElementById('startBtn').classList.remove('startBtn');
    canvas = document.getElementById('canvas');
    initLevel(gameLevel);
    setLevelNbr();
    setTimeout(() => {
        world = new World(canvas, keyboard);
    }, 1500);

    // console.log('My Character is', world.character);

}

function toggleFullScreen() {
    document.getElementById('btnNormal').classList.toggle("d_none");
    document.getElementById('btnWide').classList.toggle("d_none");
    let elem = document.getElementById('biggerScreen');

    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}



document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log("button Left was clicked");
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        console.log("button Left was clicked");
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log("button Right was clicked");
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        console.log("button Right was clicked");
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log("button SPACE was clicked");
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        console.log("button SPACE was clicked");
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log("button D was clicked");
        keyboard.KEYD = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        console.log("button D was clicked");
        keyboard.KEYD = false;
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