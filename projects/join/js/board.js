let title = [];
let description = [];
let category = [];
let assigned = [];
let duedate = [];
let id = [];
let statusContainer = [];
let prior = [];
let currentTitle;
let currentDescription;
let currentCategory;
let currentAssigned = [];
let currentDuedate;
let currentDraggedElement;
let index = 0;
let currentPrior = "Low";
let currentSubtasks = [];
let currentInstance = [];
let subtaskCount = 0;

/*
 * render todo box
 */
async function createTodoPopup() {
   await updateArrayTodoPopup();
   currentTitle.value = ``;
   currentDescription.value = ``;
   currentDuedate.value = ``;
   changeColorAfterCreateTaskPopup();
   closeForm();
   changePrior();
   // resetCheckboxesPopup();
   subtaskCount = 0;
   index++;
   currentPrior = "Low";
   createTaskNotificationBoard();
}

function createTaskNotificationBoard() {
   document.getElementById("createNotificationBoard").classList.remove("d-none");
   setTimeout(() => {
      document.getElementById("createNotificationBoard").classList.add("d-none");
   }, 2000);
}

/*
 * change color prior in task box
 */
function changePrior() {
   if (currentPrior == "Urgent") {
      let firstImage = document.getElementById("createFirstImg" + index);
      let secondImage = document.getElementById("createSecondImg" + index);
      firstImage.src = "assets/img/board/arrow-urgent.svg";
      secondImage.src = "assets/img/board/arrow-urgent.svg";
      prior.push(currentPrior);
   }
   if (currentPrior == "Medium") {
      let firstImage = document.getElementById("createFirstImg" + index);
      let secondImage = document.getElementById("createSecondImg" + index);
      firstImage.src = "assets/img/board/arrow-medium.svg";
      secondImage.src = "assets/img/board/arrow-medium.svg";
      prior.push(currentPrior);
   }
   if (currentPrior == "Low") {
      let firstImage = document.getElementById("createFirstImg" + index);
      let secondImage = document.getElementById("createSecondImg" + index);
      firstImage.src = "assets/img/board/arrow-low.svg";
      secondImage.src = "assets/img/board/arrow-low.svg";
      prior.push(currentPrior);
   } else {
      currentPrior = "Low";
      prior.push("Low");
   }
}

function changePriorAfterDragAndDrop(i) {
   if (toDosArray[i].prio == "Urgent") {
      let firstImage = document.getElementById("createFirstImg" + i);
      let secondImage = document.getElementById("createSecondImg" + i);
      firstImage.src = "assets/img/board/arrow-urgent.svg";
      secondImage.src = "assets/img/board/arrow-urgent.svg";
   }
   if (toDosArray[i].prio == "Medium") {
      let firstImage = document.getElementById("createFirstImg" + i);
      let secondImage = document.getElementById("createSecondImg" + i);
      firstImage.src = "assets/img/board/arrow-medium.svg";
      secondImage.src = "assets/img/board/arrow-medium.svg";
   }
   if (toDosArray[i].prio == "Low") {
      let firstImage = document.getElementById("createFirstImg" + i);
      let secondImage = document.getElementById("createSecondImg" + i);
      firstImage.src = "assets/img/board/arrow-low.svg";
      secondImage.src = "assets/img/board/arrow-low.svg";
   }
}

/*
 * update todo array from Popup
 */
async function updateArrayTodoPopup() {
   currentTitle = document.getElementById("titlePopup");
   currentDescription = document.getElementById("descriptionPopup");
   currentCategory = document.getElementById("category-popup");
   currentDuedate = document.getElementById("duedatePopup");
   pushTodosArray();
   currentAssigned = [];
   currentSubtasks = [];
   currentInstance = [];
   await saveToDosInBackend(toDosArray);
   updateTasks();
}

function pushTodosArray() {
   toDosArray.push({
      statusContainer: "todo",
      category: currentCategory.value,
      title: currentTitle.value,
      description: currentDescription.value,
      assigned: currentAssigned,
      date: currentDuedate.value,
      prio: currentPrior,
      subtasks: currentSubtasks,
      taskDone: currentInstance,
   });
}

function updateDueDateForSummary() {
   duedate = [];
   for (let i = 0; i < toDosArray.length; i++) {
      let date = toDosArray[i].date;
      duedate.push(date);
   }
}

// Update the Board after a Event
async function updateTasks() {
   let todo = document.getElementById("todo");
   let inProgress = document.getElementById("inProgress");
   let awaitingFeedback = document.getElementById("awaitingFeedback");
   let done = document.getElementById("done");
   resetTasks(todo, inProgress, awaitingFeedback, done);
   for (let i = 0; i < toDosArray.length; i++) {
      orderTasksInCategory(i, todo, inProgress, awaitingFeedback, done);
   }
   updateDueDateForSummary();
   await saveToDosInBackend(toDosArray);
}

function orderTasksInCategory(i, todo, inProgress, awaitingFeedback, done) {
   switch (toDosArray[i].statusContainer) {
      case "todo":
         todo.innerHTML += templateTask(i);
         getTaskValues(i);
         break;
      case "inProgress":
         inProgress.innerHTML += templateTask(i);
         getTaskValues(i);
         break;
      case "awaitingFeedback":
         awaitingFeedback.innerHTML += templateTask(i);
         getTaskValues(i);
         break;
      default:
         done.innerHTML += templateTask(i);
         getTaskValues(i);
         break;
   }
}

function getTaskValues(i) {
   changePriorAfterDragAndDrop(i);
   changeColorOfCategoryAfterDragAndDrop(i);
   getInitials(i);
}

function resetTasks(todo, inProgress, awaitingFeedback, done) {
   todo.innerHTML = "";
   inProgress.innerHTML = "";
   awaitingFeedback.innerHTML = "";
   done.innerHTML = "";
}

function templateTask(i) {
   return /*html*/ `    
      <div id='${i}' draggable="true" ondragstart="startDragging(${i})" class="box" onclick="openTask(${i})">
         <div id="changeColorOfCategoryAfterDragAndDrop${i}" class="category">${toDosArray[i].category}</div>
         <div class="title">${toDosArray[i].title}</div>
         <div class="description">${toDosArray[i].description}</div>
         <div class="assigned-and-prio">
            <div class="assigned-sort-name" id="taskInitials${i}"></div>
                  <div class="prio">
                     <div class="first-arrow"><img id="createFirstImg${i}" src=""></div>
                     <div class="second-arrow"><img id="createSecondImg${i}" src=""></div>
                  </div>
         </div>
      </div>`;
}

function getInitials(i) {
   let taskInitials = document.getElementById(`taskInitials${i}`);
   taskInitials.innerHTML = "";
   for (let x = 0; x < allUsersAndContacts.length; x++) {
      if (toDosArray[i].assigned.includes(allUsersAndContacts[x].second_name)) {
         taskInitials.innerHTML += `<div class="assigned">${allUsersAndContacts[x].initials}</div>`;
      }
   }
}

/*
 * drag and drop a task
 */
function startDragging(id) {
   currentDraggedElement = id;
}

function allowDrop(ev) {
   ev.preventDefault();
}

function moveTo(changeStatus) {
   toDosArray[currentDraggedElement].statusContainer = changeStatus;
   updateTasks();
   saveToDosInBackend(toDosArray);
}

/*
 * delete icon if someone is tiping
 */
function deleteIconInSearchInputField() {
   let line = document.getElementById("line");
   let iconSearch = document.getElementById("iconSearch");

   line.classList.add("d-none");
   iconSearch.classList.add("d-none");
}

/*
 * remove line and icon if inputfield is empty
 */
function loadIconAndLine() {
   let searchTask = document.getElementById("searchTask");
   searchTask = searchTask.value;
   if (searchTask == ``) {
      let line = document.getElementById("line");
      let iconSearch = document.getElementById("iconSearch");

      line.classList.remove("d-none");
      iconSearch.classList.remove("d-none");
   }
}

// Add a Subtask in Board Add Task
function addSubtaskPopup() {
   let input = document.getElementById("addSubtasksInputPopup");
   if (input.value != "") {
      document.getElementById("addSubtasksListPopup").innerHTML += `
        <div class="subTaskSubFrame">
            <img id="subtask${subtaskCount}" src="assets/img/addTask_rectangle.png" onclick="changeSubtaskAddTask(${subtaskCount})">
            <div class="">${input.value}</div>
        </div>`;
      currentSubtasks.push(input.value);
      currentInstance.push("todo");
      subtaskCount += 1;
      input.value = "";
   }
}

/*
 * change bg color of urgent Popup
 */
function changeColorUrgent() {
   currentPrior = document.getElementById("urgentPopup").innerText;
   let urgent = document.getElementById("urgentPopup");
   let medium = document.getElementById("mediumPopup");
   let low = document.getElementById("lowPopup");
   urgent.classList.add("urgent-bg-color");
   medium.classList.remove("medium-bg-color");
   low.classList.remove("low-bg-color");
   changeColorUrgentReverse();
}

function changeColorUrgentReverse() {
   let changeColorFirst = document.getElementById("mediumFirstPopup");
   let changeColorSecond = document.getElementById("mediumSecondPopup");
   changeColorFirst.classList.remove("change-color-img");
   changeColorSecond.classList.remove("change-color-img");
   let changeColorFirstLow = document.getElementById("lowFirstPopup");
   let changeColorSecondLow = document.getElementById("lowSecondPopup");
   changeColorFirstLow.classList.remove("change-color-img");
   changeColorSecondLow.classList.remove("change-color-img");
   let changeColorFirstUrgent = document.getElementById("urgentFirstPopup");
   let changeColorSecondUrgent = document.getElementById("urgentSecondPopup");
   changeColorFirstUrgent.classList.add("change-color-img");
   changeColorSecondUrgent.classList.add("change-color-img");
}

/*
 * change bg color of medium Popup
 */
function changeColorMedium() {
   currentPrior = document.getElementById("mediumPopup").innerText;
   let urgent = document.getElementById("urgentPopup");
   let medium = document.getElementById("mediumPopup");
   let low = document.getElementById("lowPopup");
   urgent.classList.remove("urgent-bg-color");
   medium.classList.add("medium-bg-color");
   low.classList.remove("low-bg-color");
   changeColorMediumReverse();
}

function changeColorMediumReverse() {
   let changeColorFirst = document.getElementById("mediumFirstPopup");
   let changeColorSecond = document.getElementById("mediumSecondPopup");
   changeColorFirst.classList.add("change-color-img");
   changeColorSecond.classList.add("change-color-img");
   let changeColorFirstLow = document.getElementById("lowFirstPopup");
   let changeColorSecondLow = document.getElementById("lowSecondPopup");
   changeColorFirstLow.classList.remove("change-color-img");
   changeColorSecondLow.classList.remove("change-color-img");
   let changeColorFirstUrgent = document.getElementById("urgentFirstPopup");
   let changeColorSecondUrgent = document.getElementById("urgentSecondPopup");
   changeColorFirstUrgent.classList.remove("change-color-img");
   changeColorSecondUrgent.classList.remove("change-color-img");
}

/*
 * change bg color of low Popup
 */
function changeColorLow() {
   currentPrior = document.getElementById("lowPopup").innerText;
   let urgent = document.getElementById("urgentPopup");
   let medium = document.getElementById("mediumPopup");
   let low = document.getElementById("lowPopup");
   urgent.classList.remove("urgent-bg-color");
   medium.classList.remove("medium-bg-color");
   low.classList.add("low-bg-color");
   changeColorLowReverse();
}

function changeColorLowReverse() {
   let changeColorFirst = document.getElementById("mediumFirstPopup");
   let changeColorSecond = document.getElementById("mediumSecondPopup");
   changeColorFirst.classList.remove("change-color-img");
   changeColorSecond.classList.remove("change-color-img");
   let changeColorFirstLow = document.getElementById("lowFirstPopup");
   let changeColorSecondLow = document.getElementById("lowSecondPopup");
   changeColorFirstLow.classList.add("change-color-img");
   changeColorSecondLow.classList.add("change-color-img");
   let changeColorFirstUrgent = document.getElementById("urgentFirstPopup");
   let changeColorSecondUrgent = document.getElementById("urgentSecondPopup");
   changeColorFirstUrgent.classList.remove("change-color-img");
   changeColorSecondUrgent.classList.remove("change-color-img");
}

/*
 * open the pop-up
 */
function openForm() {
   document.getElementById("popup").classList.remove("d-none");
   document.getElementById("popup-window").style.display = "unset";
   document.getElementById("mainContainer").style.opacity = "0.5";
}

function setAllUserAndContactsAssignedToPopup() {
   allUsersAndContacts = [].concat(contacts, users);
   let assignCount = 0;
   let optionTag = document.getElementById("assignedto-popup");
   optionTag.innerHTML = " ";
   if (!expanded) {
      allUsersAndContacts.forEach((user) => {
         currentAssigned.push("");
         optionTag.innerHTML += `
            <label>
        <input class="inputCheckboxField" type="checkbox" onclick="changeAssignPopup(${assignCount + 100})" id="Check2${assignCount}"/>${user.second_name} ${
            user.first_name
         }</label>
`;
         optionTag.style.display = "block";
         expanded = true;
         assignCount += 1;
      });
   } else {
      optionTag.style.display = "none";
      expanded = false;
   }
}

function changeAssignPopup(assignCount) {
   assignCount -= 100;
   let valueCheck = document.getElementById(`Check2${assignCount}`);
   if (valueCheck.checked) {
      currentAssigned.splice(assignCount, 1, allUsersAndContacts[assignCount].second_name);
   } else {
      currentAssigned.splice(assignCount, 1, "");
   }
}

/*
 * close the pop-up
 */
function closeForm() {
   document.getElementById("popup").classList.add("d-none");
   document.getElementById("popup-window").style.display = "none";
   document.getElementById("mainContainer").style.opacity = "unset";
   currentTitle = document.getElementById("title");
   let titlePopup = document.getElementById("titlePopup");
   let descriptionPopup = document.getElementById("descriptionPopup");
   let duedatePopup = document.getElementById("duedatePopup");
   currentDescription = document.getElementById("description");
   currentDuedate = document.getElementById("duedate");
   resetPrioColor();
   setAllUserAndContactsToAssigned();
   //resetCheckboxesAddTask();
   //resetCheckboxesPopup();
   resetValues(titlePopup, descriptionPopup, duedatePopup);
}

function resetValues(titlePopup, descriptionPopup, duedatePopup) {
   currentTitle.value = ``;
   currentDescription.value = ``;
   currentDuedate.value = ``;
   titlePopup.value = ``;
   descriptionPopup.value = ``;
   duedatePopup.value = ``;
}

function resetPrioColor() {
   document.getElementById("addSubtasksInputPopup").value = "";
   document.getElementById("subtasksInput").value = "";
   document.getElementById("subtasksList").innerHTML = "";
   document.getElementById("urgentPopup").classList.remove("urgent-bg-color");
   document.getElementById("mediumPopup").classList.remove("medium-bg-color");
   document.getElementById("lowPopup").classList.remove("low-bg-color");
   document.getElementById("lowFirstPopup").classList.remove("change-color-img");
   document.getElementById("lowSecondPopup").classList.remove("change-color-img");
   document.getElementById("mediumSecondPopup").classList.remove("change-color-img");
   document.getElementById("mediumFirstPopup").classList.remove("change-color-img");
   document.getElementById("urgentFirstPopup").classList.remove("change-color-img");
   document.getElementById("urgentSecondPopup").classList.remove("change-color-img");
   document.getElementById("urgentAddTask").classList.remove("urgent-bg-color");
   document.getElementById("mediumAddTask").classList.remove("medium-bg-color");
   document.getElementById("lowAddTask").classList.remove("low-bg-color");
   document.getElementById("urgentFirstAddTask").classList.remove("change-color-img");
   document.getElementById("urgentSecondAddTask").classList.remove("change-color-img");
   document.getElementById("mediumFirstAddTask").classList.remove("change-color-img");
   document.getElementById("mediumSecondAddTask").classList.remove("change-color-img");
   document.getElementById("lowFirstAddTask").classList.remove("change-color-img");
   document.getElementById("lowSecondAddTask").classList.remove("change-color-img");
}

/*
 * change the prio to the basic form Popup
 */
function changeColorAfterCreateTaskPopup() {
   let urgent = document.getElementById("urgentPopup");
   let medium = document.getElementById("mediumPopup");
   let low = document.getElementById("lowPopup");
   urgent.classList.remove("change-color-img");
   medium.classList.remove("change-color-img");
   low.classList.remove("change-color-img");
   urgent.classList.remove("urgent-bg-color");
   medium.classList.remove("medium-bg-color");
   low.classList.remove("low-bg-color");
   changeColorAfterCreateTaskReverse();
}

function changeColorAfterCreateTaskReverse() {
   let changeColorFirstUrgent = document.getElementById("urgentFirstPopup");
   let changeColorSecondUrgent = document.getElementById("urgentSecondPopup");
   changeColorFirstUrgent.classList.remove("change-color-img");
   changeColorSecondUrgent.classList.remove("change-color-img");
   let changeColorFirst = document.getElementById("mediumFirstPopup");
   let changeColorSecond = document.getElementById("mediumSecondPopup");
   changeColorFirst.classList.remove("change-color-img");
   changeColorSecond.classList.remove("change-color-img");
   let changeColorFirstLow = document.getElementById("lowFirstPopup");
   let changeColorSecondLow = document.getElementById("lowSecondPopup");
   changeColorFirstLow.classList.remove("change-color-img");
   changeColorSecondLow.classList.remove("change-color-img");
}

function changeColorOfCategoryAfterDragAndDrop(i) {
   let categoryAddColor = document.getElementById(`changeColorOfCategoryAfterDragAndDrop${i}`);
   let category = categoryAddColor.innerText;
   if (category == "Sales") {
      categoryAddColor.classList.add("sales");
   }
   if (category == "Design") {
      categoryAddColor.classList.add("design");
   }
   if (category == "Backoffice") {
      categoryAddColor.classList.add("backoffice");
   }
   if (category == "Marketing") {
      categoryAddColor.classList.add("marketing");
   }
   if (category == "IT") {
      categoryAddColor.classList.add("it");
   }
   if (category == "Media") {
      categoryAddColor.classList.add("media");
   }
}

function openTask(i) {
   let openTask = document.getElementById("openTask");
   if (openTask.innerHTML == "") {
      openTask.classList.add("z10");
      openTask.classList.remove("z-1");
      openTask.innerHTML += openTaskTemplate(i);
      openTaskChangePrior(i);
      changeColorOfOpenTask();
      changeColorOfPriorityOpenTask();
      showAssignedTo(i);
      showSubtasks(i);
   }
}

function showSubtasks(i) {
   let subtasks = document.getElementById("openTaskSubtasks");
   subtasks.innerHTML = "";
   for (let x = 0; x < toDosArray[i].subtasks.length; x++) {
      subtasks.innerHTML += subtaskTeplateForOpenTask(i, x);
      if (toDosArray[i].taskDone[x] == "todo") {
         document.getElementById(`doneOrTodo${x}`).src = "assets/img/addTask_rectangle.png";
      } else {
         document.getElementById(`doneOrTodo${x}`).src = "assets/img/checkbox.png";
      }
   }
}

function subtaskTeplateForOpenTask(i, x) {
   return /*html*/ `
   <div class="subTaskSubFrame">
      <img id="doneOrTodo${x}" src="">
      <div class="">${toDosArray[i].subtasks[x]}</div>
   </div>
   `;
}

function subtaskTemplate(i, x) {
   return /*html*/ `
   <div class="subTaskSubFrame">
      <img id="subtaskInstance${x}" src="assets/img/addTask_rectangle.png" onclick="subtaskDone(${i}, ${x})">
      <div class="">${toDosArray[i].subtasks[x]}</div>
   </div>
   `;
}

function subtaskDone(i, x) {
   if (toDosArray[i].taskDone[x] == "todo") {
      document.getElementById(`subtaskInstance${x}`).src = "assets/img/checkbox.png";
      toDosArray[i].taskDone[x] = "done";
   } else {
      document.getElementById(`subtaskInstance${x}`).src = "assets/img/addTask_rectangle.png";
      toDosArray[i].taskDone[x] = "todo";
   }
}

function showAssignedTo(i) {
   for (let y = 0; y < allUsersAndContacts.length; y++) {
      if (allUsersAndContacts[y].second_name == toDosArray[i].assigned[y]) {
         document.getElementById("openTaskAssignedToContainer").innerHTML += openTaskAssignedToTemplate(i, y);
      }
   }
}

function openTaskTemplate(i) {
   return /*html*/ `
    <div class="openTaskMain" id="openTaskMain">
        <img class="openTaskCloseImg" src="img/clear.png" alt="close" onclick="openTaskClose()">
        <div class="openTaskCategory" id="openTaskCategory">${toDosArray[i].category}</div>
        <p class="openTaskTitle" id="openTaskTitle">${toDosArray[i].title}</p>
        <p class="openTaskDescription" id="openTaskDescription">${toDosArray[i].description}</p>
        <div class="openTaskDueDateFrame">
            <p class="openTaskDueDate">Due date:</p>
            <p class="openTaskDueDateValue" id="openTaskDueDateValue">${toDosArray[i].date}</p>
        </div>
        <div class="openTaskPrioFrame">
            <p class="openTaskPrio">Priority:</p>
            <div class="openTaskPrioValue" id="openTaskPrioValue">
                <p class="openTaskPrioText" id="openTaskPrioText">${toDosArray[i].prio}</p>
                <div class="openTaskPrioArrowFrame">
                    <div class="openTaskFirst-arrow "><img class="openTaskPriorImgFirst change-color-img" id="openTaskCreateFirstImg${i}" src=""></div>
                    <div class="openTaskSecond-arrow"><img class="openTaskPriorImgSecond change-color-img" id="openTaskCreateSecondImg${i}" src=""></div>
                </div>
            </div>
        </div>
        <p class="openTaskAssignedTo">Assigned To:</p>
        <div id="openTaskAssignedToContainer"></div>
        <p class="openTaskSubtasks">Subtasks:</p>
        <div id="openTaskSubtasks" class="openTaskSubtasksContainer"></div>
        <img class="openTrashChangeImg" id="openTaskTrashImg" onclick="trashTask(${i})" src="img/trash-2-32.png" alt="change">
        <img class="openTaskChangeImg" id="openTaskChangeImg" onclick="changeTask(${i})" src="img/changeButton.png" alt="change">
    </div>`;
}

function openTaskChangePrior(i) {
   let priority = toDosArray[i].prio;
   if (priority == "Urgent") {
      document.getElementById("openTaskCreateFirstImg" + [i]).src = "assets/img/board/arrow-low.svg";
      document.getElementById("openTaskCreateSecondImg" + [i]).src = "assets/img/board/arrow-low.svg";
      currentPrior = toDosArray[i].prio;
   }
   if (priority == "Medium") {
      document.getElementById("openTaskCreateFirstImg" + [i]).src = "assets/img/board/arrow-medium.svg";
      document.getElementById("openTaskCreateSecondImg" + [i]).src = "assets/img/board/arrow-medium.svg";
      currentPrior = toDosArray[i].prio;
   }
   if (priority == "Low") {
      document.getElementById("openTaskCreateFirstImg" + [i]).src = "assets/img/board/arrow-urgent.svg";
      document.getElementById("openTaskCreateSecondImg" + [i]).src = "assets/img/board/arrow-urgent.svg";
      currentPrior = toDosArray[i].prio;
   } else {
      priority = "Low";
   }
}

function openTaskClose() {
   let openTask = document.getElementById("openTask");
   openTask.innerHTML = "";
   openTask.classList.remove("z10");
   openTask.classList.add("z-1");
   document.getElementById("openTask").classList.remove("gap-0");
}

function openTaskAssignedToTemplate(i, y) {
   return /*html*/ `
    <div class="openTaskAssignedToFrame" id="openTaskAssignedToFrame">
        <div class="openTaskAssignedToInitials" id="initials">${allUsersAndContacts[y].initials}</div>
        <p class="openTaskAssignedToName" id="fullName">${getFirstName(i, y)} ${getSecondName(i, y)}</p>
    </div>
    `;
}

function getSecondName(i, y) {
   for (let x = 0; x < allUsersAndContacts.length; x++) {
      if (allUsersAndContacts[x].second_name == toDosArray[i].assigned[y]) {
         return allUsersAndContacts[x].second_name;
      }
   }
}

function getFirstName(i, y) {
   for (let x = 0; x < allUsersAndContacts.length; x++) {
      if (allUsersAndContacts[x].second_name == toDosArray[i].assigned[y]) {
         return allUsersAndContacts[x].first_name;
      }
   }
}

function changeColorOfOpenTask() {
   let categoryAddColor = document.getElementById("openTaskCategory");
   let category = categoryAddColor.innerText;
   if (category == "Sales") {
      categoryAddColor.classList.add("sales");
   }
   if (category == "Design") {
      categoryAddColor.classList.add("design");
   }
   if (category == "Backoffice") {
      categoryAddColor.classList.add("backoffice");
   }
   if (category == "Marketing") {
      categoryAddColor.classList.add("marketing");
   }
   if (category == "IT") {
      categoryAddColor.classList.add("it");
   }
   if (category == "Media") {
      categoryAddColor.classList.add("media");
   }
}

function changeColorOfPriorityOpenTask() {
   let prio = document.getElementById("openTaskPrioText");
   let color = document.getElementById("openTaskPrioValue");
   switch (prio.innerHTML) {
      case "Urgent":
         color.classList.add("bg-red");
         break;
      case "Medium":
         color.classList.add("bg-orange");
         break;
      default:
         color.classList.add("bg-green");
         break;
   }
}

function loadColorOpenTaskPrior(prio) {
   switch (prio) {
      case "Urgent":
         document.getElementById("openTaskChangeUrgent").classList.add("bg-red");
         document.getElementById("openTaskChangeUrgent").classList.add("color-white");
         document.getElementById("urgentFirstOpenTask").classList.add("change-color-img");
         document.getElementById("urgentSecondOpenTask").classList.add("change-color-img");
         break;
      case "Medium":
         document.getElementById("openTaskChangeMedium").classList.add("bg-orange");
         document.getElementById("openTaskChangeMedium").classList.add("color-white");
         document.getElementById("mediumFirstOpenTask").classList.add("change-color-img");
         document.getElementById("mediumSecondOpenTask").classList.add("change-color-img");
         break;
      default:
         document.getElementById("openTaskChangeLow").classList.add("bg-green");
         document.getElementById("openTaskChangeLow").classList.add("color-white");
         document.getElementById("lowFirstOpenTask").classList.add("change-color-img");
         document.getElementById("lowSecondOpenTask").classList.add("change-color-img");
         break;
   }
}

function changeTask(i) {
   let title = document.getElementById("openTaskTitle").innerHTML;
   let description = document.getElementById("openTaskDescription").innerHTML;
   let dueToDate = document.getElementById("openTaskDueDateValue").innerHTML;
   let prio = document.getElementById("openTaskPrioText").innerHTML;
   document.getElementById("openTaskMain").innerHTML = changeTaskTemplate(title, description, dueToDate, i);
   document.getElementById("openTaskMain").classList.add("gap-0");
   loadColorOpenTaskPrior(prio);
   setAllUserAndContactsToChangeTask();
   showSubtasksInChangeTask(i);
}

function changeColorUrgentOpenTask() {
   document.getElementById("openTaskChangeUrgent").classList.add("bg-red");
   document.getElementById("openTaskChangeUrgent").classList.add("color-white");
   document.getElementById("urgentFirstOpenTask").classList.add("change-color-img");
   document.getElementById("urgentSecondOpenTask").classList.add("change-color-img");
   document.getElementById("openTaskChangeMedium").classList.remove("bg-orange");
   document.getElementById("openTaskChangeMedium").classList.remove("color-white");
   document.getElementById("mediumFirstOpenTask").classList.remove("change-color-img");
   document.getElementById("mediumSecondOpenTask").classList.remove("change-color-img");
   document.getElementById("openTaskChangeLow").classList.remove("bg-green");
   document.getElementById("openTaskChangeLow").classList.remove("color-white");
   document.getElementById("lowFirstOpenTask").classList.remove("change-color-img");
   document.getElementById("lowSecondOpenTask").classList.remove("change-color-img");
   currentPrior = "Urgent";
}

function changeColorMediumOpenTask() {
   document.getElementById("openTaskChangeUrgent").classList.remove("bg-red");
   document.getElementById("openTaskChangeUrgent").classList.remove("color-white");
   document.getElementById("urgentFirstOpenTask").classList.remove("change-color-img");
   document.getElementById("urgentSecondOpenTask").classList.remove("change-color-img");
   document.getElementById("openTaskChangeMedium").classList.add("bg-orange");
   document.getElementById("openTaskChangeMedium").classList.add("color-white");
   document.getElementById("mediumFirstOpenTask").classList.add("change-color-img");
   document.getElementById("mediumSecondOpenTask").classList.add("change-color-img");
   document.getElementById("openTaskChangeLow").classList.remove("bg-green");
   document.getElementById("openTaskChangeLow").classList.remove("color-white");
   document.getElementById("lowFirstOpenTask").classList.remove("change-color-img");
   document.getElementById("lowSecondOpenTask").classList.remove("change-color-img");
   currentPrior = "Medium";
}

function changeColorLowOpenTask() {
   document.getElementById("openTaskChangeUrgent").classList.remove("bg-red");
   document.getElementById("openTaskChangeUrgent").classList.remove("color-white");
   document.getElementById("urgentFirstOpenTask").classList.remove("change-color-img");
   document.getElementById("urgentSecondOpenTask").classList.remove("change-color-img");
   document.getElementById("openTaskChangeMedium").classList.remove("bg-orange");
   document.getElementById("openTaskChangeMedium").classList.remove("color-white");
   document.getElementById("mediumFirstOpenTask").classList.remove("change-color-img");
   document.getElementById("mediumSecondOpenTask").classList.remove("change-color-img");
   document.getElementById("openTaskChangeLow").classList.add("bg-green");
   document.getElementById("openTaskChangeLow").classList.add("color-white");
   document.getElementById("lowFirstOpenTask").classList.add("change-color-img");
   document.getElementById("lowSecondOpenTask").classList.add("change-color-img");
   currentPrior = "Low";
}

async function addChanges(i) {
   let newtitle = document.getElementById("changeTaskTitle").value;
   let newdescription = document.getElementById("changeTaskDescription").value;
   let newdate = document.getElementById("changeTaskDate").value;
   let newCategory = document.getElementById("changeTaskCategory").value;
   toDosArray[i].title = newtitle;
   toDosArray[i].description = newdescription;
   toDosArray[i].duedate = newdate;
   toDosArray[i].prio = currentPrior;
   toDosArray[i].assigned = currentAssigned;
   toDosArray[i].category = newCategory;
   openTaskClose();
   await saveToDosInBackend(toDosArray);
   updateTasks();
}

function changeTaskShowAssignedTo(i) {
   document.getElementById("changeTaskAssignedToContainer").innerHTML += openTaskAssignedToTemplate(i);
}

function changeTaskTemplate(title, description, dueToDate, i) {
   return /*html*/ `
      <p class="changeTaskP">Title</p>
      <input class="title-popup" id="changeTaskTitle" type="text" value="${title}" placeholder="Enter a title">
      <p class="changeTaskP">Description</p>
      <textarea  class="description-popup min-h-6" id="changeTaskDescription" type="text" placeholder="Enter a Description">${description}</textarea>
      <p class="changeTaskP">Due date</p>
      <input id="changeTaskDate" class="duedate-popup min-h-6" type="date" name="" id="" value="${dueToDate}" placeholder="dd/mm/yyyy">
      <p class="changeTaskP">Prio</p>
      <div class="prioChangeTask">
         <div id="openTaskChangeUrgent" onclick="changeColorUrgentOpenTask()" class="urgent-popup">
               Urgent
               <div class="urgent-popup-child">
                  <div class="position-urgent-arrow-popup-first"><img id="urgentFirstOpenTask" src="assets/img/board/arrow-urgent.svg"></div>
                  <div class="position-urgent-arrow-popup-second"><img id="urgentSecondOpenTask" src="assets/img/board/arrow-urgent.svg"></div>
               </div>
         </div>
         <div id="openTaskChangeMedium" onclick="changeColorMediumOpenTask()" class="medium-popup">
               Medium
               <div class="medium-popup-child">
                  <div class="positionMediumChangeTaskFirst"><img id="mediumFirstOpenTask" src="assets/img/board/arrow-medium.svg"></div>
                  <div class="positionMediumChangeTaskSecond"><img id="mediumSecondOpenTask" src="assets/img/board/arrow-medium.svg"></div>
               </div>
         </div>
         <div id="openTaskChangeLow" onclick="changeColorLowOpenTask()" class="low-popup">
               Low
               <div class="low-popup-child">
                  <div class="positionLowChangeTaskFirst"><img id="lowFirstOpenTask" src="assets/img/board/arrow-low.svg"></div>
                  <div class="positionLowChangeTaskSecond"><img id="lowSecondOpenTask" src="assets/img/board/arrow-low.svg"></div>
               </div>
         </div>
      </div>
      <p class="changeTaskP">Assigned to</p>
      <div class="assignedto-popup" id="changeTaskAssingedToSelect"></div>
      <p class="changeTaskP">Subtasks</p>
      <div id="changeTaskSubtasks"></div>
      <img class="addChanges" src="img/checkmark-48.png" alt="OK" onclick="addChanges(${i})">
      <p class="changeTaskP">Category</p>
      <select class="category-popup margin-bottom" id="changeTaskCategory">
         <option value="Sales">Sales</option>
         <option value="Design">Design</option>
         <option value="Backoffice">Backoffice</option>
         <option value="Marketing">Marketing</option>
         <option value="IT">IT</option>
         <option value="Media">Media</option>
      </select>
      `;
}

function showSubtasksInChangeTask(i) {
   let subtasks = document.getElementById("changeTaskSubtasks");
   subtasks.innerHTML = "";
   for (let x = 0; x < toDosArray[i].subtasks.length; x++) {
      subtasks.innerHTML += subtaskTemplate(i, x);
   }
}

function setAllUserAndContactsToChangeTask() {
   allUsersAndContacts = [].concat(contacts, users);
   let assignCount = 0;
   let optionTag = document.getElementById("changeTaskAssingedToSelect");
   optionTag.innerHTML = " ";
   if (!expanded) {
      allUsersAndContacts.forEach((user) => {
         currentAssigned.push("");
         optionTag.innerHTML += `
            <label>
        <input class="inputCheckboxField" type="checkbox" onclick="changeAssignPopup(${assignCount + 100})" id="Check2${assignCount}"/>${user.second_name} ${
            user.first_name
         }</label>
`;
         optionTag.style.display = "block";
         expanded = true;
         assignCount += 1;
      });
   } else {
      optionTag.style.display = "none";
      expanded = false;
   }
}

function changeAssingnChangeTask(assignCount) {
   let img = document.getElementById(`changeTaskAssignedToCheckbox${assignCount}`);
   if (img.src == "https://erteldg.github.io/projects/join/Join/assets/img/addTask_rectangle.png") {
      currentAssigned.splice(assignCount, 1, allUsersAndContacts[assignCount].second_name);
      img.src = "assets/img/checkbox.png";
   } else if (img.src == "https://erteldg.github.io/projects/join/Join/assets/img/checkbox.png") {
      img.src = "assets/img/addTask_rectangle.png";
      currentAssigned.splice(assignCount, 1, "");
   }
}

function filterTasks() {
   let input = document.getElementById("searchTask");
   inputLower = input.value.toLowerCase();
   for (let i = 0; i < toDosArray.length; i++) {
      if (!toDosArray[i].title.toLowerCase().includes(inputLower)) {
         document.getElementById(`${i}`).classList.add("d-none");
      } else {
         document.getElementById(`${i}`).classList.remove("d-none");
      }
   }
}

async function trashTask(num) {
   toDosArray.splice(num, 1);
   openTaskClose();
   await saveToDosInBackend(toDosArray);
   updateTasks();
}
