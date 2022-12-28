let today = new Date();

/**
 *
 * @param {The Selected Section ('summary', 'board', ...)} choice
 */
function select(choice) {
   let chosen = document.getElementById(choice).classList;
   resetBackgrounds();
   chosen.add("bg-dark");
   loadChoice(choice);
}

function help() {
   resetBackgrounds();
   document.getElementById("questionmark").classList.add("d-none");
   document.getElementById("legalNoticeTemplate").classList.add("d-none");
   document.getElementById("privacyTemplate").classList.add("d-none");
   document.getElementById("summaryTemplate").classList.add("d-none");
   document.getElementById("addTaskTemplate").classList.add("d-none");
   document.getElementById("boardTemplate").classList.add("d-none");
   document.getElementById("contactsTemplate").classList.add("d-none");
   document.getElementById("helpTemplate").classList.remove("d-none");
}

function showLogout() {
   let logout = document.getElementById("landingpageLogout").classList;
   if (logout.contains("d-none")) {
      logout.remove("d-none");
   } else {
      logout.add("d-none");
   }
}

async function loadChoice(choice) {
   switch (choice) {
      case "privacy":
         showPrivacy();
         break;
      case "legalNotice":
         showLegalNotice();
         break;
      case "board":
         showBoard();
         break;
      case "addTask":
         setAllUserAndContactsToAssigned();
         showAddTask();
         closeForm();
         break;
      case "contacts":
         renderContacts();
         showContacts();
         break;
      default:
         showHelp();
         break;
   }
}

function showHelp() {
   document.getElementById("summaryTemplate").classList.remove("d-none");
   document.getElementById("addTaskTemplate").classList.add("d-none");
   document.getElementById("boardTemplate").classList.add("d-none");
   document.getElementById("contactsTemplate").classList.add("d-none");
   document.getElementById("legalNoticeTemplate").classList.add("d-none");
   document.getElementById("helpTemplate").classList.add("d-none");
   document.getElementById("privacyTemplate").classList.add("d-none");
}

function showContacts() {
   document.getElementById("summaryTemplate").classList.add("d-none");
   document.getElementById("addTaskTemplate").classList.add("d-none");
   document.getElementById("boardTemplate").classList.add("d-none");
   document.getElementById("contactsTemplate").classList.remove("d-none");
   document.getElementById("legalNoticeTemplate").classList.add("d-none");
   document.getElementById("helpTemplate").classList.add("d-none");
   document.getElementById("privacyTemplate").classList.add("d-none");
}

function showAddTask() {
   renderOptions();
   document.getElementById("summaryTemplate").classList.add("d-none");
   document.getElementById("addTaskTemplate").classList.remove("d-none");
   document.getElementById("boardTemplate").classList.add("d-none");
   document.getElementById("contactsTemplate").classList.add("d-none");
   document.getElementById("legalNoticeTemplate").classList.add("d-none");
   document.getElementById("helpTemplate").classList.add("d-none");
   document.getElementById("privacyTemplate").classList.add("d-none");
   document.getElementById("duedate").value = formatDateInput(today);
}

function showBoard() {
   updateTasks();
   document.getElementById("summaryTemplate").classList.add("d-none");
   document.getElementById("addTaskTemplate").classList.add("d-none");
   document.getElementById("boardTemplate").classList.remove("d-none");
   document.getElementById("contactsTemplate").classList.add("d-none");
   document.getElementById("legalNoticeTemplate").classList.add("d-none");
   document.getElementById("helpTemplate").classList.add("d-none");
   document.getElementById("privacyTemplate").classList.add("d-none");
}

function showLegalNotice() {
   document.getElementById("summaryTemplate").classList.add("d-none");
   document.getElementById("addTaskTemplate").classList.add("d-none");
   document.getElementById("boardTemplate").classList.add("d-none");
   document.getElementById("contactsTemplate").classList.add("d-none");
   document.getElementById("legalNoticeTemplate").classList.remove("d-none");
   document.getElementById("helpTemplate").classList.add("d-none");
   document.getElementById("privacyTemplate").classList.add("d-none");
}

function showPrivacy() {
   document.getElementById("summaryTemplate").classList.add("d-none");
   document.getElementById("addTaskTemplate").classList.add("d-none");
   document.getElementById("boardTemplate").classList.add("d-none");
   document.getElementById("contactsTemplate").classList.add("d-none");
   document.getElementById("legalNoticeTemplate").classList.add("d-none");
   document.getElementById("helpTemplate").classList.add("d-none");
   document.getElementById("privacyTemplate").classList.remove("d-none");
}

function resetBackgrounds() {
   document.getElementById("summary").classList.remove("bg-dark");
   document.getElementById("board").classList.remove("bg-dark");
   document.getElementById("addTask").classList.remove("bg-dark");
   document.getElementById("contacts").classList.remove("bg-dark");
   document.getElementById("legalNotice").classList.remove("bg-dark");
   document.getElementById("privacy").classList.remove("bg-dark");
   document.getElementById("privacy").classList.remove("d-none");

   document.getElementById("questionmark").classList.remove("d-none");
}

function logOutGuest() {
   window.open("https://erteldg.github.io/projects/join/Join/loginLogout/index.html", "_self");
}
