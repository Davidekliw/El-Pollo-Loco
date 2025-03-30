class ThrowableObject extends MovableObject {

    /**
    * default width and height of the element.
    * @param {number} width - is the default width
    * @param {number} height - is the default height
    */
    width = 60;
    height = 80;

    /**
    * is used to limit the contact area
    * @param {number} collidingFramex- is the default colliding x koordinate
    * @param {number} collidingFramey- is the default colliding y koordinate
    * @param {number} collidingFrameWidth- is the default colliding height koordinate
    * @param {number} collidingFrameHight- is the default colliding width koordinate
    */
    collidingFramex = 15;
    collidingFramey = 15;
    collidingFrameWidth = 45;
    collidingFrameHight = 70;

    /**
    * @param {number} throwableObjectIntv - represent the intervalnumber of a throw object
    */
    throwableObjectIntv;

    /**
    * @param {boolean} isUsed - is set to true if a botttle hit a enemy the first time.
    */
    isUsed = false;

    /**
    * @param {number} splashIntv - represent the intervalnumber of a colliding throw object
    */
    splashIntv;

    /**
    * A Array with the Picturepath´s for a bottle on fly.
    * @type {string[]}
    */
    IMG_BOTTLES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
    * A Array with the Picturepath´s for a bottle is colliding a object.
    * @type {string[]}
    */
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

    /**
     * is used to show  bottle explode
     */
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

    /**
     * is used to check if the thrown element has hit another object
     */
    checkBottleCollision() {
        world.level.enemies.forEach((enemy, index) => {
            let hit = world.throwableObjects.some((throwableObject) => throwableObject?.isColliding(enemy));
            if (!this.isUsed && !enemy.isDeath && hit) {
                this.isUsed = true;
                world.level.enemies[index].getDamage(Bottle.makeDamage, index);
            }
        });
    }


    /**
     * is used to set the throw direction
     */
    checkThrowDirection() {
        if (world.character.otherDirection) {
            this.throwdirection = -24;
        }
        else {
            this.throwdirection = 24;
        }
    }

    /**
     * is used to change the right pictures for use
     * @returns the right picture Array
     */
    changeUsedPictures() {
        if (this.isUsed) {
            return this.IMG_BOTTLEHIT;
        }
        else {
            return this.IMG_BOTTLES;
        }
    }

    /**
     * is used to calculate and set the right status percentage
     */
    updateStatusBar() {
        world.bottleBar.currentLoad = world.bottleBar.currentLoad - (1 / world.allBottlesInLevel) * 1000;
        world.bottleBar.setPercentage(world.bottleBar.currentLoad, "IMG_STATUSBARBOTTLES");
    }

    /**
     * isd used to throw a object
     */
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
                this.updateStatusBar();
                pauseSound('throwSound');
                window.clearInterval(this.throwableObjectIntv);
            }
        }, 40);
    }
}