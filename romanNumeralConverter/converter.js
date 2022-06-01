const convertToRoman = function convertToRoman() {

  // arabic number
  let num = document.getElementById("inputNumber").value;

  //roma number
let x = "";
  // const roman number to arabic
const M =	1000;
const CM= 	900;
const D =	500;
const CD= 	400;
const C =	100;
const XC= 	90;
const L =	50;
const XL= 	40;
const X =	10;
const IX= 	9;
const V =	5;
const IV= 	4;
const I =	1;


for (let index=num; num>=M; index-M) {
  x += "M";
  num -= M;
  }

for (let index=num; num>=CM; index-CM) {
  x += "CM";
  num -= CM;
  }


for (let index=num; num>=D; index-D) {
  x += "D";
  num -= D;
  }


for (let index=num; num>=CD; index-CD) {
  x += "CD";
  num -= CD;
  }


  for (let index=num; num>=C; index-C) {
  x += "C";
  num -= C;
  }

for (let index=num; num>=XC; index-XC) {
  x += "XC";
  num -= XC;
  }

for (let index=num; num>=L; index-L) {
  x += "L";
  num -= L;
  }

  for (let index=num; num>=XL; index-XL) {
  x += "XL";
  num -= XL;
  }

  for (let index=num; num>=X; index-X) {
  x += "X";
  num -= X;
  }

for (let index=num; num>=IX; index-IX) {
  x += "IX";
  num -= IX;
  }

  for (let index=num; num>=V; index-V) {
  x += "V";
  num -= V;
  }


  for (let index=num; num>=IV; index-IV) {
  x += "IV";
  num -= IV;
  }

for (let index=num; num>=I; index-I) {
  x += "I";
  num -= I;
  }

let resultToRoman = document.getElementById("resultToRoman");
resultToRoman.innerHTML = x;
};







let arabicNumber = document.getElementById("dataSend");
arabicNumber.addEventListener("click", convertToRoman, true);
