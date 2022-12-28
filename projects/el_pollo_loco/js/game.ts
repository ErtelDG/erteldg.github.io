let canvas: number | HTMLCanvasElement;
let world: World;
let panelOnOff = false;
let keyboard = new KeyboardKeys();
let startScreen: HTMLElement;
let endScreen: HTMLElement;
let gameOverContain: HTMLElement;
let winContain: HTMLElement;
let startSide: HTMLElement;
let background_sound_On_Off = true;
let fullscreenOnOff = false;
let fullscreen = document.getElementById("fullscreen") as HTMLElement;
let soundIconImg: HTMLImageElement;
let canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
let openFullscreenBtn = document.getElementById("openFullscreenBtn") as HTMLElement;
let closeFullscreenBtn = document.getElementById("closeFullscreenBtn") as HTMLElement;
let iconPanelBtn = document.getElementById("iconPanelBtn") as HTMLElement;

function stopAllIntervals() {
   getAllIntervalsAndStop();
}

/**
 *  start game and created world
 */
function init() {
   
   getIdHtmlELements();
   hiddenStartScreen();
   startSide.classList.remove("hidden-gameplay-screen");
   createdLevel();
   setCancvasProperties();
   createNewWorld();
}

/**
 *  restart the game
 */
function restart() {
   closeEndOpenStartScreen();
   stopBackgroundMusic();
   stopAllIntervals();
   init();
}

/**
 * set sound on or off
 */
function soundOnOff() {
   return background_sound_On_Off ? soundOff() : soundOn();
}

/**
 *  sound off
 */
function soundOff() {
   background_sound_On_Off = false;
   world.background_sound.pause();
   soundIconImg.src = "img/10_design/sound-off-icon.png";
}

/**
 *  sound on
 */
function soundOn() {
   background_sound_On_Off = true;
   world.background_sound.play();
   soundIconImg.src = "img/10_design/sound-on-icon.png";
}

/**
 * HTML Elements with ID to variables
 */
function getIdHtmlELements() {
   startScreen = document.getElementById("startScreen") as HTMLElement;
   endScreen = document.getElementById("end-screen") as HTMLElement;
   gameOverContain = document.getElementById("game-over-container") as HTMLElement;
   winContain = document.getElementById("win-container") as HTMLElement;
   startSide = document.getElementById("startSide") as HTMLElement;
   soundIconImg = document.getElementById("sound-icon-img") as HTMLImageElement;
}

/**
 * stop all intervals
 */
function getAllIntervalsAndStop() {
   let highestTimeoutId = setTimeout(";");
   for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
   }
}

/**
 * set canvas properties
 */
function setCancvasProperties() {
   canvas = document.getElementById("canvas") as HTMLCanvasElement;
}

/**
 * get fullscreen mode
 */
function setFullscreen() {
   enterFullscreen(fullscreen);
}

/**
 * function to set a element in fullscreen mode
 *
 * @param element => element to set fullscreen
 */
function enterFullscreen(element: any) {
   getFullscreenHTMLElements();
   setPanelOnOff();
   fullscreenOnOff = true;
   requestFullscreenBrowser(element);
}

/**
 * function to start close the fullscreen mode
 */
function closeFullscreen() {
   if (fullscreenOnOff) {
      getCloseFullscreenHTMLElements();

      fullscreenOnOff = false;
      exitFullscreen();
   }
}
/**
 * close the fullscreen
 */
function exitFullscreen() {
   document.exitFullscreen();
}

/**
 * hidden start screen by game start
 */
function hiddenStartScreen() {
   startScreen.style.display = "none";
}

/**
 * created new world class
 */
function createNewWorld() {
   world = new World(canvas, keyboard);
}

/**
 * hidden the endscreen and show the startscreen
 */
function closeEndOpenStartScreen() {
   endScreen.classList.add("endscreen-hidden");
   gameOverContain.classList.add("endscreen-hidden");
   startSide.style.display = "";
}

/**
 * set background music to pause
 */
function stopBackgroundMusic() {
   world.background_sound.pause();
}

/**
 * get HTMLElement to set to fullscreen
 */
function getFullscreenHTMLElements() {
   canvasElement.classList.add("canvas-width-fullscreen");
   closeFullscreenBtn.classList.remove("exitFullscreenHidden");
   openFullscreenBtn.classList.add("exitFullscreenHidden");
   //iconPanelBtn.classList.add("exitFullscreenHidden");
}

/**
 * function to close the full screen mode of the user's current browser
 *
 * @param element current browser user
 */
function requestFullscreenBrowser(element: { requestFullscreen: () => void; msRequestFullscreen: () => void; webkitRequestFullscreen: () => void }) {
   if (element.requestFullscreen) {
      element.requestFullscreen();
   } else if (element.msRequestFullscreen) {
      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
   } else if (element.webkitRequestFullscreen) {
      // iOS Safari
      element.webkitRequestFullscreen();
   }
}

/**
 * get HTMLElement to close the fullscreen
 */
function getCloseFullscreenHTMLElements() {
   canvasElement.classList.remove("canvas-width-fullscreen");
   closeFullscreenBtn.classList.add("exitFullscreenHidden");
   openFullscreenBtn.classList.remove("exitFullscreenHidden");
   //  iconPanelBtn.classList.remove("exitFullscreenHidden");
}

/**
 * function show and hidden the panels
 */
function setPanelOnOff() {
   let controlBtnElement = document.getElementById("control-btn") as HTMLElement;
   let iconContainH1PositionElement = document.getElementById("icon-contain-h1-position") as HTMLElement;

   if (panelOnOff == false) {
      showPanel(controlBtnElement, iconContainH1PositionElement);
   } else {
      hiddenPanel(controlBtnElement, iconContainH1PositionElement);
   }
}

/**
 * function show the panels
 */
function showPanel(controlBtnElement: HTMLElement, iconContainH1PositionElement: HTMLElement) {
   controlBtnElement.classList.remove("hidden-element");
   iconContainH1PositionElement.classList.remove("icon-contain-h1-position-border");
   canvasElement.classList.remove("canvas-width-fullscreen-without-key");
   panelOnOff = true;
}

/**
 * function hidden the panels
 */
function hiddenPanel(controlBtnElement: HTMLElement, iconContainH1PositionElement: HTMLElement) {
   controlBtnElement.classList.add("hidden-element");
   iconContainH1PositionElement.classList.add("icon-contain-h1-position-border");
   canvasElement.classList.add("canvas-width-fullscreen-without-key");
   panelOnOff = false;
}
