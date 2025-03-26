class MovableObject extends DrawableObject {


    /**
    * @param {number} speed - is the speed of a object for moving
    * @param {boolean} otherDirection - is used to control the moving direction
    * @param {number} speedY - is used to calculate the gravity
    * @param {number} acceleration - is used to set the acceleration for a object
    */
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    /**
    * load the informatiions for extended class 
    */
    constructor() {
        super();
    }

    /**
    * is used to generate an gravity that bring back the object to the Ground
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    * is used to move a object to the right site
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * is used to move a object to the left site
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * is used to check the live of a object 
    * @returns true or false
    */
    isEnoughLive() {
        if (this.live > 0) {
            return true;
        } else {
            this.live <= 0;
            return false;
        }
    }

    /**
    * is used to load the pictures in an array
    * @param {string} images - path for a picture
    */
    playPictureAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Is used to check a object position is above a special y coordinate
    * @returns true or false
    */
    isAboveGround() {
        if (this instanceof ThrowableObject || this.world?.character?.isDeath) {
            return true;
        }
        else {
            return this.y < 140;
        }
    }

    /**
    * Is used to check a object position is under a special y coordinate
    * @returns true or false
    */
    isUnderGround() {
        return this.y > 140;
    }

    /**
    * is used to set a new y speed 
    */
    jump() {
        this.speedY = 30;
    }

    /**
    * is used to check how many time is gone between the current time and the last action time to start the longIdle animation
    * @param {timeStamp} timeStamp - the current timestamp
    * @returns true or false
    */
    isTimeForLongIdle(timeStamp) {
        let wastetTime = 15000;
        let currentTime = performance.now();
        let elapsedTime = currentTime - timeStamp;
        return elapsedTime > wastetTime;
    }

    /**
    * is used to check for a object is above any other object
    * @param {object} obj - this is the object which must be under the calling object
    * @returns true if a object is above or false
    */
    characterIsAboveEnemy(obj) {
        if (this.y + this.height < obj.y && this.x + this.collidingFrameWidth > obj.x + obj.collidingFramex && this.x + this.collidingFramex < obj.x + obj.collidingFrameWidth) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * is used to check for a collision between the object with any other object
    * @param {object} obj - this is the object with which a collision is to be checked
    * @returns true if a collision is detectet or false
    */
    isColliding(obj) {
        if (this.x + this.collidingFrameWidth > obj.x + obj.collidingFramex && this.x + this.collidingFramex < obj.x + obj.collidingFrameWidth && this.y + this.collidingFramey < obj.y + obj.collidingFrameHight && this.y + this.collidingFrameHight > obj.y + obj.collidingFramey) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * is used to generate a random point between the min and max value to use as x coordinate
     * @param {number} minXCoordinate - the minimum coordinate for the possible spawn point range
     * @param {number} maxXCoordinate - the maximum coordinate for the possible spawn point range
     * @returns {number} - a x coordinate
     */
    generateSpawnPointX(minXCoordinate, maxXCoordinate) {
        let generateXCoordinate = Math.random() * maxXCoordinate + this.minXDistance;
        if (generateXCoordinate < maxXCoordinate && generateXCoordinate > minXCoordinate) {
            return generateXCoordinate;
        }
        else {
            return this.generateSpawnPointX(minXCoordinate, maxXCoordinate);
        }
    }

    /**
    * is used to generate a random point between the min and max value to use as y coordinate
    * @param {number} minYCoordinate - the minimum coordinate for the possible spawn point range
    * @param {number} maxYCoordinate - the maximum coordinate for the possible spawn point range
    * @returns {number} - a y coordinate
    */
    generateSpawnPointY(minYCoordinate, maxYCoordinate) {
        let generateYCoordinate = 0 + Math.random() * maxYCoordinate;
        if (generateYCoordinate < maxYCoordinate && generateYCoordinate > minYCoordinate) {
            return generateYCoordinate;
        }
        else {
            return this.generateSpawnPointY(minYCoordinate, maxYCoordinate);
        }
    }

    /**
    * is used to handle a hit on a enemy
    * @param {number} damage - the hight of the points to subtracted from the live
    * @param {number} index - is the current index of the object which is currently attacking
    */
    getDamage(damage, index) {
        world.level.enemies[index].live -= damage;
        if (!this.isEnoughLive()) {
            window.clearInterval(this.moveLeftInt);
            window.clearInterval(this.chickenInt);
            let chickenInt = setInterval(() => {
                this.playPictureAnimation(this.IMG_DEAD);
                playSound('chickenDeadSound');
            }, 1000 / 60);
            setTimeout(() => {
                window.clearInterval(chickenInt)
                world.level.enemies[index].isDeath = true;
            }, 400);
        } else {
            playSound('chickenHitSound');
        }
    }
}