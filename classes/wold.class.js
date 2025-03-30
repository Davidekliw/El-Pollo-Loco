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
    bossBar;
    throwableObjects = [];
    isAboveEnemy = false;
    allBottlesInLevel;
    allCoinsInLevel;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.startGameLoop();
        this.backgroundSoundLoop();
        setTimeout(() => {
            this.setWorld();
            this.coinCounter();
            this.bottleCounter();
        }, 1000);
    }

    /**
    * is used to start the Background music if the sound is set to on
    */
    backgroundSoundLoop() {
        if (soundEnabled && soundsLib['backgroundMusic'].paused) {
            playSound('backgroundMusic');
        }
        let backgroundMusicIntv = setInterval(() => {
            if (soundEnabled && soundsLib['backgroundMusic'].paused) {
                this.backgroundSoundLoop();
                window.clearInterval(backgroundMusicIntv);
            }
        }, 1000);
    }

    /**
    * is used to start the game loop animation
    */
    startGameLoop() {
        if (this.gameLoopInt) {
            cancelAnimationFrame(this.gameLoopInt);
        }
        const loop = () => {
            this.update();
            this.draw();
            this.gameLoopInt = requestAnimationFrame(loop);
        };
        this.gameLoopInt = requestAnimationFrame(loop);
    }

    /**
    * is used to clear all opened intervals 
    */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
    }

    /**
    * Sets the world reference for the character and the last enemy in the level.
    * This method ensures that both the character and the last enemy in the `level.enemies` array have access to the current world.
    */
    setWorld() {
        this.character.world = this;
        this.level.enemies[this.level.enemies.length - 1].world = this;
    }

    /**
    * is used to update other functions
    */
    update() {
        this.throwableObject();
        !this.character.isDeath && this.checkHitEnemyFromAbove();
        !this.character.isDeath && this.checkObjectCollisions();
    };


    /**
    * is used to throw a object
    */
    throwableObject() {
        if (this.keyboard.KEYD && world?.bottleBar?.currentLoad > 0 && !world?.character?.isDeath) {
            if (this.throwableObjects.length == 0) {
                world.character.timeSinceLastAction = performance.now();
                let bottle = new ThrowableObject(this.character.x + this.character.width / 2 - 40, this.character.y + this.character.collidingFramey)
                this.throwableObjects.push(bottle);
            }
        }
    }

    checkHitEnemyFromAbove() {
        this.level.enemies.forEach((obj, index) => {
            this.isAboveEnemy = this.character.characterIsAboveEnemy(obj);
            if (!obj.isDeath && this.isAboveEnemy || obj.hitIsInProgress) {
                obj.hitIsInProgress = true;
                if (!this.character?.isDeath && this.character.isColliding(obj)) {
                    obj.getDamage(obj.live, index);
                    obj.hitIsInProgress = false;
                }
                else if (!this.character.isAboveGround()) {
                    obj.hitIsInProgress = false;
                }
            }
            else if (!obj.hitIsInProgress && obj.live > 0 && !this.character?.isDeath && this.character.isColliding(obj)) {
                this.character.getDamage(obj.makeDamage);
                this.healthBar.setPercentage(this.character.live, "IMG_STATUSBARHEALTH");
            }
        });
    }

    checkObjectCollisions() {
        this.level.rewards.forEach((obj, index) => {
            if (this.character.isColliding(obj)) {
                if (this.level.rewards[index] instanceof Bottle) {
                    pauseSound('bottleSound');
                    playSound('bottleSound');
                    this.bottleBar.currentLoad = this.bottleBar.currentLoad + this.level.rewards[index].value
                    this.bottleBar.setPercentage(this.bottleBar.currentLoad, "IMG_STATUSBARBOTTLES");
                } else if (this.level.rewards[index] instanceof Coin) {
                    pauseSound('coinSound');
                    playSound('coinSound');
                    this.coinBar.currentLoad = this.coinBar.currentLoad + (1 / this.allCoinsInLevel) * 1000
                    this.coinBar.setPercentage(this.coinBar.currentLoad, "IMG_STATUSBARCOINS");
                } else {
                    console.error(index, 'ist nicht wie erwartet');
                }
                this.level.rewards.splice(index, 1);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjs);

        this.addObjectsToMap(this.level.enemies.filter(enemy => enemy.isDeath === false));

        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.throwableObjects);

        this.addObjectsToMap(this.level.rewards);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        if (this.bossBar instanceof StatusBar) {
            this.addToMap(this.bossBar);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        if (this.gameover instanceof GameOver || this.gameover instanceof GameWin) {
            this.addToMap(this.gameover);
        }
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
    * is used to load all Objects in the array
    * @param {Array} objects - Objects as a Array
    */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
    * is used to load the current Object and set the right direction
    * @param {Object} mo - the current Object
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipBackImage(mo);
        }
    }

    /**
    * is used to mirror the current Object
    * @param {Object} mo - the current Object
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * is used to mirror back the current Object
    * @param {Object} mo - the current Object
    */
    flipBackImage(mo) {
        mo.x = mo.x * -1;
        this.ctx.scale(-1, 1);
        this.ctx.restore();
    }

    /**
    * is used to calculate the result of all coins in the level
    */
    coinCounter() {
        let coinsArray = this.level.rewards.filter(reward => reward instanceof Coin);
        this.allCoinsInLevel = coinsArray.length * 10;
        if (!this.allCoinsInLevel) {
            this.coinCounter();
        }
    }

    /**
    * is used to calculate the result of all bottles in the level
    */
    bottleCounter() {
        let bottleArray = this.level.rewards.filter(reward => reward instanceof Bottle);
        this.allBottlesInLevel = bottleArray.length * 10;
    }
}