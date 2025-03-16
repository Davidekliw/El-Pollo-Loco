let canvas;
let world;
let keyboard = new Keyboard();
let rewardsNeededToGetEndboss = localStorage.getItem("heaviness") ?? 50;
let soundEnabled = localStorage.getItem("soundEnabled") !== "false";

const slider = document.getElementById("heavinessSlider");
const output = document.getElementById("heavinessSliderValue");

if (soundEnabled === false) {
    toggleMuteAudio(soundEnabled);
}

if (rewardsNeededToGetEndboss !== null) {
    document.getElementById("heavinessSlider").value = rewardsNeededToGetEndboss;
    updateSlider();
}

slider.addEventListener("input", updateSlider);

function updateSlider() {
    output.textContent = slider.value;
    rewardsNeededToGetEndboss = slider.value;
    localStorage.setItem("heaviness", rewardsNeededToGetEndboss);
}

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

checkDevice();
window.addEventListener("resize", checkDevice);

function setLevelNbr() {
    document.getElementById('showLevelNbr').innerHTML = `Level ${levelNbr}`;
}

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

function toggleMenue(id) {
    let elem = document.getElementById(`${id}Img`);
    elem.classList.toggle("rotate90");
    toggleDisplay(id);
}

function toggleDisplay(id) {
    let elem = document.getElementById(id);
    elem.classList.toggle("dNone")
}

function toggleMuteAudio(state) {
    soundEnabled = state;
    localStorage.setItem("soundEnabled", soundEnabled);
    toggleDisplay('enabledButton');
    toggleDisplay('disabledButton');
}

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

function loadSound(url) {
    if (soundEnabled === true) {
        let sound = new Audio(url);
        return sound;
    }
    return null;
}

function pauseSound(sound) {
    if (sound) {
        sound.pause();
    }
}

function playSound(sound) {
    if (sound) {
        sound.play();
    }
}