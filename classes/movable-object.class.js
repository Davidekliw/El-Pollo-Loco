class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    testzaehler;

    constructor() {
        super();
    }

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isEnoughLive() {
        if (this.live > 0) {
            return true;
        } else {
            this.live <= 0;
            return false;
        }
    }

    playPictureAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject || this.world?.character?.isDeath) {
            return true;
        }
        else {
            return this.y < 140;
        }
    }

    isUnderGround() {
        return this.y > 140;
    }

    jump() {
        this.speedY = 30;
    }

    isTimeForLongIdle(timeStamp) {
        let wastetTime = 15000;
        let currentTime = performance.now();
        let elapsedTime = currentTime - timeStamp;
        return elapsedTime > wastetTime;
    }

    isColliding(obj) {
        if (this.x + this.collidingFrameWidth > obj.x + obj.collidingFramex && this.x + this.collidingFramex < obj.x + obj.collidingFrameWidth && this.y + this.collidingFramey < obj.y + obj.collidingFrameHight && this.y + this.collidingFrameHight > obj.y + obj.collidingFramey) {
            return true;
        }
    }

    generateSpawnPointX(minXCoordinate, maxXCoordinate) {
        let generateXCoordinate = Math.random() * maxXCoordinate + this.minXDistance;
        if (generateXCoordinate < maxXCoordinate && generateXCoordinate > minXCoordinate) {
            return generateXCoordinate;
        }
        else {
            return this.generateSpawnPointX(minXCoordinate, maxXCoordinate);
        }
    }

    generateSpawnPointY(minYCoordinate, maxYCoordinate) {
        let generateYCoordinate = 0 + Math.random() * maxYCoordinate;
        if (generateYCoordinate < maxYCoordinate && generateYCoordinate > minYCoordinate) {
            return generateYCoordinate;
        }
        else {
            return this.generateSpawnPointY(minYCoordinate, maxYCoordinate);
        }
    }

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
                // world.level.enemies.splice(index, 1);
                world.level.enemies[index].isDeath = true;
            }, 400);
        } else {
            playSound('chickenHitSound');
        }
    }
}