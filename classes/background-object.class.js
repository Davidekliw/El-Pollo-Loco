/**
 * Represents a background object in the game.
 * Extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {

    /** @param {number} width - The width of the background object. */
    width = 720;

    /** @param {number} height - The hight of the background object. */
    height = 480;

    /**
     * create an instance of BackgroundObject
     * @param {string} imagePath - The path to the background object.
     * @param {number} x - The x-position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}