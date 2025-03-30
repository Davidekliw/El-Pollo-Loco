class GameOver extends MovableObject {

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
    IMG_GAMEOVERSCREEN = [
        './img/9_intro_outro_screens/game_over/gameover!.png',
        './img/9_intro_outro_screens/game_over/gameover.png',
        './img/9_intro_outro_screens/game_over/ohnoyoulost!.png',
        './img/9_intro_outro_screens/game_over/youlost.png'
    ];

    /**
     * is used du generate a gameoverscreen user info and stop Intervals
     * @param {number} x - the x coordinate for camera Position
     */
    constructor(x) {
        super();
        this.x = x * -1;
        let randomIndex = Math.floor(Math.random() * 4);
        this.loadImage(this.IMG_GAMEOVERSCREEN[randomIndex]);
        this.loadImages(this.IMG_GAMEOVERSCREEN);

        setTimeout(() => {
            cancelAnimationFrame(world.gameLoopInt);
            world.clearAllIntervals();
            pauseAllSounds();
            this.showGameOverInterface();
            this.clearCanvas();
            setKeyboardToFalse();
        }, 2000);
    }

    /**
     * is used to clean the canvas
     */
    clearCanvas() {
        world.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * is used to show the Userinterface
     */
    showGameOverInterface() {
        document.getElementById('gameOverInterface').style.display = "flex";
    }
}