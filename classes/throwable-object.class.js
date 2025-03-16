class ThrowableObject extends MovableObject {


    width = 80;
    height = 80;
    collidingFramex = 10;
    collidingFramey = 10;
    collidingFrameWidth = 70;
    collidingFrameHight = 70;
    throwableObjectIntv;
    isUsed = false;
    throwSound = loadSound('./audio/bumerang.mp3')
    splashIntv;
    // throwableObjects = [];


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
            window.clearInterval(this.splashIntv)
            world.throwableObjects.splice(0);
        }, 4000)
    }


    checkBottleCollision() {
        // this.obj = obj;
        // console.log(obj);


        world.level.enemies.forEach((enemy, index) => {
            // console.log(enemy, '->', index);
            let hit = world.throwableObjects.some((throwableObject) => throwableObject?.isColliding(enemy));
            // console.log(`${index} -> ${index}`);
            // console.log(`${index}`);
            // console.log(world.throwableObjects[index]);
            // let throwableObject = world.throwableObjects[];
            // console.log(hit);
            // console.log(world.throwableObjects[0].isUsed);
            // if (throwableObject?.isColliding(obj)) {
            if (!this.isUsed && hit) {
                // console.log('treffer');
                this.isUsed = true;
                console.log(this);

                // console.log(enemy, index);
                // Die gegner werden bei einem trefer aus dem spielgenommen. es muss geprüft werden ob es sinn macht zusätzlich noch den intervall zu killen und es muss noch eine ordentliche funktion für denn schaden
                // erstellt werden in der mann einstellen kann wieviel schaden ein enemy nimmt wenn er getroffen wird. analog zu getdamage funktion beim character
                // console.log(this.throwableObject);
                // console.log(world.level.enemies[index]);
                // console.log(world.level.enemies[index].chickenInt);
                // world.level.enemies[index].getDamage(40, index);
                // console.log(world.level.enemies[index].makeDamage);
                world.level.enemies[index].getDamage(Bottle.makeDamage, index);
                // this.splashBottle();
                // world.level.enemies.splice(index, 1);
                // this.healthBar.setPercentage(this.character.live, "IMG_STATUSBARHEALTH");
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
        // console.log(world.bottleBar.currentLoad);
        // console.log(Bottle.value);
        playSound(this.throwSound);
        this.checkThrowDirection();
        this.throwableObjectIntv = setInterval(() => {
            this.checkBottleCollision();
            let pictures = this.changeUsedPictures();
            // console.log(this.throwableObjectInt);
            // console.log(this.throwableObjects);
            // console.log(world.throwableObjects);
            this.playPictureAnimation(pictures);
            this.x += this.throwdirection;
            this.speedY = 2;
            this.applyGravity();
            if (this.y > 500) {
                // console.log('wird ausgeführt wenn y kleiner 500');
                world.throwableObjects.splice(0);
                // console.log(world.bottleBar.currentLoad);
                world.bottleBar.currentLoad = world.bottleBar.currentLoad - (1 / world.allBottlesInLevel) * 1000;
                // console.log(world.bottleBar.currentLoad);
                world.bottleBar.setPercentage(world.bottleBar.currentLoad, "IMG_STATUSBARBOTTLES");
                // console.log(this.throwableObjectInt);
                pauseSound(this.throwSound);
                window.clearInterval(this.throwableObjectIntv);
            }
        }, 40);
    }
}