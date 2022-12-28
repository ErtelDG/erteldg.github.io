function closeSide() {
   resetBackgrounds();
   document.getElementById("questionmark").classList.remove("d-none");
   document.getElementById("legalNoticeTemplate").classList.add("d-none");
   document.getElementById("privacyTemplate").classList.add("d-none");
   document.getElementById("summaryTemplate").classList.remove("d-none");
   document.getElementById("addTaskTemplate").classList.add("d-none");
   document.getElementById("boardTemplate").classList.add("d-none");
   document.getElementById("contactsTemplate").classList.add("d-none");
   document.getElementById("helpTemplate").classList.add("d-none");
}
