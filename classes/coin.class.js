class Coin extends Reward {

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
    width = 140;
    height = 140;

    /**
    * is used to limit the contact area
    * @param {number} collidingFramex- is the default colliding x koordinate
    * @param {number} collidingFramey- is the default colliding y koordinate
    * @param {number} collidingFrameWidth- is the default colliding height koordinate
    * @param {number} collidingFrameHight- is the default colliding width koordinate
    */
    collidingFramex = 50;
    collidingFramey = 50;
    collidingFrameWidth = 90;
    collidingFrameHight = 90;


    /**
    * @param {number} value - thats the value that one Bottel have
    */
    value = 10;

    /**
    * A Array with the Picturepath´s for character is on idle.
    * @type {string[]}
    */
    IMG_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    /**
     * load Pictures and generate the x and y spawnpoints
     */
    constructor() {
        super();
        this.loadImage(this.IMG_COIN[0]);
        this.loadImages(this.IMG_COIN);
        this.x = this.x + this.generateSpawnPointX(0, 1800);
        this.y = this.y + this.generateSpawnPointY(20, 300);
    }
}