class StatusBarValue extends BaseClass {
   constructor(statusBarValueFor: string = "life" || "coin" || "bubble") {
      super("StatusBarValue");
      this.name = statusBarValueFor;
      this.width = 80;
      this.height = 80;
      this.y = 60;
      this.setCorrectValueForStatusBarInAllArray(this.name);
   }

   currentCounterForThisObject = 0;

   counterLife = 5;
   counterCoin = 0;
   counterBubble = 0;
   counterFinalFish = 5;

   setCorrectValueForStatusBarInAllArray(whichStatusBar: string) {
      setInterval(() => {
         if (whichStatusBar == "life") {
            this.setValueLifeBar();
         } else if (whichStatusBar == "coin") {
            this.setValueCoinBar();
         } else if (whichStatusBar == "bubble") {
            this.setValueBubbleBar();
         } else {
            this.setValueFinalFishBar();
         }
      }, 500);
   }

   setValueFinalFishBar() {
      this.currentCounterForThisObject = this.counterFinalFish;
      this.x = 600;
   }

   setValueBubbleBar() {
      this.currentCounterForThisObject = this.counterBubble;
      this.x = 420;
   }

   setValueCoinBar() {
      this.currentCounterForThisObject = this.counterCoin;
      this.x = 260;
   }

   setValueLifeBar() {
      this.currentCounterForThisObject = this.counterLife;
      this.x = 90;
   }
}
