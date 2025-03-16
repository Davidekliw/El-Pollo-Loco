class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    testzaehler;
    chickenDeadSound = loadSound('./audio/deadChicken.mp3');
    chickenHitSound = loadSound('./audio/oneHit.mp3');


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
        // console.log(this.x);

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
        // console.log('this:', this);
        // console.log('this.character:', this?.world);
        // console.log('this.character:', this.world?.character);
        if (this instanceof ThrowableObject || this.world?.character?.isDeath) {
            // if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 140;
        }
    }

    isUnderGround() {
        // console.log("Character Y-Koordinate:", this.y);
        return this.y > 140;
    }

    jump() {
        this.speedY = 30;
    }

    isTimeForLongIdle(timeStamp) {
        let wastetTime = 15000;
        let currentTime = performance.now();
        let elapsedTime = currentTime - timeStamp;
        // console.log(elapsedTime);
        // console.log(`${elapsedTime > wastetTime}`);
        return elapsedTime > wastetTime;
    }

    isColliding(obj) {
        // console.log(`xwidth = ${this.x} + ${this.width} = ${this.x + this.width} > ${obj.x}`);
        // console.log(`ywidth = ${this.y} + ${this.height} = ${this.y + this.height} > ${obj.y}`);
        let a = this.x + this.width;
        let b = obj.x
        let c = this.y + this.height;
        let d = obj.y
        let e = this.x;
        let f = obj.x;
        let g = this.y
        let h = obj.y + obj.height;
        let res = a > b && c > d && e < f && g < h;
        // if (res) { console.log(res) };
        // console.log(a > b && c > d && e < f && g < h);
        // console.log(this.height);
        // console.log(this.height - 40);
        // console.log(obj.x);
        // return (this.x + 10) + (this.width - 20) > (obj.x + 20) && (this.y - 45) + (this.height) > (obj.y + 20) && this.x < (obj.x + 20) && (this.y - 45) < (obj.y + 20) + (obj.height - 40);
        // console.log(this.collidingFramex + this.collidingFrameWidth > obj.collidingFramex, this.collidingFramey + this.collidingFrameHight > obj.collidingFramey, this.collidingFramex < obj.collidingFramex, this.collidingFramey < obj.collidingFramey + obj.collidingFrameHight);
        // let minAx = Math.min(this.x + this.collidingFramex, this.x + this.collidingFrameWidth, this.x + this.collidingFramex, this.x + this.collidingFrameWidth);
        // let maxAx = Math.max(this.x + this.collidingFramex, this.x + this.collidingFrameWidth, this.x + this.collidingFramex, this.x + this.collidingFrameWidth);
        // let minAy = Math.min(this.y + this.collidingFramey, this.y + this.collidingFramey, this.y + this.collidingFrameHight, this.y + this.collidingFrameHight);
        // let maxAy = Math.max(this.y + this.collidingFramey, this.y + this.collidingFramey, this.y + this.collidingFrameHight, this.y + this.collidingFrameHight);
        // 
        // let minBx = Math.min(obj.x + obj.collidingFramex, obj.x + obj.collidingFrameWidth, obj.x + obj.collidingFramex, obj.x + obj.collidingFrameWidth);
        // let maxBx = Math.max(obj.x + obj.collidingFramex, obj.x + obj.collidingFrameWidth, obj.x + obj.collidingFramex, obj.x + obj.collidingFrameWidth);
        // let minBy = Math.min(obj.y + obj.collidingFramey, obj.y + obj.collidingFramey, obj.y + obj.collidingFrameHight, obj.y + obj.collidingFrameHight);
        // let maxBy = Math.max(obj.y + obj.collidingFramey, obj.y + obj.collidingFramey, obj.y + obj.collidingFrameHight, obj.y + obj.collidingFrameHight);
        // console.log(`${minAx} >= ${minBx} || ${maxAx} <= ${maxBx} || ${minAy} >= ${minBy} || ${maxAy} <= ${maxBy}`);

        // if (minAx >= minBx && maxAx <= maxBx && minAy >= minBy && maxAy <= maxBy) {
        //     console.log("Treffer");
        // }
        if (this.x + this.collidingFrameWidth > obj.x + obj.collidingFramex) {
            // console.log(`${this.x + this.collidingFrameWidth} > ${obj.x + obj.collidingFramex}`);
            if (this.x + this.collidingFramex < obj.x + obj.collidingFrameWidth) {
                // console.log(`${this.x + this.collidingFrameWidth} < ${obj.x + obj.collidingFrameWidth}`);
                if (this.y + this.collidingFramey < obj.y + obj.collidingFrameHight) {
                    // console.log(`${this.y + this.collidingFramey} < ${obj.y + obj.collidingFrameHight}`);
                    if (this.y + this.collidingFrameHight > obj.y + obj.collidingFramey) {
                        // console.log(`${this.y + this.collidingFrameHight} > ${obj.y + obj.collidingFramey}`);
                        // console.log(`${this.y} ? ${obj.collidingFrameHight}`);
                        // console.log(`${this.collidingFramey} ? ${obj.collidingFramey}`);
                        // console.log("Treffer");
                        return true;
                    }
                }
            }
        }

        // if (this.x + this.collidingFrameWidth > obj.x + obj.collidingFramex) {
        //     // console.log(`${this.x + this.collidingFrameWidth} > ${obj.x + obj.collidingFramex}`);
        //     if (this.x + this.collidingFrameWidth < obj.x + obj.collidingFrameWidth) {
        //         // console.log(`${this.x + this.collidingFrameWidth} < ${obj.x + obj.collidingFrameWidth}`);
        //         if (this.y + this.collidingFramey < obj.y + obj.collidingFrameHight) {
        //             // console.log(`${this.y + this.collidingFramey} < ${obj.y + obj.collidingFrameHight}`);
        //             if (this.y + this.collidingFramey > obj.y + obj.collidingFramey) {
        //                 console.log(`${this.y + this.collidingFramey} > ${obj.y + obj.collidingFramey}`);
        //                 console.log(`${this.y} ? ${obj.collidingFrameHight}`);
        //                 // console.log(`${this.collidingFramey} ? ${obj.collidingFramey}`);
        //             }
        //         }
        //     }
        // }
        // if (res) {
        // if (this.x + this.collidingFrameWidth > obj.x + obj.collidingFramex && this.y + this.collidingFrameHight > obj.y && this.x < obj.x && this.y < obj.y + obj.collidingFrameHight) {
        // console.log(                      this.x + this.collidingFrameWidth > obj.collidingFramex);
        // console.log(`${this.x} ${this.collidingFramex} ${obj.x} ${this.x + this.collidingFrameWidth} > ${obj.collidingFramex}, ${this.x + this.collidingFrameWidth} < ${obj.x + obj.collidingFrameWidth}, ${this.collidingFramex} < ${obj.collidingFramex}, ${this.collidingFramey} < ${obj.collidingFramey + obj.collidingFrameHight}`);
        // };
        // return this.x + this.width > obj.x && this.y + this.height > obj.y && this.x < obj.x && this.y < obj.y + obj.height;
        // return this.x + this.collidingFrameWidth > obj.x && this.y + this.collidingFrameHight > obj.y && this.x < obj.x && this.y < obj.y + obj.collidingFrameHight;
        // return this.x + this.collidingFrameWidth > this.x + obj.collidingFramex && this.y + obj.collidingFramey > obj.y + obj.collidingFramey && this.y + this.y.collidingFrameWidth < obj.y + obj.collidingFrameHight;
    }

    generateSpawnPointX(minXCoordinate, maxXCoordinate) {
        // console.log(minXCoordinate, maxXCoordinate);
        // console.log(this.minXDistance);
        let generateXCoordinate = Math.random() * maxXCoordinate + this.minXDistance;
        // console.log(generateXCoordinate);
        if (generateXCoordinate < maxXCoordinate && generateXCoordinate > minXCoordinate) {
            // this.xx = generateXCoordinate;
            // console.log("no pattern match");
            // console.log(this.xx);

            // console.log(generateXCoordinate);
            return generateXCoordinate;
        }
        else {
            return this.generateSpawnPointX(minXCoordinate, maxXCoordinate);
        }
    }


    generateSpawnPointY(minYCoordinate, maxYCoordinate) {
        let generateYCoordinate = 0 + Math.random() * maxYCoordinate;
        // console.log(generateYCoordinate);
        if (generateYCoordinate < maxYCoordinate && generateYCoordinate > minYCoordinate) {
            // console.log(generateYCoordinate);
            return generateYCoordinate;
        }
        else {
            return this.generateSpawnPointY(minYCoordinate, maxYCoordinate);
        }
    }

}