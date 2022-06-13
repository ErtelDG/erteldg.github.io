
function resultDisplay(value) {
document.getElementById('resultDisplay').innerHTML += value;
}
 
function resultCalculate(){
  let x = document.getElementById('resultDisplay');
 let resultCalculate = eval(x.innerHTML);
  x.innerHTML = resultCalculate;
}


function deletLastValue(){
  let x = document.getElementById('resultDisplay');
  if(x.innerHTML.endsWith(' ')){
    x.innerHTML = x.innerHTML.slice(0, -3);  
  }else{
  x.innerHTML = x.innerHTML.slice(0, -1);
  }
}
