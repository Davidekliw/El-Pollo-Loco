class DrawableObject {

    x = 0;
    y = 0;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            ctx.beginPath();
        }
    }

    drawCollidingFrame(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x + this.collidingFramex, this.y + this.collidingFramey, this.collidingFrameWidth - this.collidingFramex, this.collidingFrameHight - this.collidingFramey);
            ctx.stroke();
            ctx.beginPath();
        }
    }

    drawDotTopLeft(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ThrowableObject || this instanceof Reward || this instanceof Endboss) {
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'yellow';
            ctx.stroke();
            ctx.beginPath();
        }
    }

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

    drawXLine(ctx) {
        if (this instanceof Character) {
            ctx.font = "18px Arial";
            ctx.fillStyle = "pink";
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(10, 10, 3, 3);
            ctx.moveTo(this.x - 100, 2)
            ctx.lineTo(this.x + 500, 2);
            ctx.fillText(this.x, this.x + 500, 20);
            ctx.moveTo(this.x - 50, 0)
            ctx.lineTo(0, 400);
            ctx.fillText(this.y, this.x, this.y);
            ctx.stroke();
            ctx.beginPath();
        }
    }

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
