"use strict";
class EnemyJellyFishLila extends EnemyClass {
   constructor() {
      super("EnemyJellyFishLila");
      this.setAllImagesInArray([
         "img/2.Enemy/2JellyFish/RegularDamage/Lila1.png",
         "img/2.Enemy/2JellyFish/RegularDamage/Lila2.png",
         "img/2.Enemy/2JellyFish/RegularDamage/Lila3.png",
         "img/2.Enemy/2JellyFish/RegularDamage/Lila4.png",
      ]);
      this.loadAllImgInCach(this.arrayAllImages);
      this.loadImageAndAutoMove();
      this.width = 80;
      this.height = 150;
      this.x = Math.random() * (10000 - 500) + 500;
      this.y = Math.random() * 150;
      setInterval(() => this.lightUpAndDownAnimation(), 80);
      this.setColissionPointsObject(15, 10, 25, 35);
      this.name = "EnemyJellyFishLila";
      this.loadImageIsDeadOrNot(this.loadDeadImages);
   }

   timer = 0;
   stopUp = false;
   stopDown = false;
   speedUpAndDown = 8;

   loadDeadImages = [
      "img/2.Enemy/2JellyFish/Dead/Lila/L1.png",
      "img/2.Enemy/2JellyFish/Dead/Lila/L2.png",
      "img/2.Enemy/2JellyFish/Dead/Lila/L3.png",
      "img/2.Enemy/2JellyFish/Dead/Lila/L4.png",
   ];

   loadImageAndAutoMove() {
      setInterval(() => {
         this.loadOneImgFromCach();
         this.autoMoveLeft(Math.random() * 6);
      }, 120);
   }

   lightUpAndDownAnimation() {
      if (!this.stopUp) {
         this.getUp();
      } else if (!this.stopDown) {
         this.getDown();
      } else {
         this.stopUp = false;
         this.stopDown = false;
      }
   }

   getUp() {
      this.y += this.speedUpAndDown;
      this.timer++;
      if (this.timer == 20) {
         this.stopUp = true;
      }
   }

   getDown() {
      this.y -= this.speedUpAndDown;
      this.timer--;
      if (this.timer == 0) {
         this.stopDown = true;
      }
   }
}
