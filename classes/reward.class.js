class Reward extends MovableObject {

    /**
     * @param {number} minXDistance - the min Distance to the next Reward
     */
    minXDistance = 140;

    /**
     * 
     * @param {string} objectToGetCollect - the name of the reward
     */
    constructor(objectToGetCollect) {
        super();
        if (objectToGetCollect === 'bottle') return new Bottle();
        if (objectToGetCollect === 'coin') return new Coin();
    }
}