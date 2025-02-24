class SmallChicken extends MovableObject {

    y = 380;
    width = 60;
    height = 50;
    collidingFramex = 5;
    collidingFramey = 5;
    collidingFrameWidth = 50;
    collidingFrameHight = 45;
    minXDistance = 500;
    makeDamage = 6;
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
        super()
        this.loadImage(this.IMG_WALKING[0]);
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_DEAD);
        this.x = 400 + Math.random() * 5000;
        this.x = this.generateSpawnPointX(500, 1800);
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
            let smallChickenInt = setInterval(() => {
                this.playPictureAnimation(this.IMG_DEAD);
                console.log('chickenintervall');
            }, 1000 / 60);
            setTimeout(() => {
                window.clearInterval(smallChickenInt)
                world.level.enemies.splice(index, 1);
                // console.log(`Nummer ${this.chickenInt} wurde eliminiert`);

            }, 400);
        } else {
            // console.log(this.isEnoughLive());
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
