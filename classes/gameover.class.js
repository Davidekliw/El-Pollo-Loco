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
        // console.log(x);
        this.x = x * -1;
        let randomIndex = Math.floor(Math.random() * 4);
        // console.log(randomIndex);
        this.loadImage(this.IMG_GAMEOVERSCREEN[randomIndex]);
        this.loadImages(this.IMG_GAMEOVERSCREEN);
        // console.log(world.gameLoopInt);
        console.log('Spielende / Verloren');
        // console.log(this.x, this.y, this.width, this.height);

        setTimeout(() => {
            cancelAnimationFrame(world.gameLoopInt)
            window.location.reload()

        }, 2000);
    }

    // loadImage(path) {
    //     this.img = new Image();
    //     this.img.src = path;

    //     // Überprüfen, ob das Bild geladen wurde
    //     this.img.onload = () => {
    //         console.log("Bild wurde erfolgreich geladen.");
    //         console.log(this.img.src);

    //     };

    //     // Fehlerbehandlung, falls das Bild nicht geladen werden kann
    //     this.img.onerror = () => {
    //         console.error("Fehler beim Laden des Bildes.");
    //     };
    // }

    // draw(ctx) {
    //     console.log("GameOver draw() wird aufgerufen");
    //     ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    //     ctx.fillRect(0, 0, 720, 480);
    //     if (this.img) {
    //         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //     } else {
    //         console.log("Bild ist noch nicht geladen.");
    //     }
    // }
}