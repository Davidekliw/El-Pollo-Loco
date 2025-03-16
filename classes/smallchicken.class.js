class SmallChicken extends MovableObject {

    y = 380;
    width = 60;
    height = 50;
    collidingFramex = 5;
    collidingFramey = 5;
    collidingFrameWidth = 50;
    collidingFrameHight = 45;
    minXDistance = 600;
    makeDamage = 4;
    live = 10;
    chickenInt;
    moveLeftInt;

    IMG_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMG_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor(levelSpeed) {
        super();
        this.loadImage(this.IMG_WALKING[0]);
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_DEAD);
        this.x = this.generateSpawnPointX(600, 2200);
        this.speed = this.speed + Math.random() * levelSpeed;
        this.animate();
    }

    getDamage(damage, index) {
        world.level.enemies[index].live -= damage;
        if (!this.isEnoughLive()) {
            window.clearInterval(this.moveLeftInt);
            window.clearInterval(this.chickenInt);
            let smallChickenInt = setInterval(() => {
                this.playPictureAnimation(this.IMG_DEAD);
                playSound(this.chickenDeadSound);
            }, 1000 / 60);
            setTimeout(() => {
                window.clearInterval(smallChickenInt)
                world.level.enemies.splice(index, 1);
            }, 400);
        }
    }

    animate() {
        this.moveLeftInt = setInterval(() => {
            if (this.x < - 50) {
                window.clearInterval(this.moveLeftInt);
            }
            this.moveLeft();
        }, 1000 / 60);

        this.chickenInt = setInterval(() => {
            this.playPictureAnimation(this.IMG_WALKING);
            if (this.x < -50) {
                let index = world.level.enemies.findIndex(enemy => enemy.chickenInt === this.chickenInt)
                world.level.enemies.splice(index, 1);
                window.clearInterval(this.chickenInt);
            }
        }, 300);
    }
}
