"use strict";

//Unit copy auto
const selectionToAll = function selectionToAll() {
  let liste = document.getElementsByName("unit");
for (var i=0; i<liste.length; i++) {
  document.getElementsByName("unit")[i].innerHTML = unitSelect.value;
}
};

let unitSelect = document.getElementById("unitSelect");
unitSelect.addEventListener("change", selectionToAll);


//Rectangle Area
const rectangleArea = function rectangleArea() {
  let rectangleHeight = document.getElementById("rectangleHeight");
  let rectangleWidth = document.getElementById("rectangleWidth");
  let resultRectangleAreaFunction =
    parseFloat(rectangleHeight.value) * parseFloat(rectangleWidth.value);
  resultRectangleArea.innerHTML =
    resultRectangleAreaFunction.toFixed(2) +
    document.getElementById("unitSelect").value +
    "²";
};

document
  .getElementById("dateRectangleArea")
  .addEventListener("click", rectangleArea, true);


//calculate perimeter rectangle
const calculatePerimeterRectangle = function calculatePerimeterRectangle() {
  let rectangleHeight = document.getElementById("rectangleHeightPerimeter");
  let rectangleWidth = document.getElementById("rectangleWidthPerimeter");
  let resultRectanglePerimeterFunction =
    2 * parseFloat(rectangleHeight.value) + 2 * parseFloat(rectangleWidth.value);
  resultRectanglePerimeter.innerHTML = resultRectanglePerimeterFunction.toFixed(2) +
    document.getElementById("unitSelect").value;
};

document
  .getElementById("dateRectanglePerimeter")
  .addEventListener("click", calculatePerimeterRectangle, true);


//calculate triange area
const calcualteTriangleArea = function calcualteTriangleArea() {
  let triangleHeightArea = document.getElementById("triangleHeightArea");
  let triangleWidthArea = document.getElementById("triangleWidthArea");
  let resultTriangleAreaFunction =
    0.5 * parseFloat(triangleHeightArea.value) * parseFloat(triangleWidthArea.value);
  resultTriangleArea.innerHTML =
    resultTriangleAreaFunction.toFixed(2) +
    document.getElementById("unitSelect").value +
    "²";
};

document
  .getElementById("dateTriangleArea")
  .addEventListener("click", calcualteTriangleArea, true);


//calculate perimeter triangle
const calcualteTrianglePerimeter = function calcualteTrianglePerimeter() {
  
 let a = document.getElementById("trianglePerimeterA");
  let b = document.getElementById("trianglePerimeterB");
  let c = document.getElementById("trianglePerimeterC");
  
  let resultTrianglePerimeterFunction = parseFloat(a.value) + parseFloat(b.value) + parseFloat(c.value);
  resultTrianglePerimeter.innerHTML =
    resultTrianglePerimeterFunction.toFixed(2) + document.getElementById("unitSelect").value;
};

document.getElementById("dateTrianglePerimeter").addEventListener("click", calcualteTrianglePerimeter, true);


//calculate circle area
const calculateCricleArea = function calculateCricleArea() {
  const pi = 3.1415;
  let radius = document.getElementById("circleRadiusArea");
  let resultCircleAreaFunction = pi * (parseFloat(radius.value) * parseFloat(radius.value));
    resultCircleArea.innerText = resultCircleAreaFunction.toFixed(2) + document.getElementById("unitSelect").value + "²";
}

document.getElementById("dateCircleArea").addEventListener("click", calculateCricleArea, true);


// calculate circle perimeter
const claculateCirclePerimeter = function claculateCirclePerimeter() {
  const pi = 3.1415;
  let r = document.getElementById("circleRadiusPerimeter");
  let result = 2 * parseFloat(pi) * parseFloat(r.value);
  resultCirclePerimeter.innerHTML = parseFloat(result).toFixed(2) + document.getElementById("unitSelect").value;

}

document.getElementById("dateCirclePerimeter").addEventListener("click", claculateCirclePerimeter, true);


// calculate pythagorean theorem side c

const calculatedatePythagoreanTheorem = function calculatedatePythagoreanTheorem() {
  let a = document.getElementById("pythagoreanTheoremSideA");
  let b = document.getElementById("pythagoreanTheoremSideB");
  let result = parseFloat((a.value * a.value) + (b.value * b.value));
  resultPthagoreanTheorem.innerHTML = parseFloat(result).toFixed(2) + document.getElementById("unitSelect").value + "²";
}

document.getElementById("datePythagoreanTheorem").addEventListener("click", calculatedatePythagoreanTheorem, true);


// calculate pythagorean theorem side A or B

const calculatedatePythagoreanTheoremAorB = function calculatedatePythagoreanTheoremAorB() {
  let ab = document.getElementById("pythagoreanTheoremSideAorB");
  let c = document.getElementById("pythagoreanTheoremSideC");
  let result = parseFloat((c.value * c.value) - (ab.value * ab.value));
  resultPthagoreanTheoremAorB.innerHTML = parseFloat(result).toFixed(2) + document.getElementById("unitSelect").value + "²";
}

document.getElementById("datePythagoreanTheoremAorB").addEventListener("click", calculatedatePythagoreanTheoremAorB, true);