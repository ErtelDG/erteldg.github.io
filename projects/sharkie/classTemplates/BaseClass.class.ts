class BaseClass {
   constructor(name: string) {
      this.name = name;
   }
   name: string;
   imgPath = new Image();
   imagesCach: any = [];
   arrayAllImages: string[] = [];
   width = 0;
   height = 0;

   y = 0;
   x = 0;

   collisionPointY_TOP = 0;
   collisionPointX_LEFT = 0;
   collisionPointY_BOTTOM = 0;
   collisionPointX_RIGHT = 0;

   async loadAllImgInCach(array: string[]) {
      this.imagesCach = [];
      array.forEach(async (path: string) => {
         let pathURL = path;
         await this.imagesCach.push(pathURL);
      });
   }

   counterForLoadOneImgFromCachArray = 0;

   async loadOneImgFromCach() {
      let positionArray = this.counterForLoadOneImgFromCachArray % this.imagesCach.length;
      this.imgPath.src = await this.imagesCach[positionArray];
      this.counterForLoadOneImgFromCachArray++;
   }

   animation(time: number) {
      setInterval(() => {
         this.loadOneImgFromCach();
      }, time);
   }

   setColissionPointsObject(TOP: number, LEFT: number, BOTTOM: number, RIGHT: number) {
      setInterval(() => {
         this.updateColissionPointsObject(TOP, LEFT, BOTTOM, RIGHT);
      }, 1000 / 30);
   }

   updateColissionPointsObject(collisionPointY_TOP: number, collisionPointX_LEFT: number, collisionPointY_BOTTOM: number, collisionPointX_RIGHT: number) {
      this.collisionPointY_TOP = this.y + collisionPointY_TOP;
      this.collisionPointX_LEFT = this.x + collisionPointX_LEFT;
      this.collisionPointY_BOTTOM = this.height - collisionPointY_BOTTOM;
      this.collisionPointX_RIGHT = this.width - collisionPointX_RIGHT;
   }

   stopAllIntervals() {
      let highestTimeoutId = setTimeout(";");
      for (let i = 0; i < highestTimeoutId; i++) {
         clearTimeout(i);
      }
   }

   
}
