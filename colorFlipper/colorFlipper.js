// value hexdezimal color
let hexValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let hex = "#";

const hexCreater = function hexCreater() {
  for (let x = 0; x < 6; x++) {
    let value = 5;
    let randomNumber = Math.round(Math.random() * hexValue.length - 1);
    if (randomNumber == -1) {
      randomNumber += 1;
    }
    hex += hexValue[randomNumber];
  }
  document.getElementById("body").style.backgroundColor = hex;
  document.getElementById("hexNumber").innerHTML = hex;
  hex = "#";
};

let test = hexCreater();
console.log(hex);

let inputValue = document.getElementById("colorButton");
inputValue.addEventListener("click", hexCreater);
