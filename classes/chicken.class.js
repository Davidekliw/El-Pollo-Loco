class Chicken extends MovableObject {

    y = 350;
    width = 90;
    height = 80;
    collidingFramex = 5;
    collidingFramey = 5;
    collidingFrameWidth = 85;
    collidingFrameHight = 75;
    minXDistance = 600;
    makeDamage = 2;
    live = 21;
    chickenInt;
    moveLeftInt;

    IMG_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMG_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor(levelSpeed) {
        super()
        this.loadImage(this.IMG_WALKING[0]);
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_DEAD);
        this.x = 400 + Math.random() * 5000;
        this.x = this.generateSpawnPointX(600, 2200);
        this.speed = this.speed + Math.random() * levelSpeed;
        this.animate();
    }


    // isEnoughLive() {
    //     if (this.live > 0) {
    //         return true;
    //     } else {
    //         this.live <= 0;
    //         return false;
    //     }
    // }


    getDamage(damage, index) {
        world.level.enemies[index].live -= damage;
        if (!this.isEnoughLive()) {
            // console.log(`Nr: ${index} hat noch ${world.level.enemies[index].live} Leben`);
            // console.log(index);
            window.clearInterval(this.moveLeftInt);
            window.clearInterval(this.chickenInt);
            let chickenInt = setInterval(() => {
                this.playPictureAnimation(this.IMG_DEAD);
                playSound(this.chickenDeadSound);
            }, 1000 / 60);
            setTimeout(() => {
                window.clearInterval(chickenInt)
                world.level.enemies.splice(index, 1);
                // console.log(`Nummer ${this.chickenInt} wurde eliminiert`);
            }, 400);
        } else {
            // console.log(this.isEnoughLive());
            playSound(this.chickenHitSound);
            console.log(`Nr: ${index} hat noch ${world.level.enemies[index].live} Leben`);
        }
    }








    animate() {
        this.moveLeftInt = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.chickenInt = setInterval(() => {
            this.playPictureAnimation(this.IMG_WALKING);
            if (this.x < -50) {
                let index = world.level.enemies.findIndex(enemy => enemy.chickenInt === this.chickenInt)
                world.level.enemies.splice(index, 1);
                window.clearInterval(this.chickenInt);
            }
        }, 500);
    }
}
