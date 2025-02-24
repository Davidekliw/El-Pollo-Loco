class Bottle extends ThrowableObject {

    width = 80;
    height = 80;

    constructor() {
        // super();
        // this.loadImages(this.IMG_BOTTLES);
        // this.animate();
    }

    animate() {
        setInterval(() => {
            console.log(this.keyboard.KEYD);
            
            if (this.world.keyboard.KEYD) {
                console.log("throw");
                
                this.throw();
                this.otherDirection = false;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }
}