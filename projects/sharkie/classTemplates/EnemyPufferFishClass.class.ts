"use strict";
class EnemyPufferFish extends EnemyClass {
   constructor() {
      super("EnemyPufferFish");
      this.setAllImagesInArray([
         //"img/2.Enemy/1PufferFish/1.Swim/3.swim1.png",
         //"img/2.Enemy/1PufferFish/1.Swim/3.swim2.png",
         //"img/2.Enemy/1PufferFish/1.Swim/3.swim3.png",
         //"img/2.Enemy/1PufferFish/1.Swim/3.swim4.png",
         //"img/2.Enemy/1PufferFish/1.Swim/3.swim5.png",

         "img/2.Enemy/1PufferFish/2.transition/2.transition1.png",
         "img/2.Enemy/1PufferFish/2.transition/2.transition2.png",
         "img/2.Enemy/1PufferFish/2.transition/2.transition3.png",
         "img/2.Enemy/1PufferFish/2.transition/2.transition4.png",
         "img/2.Enemy/1PufferFish/2.transition/2.transition5.png",
      ]);

      this.loadAllImgInCach(this.arrayAllImages);
      this.loadImageIsDeadOrNot(this.loadDeadImages);
      this.width = 100;
      this.height = 80;
      this.x = Math.random() * (10000 - 500) + 500;
      this.y = Math.random() * (300 - 50) + 50;
      this.setColissionPointsObject(0, 0, 25, 10);
      this.name = "EnemyPufferFish";
   }

   loadDeadImages = ["img/2.Enemy/1PufferFish/4.DIE/2.png"];


}
