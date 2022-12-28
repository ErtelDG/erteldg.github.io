class Level extends BaseClass {
   constructor() {
      super("LevelClass");
      this.createNewBackground(7);//7
      this.createStaticObject(20, this.coins, Coin);//20
      this.createEnemies(10, EnemyPufferFish);//10
      this.createEnemies(10, EnemyJellyFishLila);//10

      this.createStaticObject(10, this.bubbleBottles, BubbleBottle);//10
      this.createStatusBar();
      this.createStatusBarValue();
   }

   backgrounds: any[] = [];
   coins: any[] = [];
   enemies: any[] = [];
   statusBar: any[] = [];
   statusBarValue: any[] = [];
   bubbleBottles: any[] = [];

   createNewBackground(num: number) {
      let howManyElementsToBuild = num;
      let coordinateForBackgroundImg = 0;
      for (let i = 0; i < howManyElementsToBuild; i++) {
         this.backgrounds.push(new Background("img/3.Background/Layers/5.Water/D1.png", coordinateForBackgroundImg, 0)),
            this.backgrounds.push(new Background("img/3.Background/Layers/4.Fondo2/D1.png", coordinateForBackgroundImg, 0)),
            this.backgrounds.push(new Background("img/3.Background/Layers/3.Fondo1/D1-min.png", coordinateForBackgroundImg, 0)),
            this.backgrounds.push(new Background("img/3.Background/Layers/2.Floor/D1-min.png", coordinateForBackgroundImg, 0)),
            this.backgrounds.push(new Background("img/3.Background/Layers/1.Light/1.png", coordinateForBackgroundImg, 0)),
            (coordinateForBackgroundImg += 719);
         this.backgrounds.push(new Background("img/3.Background/Layers/5.Water/D2.png", coordinateForBackgroundImg, 0)),
            this.backgrounds.push(new Background("img/3.Background/Layers/4.Fondo2/D2.png", coordinateForBackgroundImg, 0)),
            this.backgrounds.push(new Background("img/3.Background/Layers/3.Fondo1/D2-min.png", coordinateForBackgroundImg, 0)),
            this.backgrounds.push(new Background("img/3.Background/Layers/2.Floor/D2-min.png", coordinateForBackgroundImg, 0)),
            this.backgrounds.push(new Background("img/3.Background/Layers/1.Light/2.png", coordinateForBackgroundImg, 0)),
            (coordinateForBackgroundImg += 719);
      }
   }

   createEnemies(quantity: number, enemieObjectType: typeof EnemyPufferFish | typeof EnemyJellyFishLila) {
      let howManyElementsToBuild = quantity;
      for (let i = 0; i < howManyElementsToBuild; i++) {
         this.enemies.push(new enemieObjectType());
      }
   }

   createStaticObject(quantity: number, arrayNameForCreateStaticObjectInLevel: any[], whichStaticObject: any) {
      let howManyElementsToBuild = quantity;
      for (let i = 0; i < howManyElementsToBuild; i++) {
         arrayNameForCreateStaticObjectInLevel.push(new whichStaticObject());
      }
   }

   createStatusBar() {
      this.statusBar.push(new StatusBar("life"), new StatusBar("coin"), new StatusBar("bubble"));
   }

   createStatusBarValue() {
      this.statusBarValue.push(new StatusBarValue("life"), new StatusBarValue("coin"), new StatusBarValue("bubble"));
   }

   pushANewEnemy(newObject: any) {
      this.enemies.push(newObject);
   }
}
