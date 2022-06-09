"use strict";

function checkCashRegister() {
  //console.log(typeof(price));
  //console.log(typeof(cash));
  //console.log(typeof(cid));

  let price = document.getElementById("price").valueAsNumber;
  let cash = document.getElementById("cash").valueAsNumber;

  // create currency
  const PENNY = 0.01;
  const NICKEL = 0.05;
  const DIME = 0.1;
  const QUARTER = 0.25;
  const ONE = 1.0;
  const FIVE = 5.0;
  const TEN = 10.0;
  const TWENTY = 20.0;
  const ONEHUNDRED = 100.0;

  //number of bills and coins in the drawer per type
  let penny0_01 = document.getElementById("penny").value / 0.01;
  let nickel0_05 = document.getElementById("nickel").value / 0.05;
  let dime0_10 = document.getElementById("dime").value / 0.1;
  let quarter0_25 = document.getElementById("quarter").value / 0.25;
  let dollar_1 = document.getElementById("one").value / 1;
  let fiveDollar_5 = document.getElementById("five").value / 5;
  let tenDollar_10 = document.getElementById("ten").value / 10;
  let twentyDollar_20 = document.getElementById("twenty").value / 20;
  let oneHundredDollar_100 = document.getElementById("onehundred").value / 100;

  let cid = [
    penny0_01,
    nickel0_05,
    dime0_10,
    quarter0_25,
    dollar_1,
    fiveDollar_5,
    tenDollar_10,
    twentyDollar_20,
    oneHundredDollar_100,
  ];

  //change amount of change

  let amountPenny = 0;
  let amountNickel = 0;
  let amountDime = 0;
  let amountQuarter = 0;
  let amountOne = 0;
  let amountFive = 0;
  let amountTen = 0;
  let amountTwenty = 0;
  let amountOneHundred = 0;

  //create object change
  const change = {
    status: "",
    change: [],
    get ausgabe() {
      return this.change;
    },
  };

  //calculate the change
  let calculateChange = cash - price;

  //calculate the money of the cash drawers

  let cashDrawersStock = 0;
  for (let x = 0; x < cid.length; x++) {
    cashDrawersStock += cid[x];
  }
  cashDrawersStock = cashDrawersStock.toFixed(2);

  //remaining available change
  let remainingAvailableChange = cashDrawersStock - calculateChange;

  //calculate the change
  //check 100 dollar
  for (let index = oneHundredDollar_100; index > 0; index -= 1) {
    if (calculateChange >= ONEHUNDRED) {
      calculateChange -= ONEHUNDRED;
      amountOneHundred += ONEHUNDRED;
    } else {
      break;
    }
  }
  //check 20 dollar
  for (let index = twentyDollar_20; index > 0; index -= 1) {
    if (calculateChange >= TWENTY) {
      calculateChange -= TWENTY;
      amountTwenty += TWENTY;
    } else {
      break;
    }
  }
  //check 10 dollar
  for (let index = tenDollar_10; index > 0; index -= 1) {
    if (calculateChange >= TEN) {
      calculateChange -= TEN;
      amountTen += TEN;
    } else {
      break;
    }
  }
  //check 5 dollar
  for (let index = fiveDollar_5; index > 0; index -= 1) {
    if (calculateChange >= FIVE) {
      calculateChange -= FIVE;
      amountFive += FIVE;
    } else {
      break;
    }
  }
  //check 1 dollar
  for (let index = dollar_1; index > 0; index -= 1) {
    if (calculateChange >= ONE) {
      calculateChange -= ONE;
      amountOne += ONE;
    } else {
      break;
    }
  }
  //check quarter
  for (let index = quarter0_25; index > 0; index -= 1) {
    if (calculateChange >= QUARTER) {
      calculateChange -= QUARTER;
      amountQuarter += QUARTER;
      calculateChange = calculateChange.toFixed(2);
    } else {
      break;
    }
  }
  //check dime
  for (let index = dime0_10; index > 0; index -= 1) {
    if (calculateChange >= DIME) {
      calculateChange -= DIME;
      amountDime += DIME;
      calculateChange = calculateChange.toFixed(2);
    } else {
      break;
    }
  }
  //check nickel
  for (let index = nickel0_05; index > 0; index -= 1) {
    if (calculateChange >= NICKEL) {
      calculateChange -= NICKEL;
      amountNickel += NICKEL;
      calculateChange = calculateChange.toFixed(2);
    } else {
      break;
    }
  }
  //check penny
  for (let index = penny0_01; index > 0; index -= 1) {
    if (calculateChange >= PENNY) {
      calculateChange -= PENNY;
      amountPenny += PENNY;
      calculateChange = calculateChange.toFixed(2);
    } else {
      break;
    }
  }

  //fixed number
  amountPenny = amountPenny.toFixed(2);
  amountNickel = amountNickel.toFixed(2);
  amountDime = amountDime.toFixed(2);
  amountQuarter = amountQuarter.toFixed(1);

  // push the amount to object change
  if (amountOneHundred > 0) {
    change.change.push(["ONE HUNDRED", +amountOneHundred]);
  }
  if (amountTwenty > 0) {
    change.change.push(["TWENTY", +amountTwenty]);
  }
  if (amountTen > 0) {
    change.change.push(["TEN", +amountTen]);
  }
  if (amountFive > 0) {
    change.change.push(["FIVE", +amountFive]);
  }
  if (amountOne > 0) {
    change.change.push(["ONE", +amountOne]);
  }
  if (amountQuarter > 0) {
    change.change.push(["QUARTER", +amountQuarter]);
  }
  if (amountDime > 0) {
    change.change.push(["DIME", +amountDime]);
  }
  if (amountNickel > 0) {
    change.change.push(["NICKEL", +amountNickel]);
  }
  if (amountPenny > 0) {
    change.change.push(["PENNY", +amountPenny]);
  }

  //return message status

  //if (calculateChange == remainingAvailableChange){
  //  change.status = "CLOSED";
  //  change.change.push(["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE //HUNDRED", 0])
  //}
  // Von String zu number
  //let cashDrawersStock = 0;
  //    for (let x=0; x<cid.length; x++) {
  //    cashDrawersStock += cid[x][1];
  //    }
  //    cashDrawersStock = cashDrawersStock.toFixed(2);
  //
  //
  //let test = change.change[0][1];
  //console.log(typeof(test));

  if (calculateChange == 0 && remainingAvailableChange == 0) {
    change.status = "CLOSED";
    change.change.push(
      ["ONE HUNDRED", 0],
      ["TWENTY", 0],
      ["TEN", 0],
      ["FIVE", 0],
      ["ONE", 0],
      ["QUARTER", 0],
      ["DIME", 0],
      ["NICKEL", 0],
      ["PENNY", 0]
    );
    return (document.getElementById("result").innerHTML =
      "status: " + change.status + ", change: " + change.change);
  }

  if (calculateChange == 0 && calculateChange < remainingAvailableChange) {
    change.status = "OPEN";
    return (document.getElementById("result").innerHTML =
      "status: " + change.status + ", change: " + change.change);
  }

  if (calculateChange > 0) {
    change.status = "INSUFFICIENT_FUNDS";
    change.change = [];
    return (document.getElementById("result").innerHTML =
      "status: " + change.status + ", change: []");
  }

  ////console.log(remainingAvailableChange);
  //console.log(cashDrawersStock);
  //console.log(calculateChange);
  //alert(change);

  //let change;
  //return change;
}

let dataSend = document.getElementById("dataSend");
dataSend.addEventListener("click", checkCashRegister, true);
