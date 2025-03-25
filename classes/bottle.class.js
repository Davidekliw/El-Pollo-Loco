class Bottle extends Reward {

    /**
     * @static
     * @param {number} value - thats the value that one Bottel have
     */
    static value = 20;

    /**
     * @static
     * @param {number} makeDamage - When a bottle is used for throwing, this is the value of the damage it causes
     */
    static makeDamage = 20;

    /**
     * position in x and y
     * @param {number} x - is the default x koordinate
     * @param {number} y - is the default y koordinate
     */
    x = 200;
    y = 10;

    /**
     * default with and height of the element.
     * @param {number} width - is the default width
     * @param {number} height - is the default height
     */
    width = 60;
    height = 80;

    /**
     * is used to limit the contact area
     * @param {number} collidingFramex- is the default colliding x koordinate
     * @param {number} collidingFramey- is the default colliding y koordinate
     * @param {number} collidingFrameHight- is the default colliding width koordinate
     * @param {number} collidingFrameWidth- is the default colliding height koordinate
     */
    collidingFramex = 15;
    collidingFramey = 15;
    collidingFrameWidth = 45;
    collidingFrameHight = 70;

    /**
     * @param {number} value - is used to set the value on the same value as the static
     */
    value = Bottle.value;

    /**
     * A Array with the Picturepath´s for Bottles.
     * @type {string[]}
     */
    IMG_BOTTLE = [
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * A Array with the Picturepath´s for splash Bottles.
     * @type {string[]}
     */
    IMG_BOTTLE_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    /**
     * create an instance of Bottle that can be collect as a reward or throw as a atack to kill a enemy
     * @param {number} x - spawnposition on x 
     * @param {number} y - spwanposition on y
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMG_BOTTLE[0]);
        this.loadImages(this.IMG_BOTTLE);
        this.loadImages(this.IMG_BOTTLE_SPLASH);
        this.x = x !== undefined ? x : this.generateSpawnPointX(0, 1800);
        this.y = y !== undefined ? y : this.generateSpawnPointY(10, 350);
    }
}