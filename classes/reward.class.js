class Reward extends MovableObject {

    minXDistance = 140;

    constructor(objectToGetCollect) {
        super();
        if (objectToGetCollect === 'bottle') return new Bottle();
        if (objectToGetCollect === 'coin') return new Coin();
    }
}