let canvas;
let world;
let keyboard = new Keyboard();
let rewardsNeededToGetEndboss = localStorage.getItem("heaviness") ?? 50;
let soundEnabled = localStorage.getItem("soundEnabled") !== "false";

const slider = document.getElementById("heavinessSlider");
const output = document.getElementById("heavinessSliderValue");

checkDevice();
window.addEventListener("resize", checkDevice);

/**
 * used to toogle sound on / off
 */
if (soundEnabled === false) {
    toggleMuteAudio(soundEnabled);
}

if (rewardsNeededToGetEndboss !== null) {
    document.getElementById("heavinessSlider").value = rewardsNeededToGetEndboss;
    updateSlider();
}

slider.addEventListener("input", updateSlider);

/**
 * updates the number on the heaviness Slider on control menu
 */
function updateSlider() {
    output.textContent = slider.value;
    rewardsNeededToGetEndboss = slider.value;
    localStorage.setItem("heaviness", rewardsNeededToGetEndboss);
}

/**
 * is used to check for mobile or Desktop device to toggle a user information
 */
function checkDevice() {
    let isMobile = /Mobi|iPhone|iPad|Android/i.test(navigator.userAgent);
    let isPortrait = window.innerHeight > window.innerWidth;

    if (isMobile && isPortrait) {
        document.querySelector(".landscapeScreen").style.display = "flex";
        document.body.classList.add("noScroll");
    } else {
        document.querySelector(".landscapeScreen").style.display = "none";
        document.body.classList.remove("noScroll");
    }
}

/**
 * is used to show the current Level Number on canvas
 */
function setLevelNbr() {
    document.getElementById('showLevelNbr').innerHTML = `Level ${levelNbr}`;
}


/**
 * is used to initiat the level
 * 
 * @param {number} gameLevel - current Level Number
 */
function init(gameLevel) {
    document.getElementById('biggerScreen').style.display = "flex";
    document.getElementById('startScreen').style.display = "none";
    canvas = document.getElementById('canvas');
    initLevel(gameLevel);
    setLevelNbr();
    setTimeout(() => {
        world = new World(canvas, keyboard);
    }, 1500);
}

/**
 * is used to rotate a image
 * @param {string} id - is the ID of the selected element
 */
function toggleMenue(id) {
    let elem = document.getElementById(`${id}Img`);
    elem.classList.toggle("rotate90");
    toggleDisplay(id);
}

/**
 * is used to toggle the dNone class on id element
 * @param {string} id - is the ID of the selected element
 */
function toggleDisplay(id) {
    let elem = document.getElementById(id);
    elem.classList.toggle("dNone")
}

/**
 * is used to set current sound state to local storage
 * @param {boolean} state - true or false
 */
function toggleMuteAudio(state) {
    soundEnabled = state;
    localStorage.setItem("soundEnabled", soundEnabled);
    toggleDisplay('enabledButton');
    toggleDisplay('disabledButton');
}

/**
 * is used to toggle fullscreen
 */
function toggleFullScreen() {
    document.getElementById('btnNormal').classList.toggle("dNone");
    document.getElementById('btnWide').classList.toggle("dNone");
    let elem = document.getElementById('biggerScreen');

    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
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

/**
 * is used to translate touch events into keyboard events
 */
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    }, { passive: false });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, { passive: false });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    }, { passive: false });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, { passive: false });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    }, { passive: false });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    }, { passive: false });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEYD = true;
    }, { passive: false });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEYD = false;
    }, { passive: false });
});

/**
 * is there to respond to keyboard inputs
 */
document.addEventListener('keydown', (event) => {
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.key == "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.key == "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (event.key == ' ') {
        keyboard.SPACE = true;
    }
    if (event.key == 'd') {
        keyboard.KEYD = true;
    }
});

/**
 * is there to respond to keyboard events
 */
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

/**
 * is used to initate a audiofile
 * @param {string} url - the path to the audio file
 * @returns 
 */
function loadSound(url) {
    if (soundEnabled === true) {
        let sound = new Audio(url);
        return sound;
    }
    return null;
}

/**
 * used to set pause for the chosen sound
 * @param {string} sound - the name of the variable to be paused
 */
function pauseSound(sound) {
    if (sound) {
        sound.pause();
    }
}

/**
 * used to set play for the chosen sound
 * @param {string} sound - the name of the variable to be displayed
 */
function playSound(sound) {
    if (sound) {
        sound.play();
    }
}