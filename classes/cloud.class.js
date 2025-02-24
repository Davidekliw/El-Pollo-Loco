class Cloud extends MovableObject {

    height = 200;
    width = 550;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png')
        this.x = 20 + Math.random() * 8000;
        this.loadImage
        this.y = 20 + Math.random() * 100;
        this.speed = this.speed + Math.random() * 0.6;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 60);
    }
}