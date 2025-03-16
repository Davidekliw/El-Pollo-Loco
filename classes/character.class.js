class Character extends MovableObject {

    x = 50;
    min_XPosition = -50;
    max_XPosition = 2750;
    fixPosition = false;
    y = 130;
    width = 140;
    height = 300;
    collidingFramex = 20;
    collidingFramey = 115;
    collidingFrameWidth = 120;
    collidingFrameHight = 285;
    live = 100;
    currentOnJump = false;
    isDeath = false;
    characterInterval = null;
    jumpInterval = null;
    gravityInterval = null;
    timeSinceLastAction = performance.now();


    IMG_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMG_LONGIDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    IMG_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMG_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMG_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMG_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    speed = this.speed * 80;

    constructor() {
        super();
        // console.log(this);

        this.loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMG_IDLE);
        this.loadImages(this.IMG_LONGIDLE);
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_JUMPING);
        this.loadImages(this.IMG_HURT);
        this.loadImages(this.IMG_DEAD);
        // this.animate();
        this.animationTimer = null;
        this.currentAnimation = "";
        this.animateCharacter();
        this.applyGravity();
    }

    // isEnoughLive() {
    //     if (this.live > 0) {
    //         return true;
    //     } else {
    //         this.live <= 0;
    //         return false;
    //     }
    // }

    getDamage(damage) {
        // console.log(this.world.character.live);
        // console.log(damage);

        this.live -= damage;
        if (this.isEnoughLive()) {
            this.playPictureAnimation(this.IMG_HURT);
        } else {
            this.isDeath = true;
            // console.log(this.isEnoughLive());

            this.jump();
            // this.playPictureAnimation(this.IMG_DEAD);
        }
    }

    moveCamera() {
        // console.log(this.world.camera_x + 100 <= this.max_XPosition - canvas.width);
        // console.log(`${this.world.camera_x + this.collidingFrameWidth} <= ${-this.max_XPosition - -canvas.width}`);
        // console.log(`${this.x - 220} <= ${this.max_XPosition - canvas.width}`);
        // if (this.x - 220 <= this.max_XPosition - canvas.width) {
        // console.log(`${this.x} >= ${this.world.camera_XMin} && ${this.x} < ${this.world.camera_XMax}`);
        // console.log(`${this.x >= this.world.camera_XMin} && ${this.x < this.world.camera_XMax}`);

        if (this.world.camera_x > this.world.camera_XMax) {
            this.world.camera_x = -this.x + 100;
            // console.log(this.world.camera_x);   
        }
        else if (this.world.camera_x < this.world.camera_XMax && this.otherDirection) {
            // console.log(`${-this.x} < ${this.world.camera_XMax}`);
            if (-this.x <= this.world.camera_XMax - 100) {
                // this.world.camera_x = -this.x + 100;
                // this.world.camera_x = this.world.camera_x + 100;
                // console.log('zweig 1');
            }
            else if (!this.fixPosition) {
                this.world.camera_x = -this.x + 100;
                // console.log(this.fixPosition);

                // console.log('zweig 2');
            }
        }
    }


    // walking_sound = new Audio('./audio/walking.mp3');
    // walking_sound = new Audi('./audio/stepsOnSand.mp3');
    // walking_sound = new Audio('./audio/stepsshorter.mp3');
    walking_sound = loadSound('./audio/stepsshorter.mp3');
    jump_sound = loadSound('./audio/jump.mp3');


    animateCharacter() {
        setInterval(() => {
            // console.log(soundEnabled);
            pauseSound(this.walking_sound);
            // this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.max_XPosition) {
                this.moveRight();
                this.otherDirection = false;
                playSound(this.walking_sound);
            }

            if (this.world.keyboard.LEFT && !this.isDeath && this.x > this.min_XPosition) {
                this.moveLeft();
                this.otherDirection = true;
                playSound(this.walking_sound);
            }

            this.moveCamera();
            // console.log(this.isAboveGround());

            // }, 1000 / 60);

            // this.jumpInterval = setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                playSound(this.jump_sound);
                this.jump();
            }
            // }, 1000 / 60);
            // console.log(this.isAboveGround()); // Testen, was zurückgegeben wird
            // const self = this;

            // const updateAnimation = () => {
            if (!this.isEnoughLive()) {
                if (this.currentAnimation !== "DEAD") {
                    this.currentAnimation = "DEAD";
                    clearInterval(this.animationTimer);
                    this.animationTimer = setInterval(() => {
                        this.playPictureAnimation(this.IMG_DEAD);
                        if (this.y > 500) {
                            this.gameover("lose");
                        }
                    }, 300);
                }
                return;
            }
            else if (this.isAboveGround() && !this.isDeath) {
                if (this.currentAnimation !== "JUMPING") {
                    this.currentAnimation = "JUMPING";
                    clearInterval(this.animationTimer);
                    this.animationTimer = setInterval(() => {
                        this.playPictureAnimation(this.IMG_JUMPING);
                        this.timeSinceLastAction = performance.now();
                        // console.log('sprung');
                    }, 150);
                }
            }
            else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isDeath) {
                if (this.currentAnimation !== "WALKING") {
                    this.currentAnimation = "WALKING";
                    clearInterval(this.animationTimer);
                    this.animationTimer = setInterval(() => {
                        this.playPictureAnimation(this.IMG_WALKING);
                        this.timeSinceLastAction = performance.now();
                        // console.log('laufen');
                    }, 100);
                }
            }
            else if (this.isUnderGround() && this.isTimeForLongIdle(this.timeSinceLastAction) && !this.isDeath) {
                if (this.currentAnimation !== "LONGIDLE") {
                    this.currentAnimation = "LONGIDLE";
                    clearInterval(this.animationTimer);
                    this.animationTimer = setInterval(() => {
                        this.playPictureAnimation(this.IMG_LONGIDLE);
                        // console.log('Long Idle');
                    }, 500);
                }
            }
            else if (this.isUnderGround() && !this.isDeath) {
                if (this.currentAnimation !== "IDLE") {
                    this.currentAnimation = "IDLE";
                    clearInterval(this.animationTimer);
                    this.animationTimer = setInterval(() => {
                        this.playPictureAnimation(this.IMG_IDLE);
                        // console.log('Idle');
                    }, 300);
                }
            }

            // requestAnimationFrame(updateAnimation);
            // };

            // updateAnimation();
        }, 1000 / 60);
    }


    // animate() {
    //     setInterval(() => {
    //         this.walking_sound.pause();
    //         if (this.world.keyboard.RIGHT && this.x < this.max_XPosition) {
    //             this.moveRight();
    //             this.otherDirection = false;
    //             this.walking_sound.play();
    //         }

    //         if (this.world.keyboard.LEFT && this.x > -50) {
    //             this.moveLeft();
    //             this.otherDirection = true;
    //             this.walking_sound.play();
    //         }
    //         this.world.camera_x = -this.x + 100;
    //     }, 1000 / 60);

    //     this.characterInterval = setInterval(() => {
    //         if (!this.isEnoughLive() && this.y > 500) {
    //             this.playPictureAnimation(this.IMG_DEAD);
    //             this.gameover();
    //             console.log('Spielende');
    //         }
    //         else if (this.isAboveGround() && this.isEnoughLive()) {
    //             this.playPictureAnimation(this.IMG_JUMPING);
    //             this.timeSinceLastAction = performance.now();
    //             console.log('sprung');
    //         }
    //         else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
    //             this.playPictureAnimation(this.IMG_WALKING);
    //             this.timeSinceLastAction = performance.now();
    //             console.log('laufen');
    //         }
    //         else if (this.isUnderGround() && this.isTimeForLongIdle(this.timeSinceLastAction)) {
    //             // this.currentOnJump = false;
    //             this.playPictureAnimation(this.IMG_LONGIDLE);
    //             console.log('Long Idle');
    //         }
    //         else if (this.isUnderGround() && !this.isTimeForLongIdle(this.timeSinceLastAction)) {
    //             // this.currentOnJump = false;
    //             this.playPictureAnimation(this.IMG_IDLE);
    //             console.log('Idle');
    //         }
    //     }, 200);
    //     console.log(this.characterInterval);


    //     this.jumpInterval = setInterval(() => {
    //         if (this.world.keyboard.SPACE && !this.isAboveGround()) {
    //             this.jump();
    //         }
    //     }, 1000 / 60);
    // }

    gameover(gameoverReason) {
        // console.log(this.character);
        // console.log(this.jumpInterval);
        // console.log(this.gravityInterval);
        // console.log('ende');
        // this.playPictureAnimation(this.IMG_DEAD);
        // console.log(this.y);

        // if (this.y > 500) {
        // console.log(this.y);
        // window.clearInterval(this.characterInterval);
        // world.character = null;
        // console.log('ende: interval gelöscht');
        // console.log(this.jumpInterval);
        // window.clearInterval(this.jumpInterval);
        // console.log(this.gravityInterval);
        // console.log(this.y);
        // window.clearInterval(this.gravityInterval);
        world.clearAllIntervals();
        console.log(this.x, this.y);
        console.log(gameoverReason);
        if (gameoverReason === "lose") {
            world.gameover = new GameOver(world.camera_x);
        }
        else if (gameoverReason === "win") {
            world.gameover = new GameWin(world.camera_x);
        }
        // }
    };

    //     animate() {
    //         this.characterInterval = setInterval(() => {
    //             if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
    //                 this.walking_sound.pause();
    //                 if (this.world.keyboard.RIGHT && this.x < this.max_XPosition) {
    //                     this.moveRight();
    //                     this.otherDirection = false;
    //                     this.walking_sound.play();
    //                 }

    //                 if (this.world.keyboard.LEFT && this.x > -50) {
    //                     this.moveLeft();
    //                     this.otherDirection = true;
    //                     this.walking_sound.play();
    //                 }
    //                 this.world.camera_x = -this.x + 100;
    //                 this.playPictureAnimation(this.IMG_WALKING);
    //                 this.timeSinceLastAction = Date.now();
    //                 console.log('laufen');
    //             }
    //             else if (this.world.keyboard.SPACE && !this.isAboveGround()) {
    //                 this.jump();
    //                 this.playPictureAnimation(this.IMG_JUMPING);
    //                 this.timeSinceLastAction = Date.now();
    //                 console.log('sprung');
    //             }
    //             else if (!this.isEnoughLive() && this.y > 500) {
    //                 this.gameover();
    //                 console.log('Spielende');
    //             }
    //             else {
    //                 this.currentOnJump = false;
    //                 this.playPictureAnimation(this.IMG_IDLE);
    //                 console.log('Idle');
    //             }
    //         }, 1000 / 10);
    //         console.log(this.characterInterval);
    //     }
    // }
}