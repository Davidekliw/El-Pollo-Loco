class World {
    gameLoopInt;
    character = new Character();
    level = currentLevel;
    canvas;
    ctx;
    keyboard;
    gameover;
    camera_x = -50;
    camera_XMax = -2149;
    camera_XMin = -50;
    healthBar = new StatusBar(this.character.live, "IMG_STATUSBARHEALTH");
    bottleBar = new StatusBar(0, "IMG_STATUSBARBOTTLES", 20);
    coinBar = new StatusBar(0, "IMG_STATUSBARCOINS", 50);
    // bossBar = new StatusBar(100, "IMG_STATUSBARBOSS", 50);
    bossBar;
    // bottle = new Bottle();
    throwableObjects = [];
    allBottlesInLevel;
    allCoinsInLevel;
    coinSound = loadSound('./audio/coin.mp3');
    bottleSound = loadSound('./audio/bottle.mp3'); 
    // reward = new Reward();



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        setTimeout(() => {
            this.setWorld();
            this.coinCounter();
            this.bottleCounter();
        // this.draw();

        }, 1000);

        this.setWorld();
        // this.update();
        // this.draw();
        this.startGameLoop();
        // this.run();
        // this.draw();
    }

    startGameLoop() {
        if (this.gameLoopInt) {
            cancelAnimationFrame(this.gameLoopInt);
        }
        const loop = () => {
            // console.log(this.gameLoopInt);

            this.update();
            this.draw();
            this.gameLoopInt = requestAnimationFrame(loop);
            // loop();
            // console.log(this.gameLoopInt);
        };
        // loop();
        this.gameLoopInt = requestAnimationFrame(loop);
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++)
            window.clearInterval(i);
    }


    setWorld() {
        this.character.world = this;
        // console.log(this.level.enemies.length);
        // console.log(this.level.enemies[this.level.enemies.length  - 1]);
        // this.level.endboss.world = this;
        // console.log(this.level.endboss.world);

        this.level.enemies[this.level.enemies.length - 1].world = this;
        // console.log(this.level.enemies[this.level.enemies.length  - 1].world);

    }

    update() {
        this.throwableObject();
        !this.character.isDeath && this.checkCollisions();
        !this.character.isDeath && this.checkObjectCollisions();
    };

    throwableObject() {
        if (this.keyboard.KEYD && world?.bottleBar?.currentLoad > 0 && !world?.character?.isDeath) {
            // console.log(world.bottleBar.currentLoad);
            // console.log('wird gemacht');
            // console.log(this.throwableObjects);
            // console.log(this.character.world);
            if (this.throwableObjects.length == 0) {
                world.character.timeSinceLastAction = performance.now();
                console.log('do it');
                let bottle = new ThrowableObject(this.character.x + this.character.width / 2 - 40, this.character.y + this.character.collidingFramey)
                this.throwableObjects.push(bottle);
            }
        }
    }

    checkCollisions() {
        // this.obj = obj;
        // console.log(obj);
        // console.log("text");

        this.level.enemies.forEach((obj) => {
            if (this.character.isColliding(obj) && !this.character?.isDeath) {
                this.character.getDamage(obj.makeDamage);
                this.healthBar.setPercentage(this.character.live, "IMG_STATUSBARHEALTH");
            }
        });
    }

    checkObjectCollisions() {
        // this.obj = obj;


        this.level.rewards.forEach((obj, index) => {
            if (this.character.isColliding(obj)) {
                // console.log(`aktueller Index: ${index}`);
                // console.log(obj);
                if (this.level.rewards[index] instanceof Bottle) {
                    // console.log(`Es ist eine Flasche an Position ${index}`);
                    // console.log(this.character.x + this.character.width, this.character.y, obj.x, obj.y);
                    // console.log(this.character.x + this.character.width, this.character.y, obj.x - obj.collidingFrameWidth / 2, obj.y - obj.collidingFrameHight / 2);
                    // console.log(this.character.x - this.character.collidingFramex + this.character.collidingFrameWidth, this.character.y, obj.x - obj.collidingFrameWidth / 2, obj.y - obj.collidingFrameHight / 2);
                    // console.log(this.level.rewards[index].value);
                    // console.log(this.bottleBar.currentLoad);

                    // this.bottleBar.currentLoad = this.bottleBar.currentLoad + (1 / this.allBottlesInLevel) * 1000
                    playSound(this.bottleSound);
                    this.bottleBar.currentLoad = this.bottleBar.currentLoad + this.level.rewards[index].value
                    this.bottleBar.setPercentage(this.bottleBar.currentLoad, "IMG_STATUSBARBOTTLES");

                } else if (this.level.rewards[index] instanceof Coin) {
                    // console.log(`Es ist ein Coin an Position ${index}`);
                    // console.log(this.character.x + this.character.width, this.character.y, obj.x, obj.y);
                    // console.log(this.character.x + this.character.width, this.character.y, obj.x - obj.collidingFrameWidth / 2, obj.y - obj.collidingFrameHight / 2);
                    // console.log(this.level.rewards[index].value);
                    // this.coinBar.currentLoad = this.coinBar.currentLoad + this.level.rewards[index].value
                    playSound(this.coinSound);
                    console.log(this.allCoinsInLevel);
                    this.coinBar.currentLoad = this.coinBar.currentLoad + (1 / this.allCoinsInLevel) * 1000
                    console.log(this.coinBar.currentLoad);
                    
                    this.coinBar.setPercentage(this.coinBar.currentLoad, "IMG_STATUSBARCOINS");
                    // console.log(this.coinBar.currentLoad);
                } else {
                    console.log(`Es ist etwas anderes an Position ${index}`);
                }
                // console.log(this.level.rewards[index]);
                this.level.rewards.splice(index, 1);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjs);

        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.clouds);

        // this.addToMap(this.bottle);
        this.addObjectsToMap(this.throwableObjects);

        this.addObjectsToMap(this.level.rewards);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        if (this.bossBar instanceof StatusBar) {
            // this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Roter Hintergrund mit 50% Transparenz
            // this.ctx.fillRect(570, 0, 150, 60); // Rechteck zeichnen
            this.addToMap(this.bossBar);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        if (this.gameover instanceof GameOver || this.gameover instanceof GameWin) {
            this.addToMap(this.gameover);
        }
        this.ctx.translate(-this.camera_x, 0);

        // let self = this;

        // if (this.character.isDeath) {
        //     this.clearAllIntervals();
        // }
        // requestAnimationFrame(function () {
        //     self.draw();
        // });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        // console.log(mo);
        // mo.drawDotTopRight(this.ctx);
        // mo.drawText(this.ctx);
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawCollidingFrame(this.ctx);
        // mo.drawDotTopLeft(this.ctx);
        // mo.drawXLine(this.ctx);
        // mo.drawDotBottomLeft(this.ctx);

        if (mo.otherDirection) {
            this.flipBackImage(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipBackImage(mo) {
        mo.x = mo.x * -1;
        this.ctx.scale(-1, 1);
        this.ctx.restore();
    }


    coinCounter() {
        let coinsArray = this.level.rewards.filter(reward => reward instanceof Coin);
        this.allCoinsInLevel = coinsArray.length * 10;
        if (!this.allCoinsInLevel) {
            this.coinCounter();
        }
        // console.log(this.allCoinsInLevel);
    }

    bottleCounter() {
        let bottleArray = this.level.rewards.filter(reward => reward instanceof Bottle);
        this.allBottlesInLevel = bottleArray.length * 10;
        // console.log(this.allBottlesInLevel);
    }
}