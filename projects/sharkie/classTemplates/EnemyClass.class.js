"use strict";
class EnemyClass extends MovableClass {
    constructor(name) {
        super("Enemy");
    }
    setAllImagesInArray(array) {
        return (this.arrayAllImages = array);
    }
    loadImageIsDeadOrNot(loadDeadImages) {
        setInterval(() => {
            !this.isDead ? this.autoMoveLeft(Math.random() * 6) : this.getDeadAnimation(loadDeadImages);
            this.loadOneImgFromCach();
        }, 50);
    }
    getDeadAnimation(loadDeadImages) {
        this.x += 20;
        this.y -= 20;
        this.loadAllImgInCach(loadDeadImages);
    }
}
