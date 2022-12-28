class Sharkie extends MovableClass {
   constructor() {
      super("Sharkie");
      this.width = 300;
      this.height = 250;
      this.setAllImagesInArray();
      this.loadInIntervallAllImg();
      this.checkDirectionOfMovement();
      this.setColissionPointsObject(120, 60, 180, 120);
      this.checkIsDead();
      this.startTimerForIdleTime();
      this.imagesCach.push(this.arrayAllImages_IDLE[0]);
      this.loadInIntervallOneImg();
      this.breatheAnimation();
      this.pressSpace();
   }

   timeOver = true;
   fireBubble = false;
   pressSpace() {
      setInterval(() => (keyboard.SPACE == true ? (this.timeOver = false) : (this.timeOver = true)), 1000/15);
   }

   loadInIntervallOneImg() {
      setInterval(() => (!this.isDead ? this.loadOneImgFromCach() : this.loadSharkieDeadImages()), 1000 / 15);
   }

   checkDirectionOfMovement() {
      setInterval(() => {
         if (keyboard.DOWN) this.moveDown(10);
         if (keyboard.UP) this.moveUp(10);
      }, 1000 / 30);
   }

   loadInIntervallAllImg() {
      setInterval(() => (keyboard.SPACE == false ? this.loadAllImageArrayForCurrenttAnimation() : false), 1000/30);
   }

   arrayAllImages_IDLE: string[] = [];
   arrayAllImages_LONG_IDLE: string[] = [];
   arrayAllImages_SWIM: string[] = [];
   arrayAllImages_ATTACK_FIN_SLAP: string[] = [];
   arrayAllImages_ATTACK_INFLATE_POISONED_BUBBLE_FOR_WHALE: string[] = [];
   arrayAllImages_ATTACK_INFLATE_WHITE_BUBBLE_FOR_JELLY: string[] = [];
   arrayAllImages_HAS_HURT: string[] = [];
   arrayAllImages_IS_DEAD: string[] = [];
   arrayAllImages_HAS_HURT_ELECTRIC: string[] = [];
   sharkieLastImagesCounter = 0;
   sharkieLastImages = this.arrayAllImages_IS_DEAD.length;
   isIdle = false;
   timerForIdleTime = 15;
   endFirCounter = 0;
   fireCounter = 0;

   startTimerForIdleTime() {
      setInterval(() => (this.isIdle ? this.timerForIdleTime-- : this.resetTimerForIdle()), 1000);
   }
   breatheAnimation() {
      setInterval(() => {
         if (keyboard.SPACE || (keyboard.F && gameworld.level.statusBarValue[2].counterBubble > 0)) {
            this.endFirCounter = keyboard.SPACE
               ? this.arrayAllImages_ATTACK_INFLATE_WHITE_BUBBLE_FOR_JELLY.length
               : this.arrayAllImages_ATTACK_INFLATE_POISONED_BUBBLE_FOR_WHALE.length;
            this.isIdle = false;
            this.endFirCounter > this.fireCounter ? this.loadImagesForBreathPOisonedBubbles() : this.resetFireCounter();
         }
      }, 75);
   }

   loadImagesForBreathPOisonedBubbles() {
      this.imagesCach = [];
      let pathURL = keyboard.SPACE
         ? this.arrayAllImages_ATTACK_INFLATE_WHITE_BUBBLE_FOR_JELLY[this.fireCounter]
         : this.arrayAllImages_ATTACK_INFLATE_POISONED_BUBBLE_FOR_WHALE[this.fireCounter];
      this.imagesCach.push(pathURL);
      this.fireCounter++;
   }

   resetFireCounter() {
      this.fireCounter = 0;
      this.fireBubble = false;
   }

   loadAllImageArrayForCurrenttAnimation() {
      if (this.hasHurt && !this.isDead) {
         this.isIdle = false;
         this.loadAllImgInCach(this.arrayAllImages_HAS_HURT);
      } else if (this.hasHurtElectric == true) {
         this.isIdle = false;
         this.loadAllImgInCach(this.arrayAllImages_HAS_HURT_ELECTRIC);
      } else if (this.isDead == true) {
         this.isIdle = false;
         this.loadAllImgInCach(this.arrayAllImages_IS_DEAD);
      } else if (keyboard.LEFT || keyboard.RIGHT || keyboard.DOWN || keyboard.UP) {
         this.isIdle = false;
         this.loadAllImgInCach(this.arrayAllImages_SWIM);
      } else if (keyboard.D && this.isAttack != true) {
         this.isIdle = false;
         this.loadAllImgInCach(this.arrayAllImages_ATTACK_FIN_SLAP);
      } else if (this.timerForIdleTime <= 0) {
         this.loadAllImgInCach(this.arrayAllImages_LONG_IDLE);
      } else if (this.isIdle == true) {
         this.loadAllImgInCach(this.arrayAllImages_IDLE);
      }
   }

   setAllImagesInArray() {
      this.arrayAllImages_IDLE = [
         "img/1.Sharkie/1.IDLE/1-min.png",
         "img/1.Sharkie/1.IDLE/2-min.png",
         "img/1.Sharkie/1.IDLE/3-min.png",
         "img/1.Sharkie/1.IDLE/4-min.png",
         "img/1.Sharkie/1.IDLE/5-min.png",
         "img/1.Sharkie/1.IDLE/6-min.png",
         "img/1.Sharkie/1.IDLE/7-min.png",
         "img/1.Sharkie/1.IDLE/8-min.png",
         "img/1.Sharkie/1.IDLE/9-min.png",
         "img/1.Sharkie/1.IDLE/10-min.png",
         "img/1.Sharkie/1.IDLE/11-min.png",
         "img/1.Sharkie/1.IDLE/12-min.png",
         "img/1.Sharkie/1.IDLE/13-min.png",
         "img/1.Sharkie/1.IDLE/14-min.png",
         "img/1.Sharkie/1.IDLE/15-min.png",
         "img/1.Sharkie/1.IDLE/16-min.png",
         "img/1.Sharkie/1.IDLE/17-min.png",
         "img/1.Sharkie/1.IDLE/18-min.png",
      ];
      this.arrayAllImages_LONG_IDLE = [
         "img/1.Sharkie/2.Long_IDLE/I1-min.png",
         "img/1.Sharkie/2.Long_IDLE/I2-min.png",
         "img/1.Sharkie/2.Long_IDLE/I3-min.png",
         "img/1.Sharkie/2.Long_IDLE/I4-min.png",
         "img/1.Sharkie/2.Long_IDLE/I5-min.png",
         "img/1.Sharkie/2.Long_IDLE/I6-min.png",
         "img/1.Sharkie/2.Long_IDLE/I7-min.png",
         "img/1.Sharkie/2.Long_IDLE/I8-min.png",
         "img/1.Sharkie/2.Long_IDLE/I9-min.png",
         "img/1.Sharkie/2.Long_IDLE/I10-min.png",
         "img/1.Sharkie/2.Long_IDLE/I11-min.png",
         "img/1.Sharkie/2.Long_IDLE/I12-min.png",
         "img/1.Sharkie/2.Long_IDLE/I13-min.png",
         "img/1.Sharkie/2.Long_IDLE/I14-min.png",
      ];
      this.arrayAllImages_SWIM = [
         "img/1.Sharkie/3.Swim/1-min.png",
         "img/1.Sharkie/3.Swim/2-min.png",
         "img/1.Sharkie/3.Swim/3-min.png",
         "img/1.Sharkie/3.Swim/4-min.png",
         "img/1.Sharkie/3.Swim/5-min.png",
         "img/1.Sharkie/3.Swim/6-min.png",
      ];
      this.arrayAllImages_ATTACK_FIN_SLAP = [
         "img/1.Sharkie/4.Attack/Fin_Slap/1-min.png",
         "img/1.Sharkie/4.Attack/Fin_Slap/2-min.png",
         "img/1.Sharkie/4.Attack/Fin_Slap/3-min.png",
         "img/1.Sharkie/4.Attack/Fin_Slap/4-min.png",
         "img/1.Sharkie/4.Attack/Fin_Slap/5-min.png",
         "img/1.Sharkie/4.Attack/Fin_Slap/6-min.png",
         "img/1.Sharkie/4.Attack/Fin_Slap/7-min.png",
         "img/1.Sharkie/4.Attack/Fin_Slap/8-min.png",
      ];
      this.arrayAllImages_ATTACK_INFLATE_POISONED_BUBBLE_FOR_WHALE = [
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Whale/1-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Whale/2-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Whale/3-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Whale/4-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Whale/5-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Whale/6-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Whale/7-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Whale/8-min.png",
      ];
      this.arrayAllImages_ATTACK_INFLATE_WHITE_BUBBLE_FOR_JELLY = [
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/1-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/1-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/2-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/3-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/4-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/5-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/6-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/7-min.png",
         "img/1.Sharkie/4.Attack/Bubble_Trap/For_Jelly/8-min.png",
      ];

      this.arrayAllImages_HAS_HURT = [
         "img/1.Sharkie/5.Hurt/1.Poisoned/2-min.png",
         "img/1.Sharkie/5.Hurt/1.Poisoned/3-min.png",
         "img/1.Sharkie/5.Hurt/1.Poisoned/4-min.png",
         "img/1.Sharkie/5.Hurt/1.Poisoned/5-min.png",
      ];

      this.arrayAllImages_HAS_HURT_ELECTRIC = [
         "img/1.Sharkie/5.Hurt/2.ElectricShock/1-min.png",
         "img/1.Sharkie/5.Hurt/2.ElectricShock/2-min.png",
         "img/1.Sharkie/5.Hurt/2.ElectricShock/3-min.png",
      ];

      this.arrayAllImages_IS_DEAD = [
         "img/1.Sharkie/6.dead/1.Poisoned/1-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/2-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/3-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/4-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/5-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/6-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/7-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/8-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/9-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/10-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/11-min.png",
         "img/1.Sharkie/6.dead/1.Poisoned/12-min.png",
      ];
   }

   resetTimerForIdle() {
      this.timerForIdleTime = 5;
      this.isIdle = true;
   }

   loadSharkieDeadImages() {
      this.sharkieLastImages = this.arrayAllImages_IS_DEAD.length;
      if (this.sharkieLastImagesCounter < this.sharkieLastImages) {
         this.sharkieLastImagesCounter++;
         this.loadOneImgFromCach();
      } else {
         this.stopAllIntervals();
         secondContain?.classList.add("hidden");
         secondContain?.classList.remove("flex");
         thirdContain?.classList.remove("hidden");
         thirdContain?.classList.add("grid");
         imageYouWin?.classList.add("hidden");
         imageGameOver?.classList.remove("hidden");
      }
   }
}
