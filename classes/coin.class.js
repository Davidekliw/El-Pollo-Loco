class Coin extends Reward {

    x = 200;
    y = 10;
    width = 140;
    height = 140;
    collidingFramex = 45;
    collidingFramey = 45;
    collidingFrameWidth = 95;
    collidingFrameHight = 95;
    value = 10;


    IMG_COIN = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMG_COIN[0]);
        this.loadImages(this.IMG_COIN);
        this.x = this.x + this.generateSpawnPointX(0, 1800);
        this.y = this.y + this.generateSpawnPointY(20, 300);
        // console.log(this.x);
        // console.log(this.y);
    }
}