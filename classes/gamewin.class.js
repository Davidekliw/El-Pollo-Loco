class GameWin extends MovableObject {

    width = 720;
    height = 480;

    IMG_GAMEWINSCREEN = [
        './img/9_intro_outro_screens/win/win1.png',
        './img/9_intro_outro_screens/win/win2.png',
        './img/9_intro_outro_screens/win/win3.png',
        './img/9_intro_outro_screens/win/win4.png',
        './img/9_intro_outro_screens/win/win5.png',
        './img/9_intro_outro_screens/win/win6.png'
    ];

    
    constructor(x) {
        super();
        this.x = x * -1;
        let randomIndex = Math.floor(Math.random() * 6);
        this.loadImage(this.IMG_GAMEWINSCREEN[randomIndex]);
        this.loadImages(this.IMG_GAMEWINSCREEN);
        setTimeout(() => {
            cancelAnimationFrame(world.gameLoopInt);
            init(++levelNbr);
        }, 1500);
    }
}