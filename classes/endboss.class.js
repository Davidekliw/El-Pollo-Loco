class Endboss extends MovableObject {

    /**
    * position in x and y
    * @param {number} x - is the default x koordinate
    * @param {number} y - is the default y koordinate
    */
    x = 3000;
    y = 100;

    /**
    * default width and height of the element.
    * @param {number} width - is the default width
    * @param {number} height - is the default height
    */
    width = 250;
    height = 350;

    /**
    * is used to limit the contact area
    * @param {number} collidingFramex- is the default colliding x koordinate
    * @param {number} collidingFramey- is the default colliding y koordinate
    * @param {number} collidingFrameWidth- is the default colliding height koordinate
    * @param {number} collidingFrameHight- is the default colliding width koordinate
    */
    collidingFramex = 40;
    collidingFramey = 60;
    collidingFrameWidth = 230;
    collidingFrameHight = 330;


    /**
     * @param {number} makeDamage - the life points that the final boss can deduct from the attacker upon contact
     */
    makeDamage = 15;

    /**
    * @param {number} - is used to set the live Points of the Endboss. is set when instantiating
    */
    live;

    /**
    * @param {boolean} - is used to set true if the Endboss is Death.
    */
    isDeath = false;


    /**
     * @param {number} speed - the defelaut moving speed of the endboss
     */
    speed = 30.5;


    /**
     * is true if a hit on the endboss is in progress
     * @param {boolean} getAHit - true or false
     */
    getAHit = false;


    /**
     * is used to safe the interval number to stop them later
     * @param {int} timeOutIntv - interval numnber of the current timeout interval
     */
    timeOutIntv;

    /**
    * A Array with the Picturepath´s for endboss is walking.
    * @type {string[]}
    */
    IMG_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
    * A Array with the Picturepath´s for Endboss is on alert.
    * @type {string[]}
    */
    IMG_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
    * A Array with the Picturepath´s for Endboss is on attack.
    * @type {string[]}
    */
    IMG_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    /**
    * A Array with the Picturepath´s for Endboss is on Hurt.
    * @type {string[]}
    */
    IMG_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
    * A Array with the Picturepath´s for Endboss is death.
    * @type {string[]}
    */
    IMG_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
    * is used to create the endboss, set the live, load images and start animation 
    * @param {number} live - default is 40 or is passed along when instantiating
    */
    constructor(live = 40) {
        super();
        this.live = live;
        this.loadImage(this.IMG_WALKING[1]);
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_ALERT);
        this.loadImages(this.IMG_ATTACK);
        this.loadImages(this.IMG_HURT);
        this.loadImages(this.IMG_DEAD);
        setTimeout(() => {
            this.animate();
        }, 2000);
    }

    /**
     * is used to animate the Endboss to walk insite the playground
     */
    animate() {
        this.currentIntv = setInterval(() => {
            if (this.world.coinBar.currentLoad >= rewardsNeededToGetEndboss - 1) {
                window.clearInterval(this.currentIntv);
                this.currentIntv = setInterval(() => {
                    if (this.world.character.x >= 2200) {
                        window.clearInterval(this.currentIntv);
                        this.initEndFight();
                    }
                }, 200);
            }
        }, 1000);
    }

    /**
    * is used to show the livebar of the Endboss
    */
    bossShowStatusBar() {
        this.world.bossBar = new StatusBar(100, "IMG_STATUSBARBOSS", 45);
    }

    /**
    * is used to handle if the bos is down. Play death animation, Stop intervals and load the win screen
    * @param {number} index - index of the endboss.
    */
    bossIsDown(index) {
        pauseSound('bossSound');
        pauseSound('attackBossSound');
        playSound('deadBossSound');
        window.clearInterval(this.currentIntv);
        this.currentIntv = setInterval(() => {
            this.playPictureAnimation(this.IMG_DEAD);
        }, 200);
        setTimeout(() => {
            world.level.enemies.splice(index, 1);
            window.clearInterval(this.currentIntv);
            this.world.character.gameover("win");
        }, 2000);
    }

    /**
    * is used to handle if the boss get a hit. show hurting pictures, play sound and close intervals
    */
    bossGetAHit() {
        playSound('chickenHitSound');
        this.currentIntv = setInterval(() => {
            this.playPictureAnimation(this.IMG_HURT);
        }, 200);
        setTimeout(() => {
            window.clearInterval(this.currentIntv);
            this.getAHit = false;
            this.loadImage(this.IMG_WALKING[1]);
            pauseSound('chickenHitSound');
            this.startBossAttack();
        }, 680);
    }

    /**
    * is used to substract the damage points from Endboss live.
    * start the hurt or the death animation for the Endboss.
    * or set the death Variable to true 
    * @param {number} damage - the hight of the damage Points
    * @param {number} index - the index of the current enemy
    */
    getDamage(damage, index) {
        this.getAHit = true;
        this.otherDirection = false;
        this.world.level.enemies[index].live -= damage;
        this.world.bossBar.setPercentage(this.world.level.enemies[index].live, "IMG_STATUSBARBOSS")
        window.clearInterval(this.currentIntv);
        window.clearTimeout(this.timeOutIntv);
        if (!this.isEnoughLive()) {
            this.bossIsDown(index);
        } else {
            this.bossGetAHit();
        }
    }

    /**
    * is used to initate the Boss start animation.
    * and to spawn a bottle to collect.
    */
    initEndFight() {
        this.world.character.fixPosition = true;
        this.world.character.min_XPosition = 2150;
        this.world.camera_XMin = -2150;
        if (this.world.bottleBar.currentLoad <= 20) {
            this.spawnBottle(this.world.level.level_end_x - 450, 320)
        }
        this.bossShowStatusBar();
        this.moveToLeft();
    }

    /**
    * is used to start the Alert Animation for the Endboss after alert starts the atack animation
    */
    startAlert() {
        this.currentIntv = setInterval(() => {
            this.playPictureAnimation(this.IMG_ALERT);
        }, 200);
        this.timeOutIntv = setTimeout(() => {
            window.clearInterval(this.currentIntv);
            this.startBossAttack();
        }, 1500);
    }

    /**
    * is used to move the Endboss to the left site and start the atack animation on a special coordinate.
    */
    moveToLeft() {
        this.currentIntv = setInterval(() => {
            if (this.x + this.width < this.world.level.level_end_x) {
                window.clearInterval(this.currentIntv);
                pauseSound('bossSound');
                this.startAlert();
            }
            else {
                playSound('bossSound');
                this.moveLeft();
                this.playPictureAnimation(this.IMG_WALKING);
            }
        }, 200);
    }

    /**
    * is used to initiate a new bottel to collect and attac the Endboss
    * @param {number} x - Spawn coordinate in x
    * @param {number} y - Spawn coordinate in y
    */
    spawnBottle(x, y) {
        let bottle = new Bottle(x, y);
        this.world.level.rewards.push(bottle);
    }

    /**
    * is used to stop the move back Interval and start a move to left interval
    */
    stopMoveBackStartMoveLeft() {
        window.clearInterval(this.currentIntv);
        this.loadImage(this.IMG_WALKING[1]);
        this.otherDirection = false;
        this.spawnBottle(this.world.level.level_end_x - 150, 320);
        this.timeOutIntv = setTimeout(() => {
            this.moveToLeft();
        }, 1500);
    }

    /**
    * is used to move the Endboss back to the startpoint on right site of playground
    */
    moveBack() {
        this.currentIntv = setInterval(() => {
            if (this.x > this.world.level.level_end_x) {
                this.stopMoveBackStartMoveLeft();
            }
            else if (this.getAHit) {
                window.clearInterval(this.currentIntv);
                this.otherDirection = false;
                this.spawnBottle(this.world.level.level_end_x - 150, 320);
            }
            else {
                this.otherDirection = true;
                this.moveRight();
                this.playPictureAnimation(this.IMG_WALKING);
            }
        }, 200);
    }

    /**
    * is used to start the first Boss atack on the game.
    * the Boss goes to left site of the playground
    */
    startBossAttack() {
        playSound('attackBossSound');
        this.currentIntv = setInterval(() => {
            if (this.x >= 2300) {
                this.playPictureAnimation(this.IMG_ATTACK);
                this.moveLeft();
            }
            else {
                window.clearInterval(this.currentIntv);
                setTimeout(() => {
                    this.moveBack();
                }, 1000)
            }
        }, 100);
    }
}