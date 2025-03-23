class GameOver extends MovableObject {

    width = 720;
    height = 480;

    IMG_GAMEOVERSCREEN = [
        './img/9_intro_outro_screens/game_over/gameover!.png',
        './img/9_intro_outro_screens/game_over/gameover.png',
        './img/9_intro_outro_screens/game_over/ohnoyoulost!.png',
        './img/9_intro_outro_screens/game_over/youlost.png'
    ];

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
        }, 2000);
    }

    clearCanvas() {
        world.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    showGameOverInterface() {
        document.getElementById('gameOverInterface').style.display = "flex";
    }
}