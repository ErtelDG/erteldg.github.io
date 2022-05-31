'use strict';


    const removeSpacesFromString = function removeSpacesFromString() {
      // y => original  , x => for reverse palindrom
      let y = document.getElementById("textInput").value;
      let x = document.getElementById("textInput").value;

// // y => original no space

y = y.replaceAll(/[\W_]/g, "");
y= y.toLowerCase();

// x to palindrom
      x = x.replaceAll(/[\W_]/g, "");
        x = x.split("");
            x = x.reverse();
          x = x.join("");
          x= x.toLowerCase();
   
      if (y ===x) {
        
          document.getElementById("result").innerHTML = "Is a palindrom.";
            document.getElementById("result").style.backgroundColor = "green";
        } else {
          document.getElementById("result").innerHTML = "Not a palindrom.";
           document.getElementById("result").style.backgroundColor = "red";
        }
    
    let outputPalindrom = document.getElementById("outputPalindrom");
      outputPalindrom.innerHTML = x;
       let inputTex = document.getElementById("inputTex");
      inputTex.innerHTML = y;
    };


    document.getElementById("dateText").addEventListener("click", removeSpacesFromString, true);