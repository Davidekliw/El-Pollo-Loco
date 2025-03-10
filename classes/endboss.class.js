class Endboss extends MovableObject {

    x = 3000;
    y = 100;
    width = 250;
    height = 350;
    collidingFramex = 10;
    collidingFramey = 50;
    collidingFrameWidth = 240;
    collidingFrameHight = 340;
    makeDamage = 15;
    live = 100;
    speed = 30.5;
    startBossInt;
    getAHit = false;
    bossSound = loadSound('./audio/bossSound.mp3');
    deadBossSound = loadSound('./audio/deadBoss.mp3');
    attackBossSound = loadSound('./audio/bossAttack.mp3');


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


    constructor() {
        super();
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

    bossShowStatusBar() {
        this.world.bossBar = new StatusBar(100, "IMG_STATUSBARBOSS", 45);
        // console.log('starte statusbar');
    }


    // isEnoughLive() {
    //     if (this.live > 0) {
    //         return true;
    //     } else {
    //         this.live <= 0;
    //         return false;
    //     }
    // }


    getDamage(damage, index) {
        this.getAHit = true;
        // console.log(damage);
        this.world.level.enemies[index].live -= damage;
        this.world.bossBar.setPercentage(this.world.level.enemies[index].live, "IMG_STATUSBARBOSS")
        if (!this.isEnoughLive()) {
            // console.log(`Nr: ${index} ist TOT.(${world.level.enemies[index].live} Leben)`);
            // console.log(index);
            playSound(this.deadBossSound);
            let deatInt = setInterval(() => {
                this.playPictureAnimation(this.IMG_DEAD);
            }, 200);
            setTimeout(() => {
                world.level.enemies.splice(index, 1);
                window.clearInterval(deatInt);
                window.clearInterval(this.chickenInt);
                // console.log(`Nummer ${this.chickenInt} wurde eliminiert`);
                this.world.character.gameover("win");
            }, 2000);
        } else {
            playSound(this.chickenHitSound);
            let hurtInt = setInterval(() => {
                this.playPictureAnimation(this.IMG_HURT);
                // console.log(this.world.bossBar.currentLoad);
                // console.log(`Nr: ${index} hat noch ${world.level.enemies[index].live} Leben`);
            }, 200);

            setTimeout(() => {
                window.clearInterval(hurtInt);
                this.getAHit = false;
                this.loadImage(this.IMG_WALKING[1]);
                this.startBossAttack();
                console.log('los gehts');
            }, 680);
        }
    }

    initEndFight() {
        this.world.character.fixPosition = true;
        this.world.character.min_XPosition = 2150;
        this.world.camera_XMin = -2150;
        // console.log('es ist soweit');
        // console.log(this.world.level.max_XPosition - canvas.width);
        if (this.world.bottleBar.currentLoad <= 20) {
            this.spawnBottle(2450, 320)
        }
        this.bossShowStatusBar();
        this.moveToLeft();
    }


    startAlert() {
        let alertInt = setInterval(() => {
            this.playPictureAnimation(this.IMG_ALERT);
        }, 200);
        setTimeout(() => {
            window.clearInterval(alertInt);
            this.startBossAttack();
        }, 1500);
    }

    // Animationenen beenden wenn es einen treffer gegeben hat


    moveToLeft() {
        let moveLeftInt = setInterval(() => {
            // console.log(`${this.x} < ${this.world.level.max_XPosition - this.width}`);
            // console.log(this.world.level.max_XPosition - this.width);
            // console.log(this.x);
            // 2620
            // console.log(this.x < (this.world.level.max_XPosition));
            if (this.x + this.width < this.world.level.level_end_x) {
                window.clearInterval(moveLeftInt)
                pauseSound(this.bossSound);
                this.startAlert();
                // this.loadImage(this.IMG_WALKING[1]);
            }
            else {
                playSound(this.bossSound);
                this.moveLeft();
                this.playPictureAnimation(this.IMG_WALKING);
            }
        }, 200);
        window.clearInterval(this.startBossInt);
    }

    spawnBottle(x, y) {
        let bottle = new Bottle(x, y);
        this.world.level.rewards.push(bottle);
        // console.log("das ging");
        // console.log(this.world.level.rewards);


    }

    moveBack() {
        let moveBackInt = setInterval(() => {
            if (this.x > this.world.level.level_end_x) {
                window.clearInterval(moveBackInt);
                this.loadImage(this.IMG_WALKING[1]);
                this.otherDirection = false;
                this.spawnBottle(2650, 320);
                setTimeout(() => {
                    this.moveToLeft();
                }, 1500);
            }
            else if (this.getAHit) {
                window.clearInterval(moveBackInt);
                this.otherDirection = false;
                this.spawnBottle(2650, 320);
                this.playPictureAnimation(this.IMG_ATTACK);
            }
            else {
                this.otherDirection = true;
                this.moveRight();
                this.playPictureAnimation(this.IMG_WALKING);
            }
        }, 200);
        window.clearInterval(this.startBossInt);
    }


    startBossAttack() {
        playSound(this.attackBossSound);
        let attackInt = setInterval(() => {
            if (this.x >= 2300) {
                this.playPictureAnimation(this.IMG_ATTACK);
                this.moveLeft();
                // console.log(this.x);
            }
            else {
                // setTimeout(() => {
                    window.clearInterval(attackInt);
                    // this.loadImage(this.IMG_WALKING[1]);
                    setTimeout(() => {
                        this.moveBack();
                        // console.log(this.x);
                    }, 1000)
                // }, 1500);
            }
        }, 100);
    }

    // in der Bottel klasse muss noch ein standardspawnpunkt hinterlegt werden.
    // Instruktionen/ Regeln fürs Spiel auf dem Startbildschirm anzeigen
    // Spawnpunkt für eine Flasche generieren.
    // animation für angriff optimieren 
    // Start Bildschirm anlegen
    // Endbildschirm für erneuten start bzw. nach einer gewissen zeit automatisch auf den start screen weiterleiten

    // Handyoptimierung



    animate() {
        let coinsNeedToFinishLevelInt = setInterval(() => {
            // console.log(this.world.coinBar.currentLoad, this.world.allCoinsInLevel);
            if (this.world.coinBar.currentLoad >= rewardsNeededToGetEndboss - 1) {
                console.log(`${this.world.coinBar.currentLoad} >= ${rewardsNeededToGetEndboss}`);
                console.log(this.world.allCoinsInLevel);

                // console.log("jetzt könnte man das level abschließen");
                clearInterval(coinsNeedToFinishLevelInt);
                this.startBossInt = setInterval(() => {
                    // if (this.world) {
                    // console.log(this.world.camera_x);
                    // console.log(this.world.character.x);
                    // console.log(this.world.character.min_XPosition = 2150);
                    // console.log(this.world.coinBar.currentLoad);
                    // animation starten. und camra_x einfrieren das sich bildschirm und character nicht mehr nach links bewegen lassen


                    if (this.world.character.x >= 2200) {
                        this.initEndFight();
                    }


                }, 200);
            }
        }, 1000);
    }
}