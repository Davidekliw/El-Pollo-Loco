let soundEnabled = localStorage.getItem("soundEnabled") !== "false";
let soundsLib = {
    "characterWalking": new Audio("./audio/stepsshorter.mp3"),
    "characterJump": new Audio("./audio/jump.mp3"),
    "chickenDeadSound": new Audio("./audio/deadChicken.mp3"),
    "chickenHitSound": new Audio("./audio/oneHit.mp3"),
    "bossSound": new Audio("./audio/bossSound.mp3"),
    "deadBossSound": new Audio("./audio/deadBoss.mp3"),
    "attackBossSound": new Audio("./audio/bossAttack.mp3"),
    "throwSound": new Audio("./audio/bumerang.mp3"),
    "coinSound": new Audio("./audio/coin.mp3"),
    "bottleSound": new Audio("./audio/bottle.mp3"),
    "backgroundMusic": new Audio("./audio/music.mp3")
}

/**
 * on fitst use the sound is on. if the sound is off, the icons and state are adjusted
 */
if (soundEnabled === false) {
    toggleMuteAudio(soundEnabled);
}

/**
 * is used to set current sound state to local storage and toggle icons
 * @param {boolean} state - true or false
 */
function toggleMuteAudio(state) {
    soundEnabled = state;
    localStorage.setItem("soundEnabled", soundEnabled);
    toggleDisplay('enabledButton');
    toggleDisplay('disabledButton');
    toggleDisplay('muteIcon');
    toggleDisplay('volumeIcon');
    muteSound(!state);
}

/**
 * is used to set all sounds to on or off
 * @param {boolean} state - true its for sound off and false for sound is on 
 */
function muteSound(state) {
    Object.values(soundsLib).forEach(sound => {
        sound.muted = state;
    });
}

/**
 * is used to set all sounds to pause
 */
function pauseAllSounds() {
    Object.values(soundsLib).forEach(sound => {
        sound.pause();
    });
}

/**
 * used to set pause for the chosen sound
 * @param {string} name - the name of the sound to be paused
 */
function pauseSound(name) {
    if (soundsLib[name]) {
        soundsLib[name].pause();
    }
    else {
        console.info("Der gesuchte Sound wurde nicht gefunden");
    }
}

/**
 * used to set play for the chosen sound
 * @param {string} name - the name of the sound to be played
 */
function playSound(name) {
    if (soundsLib[name]) {
        soundsLib[name].play();
    }
    else {
        console.info("Der gesuchte Sound wurde nicht gefunden");
    }
}