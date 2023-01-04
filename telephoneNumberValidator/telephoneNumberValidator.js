
function telephoneCheck() {
  
let numberCheck = document.getElementById("input").value;

const regExp1 = /[1" """][-" "]\d\d\d[-" "]\d\d\d[-" "]\d\d\d\d/;
const regExp2 = /[1" """][-" "][(]\d\d\d[)][-" "]\d\d\d[-" "]\d\d\d\d/;
const regExp3 = /\d\d\d\d\d\d\d\d\d\d/;
const regExp4 = /\d\d\d[-]\d\d\d[-]\d\d\d\d/;
const regExp5 = /[(]\d\d\d[)]\d\d\d[-]\d\d\d\d/;
const regExp6 = /[(]\d\d\d[-]\d\d\d[-]\d\d\d\d/;

// check last value => ) is false! must be a number
let lastValueNumberCheck = numberCheck.substr(numberCheck.length-1,1)
if (lastValueNumberCheck == ")"){
    return document.getElementById("result").innerHTML = "false";
};

// check first value => negativ number is false! must be a number +1!
let firstValueNumberCheck = numberCheck.substr(0,2);
firstValueNumberCheck = parseInt(firstValueNumberCheck);
if (firstValueNumberCheck == -1){
    return document.getElementById("result").innerHTML = "false";
};

// check first value => ( is right! but must close late with ), when not is false!
if (regExp6.test(numberCheck)){
    return document.getElementById("result").innerHTML = "false";
}



if (regExp1.test(numberCheck) || regExp2.test(numberCheck) || regExp3.test(numberCheck) || regExp4.test(numberCheck) || regExp5.test(numberCheck)){
    numberCheck = numberCheck.replace(/[-()" "]/g, "");
      //length of the number:
    let lengthNumberCheck = numberCheck.length;
    
    if (lengthNumberCheck == 10){
        // number have length 10 is true:
                return document.getElementById("result").innerHTML = "true";
        } else if(lengthNumberCheck == 11){
            // number have length 11 and check first number is 1!
            // find the first number:
            let checkFirstNumber = numberCheck.charAt(0);
            checkFirstNumber = parseInt(checkFirstNumber);
            // check first number is 1:
                  if (checkFirstNumber == 1){        
                  return document.getElementById("result").innerHTML = "true";
                  } else {
                      return document.getElementById("result").innerHTML = "false";
                  }
        } else {
        return document.getElementById("result").innerHTML = "false";
      }
    } else {
return document.getElementById("result").innerHTML = "false";
}
}


  // let result = encodedValue;
  // document.getElementById("result").innerHTML = result;


let dataSend = document.getElementById("dataSend");
dataSend.addEventListener("click", telephoneCheck, true);
