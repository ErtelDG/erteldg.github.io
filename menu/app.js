function languageEnglish() {
  //name element
  const chicken = document.getElementsByName("chicken");
  for (let i = 0; i < chicken.length; i++) {
    document.getElementsByName("chicken")[i].innerHTML = "CHICKEN";
  }

  const beef = document.getElementsByName("beef");
  for (let i = 0; i < beef.length; i++) {
    document.getElementsByName("beef")[i].innerHTML = "BEEF";
  }

  const shrimps = document.getElementsByName("shrimps");
  for (let i = 0; i < shrimps.length; i++) {
    document.getElementsByName("shrimps")[i].innerHTML = "SHRIMPS";
  }

  //id element
  document.getElementById("menu").innerHTML = "MENU";
  document.getElementById("location").innerHTML = "LOCATION";
  document.getElementById("about").innerHTML = "ABOUT";
  document.getElementById("thebest").innerHTML = "THE BEST RAMEN IN TOWN";
  document.getElementById("howToOrder").innerHTML = "HOW TO ORDER";
  document.getElementById("pickYourNoodle").innerHTML = "Pick Your Noodle";
  document.getElementById("pickYourBrath").innerHTML = "Pick Your Brath";
  document.getElementById("addYourTopping").innerHTML = "Add Your Toppings";
  document.getElementById("ourMenu").innerHTML = "OUR MENU";
  document.getElementById("findus").innerHTML = "FIND US AT";
}

function languageGerman() {
  //name element
  const chicken = document.getElementsByName("chicken");
  for (let i = 0; i < chicken.length; i++) {
    document.getElementsByName("chicken")[i].innerHTML = "HÄHNCHEN";
  }

  const beef = document.getElementsByName("beef");
  for (let i = 0; i < beef.length; i++) {
    document.getElementsByName("beef")[i].innerHTML = "RINDFLEISCH";
  }

  const shrimps = document.getElementsByName("shrimps");
  for (let i = 0; i < shrimps.length; i++) {
    document.getElementsByName("shrimps")[i].innerHTML = "GARNELEN";
  }

  //id element
  document.getElementById("menu").innerHTML = "MENÜ";
  document.getElementById("location").innerHTML = "STANDORT";
  document.getElementById("about").innerHTML = "ÜBER UNS";
  document.getElementById("thebest").innerHTML = "DER BESTE RAMEN IN DER STADT";
  document.getElementById("howToOrder").innerHTML = "WIE MAN BESTELLT";
  document.getElementById("pickYourNoodle").innerHTML = "WÄHLE DEINE NUDELN";
  document.getElementById("pickYourBrath").innerHTML = "WÄHLE DEINEN BRATEN";
  document.getElementById("addYourTopping").innerHTML = "WÄHLE DEINE BELÄGE";
  document.getElementById("ourmenu").innerHTML = "UNSERE MENÜS";
  document.getElementById("findus").innerHTML = "HIER FINDEST DU UNS";
}
