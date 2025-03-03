class GameWin extends MovableObject {

    width = 720;
    height = 480;

    IMG_GAMEWINSCREEN = [
        './img/9_intro_outro_screens/win/win1.png',
        './img/9_intro_outro_screens/win/win1.png',
        './img/9_intro_outro_screens/win/win1.png',
        './img/9_intro_outro_screens/win/win1.png',
        './img/9_intro_outro_screens/win/win1.png'
    ];

    constructor(x) {
        super();
        // console.log(x);
        this.x = x * -1;
        let randomIndex = Math.floor(Math.random() * 5);
        // console.log(randomIndex);
        this.loadImage(this.IMG_GAMEWINSCREEN[randomIndex]);
        this.loadImages(this.IMG_GAMEWINSCREEN);
        // console.log(world.gameLoopInt);
        console.log('Spielende / Gewonnen');
        // console.log(this.x, this.y, this.width, this.height);
        setTimeout(() => {
            cancelAnimationFrame(world.gameLoopInt);
            // window.location.reload();
            init(++levelNbr);
        }, 2500);
    }

    // draw(ctx) {
    //     ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    //     ctx.fillRect(this.x, this.y, 720, 480);
    //     ctx.fillText("Gewonnen", this.x, this.y);
    // }


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