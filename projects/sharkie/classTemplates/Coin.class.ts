class Coin extends BaseClass {
   constructor() {
      super("CoinClass");
      this.arrayAllImages = [
         "img/4.Marcadores/1.Coins/1.png",
         "img/4.Marcadores/1.Coins/2.png",
         "img/4.Marcadores/1.Coins/3.png",
         "img/4.Marcadores/1.Coins/3.png",
      ];

      this.width = 50;
      this.height = 50;
      this.x = Math.random() * (6000 - 500) + 500;
      this.y = Math.random() * (200 - 100) + 100;
      this.loadAllImgInCach(this.arrayAllImages);
      this.animation(100);
      setInterval(() => {
         this.lightUpAndDownAnimation();
      }, 100);
      this.setColissionPointsObject(5, 5, 10, 10);
   }

   timer = 0;
   stopUp = false;
   stopDown = false;
   speedUpAndDown = Math.random() * 10;

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
