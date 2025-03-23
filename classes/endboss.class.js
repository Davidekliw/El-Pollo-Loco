class Endboss extends MovableObject {

    x = 3000;
    y = 100;
    width = 250;
    height = 350;
    collidingFramex = 40;
    collidingFramey = 60;
    collidingFrameWidth = 230;
    collidingFrameHight = 330;
    makeDamage = 15;
    live;
    isDeath = false;
    speed = 30.5;
    startBossInt;
    getAHit = false;
    timeOutIntv;

    IMG_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    IMG_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMG_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


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

    bossShowStatusBar() {
        this.world.bossBar = new StatusBar(100, "IMG_STATUSBARBOSS", 45);
    }

    getDamage(damage, index) {
        this.getAHit = true;
        this.otherDirection = false;
        this.world.level.enemies[index].live -= damage;
        this.world.bossBar.setPercentage(this.world.level.enemies[index].live, "IMG_STATUSBARBOSS")
        window.clearInterval(this.currentIntv);
        window.clearTimeout(this.timeOutIntv);
        if (!this.isEnoughLive()) {
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
        } else {
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
    }

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


    startAlert() {
        this.currentIntv = setInterval(() => {
            this.playPictureAnimation(this.IMG_ALERT);
        }, 200);
        this.timeOutIntv = setTimeout(() => {
            window.clearInterval(this.currentIntv);
            this.startBossAttack();
        }, 1500);
    }


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

    spawnBottle(x, y) {
        let bottle = new Bottle(x, y);
        this.world.level.rewards.push(bottle);
    }

    moveBack() {
        this.currentIntv = setInterval(() => {
            if (this.x > this.world.level.level_end_x) {
                window.clearInterval(this.currentIntv);
                this.loadImage(this.IMG_WALKING[1]);
                this.otherDirection = false;
                this.spawnBottle(this.world.level.level_end_x - 150, 320);
                this.timeOutIntv = setTimeout(() => {
                    this.moveToLeft();
                }, 1500);
            }
            else if (this.getAHit) {
                window.clearInterval(this.currentIntv);
                this.otherDirection = false;
                this.spawnBottle(this.level_end_x - 150, 320);
            }
            else {
                this.otherDirection = true;
                this.moveRight();
                this.playPictureAnimation(this.IMG_WALKING);
            }
        }, 200);
    }


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