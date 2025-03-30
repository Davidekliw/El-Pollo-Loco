class GameWin extends MovableObject {

    /**
    * default width and height of the element.
    * @param {number} width - is the default width
    * @param {number} height - is the default height
    */
    width = 720;
    height = 480;

    /**
    * A Array with the Picturepath´s for character is on idle.
    * @type {string[]}
    */
    IMG_GAMEWINSCREEN = [
        './img/9_intro_outro_screens/win/win1.png',
        './img/9_intro_outro_screens/win/win2.png',
        './img/9_intro_outro_screens/win/win3.png',
        './img/9_intro_outro_screens/win/win4.png',
        './img/9_intro_outro_screens/win/win5.png',
        './img/9_intro_outro_screens/win/win6.png'
    ];

    /**
    * is used du generate a gameoverscreen user info and stop Intervals
    * @param {number} x - the x coordinate for camera Position
    */
    constructor(x) {
        super();
        this.x = x * -1;
        let randomIndex = Math.floor(Math.random() * 6);
        this.loadImage(this.IMG_GAMEWINSCREEN[randomIndex]);
        this.loadImages(this.IMG_GAMEWINSCREEN);
        setTimeout(() => {
            cancelAnimationFrame(world.gameLoopInt);
            world.clearAllIntervals();
            setKeyboardToFalse();
            pauseAllSounds();
            init(++levelNbr);
        }, 1500);
    }
}