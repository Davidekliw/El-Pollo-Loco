class Character extends MovableObject {

    /**
    * position in x and y
    * @param {number} x - is the default x koordinate
    * @param {number} y - is the default y koordinate
    */
    x = 50;
    y = 130;

    /**
    * default width and height of the element.
    * @param {number} width - is the default width
    * @param {number} height - is the default height
    */
    width = 140;
    height = 300;

    /**
    * is used to limit the contact area
    * @param {number} collidingFramex- is the default colliding x koordinate
    * @param {number} collidingFramey- is the default colliding y koordinate
    * @param {number} collidingFrameWidth- is the default colliding height koordinate
    * @param {number} collidingFrameHight- is the default colliding width koordinate
    */
    collidingFramex = 30;
    collidingFramey = 125;
    collidingFrameWidth = 100;
    collidingFrameHight = 285;

    /**
    * is used to limit the contact area
    * @param {number} min_XPosition - is the smallest x koordinate that the caracter can walk
    * @param {number} max_XPosition - is the heighest x koordinate that the caracter can walk
    */
    min_XPosition = -50;
    max_XPosition = 2750;

    /**
    * @param {boolean} - is used to fix the characteron a range of the playground
    */
    fixPosition = false;

    /**
    * @param {number} - is used to set the walking speed of the character.
    */
    speed = this.speed * 80;

    /**
    * @param {number} - is used to set the live Points of the character.
    */
    live = 100;

    /**
    * @param {boolean} - is used to set the state on true for jumping or false.
    */
    currentOnJump = false;

    /**
    * @param {boolean} - is used to set true if the caracter is Death.
    */
    isDeath = false;

    /**
    * @param {number} - is used to save the current interval Number.
    */
    animationTimerIntvNbr = null;

    /**
    * @param {string} - is used to save the name of the current animation.
    */
    currentAnimation = "";

    /**
    * @param {number} - is used set a timestamp as ms. used to calculate the past time since last action.
    */
    timeSinceLastAction = performance.now();

    /**
    * A Array with the Picturepath´s for character is on idle.
    * @type {string[]}
    */
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

    /**
    * A Array with the Picturepath´s for character is on long idle.
    * @type {string[]}
    */
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

    /**
    * A Array with the Picturepath´s for character walking animation.
    * @type {string[]}
    */
    IMG_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
    * A Array with the Picturepath´s for character on jumping animation.
    * @type {string[]}
    */
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

    /**
    * A Array with the Picturepath´s for character get hurts animation.
    * @type {string[]}
    */
    IMG_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
    * A Array with the Picturepath´s for character is Death animation.
    * @type {string[]}
    */
    IMG_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
    * load pictures for the caracter. Start character animation. add gravity to character
    */
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


    /**
     * is used to substract the damage points from character live. start the hurt animation for the character. or set the death Variable to true
     * @param {number} damage - the hight of the damage Point
     */
    getDamage(damage) {
        this.live -= damage;
        if (this.isEnoughLive()) {
            this.playPictureAnimation(this.IMG_HURT);
        } else {
            this.isDeath = true;
            this.jump();
        }
    }

    /**
     * is used to set the camera position to the view area of the game. the camera follow tha character on moving or fix the position on endboss fight.
     */
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

    /**
     * functioin is used to generate a new instance of user viewscreen to signaize the game is on the end.
     * @param {string} gameoverReason - is lose or win
     */
    gameover(gameoverReason) {
        world.clearAllIntervals();
        if (gameoverReason === "lose") {
            world.gameover = new GameOver(world.camera_x);
        }
        else if (gameoverReason === "win") {
            world.gameover = new GameWin(world.camera_x);
        }
    };

    /**
    * is used to move the character to the right and play the walking sound
    */
    characterGoesToRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            playSound('characterWalking');
        }
    }

    /**
    * is used to move the character to the left and play the walking sound
    */
    characterGoesToLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            playSound('characterWalking');
        }
    }

    /**
    * character is Death Animation
    */
    characterIsDeadAnimation() {
        if (this.currentAnimation !== "DEAD") {
            this.currentAnimation = "DEAD";
            clearInterval(this.animationTimerIntvNbr);
            this.animationTimerIntvNbr = setInterval(() => {
                this.playPictureAnimation(this.IMG_DEAD);
                if (this.y > 500) {
                    this.gameover("lose");
                }
            }, 300);
        }
    }

    /**
    * character jumping Animation
    */
    characterDoesAJump() {
        if (this.currentAnimation !== "JUMPING") {
            playSound('characterJump');
            this.currentAnimation = "JUMPING";
            clearInterval(this.animationTimerIntvNbr);
            this.animationTimerIntvNbr = setInterval(() => {
                this.playPictureAnimation(this.IMG_JUMPING);
                this.timeSinceLastAction = performance.now();
            }, 100);
            setTimeout(() => {
                this.currentOnJump = false;
            }, 1000);
        }
    }

    /**
    * character walking Animation
    */
    characterIsOnWalking() {
        if (this.currentAnimation !== "WALKING" && !this.currentOnJump) {
            this.currentAnimation = "WALKING";
            clearInterval(this.animationTimerIntvNbr);
            this.animationTimerIntvNbr = setInterval(() => {
                this.playPictureAnimation(this.IMG_WALKING);
                this.timeSinceLastAction = performance.now();
            }, 120);
        }
    }

    /**
    * character LongIdle Animation
    */
    characterIsOnLongIdle() {
        if (this.currentAnimation !== "LONGIDLE") {
            this.currentAnimation = "LONGIDLE";
            clearInterval(this.animationTimerIntvNbr);
            this.animationTimerIntvNbr = setInterval(() => {
                this.playPictureAnimation(this.IMG_LONGIDLE);
            }, 350);
        }
    }

    /**
    * character is on Idle Animation
    */
    characterIsOnIdle() {
        if (this.currentAnimation !== "IDLE") {
            this.currentAnimation = "IDLE";
            clearInterval(this.animationTimerIntvNbr);
            this.animationTimerIntvNbr = setInterval(() => {
                this.playPictureAnimation(this.IMG_IDLE);
            }, 200);
        }
    }

    /**
    * is used to handle the character animations. like jump move left or right
    */
    animateCharacter() {
        setInterval(() => {
            this.moveCamera();
            if (!this.isEnoughLive()) {
                this.characterIsDeadAnimation();
            }
            else {
                if (keyboard.SPACE && !this.isAboveGround()) {
                    this.currentOnJump = true;
                    this.jump();
                    this.characterDoesAJump();
                }
                else if (keyboard.LEFT && this.x > this.min_XPosition) {
                    this.characterGoesToLeft();
                    this.characterIsOnWalking();
                    keyboard.RIGHT = false;
                }
                else if (keyboard.RIGHT && this.x < this.max_XPosition) {
                    this.characterGoesToRight();
                    this.characterIsOnWalking();
                    keyboard.LEFT = false;
                }
                else if (!keyboard.RIGHT && !keyboard.LEFT && this.isUnderGround() && this.isTimeForLongIdle(this.timeSinceLastAction)) {
                    this.characterIsOnLongIdle();
                }
                else if (!keyboard.RIGHT && !keyboard.LEFT && this.isUnderGround()) {
                    this.characterIsOnIdle();
                }
            }
        }, 1000 / 60);
    }
}