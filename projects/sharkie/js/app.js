"use strict";
let keyboard = new KeyboardKeys();
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gameworld;
let level1;
let firstContain = document.getElementById("firstContain");
let secondContain = document.getElementById("secondContain");
let thirdContain = document.getElementById("thirdContain");
let imageYouWin = document.getElementById("imageYouWin");
let imageGameOver = document.getElementById("imageGameOver");
let imageTryAgain = document.getElementById("imageTryAgain");
let isFullscreen = false;
async function init() {
    firstContain?.classList.remove("grid");
    firstContain?.classList.add("hidden");
    secondContain?.classList.remove("hidden");
    secondContain?.classList.add("flex");
    thirdContain?.classList.add("hidden");
    thirdContain?.classList.remove("grid");
    imageYouWin?.classList.remove("hidden");
    imageGameOver?.classList.remove("hidden");
    level1 = new Level();
    gameworld = new GameWorld();
}
function fullscreenOnOff() {
    !isFullscreen ? fullscreenOn() : fullscreenOff();
}
function fullscreenOff() {
    canvas.classList.add("lg:w-auto");
    canvas.classList.add("lg:h-auto");
    isFullscreen = false;
}
function fullscreenOn() {
    canvas.classList.remove("lg:w-auto");
    canvas.classList.remove("lg:h-auto");
    isFullscreen = true;
}
/**
 * set sound on or off
 */
function soundOnOff() {
    if (gameworld != null) {
        return gameworld.background_sound_On_Off ? soundOff() : soundOn();
    }
}
/**
 *  sound off
 */
function soundOff() {
    if (gameworld != null) {
        gameworld.background_sound_On_Off = false;
        gameworld.audioSounds.gameSound.pause();
    }
}
/**
 *  sound on
 */
function soundOn() {
    if (gameworld != null) {
        gameworld.background_sound_On_Off = true;
        gameworld.audioSounds.gameSound.play();
    }
}
