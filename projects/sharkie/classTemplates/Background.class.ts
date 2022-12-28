class Background extends BaseClass {
   constructor(imgPath: string, x: number, y: number) {
      super("BackgroundClass");
      this.arrayAllImages = [imgPath];
      this.width = 720;
      this.height = 400;
      this.x = x;
      this.y = y;
      this.loadAllImgInCach(this.arrayAllImages);
      this.loadOneImgFromCach();
   }
}
