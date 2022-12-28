let todo = 0;
let inProgress = 0;
let awaitingFeedbackCount = 0;
let done = 0;
let urgentCount = 0;
let nextDeadline;
let currentUser = "Guest";

function renderCounts() {
   setInterval(() => {
      resetcounts();
      checkcounts();
      checkPrior();
      checkLatestDate();
      setcounts();
   }, 500);
}

function showUserName() {
   document.getElementById("my-name").innerHTML = `${currentUser}`;
   if (document.getElementById("summary-greet-top-mobil").innerHTML != null) {
      document.getElementById("summary-greet-top-mobil").innerHTML = `Welcome ${currentUser}`;
   }
}

function checkcounts() {
   for (let i = 0; i < toDosArray.length; i++) {
      switch (toDosArray[i].statusContainer) {
         case "todo":
            todo++;
            break;
         case "todo":
            todo++;
            break;
         case "inProgress":
            inProgress++;
            break;
         case "awaitingFeedback":
            awaitingFeedbackCount++;
            break;
         default:
            done++;
            break;
      }
   }
}

function resetcounts() {
   todo = 0;
   inProgress = 0;
   awaitingFeedbackCount = 0;
   done = 0;
   urgentCount = 0;
}

function checkPrior() {
   for (let i = 0; i < toDosArray.length; i++) {
      if (toDosArray[i].prio == "Urgent") {
         urgentCount++;
      }
   }
}

function setcounts() {
   document.getElementById("tasksInBoard").innerHTML = toDosArray.length;
   document.getElementById("tasksInProgress").innerHTML = inProgress;
   document.getElementById("awaitingFeedbackCount").innerHTML = awaitingFeedbackCount;
   document.getElementById("latestDeadline").innerHTML = nextDeadline;
   document.getElementById("tasksInTodo").innerHTML = todo;
   document.getElementById("tasksInDone").innerHTML = done;
   document.getElementById("urgentTasks").innerHTML = urgentCount;
}

function checkLatestDate() {
   let getNextDeadline = Math.min.apply(
      null,
      duedate.map(function (e) {
         return new Date(e);
      })
   );
   nextDeadline = formatDate(getNextDeadline);
}

function formatDate(nextDeadline) {
   var d = new Date(nextDeadline),
      month = d.getMonth("MMMM") + 1 + ". ",
      day = d.getDate() + ". ",
      year = d.getFullYear();

   if (month.length < 2) month = "0" + month;
   if (day.length < 2) day = "0" + day;

   return [day, month, year].join(" ");
}

function formatDateInput(today) {
   var d = new Date(today),
      month = d.getMonth("MMMM") + 1,
      day = d.getDate(),
      year = d.getFullYear();

   if (month.length < 2) month = "0" + month;
   if (day.length < 2) day = "0" + day;

   return [year, month, day].join("-");
}
