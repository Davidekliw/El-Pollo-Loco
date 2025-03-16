class Character extends MovableObject {

    x = 50;
    y = 130;
    width = 140;
    height = 300;
    collidingFramex = 20;
    collidingFramey = 115;
    collidingFrameWidth = 120;
    collidingFrameHight = 285;
    min_XPosition = -50;
    max_XPosition = 2750;
    fixPosition = false;
    speed = this.speed * 80;
    live = 100;
    currentOnJump = false;
    isDeath = false;
    characterInterval = null;
    jumpInterval = null;
    gravityInterval = null;
    animationTimer = null;
    currentAnimation = "";
    timeSinceLastAction = performance.now();
    walking_sound = loadSound('./audio/stepsshorter.mp3');
    jump_sound = loadSound('./audio/jump.mp3');


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


    constructor() {
        super();
        this.loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMG_IDLE);
        this.loadImages(this.IMG_LONGIDLE);
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_JUMPING);
        this.loadImages(this.IMG_HURT);
        this.loadImages(this.IMG_DEAD);
        this.animateCharacter();
        this.applyGravity();
    }

    getDamage(damage) {
        this.live -= damage;
        if (this.isEnoughLive()) {
            this.playPictureAnimation(this.IMG_HURT);
        } else {
            this.isDeath = true;
            this.jump();
        }
    }

    moveCamera() {
        if (this.world.camera_x > this.world.camera_XMax) {
            this.world.camera_x = -this.x + 100;
        }
        else if (this.world.camera_x < this.world.camera_XMax && this.otherDirection) {
            if (-this.x <= this.world.camera_XMax - 100) {
            }
            else if (!this.fixPosition) {
                this.world.camera_x = -this.x + 100;
            }
        }
    }

    gameover(gameoverReason) {
        world.clearAllIntervals();
        if (gameoverReason === "lose") {
            world.gameover = new GameOver(world.camera_x);
        }
        else if (gameoverReason === "win") {
            world.gameover = new GameWin(world.camera_x);
        }
    };


    animateCharacter() {
        setInterval(() => {
            pauseSound(this.walking_sound);
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
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                playSound(this.jump_sound);
                this.jump();
            }
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
                    }, 110);
                }
            }
            else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isDeath) {
                if (this.currentAnimation !== "WALKING") {
                    this.currentAnimation = "WALKING";
                    clearInterval(this.animationTimer);
                    this.animationTimer = setInterval(() => {
                        this.playPictureAnimation(this.IMG_WALKING);
                        this.timeSinceLastAction = performance.now();
                    }, 100);
                }
            }
            else if (this.isUnderGround() && this.isTimeForLongIdle(this.timeSinceLastAction) && !this.isDeath) {
                if (this.currentAnimation !== "LONGIDLE") {
                    this.currentAnimation = "LONGIDLE";
                    clearInterval(this.animationTimer);
                    this.animationTimer = setInterval(() => {
                        this.playPictureAnimation(this.IMG_LONGIDLE);
                    }, 500);
                }
            }
            else if (this.isUnderGround() && !this.isDeath) {
                if (this.currentAnimation !== "IDLE") {
                    this.currentAnimation = "IDLE";
                    clearInterval(this.animationTimer);
                    this.animationTimer = setInterval(() => {
                        this.playPictureAnimation(this.IMG_IDLE);
                    }, 300);
                }
            }
        }, 1000 / 60);
    }
}