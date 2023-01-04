const rot13 = function rot13() {
  // Value to variable
  let str = document.getElementById("inputCipher").value;
  let replaceValue = parseInt(document.getElementById("shiftedValue").value);
  let encodedValue = "";

  for (let index = 0; index < str.length; index++) {
    // Recall characters in string at position (x)
    x = str.charAt(index);
    // convert in ASCII number
    x = x.charCodeAt();

    if (x >= 65 && x <= 90) {
      //go loop for upper case
      encodedValue += transformUpperCase(x);
    } else if (x >= 97 && x <= 122) {
      //go loop for lower case
      encodedValue += transformLowerCase(x);
    } else {
      //return all other values
      x = String.fromCharCode(x);
      encodedValue += x;
    }

    // encoded upper case with loop for upper case
    function transformUpperCase(x) {
      // value ASCII -start ASCII "A" => 65
      x = x - 65;
      x = x + replaceValue;
      //check position value 0-25, when str<0 => +26, when str>25 => -26!
      if (x >= 0 && x <= 25) {
        x = x + 65;
        x = String.fromCharCode(x);
        return x;
      } else if (x < 0) {
        x = x + 65 + 26;
        x = String.fromCharCode(x);
        return x;
      } else {
        x = x + 65 - 26;
        x = String.fromCharCode(x);
        return x;
      }
    }

    //encoded lower case  with loop for lower case
    function transformLowerCase(x) {
      // value ASCII -start ASCII "A" => 97
      x = x - 97;
      x = x + replaceValue;
      //check position value 0-25, when str<0 => +26, when str>25 => -26!
      if (x >= 0 && x <= 25) {
        x = x + 97;
        x = String.fromCharCode(x);
        return x;
      } else if (x < 0) {
        x = x + 97 + 26;
        x = String.fromCharCode(x);
        return x;
      } else {
        x = x + 97 - 26;
        x = String.fromCharCode(x);
        return x;
      }
    }
  }
  let result = encodedValue;
  document.getElementById("result").innerHTML = result;
};

let dataSend = document.getElementById("dataSend");
dataSend.addEventListener("click", rot13, true);
