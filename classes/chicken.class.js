class Chicken extends MovableObject {

    /**
     * position in x and y
     * @param {number} y - is the default x koordinate
     */
    y = 350;

    /**
     * default with and height of the element.
     * @param {number} width - is the default width
     * @param {number} height - is the default height
     */
    width = 90;
    height = 80;

    /**
     * is used to limit the contact area
     * @param {number} collidingFramex- is the default colliding x koordinate
     * @param {number} collidingFramey- is the default colliding y koordinate
     * @param {number} collidingFrameHight- is the default colliding width koordinate
     * @param {number} collidingFrameWidth- is the default colliding height koordinate
     */
    collidingFramex = 5;
    collidingFramey = 5;
    collidingFrameWidth = 85;
    collidingFrameHight = 75;

    /**
    * is used to limit the contact area
    * @param {number} minXDistance - is the smallest x koordinate that the caracter can walk
    */
    minXDistance = 600;

    /**
     * @param {number} - set the damage that the enemy make to other. exampl. character.
     */
    makeDamage = 2;

    /**
     *
     * @param {number} - is used to set the live Points of the chicken.
     */
    live = 21;

    /**
     * @param {boolean} - is used to set true if the caracter is Death.
     */
    isDeath = false;

    /**
     * @param {boolean} - is used to set true if the caracter is above a enemy.
     */
    hitIsInProgress = false;
    
    /**
     * @param {number} chickenInt - Number of the current interval for one chicken
     * @param {number} moveLeftInt - Number of the current interval for one chicken is moving left.
     */
    chickenInt;
    moveLeftInt;

    /**
     * A Array with the Picturepath´s for normal chicken.
     * @type {string[]}
     */
    IMG_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * A Array with the Picturepath´s for death normal chicken.
     * @type {string[]}
     */
    IMG_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * 
     * @param {numnber} levelSpeed - a number that is used to calculate the enemy speed.
     */
    constructor(levelSpeed) {
        super();
        this.loadImage(this.IMG_WALKING[0]);
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_DEAD);
        this.x = this.generateSpawnPointX(600, 2200);
        this.speed = this.speed + Math.random() * levelSpeed;
        this.animate();
    }

    /**
     * is used to start the animation interval for the chicken. and check the min position.
     */
    animate() {
        this.moveLeftInt = setInterval(() => {
            if (this.x < - 50) {
                window.clearInterval(this.moveLeftInt);
            }
            this.moveLeft();
        }, 1000 / 60);

        this.chickenInt = setInterval(() => {
            this.playPictureAnimation(this.IMG_WALKING);
            if (this.x < -50) {
                let index = world.level.enemies.findIndex(enemy => enemy.chickenInt === this.chickenInt)
                world.level.enemies.splice(index, 1);
                window.clearInterval(this.chickenInt);
            }
        }, 300);
    }
}
