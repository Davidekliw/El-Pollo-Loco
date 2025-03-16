class Cloud extends MovableObject {

    height = 200;
    width = 550;
    minXDistance = 500;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png')
        this.x = 20 + Math.random() * 8000;
        this.x = this.generateSpawnPointX(500, 2200);
        this.loadImage
        this.y = 20 + Math.random() * 100;
        this.y = this.generateSpawnPointY(20, 150);
        this.speed = this.speed + Math.random() * 0.6;
        this.animate();
    }

    animate() {
        let cloudInt = setInterval(() => {
            if (this.x <= -650) {
                window.clearInterval(cloudInt);
            }
            else {
                this.moveLeft();
            }
        }, 60);
    }
}