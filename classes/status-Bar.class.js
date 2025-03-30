class StatusBar extends DrawableObject {

    /**
    * position in x
    * @param {number} x - is the default x koordinate
    */
    x = 10;

    /**
    * default width and height of the element.
    * @param {number} width - is the default width
    * @param {number} height - is the default height
    */
    height = 40;
    width = 130;


    /**
     * @param {number} currentLoad - represent the default load for a status Bar 
     */
    currentLoad = 0;

    /**
    * A Array with the Picturepath´s for Coin Statusbar.
    * @type {string[]}
    */
    IMG_STATUSBARCOINS = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
    * A Array with the Picturepath´s for Bottle Statusbar.
    * @type {string[]}
    */
    IMG_STATUSBARBOTTLES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
    * A Array with the Picturepath´s for Character Health Statusbar.
    * @type {string[]}
    */
    IMG_STATUSBARHEALTH = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
    * A Array with the Picturepath´s for Endboss Health Statusbar.
    * @type {string[]}
    */
    IMG_STATUSBARBOSS = [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    /**
    * is used to generate the right Pictutres for the statusbar and initiate them.
    * @param {*} percentage - represent the current Load of the StatusBar
    * @param {*} link - represent the Name of the Statusbar Pictures
    * @param {*} initialY - represent the draw coordinate oon y axis
    */
    constructor(percentage, link, initialY = -10) {
        super();
        if (link === 'IMG_STATUSBARHEALTH') this.loadImages(this.IMG_STATUSBARHEALTH);
        if (link === 'IMG_STATUSBARBOTTLES') this.loadImages(this.IMG_STATUSBARBOTTLES);
        if (link === 'IMG_STATUSBARCOINS') this.loadImages(this.IMG_STATUSBARCOINS);
        if (link === 'IMG_STATUSBARBOSS') {
            this.loadImages(this.IMG_STATUSBARBOSS);
            this.height = 60;
            this.width = 170;
            this.x = 540;
        }
        this.y = initialY;
        this.setPercentage(percentage, link);
    }
}