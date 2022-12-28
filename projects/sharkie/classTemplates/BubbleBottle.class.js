"use strict";
class BubbleBottle extends BaseClass {
    constructor(imgPath, x, y) {
        super("BubbleBottle");
        this.arrayAllImages = [
            "img/4.Marcadores/PosionedBubble/Animada/1.png",
            "img/4.Marcadores/PosionedBubble/Animada/2.png",
            "img/4.Marcadores/PosionedBubble/Animada/3.png",
            "img/4.Marcadores/PosionedBubble/Animada/4.png",
            "img/4.Marcadores/PosionedBubble/Animada/5.png",
            "img/4.Marcadores/PosionedBubble/Animada/6.png",
            "img/4.Marcadores/PosionedBubble/Animada/7.png",
            "img/4.Marcadores/PosionedBubble/Animada/8.png",
        ];
        this.randomTranslate = this.randomTranslate;
        this.width = 80;
        this.height = 100;
        this.x = 0;
        this.y = 0;
        this.loadAllImgInCach(this.arrayAllImages);
        setInterval(() => {
            this.loadOneImgFromCach();
        }, 100);
        this.setColissionPointsObject(0, 0, 10, 10);
    }
    randomTranslate = Math.random() * (9000 - 500) + 500; //Math.random() * (9000 - 500) + 500
}
