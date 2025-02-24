class Bottle extends Reward {

    static value = 20;
    static makeDamage = 20;
    x = 200;
    y = 10;
    width = 60;
    height = 80;
    collidingFramex = 10;
    collidingFramey = 10;
    collidingFrameWidth = 50;
    collidingFrameHight = 70;
    value = Bottle.value;


    IMG_BOTTLE = [
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMG_BOTTLE[0]);
        this.loadImages(this.IMG_BOTTLE);
        this.x = x !== undefined ? x : this.generateSpawnPointX(0, 1800);
        this.y = y !== undefined ? y : this.generateSpawnPointY(10, 350);
        // console.log(this.x);
        // console.log(this.y);
    }
}