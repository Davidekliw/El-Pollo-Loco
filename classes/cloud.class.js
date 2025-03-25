class Cloud extends MovableObject {

    
    /**
     * @param {number} width - the object width
     * @param {number} hight - the object hight
     */
    height = 200;
    width = 550;

    /**
     * @type {number} minXDistance - min distance between 2 objects
     */
    minXDistance = 500;

    /**
     * load Picture, generate spawnppoints in x and y, calculate the speed and start animation
     */
    constructor() {
        super();
        this.loadImage('./img/5_background/layers/4_clouds/1.png')
        this.x = this.generateSpawnPointX(500, 2200);
        this.y = this.generateSpawnPointY(20, 150);
        this.speed = this.speed + Math.random() * 0.6;
        this.animate();
    }

    /**
     * is used to animate the clouds and stop the interval on x coordinate
     */
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