//function for create a to do point

const addToDoNew = function addToDoNew() {
  const textInput = document.getElementById("toDoInput");
  if (toDoInput.value === "") {
    alert("Please write what you will doing!");
    return;
  }
  //set variable for table
  const tableBody = document.getElementById("tableBody");
  //set variable for table row
  const newRow = document.createElement("tr");

  //table td 1
  //1. set variable for first table td
  const firstTD = document.createElement("td");
  //2. set variable for first table td cell
  const firstTD_Value = document.createTextNode(
    document.getElementById("toDoInput").value
  );
  //3. set attribute class for first table td
  firstTD.setAttribute("class", "toDoTable");
  firstTD.setAttribute("onclick", "checkedDone()");
  //4. set first cell value to first table td
  firstTD.appendChild(firstTD_Value);

  // //table td 2
  // //1. set variable for second table td
  const secondTD = document.createElement("td");
  // //2. set variable for second table td cell
  const secondTD_Value = document.createTextNode("Del");
  // //3. set attribute class for second table td
  secondTD.setAttribute("class", "deletedTable");
  secondTD.setAttribute("onclick", "deletedTR()");
  // //4. set second cell value to second table td
  secondTD.appendChild(secondTD_Value);

  //set all table column to table row
  newRow.appendChild(firstTD);
  newRow.appendChild(secondTD);
  //set table row to table
  tableBody.appendChild(newRow);
};

// delete TR when Del is pressed
const deletedTR = function deletedTR() {
  let delTD = document.getElementsByClassName("deletedTable");

  for (let i = 0; i < delTD.length; i++) {
    delTD[i].onclick = function () {
      let TRow = this.parentElement;
      TRow.style.display = "none";
    };
  }
};

// add or remove css checked done

const checkedDone = function checkedDone() {
  let checkCell = document.getElementsByClassName("toDoTable");

  for (let x = 0; x < checkCell.length; x++) {
    checkCell[x].onclick = function () {
      if (checkCell[x].classList.contains("checked")) {
        checkCell[x].classList.remove("checked");
      } else {
        this.classList.add("checked");
      }
    };
  }
};

function checkKey() {
  if (window.event.keyCode == 13) {
    addToDoNew();
    return false;
  }
}
