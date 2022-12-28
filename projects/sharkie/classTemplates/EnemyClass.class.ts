class EnemyClass extends MovableClass {
   constructor(name: string) {
      super("Enemy");
   }

   setAllImagesInArray(array: string[]) {
      return (this.arrayAllImages = array);
   }

   loadImageIsDeadOrNot(loadDeadImages: string[]) {
      setInterval(() => {
         !this.isDead ? this.autoMoveLeft(Math.random() * 6) : this.getDeadAnimation(loadDeadImages);
         this.loadOneImgFromCach();
      }, 50);
   }

   getDeadAnimation(loadDeadImages: string[]) {
      this.x += 20;
      this.y -= 20;
      this.loadAllImgInCach(loadDeadImages);
   }
}
