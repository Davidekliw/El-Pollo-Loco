class Reward extends MovableObject {

    // xx = null;
    minXDistance = 140;

    constructor(objectToGetCollect) {
        super();
        if (objectToGetCollect === 'bottle') return new Bottle();
        if (objectToGetCollect === 'coin') return new Coin();
    }

    // evtl muss man noch darüber nachdenken das man einen mindestabstand als 3. wert mitgibt das die gegenstände nich zu oft hintereinander bzw. zu viele auf einer stelle kommen.

    // generateSpawnPointX(minXCoordinate, maxXCoordinate) {
    //     // console.log(this.xx);
    //     let generateXCoordinate = Math.random() * 5000 + this.minXDistance;
    //     // console.log(generateXCoordinate);
    //     if (generateXCoordinate < maxXCoordinate && generateXCoordinate > minXCoordinate) {
    //         // this.xx = generateXCoordinate;
    //         // console.log("no pattern match");
    //         // console.log(this.xx);
            
    //         // console.log(generateXCoordinate);
    //         return generateXCoordinate;
    //     }
    //     else {
    //         return this.generateSpawnPointX(minXCoordinate, maxXCoordinate);
    //     }
    // }


    // generateSpawnPointY(minYCoordinate, maxYCoordinate) {
    //     let generateYCoordinate = 0 + Math.random() * 500;
    //     // console.log(generateYCoordinate);
    //     if (generateYCoordinate < maxYCoordinate && generateYCoordinate > minYCoordinate) {
    //         // console.log(generateYCoordinate);
    //         return generateYCoordinate;
    //     }
    //     else {
    //         return this.generateSpawnPointY(minYCoordinate, maxYCoordinate);
    //     }
    // }

}