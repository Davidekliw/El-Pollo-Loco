class StatusBar extends DrawableObject {

    x = 10;
    height = 40;
    width = 130;
    // currentBottleLoad = 0;
    // currentCoinLoad = 0;
    currentLoad = 0;

    IMG_STATUSBARCOINS = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    IMG_STATUSBARBOTTLES = [
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    IMG_STATUSBARHEALTH = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMG_STATUSBARBOSS = [
        '../img/7_statusbars/2_statusbar_endboss/green/green0.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green20.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green40.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green60.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green80.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]


    constructor(percentage, link, initialY = -10) {
        super();
        // this.loadImages(this.IMG_STATUSBARHEALTH);
        // this.loadImages(this.IMG_STATUSBARBOTTLES);
        // this.loadImages(this.IMG_STATUSBARCOINS);
        // if (link === 'IMG_STATUSBARBOTTLES') {
        //     console.log('das geht aber');
        //     this.loadImages(this.IMG_STATUSBARBOTTLES);
        // }
        if (link === 'IMG_STATUSBARHEALTH') this.loadImages(this.IMG_STATUSBARHEALTH);
        if (link === 'IMG_STATUSBARBOTTLES') this.loadImages(this.IMG_STATUSBARBOTTLES);
        if (link === 'IMG_STATUSBARCOINS') this.loadImages(this.IMG_STATUSBARCOINS);
        if (link === 'IMG_STATUSBARBOSS') {
            this.loadImages(this.IMG_STATUSBARBOSS);
            this.height = 60;
            this.width = 170;
            // console.log(link);
            // console.log(this.y);
            this.x = 540;
            // console.log(this.x);
        }
        // console.log(this.y);
        this.y = initialY;
        // console.log(this.y);
        // this.percentage = percentage;
        // this.link = link;
        this.setPercentage(percentage, link);
        // console.log(world.Character.speed);

    }

}