class MovableClass extends BaseClass {
   constructor(name: string) {
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

   autoMoveLeft(speedObject: number) {
      this.x -= speedObject;
   }

   moveLeft(speedObject: number) {
      this.x -= speedObject;
   }

   moveRight(speedObject: number) {
      this.x += speedObject;
   }

   moveDown(speedObject: number) {
      this.y += speedObject;
   }
   moveUp(speedObject: number) {
      this.y -= speedObject;
   }

   checkLimitPositionXandY(movableObject: any, maxTopY: number, maxBottemY: number) {
      if (movableObject.y < maxTopY) {
         movableObject.y = maxTopY;
      } else if (movableObject.y > maxBottemY) {
         movableObject.y = maxBottemY;
      } else {
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
