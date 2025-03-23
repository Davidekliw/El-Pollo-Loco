class ThrowableObject extends MovableObject {


    width = 60;
    height = 80;
    collidingFramex = 15;
    collidingFramey = 15;
    collidingFrameWidth = 45;
    collidingFrameHight = 70;
    throwableObjectIntv;
    isUsed = false;
    splashIntv;

    IMG_BOTTLES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMG_BOTTLEHIT = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y) {
        super();
        keyboard.KEYD = false;
        this.x = x;
        this.y = y;
        this.loadImage(this.IMG_BOTTLES[0]);
        this.loadImages(this.IMG_BOTTLES);
        this.loadImages(this.IMG_BOTTLEHIT);
        this.throw();
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    splashBottle() {
        window.clearInterval(this.throwableObjectIntv);
        this.splashIntv = setInterval(() => {
            this.playPictureAnimation(this.IMG_BOTTLEHIT);
        }, 10);
        setTimeout(() => {
            window.clearInterval(this.splashIntv);
            world.throwableObjects.splice(0);
        }, 4000);
    }

    checkBottleCollision() {
        world.level.enemies.forEach((enemy, index) => {
            let hit = world.throwableObjects.some((throwableObject) => throwableObject?.isColliding(enemy));
            if (!this.isUsed && !enemy.isDeath && hit) {
                this.isUsed = true;
                world.level.enemies[index].getDamage(Bottle.makeDamage, index);
            }
        });
    }

    checkThrowDirection() {
        if (world.character.otherDirection) {
            this.throwdirection = -24;
        }
        else {
            this.throwdirection = 24;
        }
    }

    changeUsedPictures() {
        if (this.isUsed) {
            return this.IMG_BOTTLEHIT;
        }
        else {
            return this.IMG_BOTTLES;
        }
    }

    throw() {
        playSound('throwSound');
        this.checkThrowDirection();
        this.throwableObjectIntv = setInterval(() => {
            this.checkBottleCollision();
            let pictures = this.changeUsedPictures();
            this.playPictureAnimation(pictures);
            this.x += this.throwdirection;
            this.speedY = 2;
            this.applyGravity();
            if (this.y > 500) {
                world.throwableObjects.splice(0);
                world.bottleBar.currentLoad = world.bottleBar.currentLoad - (1 / world.allBottlesInLevel) * 1000;
                world.bottleBar.setPercentage(world.bottleBar.currentLoad, "IMG_STATUSBARBOTTLES");
                pauseSound('throwSound');
                window.clearInterval(this.throwableObjectIntv);
            }
        }, 40);
    }
}