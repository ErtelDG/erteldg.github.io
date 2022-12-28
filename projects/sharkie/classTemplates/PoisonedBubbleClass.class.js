"use strict";
class PoisonedBubble extends BaseClass {
    constructor(name, x, y) {
        super("PoisonedBubble");
        this.arrayAllImages = ["img/1.Sharkie/4.Attack/Bubble_Trap/PoisonedBubble.png"];
        this.width = 60;
        this.height = 60;
        this.x = x;
        this.y = y;
        this.loadAllImgInCach(this.arrayAllImages);
        this.animation(100);
        this.setColissionPointsObject(0, 0, 0, 0);
        this.moveBubble();
    }
    moveBubble() {
        setInterval(() => {
            this.x += 10;
        }, 50);
    }
}
