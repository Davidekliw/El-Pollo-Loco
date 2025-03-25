class DrawableObject {


    /**
    * @param {number} x - is the default x koordinate
    * @param {number} y - is the default y koordinate
    * @param {number} width - is the default width
    * @param {number} height - is the default height
    * @param {string} img - the current loaded image object
    * @param {Object} imageCache - the object array which includes the picture instances
    * @param {number} currentImage - the counter of the current loaded imagepath
    */
    x = 0;
    y = 0;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;

    /**
    * the function is used to draw a object to the canvas
    * @param {Object} ctx - the used canvas element
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * is used to create a picture instances to the loaded path 
    * @param {string} path -  the source path to a image
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * is used to create a picture instance for all the paths in the array and push them to the cache
     * @param {Array} arr - Array with source path for images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * is used to draw a blue frame around the object to show the outline limits of the object 
    * @param {Object} ctx - the used canvas element
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            ctx.beginPath();
        }
    }

    /**
    * is used to draw a green frame around the object to show the collision area of the object 
    * @param {Object} ctx - the used canvas element
    */
    drawCollidingFrame(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x + this.collidingFramex, this.y + this.collidingFramey, this.collidingFrameWidth - this.collidingFramex, this.collidingFrameHight - this.collidingFramey);
            ctx.stroke();
            ctx.beginPath();
        }
    }

    /**
    * is used to draw a yellow dot on top left corner of the object to show the top left corner of the object 
    * @param {Object} ctx - the used canvas element
    */
    drawDotTopLeft(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ThrowableObject || this instanceof Reward || this instanceof Endboss) {
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'yellow';
            ctx.stroke();
            ctx.beginPath();
        }
    }

    /**
    * is used to draw coordinates of the object. is used to develop situations 
    * @param {Object} ctx - the used canvas element
    */
    drawText(ctx) {
        if (this instanceof Character) {
            ctx.font = "18px Arial";
            ctx.fillStyle = "black";
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.fillText(this.world.camera_XMax, this.x + 70, this.y + 52);
            ctx.fillText(this.world.camera_x, this.x + 70, this.y + 65);
            ctx.fillText(this.world.camera_XMin, this.x + 70, this.y + 78);
            ctx.fillText(`x=${this.world.character.x}`, this.x + 70, this.y + 90);
            ctx.stroke();
            ctx.beginPath();
        }
    }

    /**
    * is used to draw a red dot on top right corner and coordinates of the object
    * @param {Object} ctx - the used canvas element
    */
    drawDotTopRight(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.fillStyle = "red";
            ctx.rect(this.x + this.collidingFrameWidth, this.y + this.collidingFramey, 1, 1);
            ctx.fillText(`x=${this.x + this.collidingFrameWidth}`, this.x + this.collidingFrameWidth - 10, this.y + this.collidingFramey);
            ctx.fillText(`y=${this.y + this.collidingFramey}`, this.x + this.collidingFrameWidth, this.y + this.collidingFramey + 20);
            ctx.stroke();
            ctx.beginPath();
        }
    }

    /**
    * is used to draw a blue dot on bottom left corner and coordinates of the object
    * @param {Object} ctx - the used canvas element
    */
    drawDotBottomLeft(ctx) {
        if (this instanceof Reward || this instanceof Endboss) {
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.fillStyle = "blue";
            ctx.rect(this.x + this.collidingFramex, this.y + this.collidingFrameHight, 1, 1);
            ctx.fillText(`x=${this.x + this.collidingFramex}`, this.x + this.collidingFrameWidth - 10, this.y + this.collidingFramey - 10);
            ctx.fillText(`y=${this.y + this.collidingFrameHight}`, this.x + this.collidingFrameWidth + 10, this.y + this.collidingFramey + 10);
            ctx.stroke();
            ctx.beginPath();
        }
    }

    /**
    * is used to set the right picture stack
    * @param {number} percentage - value between 0 and 100
    * @param {string} link - the name of the used picture array 
    */
    setPercentage(percentage, link) {
        let path;
        if (link == "IMG_STATUSBARHEALTH") {
            path = this.IMG_STATUSBARHEALTH[this.getRightPicture(percentage)];
            this.img = this.imageCache[path];
        }
        if (link == "IMG_STATUSBARBOTTLES") {
            path = this.IMG_STATUSBARBOTTLES[this.getRightPicture(percentage)];
            this.img = this.imageCache[path];
        }
        if (link == "IMG_STATUSBARCOINS") {
            path = this.IMG_STATUSBARCOINS[this.getRightPicture(percentage)];
            this.img = this.imageCache[path];
        }
        if (link == "IMG_STATUSBARBOSS") {
            path = this.IMG_STATUSBARBOSS[this.getRightPicture(percentage)];
            this.img = this.imageCache[path];
        }
    }

    /**
    * is used to set the current value(condition) to the right range
    * @param {number} condition - a number between 0 and 100
    * @returns 
    */
    getRightPicture(condition) {
        if (condition >= 90) {
            return 5;
        } else if (condition >= 80) {
            return 4;
        } else if (condition >= 60) {
            return 3;
        } else if (condition >= 35) {
            return 2;
        } else if (condition > 0) {
            return 1;
        } else if (condition <= 0) {
            return 0;
        }
    }
}
