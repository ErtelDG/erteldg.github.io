"use strict";
class GameWorld {
    ctx = ctx;
    audioSounds = new AudioSounds();
    level;
    sharkie;
    bubble = [];
    enemyFinalFishExists = false;
    background_sound_On_Off = true;
    constructor() {
        this.ctx.font = "48px MyWebFont";
        this.ctx.fillStyle = "white";
        this.level = level1;
        this.sharkie = [new Sharkie()];
        this.gameplay();
        this.fireBubble(this.sharkie);
        this.createFinalFish();
        this.playGameSound();
    }
    async gameplay() {
        //  setInterval(() => {
        if (this.ctx != null) {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.checkPositionMovableobjectIsInTheCorrectRange(this.sharkie, -50, 200);
            this.drawStaticObject(this.level.backgrounds);
            this.drawStaticObject(this.level.coins);
            this.drawStaticObject(this.bubble);
            this.drawStaticObject(this.level.statusBar);
            this.drawText(this.level.statusBarValue);
            keyboard.LEFT ? this.drawMirrowObjectToCanvas(this.sharkie) : this.drawMovableObject(this.sharkie);
            this.ctx.restore();
            keyboard.LEFT ? this.moveBackgroundToLeft() : keyboard.RIGHT ? this.moveBackgroundToRight() : false;
            this.drawMovableObject(this.level.enemies);
            this.drawRotateStaticObject(this.level.bubbleBottles);
            this.checkCollisionPickObjects(this.sharkie, this.level.coins);
            this.checkCollisionEnemies(this.sharkie, this.level.enemies);
            this.checkCollisionPickTransformObjects(this.sharkie, this.level.bubbleBottles);
            this.bubbleCollisionWithEnemies(this.bubble, this.level.enemies);
        }
        //  }, 1000 / 30);
        this.requestAnimation();
    }
    requestAnimation() {
        let self = this;
        requestAnimationFrame(function () {
            self.gameplay();
        });
    }
    moveBackgroundToLeft() {
        if (this.level.backgrounds[0].x < 0) {
            this.level.backgrounds.forEach((background) => (background.x += 10));
            this.level.enemies.forEach((enemy) => (enemy.x += 10));
            this.level.coins.forEach((coin) => (coin.x += 10));
            this.level.bubbleBottles.forEach((bottle) => (bottle.randomTranslate += 10));
            this.bubble.forEach((bubble) => (bubble.x += 10));
        }
    }
    moveBackgroundToRight() {
        if (this.level.backgrounds[this.level.backgrounds.length - 1].x > 250) {
            this.level.backgrounds.forEach((background) => (background.x -= 10));
            this.level.enemies.forEach((enemy) => (enemy.x -= 10));
            this.level.coins.forEach((coin) => (coin.x -= 10));
            this.level.bubbleBottles.forEach((bottle) => (bottle.randomTranslate -= 10));
            this.bubble.forEach((bubble) => (bubble.x -= 10));
        }
    }
    checkPositionMovableobjectIsInTheCorrectRange(movableObjectsInArray, maxTopY, maxBottemY) {
        movableObjectsInArray.forEach((currentMovableObject) => currentMovableObject.checkLimitPositionXandY(currentMovableObject, maxTopY, maxBottemY));
    }
    drawMirrowObjectToCanvas(objectsToDraw) {
        objectsToDraw.forEach((objectX) => {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(objectX.imgPath, objectX.x * -1, objectX.y, objectX.width * -1, objectX.height);
            this.ctx.restore();
        });
    }
    loadImage() {
        this.level.background[0].loadOneImgFromCach(this.level.background[0].imageCach);
    }
    drawStaticObject(objectToDraw) {
        objectToDraw.forEach((objectElement) => this.ctx.drawImage(objectElement.imgPath, objectElement.x, objectElement.y, objectElement.width, objectElement.height));
    }
    drawRotateStaticObject(objectToDraw) {
        let counterForSetImgToLeftRight = 0;
        objectToDraw.forEach((objectElement) => {
            let value = counterForSetImgToLeftRight % 2 ? true : false;
            objectElement.y = value ? (objectElement.y = -45) : false;
            objectElement.x = value ? objectElement.x : (objectElement.x = -45);
            let rotate = value ? 45 : 315;
            counterForSetImgToLeftRight++;
            this.drawTheRotateStaticObject(objectElement, rotate);
        });
    }
    drawTheRotateStaticObject(objectElement, rotate) {
        this.ctx.save();
        this.ctx.translate(objectElement.randomTranslate, 300);
        this.ctx.rotate((rotate * Math.PI) / 180);
        this.ctx.drawImage(objectElement.imgPath, objectElement.x, objectElement.y, objectElement.width, objectElement.height);
        // this.drawRectangle(ctx, objectElement.x + 10, objectElement.y + 10, objectElement.width - 20, objectElement.height - 20);
        this.ctx.restore();
    }
    drawText(objectToDraw) {
        objectToDraw.forEach((objectElement) => {
            if (objectElement.name != "finalFish") {
                this.ctx.fillText(objectElement.currentCounterForThisObject, objectElement.x, objectElement.y);
            }
        });
    }
    drawMovableObject(movableObjectArray) {
        movableObjectArray.forEach((movableObject) => {
            try {
                this.ctx.drawImage(movableObject.imgPath, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
            }
            catch (e) {
                console.warn("Error loading Image", e);
                console.warn("Could not load", movableObject.imgPath);
            }
        });
    }
    checkCollisionPickObjects(sharkieArray, objectArray) {
        sharkieArray.forEach((sharkie) => {
            objectArray.forEach((object) => {
                if (this.collisionBreakepointsObjectWithEnemy(sharkie, object)) {
                    this.collisionWithCoinOrBubbleBottle(objectArray, object);
                }
            });
        });
    }
    collisionWithCoinOrBubbleBottle(objectArray, object) {
        objectArray.splice(objectArray.indexOf(object), 1);
        this.level.statusBar.forEach((checkStatusBar) => {
            if (checkStatusBar.name == "coin") {
                this.addCoinCounter();
            }
            if (checkStatusBar.name == "bubble")
                () => this.level.statusBarValue[2].counterCoin++;
        });
    }
    addCoinCounter() {
        this.level.statusBarValue[1].counterCoin++;
        this.audioSounds.pickCoinSound.volume = 0.1;
        this.audioSounds.pickCoinSound.play();
    }
    checkCollisionEnemies(sharkieArray, objectArray) {
        sharkieArray.forEach((sharkie) => {
            objectArray.forEach((object) => {
                if (keyboard.D && !sharkie.isAttack && !sharkie.hasHurt && !sharkie.hasHurtElectric) {
                    if (this.collisionBreakepointsSharkieObjectsFinSlap(sharkie, object)) {
                        sharkie.isAttack = true;
                        this.finSlapPufferFish(object)
                            ? this.removeEnemy(object, objectArray)
                            : this.finSlapJellyFish(object)
                                ? this.sharkieAttackJellyFish(sharkie)
                                : this.reduceFinalFishLifeValue(object);
                        this.audioSounds.punshSound.play();
                        this.resetSharkiesAttackValues(sharkie);
                    }
                }
                else if (this.collisionBreakepointsObjectWithEnemy(sharkie, object)) {
                    if (sharkie.checkHit == true) {
                        this.checkStatusBarValues(sharkie);
                        this.sharkieHasWhichHurt(object, sharkie);
                    }
                    if (sharkie.isDead == true)
                        () => (sharkie.checkHit = false);
                }
            });
        });
    }
    finSlapJellyFish(object) {
        return object.name != "EnemyFinalFish" && object.name == "EnemyJellyFishLila";
    }
    finSlapPufferFish(object) {
        return object.name != "EnemyFinalFish" && object.name == "EnemyPufferFish";
    }
    reduceFinalFishLifeValue(object) {
        object.energy--;
        this.level.statusBar[3].counterFinalFish--;
        console.log(object.energy);
    }
    resetSharkiesAttackValues(sharkie) {
        sharkie.checkHit = false;
        setTimeout(() => {
            !sharkie.isDead ? (sharkie.checkHit = true) : false;
            sharkie.hasHurt = false;
            sharkie.hasHurtElectric = false;
            sharkie.isAttack = false;
        }, 250);
    }
    sharkieAttackJellyFish(sharkie) {
        sharkie.hasHurtElectric = true;
        sharkie.checkHit = false;
        this.audioSounds.electricShock.play();
        setTimeout(() => {
            if (sharkie.isDead != true)
                () => (sharkie.checkHit = true);
            sharkie.hasHurt = false;
            sharkie.hasHurtElectric = false;
        }, 2000);
    }
    removeEnemy(object, objectArray) {
        object.isDead = true;
        setTimeout(() => {
            objectArray.splice(objectArray.indexOf(object), 1);
        }, 2500);
    }
    sharkieHasWhichHurt(object, sharkie) {
        if (object.name == "EnemyPufferFish") {
            this.sharkieHasNormalHurt(sharkie);
        }
        else if (object.name == "EnemyJellyFishLila") {
            this.sharkieHasElectricHurt(sharkie);
        }
        else {
            sharkie.hasHurt = true;
        }
        sharkie.checkHit = false;
        sharkie.hit();
        this.resetSharkiesHurt(sharkie);
    }
    checkStatusBarValues(sharkie) {
        this.level.statusBar.forEach((checkStatusBar) => {
            this.reduceSharkieLife(checkStatusBar);
            this.checkSharkieIsDead(checkStatusBar, sharkie);
        });
    }
    resetSharkiesHurt(sharkie) {
        setTimeout(() => {
            sharkie.isDead != true ? (sharkie.checkHit = true) : false;
            sharkie.hasHurt = false;
            sharkie.hasHurtElectric = false;
        }, 2000);
    }
    sharkieHasElectricHurt(sharkie) {
        sharkie.hasHurtElectric = true;
        this.audioSounds.electricShock.play();
    }
    sharkieHasNormalHurt(sharkie) {
        sharkie.hasHurt = true;
        this.audioSounds.damageSound.volume = 0.6;
        this.audioSounds.damageSound.play();
    }
    reduceSharkieLife(checkStatusBar) {
        if (checkStatusBar.name == "life") {
            this.level.statusBarValue[0].counterLife--;
        }
    }
    checkSharkieIsDead(checkStatusBar, sharkie) {
        if (checkStatusBar.name == "life" && this.level.statusBarValue[0].counterLife == 0) {
            sharkie.isDead = true;
            this.audioSounds.sharkieDeathSound.play();
        }
    }
    checkCollisionPickTransformObjects(sharkieArray, objectArray) {
        sharkieArray.forEach((sharkie) => {
            objectArray.forEach((object) => {
                if (this.collisionValuesSharkieTransformObjects(sharkie, object)) {
                    object.randomTranslate = -1000;
                    this.level.statusBar.forEach((checkStatusBar) => {
                        if (checkStatusBar.name == "bubble") {
                            this.pickBubbleBottle();
                        }
                    });
                }
            });
        });
    }
    pickBubbleBottle() {
        this.level.statusBarValue[2].counterBubble++;
        this.audioSounds.blobSound.play();
    }
    collisionValuesSharkieTransformObjects(sharkie, object) {
        return (sharkie.collisionPointX_LEFT < object.randomTranslate + 70 &&
            sharkie.collisionPointX_LEFT + sharkie.collisionPointX_RIGHT > object.randomTranslate - 20 &&
            sharkie.collisionPointY_TOP + sharkie.collisionPointY_BOTTOM > object.height + 205);
    }
    fireBubble(sharkieArray) {
        sharkieArray.forEach((sharkie) => {
            setInterval(() => {
                sharkie.fireBubble = true;
                this.sharkieCanFirePoisonedBubble(sharkie) ? this.createFireBubble(sharkie) : (sharkie.fireBubble = false);
            }, 500);
        });
    }
    createFireBubble(sharkie) {
        setTimeout(() => keyboard.SPACE && sharkie.fireBubble
            ? this.createCurrentWhiteFireBubble(sharkie)
            : keyboard.F && sharkie.fireBubble == true
                ? this.createCurrentPoisonedFireBubble(sharkie)
                : (sharkie.fireBubble = false), 120);
    }
    sharkieCanFirePoisonedBubble(sharkie) {
        return (keyboard.SPACE || (keyboard.F && this.level.statusBarValue[2].counterBubble > 0)) && sharkie.fireBubble;
    }
    createCurrentPoisonedFireBubble(sharkie) {
        this.bubble.push(new PoisonedBubble("PoisonedBubble", sharkie.x + sharkie.width / 1.3, sharkie.y + 100));
        this.level.statusBarValue[2].counterBubble--;
        sharkie.fireBubble = false;
        setTimeout(() => (sharkie.fireBubble = true), 500);
    }
    createCurrentWhiteFireBubble(sharkie) {
        this.bubble.push(new Bubble("Bubble", sharkie.x + sharkie.width / 1.3, sharkie.y + 100));
        sharkie.fireBubble = false;
        setTimeout(() => (sharkie.fireBubble = true), 500);
    }
    bubbleCollisionWithEnemies(bubbles, enemies) {
        setInterval(() => {
            bubbles.forEach((bubble) => enemies.forEach((enemy) => {
                if (this.collisionBreakepointsObjectWithEnemy(bubble, enemy) == true) {
                    if (enemy.name == "EnemyJellyFishLila") {
                        this.removeEnemyJellyFish(enemy, bubbles, bubble);
                    }
                    else if ((enemy.name == "EnemyPufferFish" || enemy.name == "EnemyFinalFish") && bubble.name == "BubbleClass") {
                        this.removeCurrentFireBubble(bubbles, bubble);
                    }
                    else if (enemy.name == "EnemyPufferFish" && bubble.name == "PoisonedBubble") {
                        this.removeCurrentFireBubble(bubbles, bubble);
                    }
                    else if (bubble.name == "PoisonedBubble") {
                        this.collisionPoisonedBubbleWithEnemy(enemy, bubbles, bubble);
                    }
                }
            }));
        }, 200);
    }
    removeCurrentFireBubble(bubbles, bubble) {
        bubbles.splice(bubbles.indexOf(bubble), 1);
        this.audioSounds.blobJellyFish.play();
    }
    removeEnemyJellyFish(enemy, bubbles, bubble) {
        enemy.isDead = true;
        this.audioSounds.blobJellyFish.play();
        bubbles.splice(bubbles.indexOf(bubble), 1);
    }
    collisionPoisonedBubbleWithEnemy(enemy, bubbles, bubble) {
        if (enemy.name == "PUFFERFISH") {
            bubbles.splice(bubbles.indexOf(bubble), 1);
            this.audioSounds.blobJellyFish.play();
        }
        else if (enemy.name == "EnemyFinalFish") {
            this.audioSounds.blobJellyFish.play();
            this.audioSounds.ouchSound.play();
            enemy.energy -= 1;
            this.level.statusBar[3].counterFinalFish--;
            this.finalFishIsDeadOrHasHurt(enemy);
            bubbles.splice(bubbles.indexOf(bubble), 1);
        }
    }
    finalFishIsDeadOrHasHurt(enemy) {
        if (enemy.energy <= 0) {
            enemy.isDead = true;
            this.audioSounds.gameSound.pause();
        }
        else {
            enemy.hasHurt = true;
            setTimeout(() => {
                enemy.hasHurt = false;
            }, 1000);
        }
    }
    createFinalFish() {
        setInterval(() => {
            if (this.level.backgrounds[this.level.backgrounds.length * 0.8].x <= 0 && this.enemyFinalFishExists == false) {
                //this.level.backgrounds[this.level.backgrounds.length * 0.8].x
                this.enemyFinalFishExists = true;
                this.level.pushANewEnemy(new EnemyFinalFish());
                this.level.statusBar.push(new StatusBar("finalFish"));
                this.level.statusBarValue.push(new StatusBarValue("finalFish"));
            }
        }, 100);
    }
    playGameSound() {
        this.audioSounds.gameSound.play();
        setInterval(() => {
            if (this.background_sound_On_Off) {
                if (!this.sharkie[0].isDead) {
                    this.audioSounds.gameSound.play();
                }
            }
        }, 20000);
        setInterval(() => {
            if (this.sharkie[0].isDead) {
                this.audioSounds.gameSound.pause();
            }
        }, 1000);
    }
    collisionBreakepointsObjectWithEnemy(object, enemy) {
        return (object.collisionPointX_LEFT < enemy.collisionPointX_LEFT + enemy.collisionPointX_RIGHT &&
            object.collisionPointX_LEFT + object.collisionPointX_RIGHT > enemy.collisionPointX_LEFT &&
            object.collisionPointY_TOP + object.collisionPointY_BOTTOM > enemy.collisionPointY_TOP &&
            object.collisionPointY_TOP < enemy.collisionPointY_TOP + enemy.collisionPointY_BOTTOM);
    }
    collisionBreakepointsSharkieObjectsFinSlap(sharkie, object) {
        return (sharkie.collisionPointX_LEFT + 150 < object.collisionPointX_LEFT + object.collisionPointX_RIGHT &&
            sharkie.collisionPointX_LEFT + 150 + sharkie.collisionPointX_RIGHT - 130 > object.collisionPointX_LEFT &&
            sharkie.collisionPointY_TOP + sharkie.collisionPointY_BOTTOM > object.collisionPointY_TOP &&
            sharkie.collisionPointY_TOP < object.collisionPointY_TOP + object.collisionPointY_BOTTOM);
    }
}
