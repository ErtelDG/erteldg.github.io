"use strict";
class MovableClass extends BaseClass {
    constructor(name) {
        super("MovableClass");
        this.name = name;
        this.width = 100;
        this.height = 50;
        this.x = 10;
        this.y = 10;
    }
    sounds = new AudioSounds();
    speedStandard = 10;
    energy = 5;
    lastHit = 0;
    checkHit = true;
    hasHurt = false;
    hasHurtElectric = false;
    isDead = false;
    isAttack = false;
    autoMoveLeft(speedObject) {
        this.x -= speedObject;
    }
    moveLeft(speedObject) {
        this.x -= speedObject;
    }
    moveRight(speedObject) {
        this.x += speedObject;
    }
    moveDown(speedObject) {
        this.y += speedObject;
    }
    moveUp(speedObject) {
        this.y -= speedObject;
    }
    checkLimitPositionXandY(movableObject, maxTopY, maxBottemY) {
        if (movableObject.y < maxTopY) {
            movableObject.y = maxTopY;
        }
        else if (movableObject.y > maxBottemY) {
            movableObject.y = maxBottemY;
        }
        else {
            false;
        }
    }
    hit() {
        this.energy -= 1;
        this.energy <= 0 ? (this.energy = 0) : (this.lastHit = new Date().getTime());
    }
    checkIsDead() {
        setInterval(() => {
            this.energy <= 0 ? (this.isDead = true) : false;
        }, 50);
    }
    isHurt() {
        let timepassed = (new Date().getTime() - this.lastHit) / 1000;
        return timepassed < 1;
    }
}
