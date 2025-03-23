class Bottle extends Reward {

    static value = 20;
    static makeDamage = 20;
    x = 200;
    y = 10;
    width = 60;
    height = 80;
    collidingFramex = 15;
    collidingFramey = 15;
    collidingFrameWidth = 45;
    collidingFrameHight = 70;
    value = Bottle.value;


    IMG_BOTTLE = [
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    IMG_BOTTLE_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super();
        this.loadImage(this.IMG_BOTTLE[0]);
        this.loadImages(this.IMG_BOTTLE);
        this.loadImages(this.IMG_BOTTLE_SPLASH);
        this.x = x !== undefined ? x : this.generateSpawnPointX(0, 1800);
        this.y = y !== undefined ? y : this.generateSpawnPointY(10, 350);
    }
}