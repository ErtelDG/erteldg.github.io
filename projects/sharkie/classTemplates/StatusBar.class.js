"use strict";
class StatusBar extends BaseClass {
    constructor(statusBarFor = "life" || "coin" || "bubble" || "finalFish") {
        super("StatusBar");
        this.name = statusBarFor;
        this.width = 80;
        this.height = 80;
        this.setCorrectImageForStatusBarInAllArray(this.name);
        this.loadAllImgInCach(this.arrayAllImages);
        this.loadImagStatusbarForFinalFish();
    }
    counterFinalFish = 5;
    loadImagStatusbarForFinalFish() {
        setInterval(() => (this.name != "finalFish" ? this.loadOneImgFromCach() : (this.imgPath.src = this.imagesCach[this.counterFinalFish])), 500);
    }
    setCorrectImageForStatusBarInAllArray(whichStatusBar) {
        if (whichStatusBar == "life") {
            this.setDataLifeBar();
        }
        else if (whichStatusBar == "coin") {
            this.setDataCoinBar();
        }
        else if (whichStatusBar == "bubble") {
            this.setDataBubbleBar();
        }
        else if (whichStatusBar == "finalFish") {
            this.setDataFinalFishBar();
        }
        else {
        }
    }
    setDataFinalFishBar() {
        this.arrayAllImages = [];
        this.arrayAllImages = this.imgStatusFinalFish;
        this.y = -10;
        this.x = 750;
        this.width = 200;
    }
    setDataBubbleBar() {
        this.arrayAllImages = this.imgStatusBarBubble;
        this.x = 350;
    }
    setDataCoinBar() {
        this.arrayAllImages = this.imgStatusBarCoin;
        this.x = 180;
        this.y = 5;
    }
    setDataLifeBar() {
        this.arrayAllImages = this.imgStatusBarLife;
        this.x = 10;
        this.y = -3;
    }
    imgStatusBarLife = ["img/4.Marcadores/green/100_copia_hp.png"];
    imgStatusBarCoin = ["img/4.Marcadores/green/100_copia_coin.png"];
    imgStatusBarBubble = ["img/4.Marcadores/green/100_copia_poisoned_bubble.png"];
    imgStatusFinalFish = [
        "img/4.Marcadores/green/FinalFish/0_copia.png",
        "img/4.Marcadores/green/FinalFish/20_copia.png",
        "img/4.Marcadores/green/FinalFish/40_copia.png",
        "img/4.Marcadores/green/FinalFish/60_copia.png",
        "img/4.Marcadores/green/FinalFish/80_copia.png",
        "img/4.Marcadores/green/FinalFish/100_copia.png",
    ];
}
