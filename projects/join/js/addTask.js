let toDosArray = [];
let expanded = false;
let categoryOptions = ["Sales", "Design", "Backoffice", "Marketing", "IT", "Media", "New Category"];

function renderOptions() {
   let categoryOptionMenu = document.getElementById("category");
   categoryOptionMenu.innerHTML = " ";
   categoryOptions.forEach((option) => {
      categoryOptionMenu.innerHTML += `<option value="${option}">${option}</option>`;
   });
}

function createNewCategory() {
   console.log("HAlle");
   document.getElementById("category").style.display = "none";
   let headerCategory = document.getElementById("headerCategory");
   headerCategory.innerHTML = " ";
   headerCategory.innerHTML += `<div name="" id="" class="assignedto-popup-new-category"><input id="id-new-category"
                            class="assignedto-popup-new-category-input" placeholder="New Category"></input>
                        <div class="icon-new-cateory" onclick="closeCreateNewCategory()"><img src="../../assets/img/icon_close.png" alt=""
                                class="check-close-icon-img pointer"></div>
                        <div class="icon-new-cateory" onclick="setNewCategory()"><img src="../../assets/img/check.png" alt=""
                                class="check-close-icon-img pointer border-left"></div>
                    </div>`;
}

function closeCreateNewCategory() {
   document.getElementById("category").style.display = "";
   let headerCategory = document.getElementById("headerCategory");
   headerCategory.innerHTML = " ";

   renderOptions();
}

function setNewCategory() {
   let idNewCategory = document.getElementById("id-new-category");
   if (idNewCategory.value != "") {
      categoryOptions.unshift(idNewCategory.value);
      document.getElementById("category").style.display = "";
      let headerCategory = document.getElementById("headerCategory");
      headerCategory.innerHTML = " ";
      renderOptions();
   } else {
      closeCreateNewCategory();
   }
}

/*
 * change bg color of urgent
 */
function changeColorUrgentAddTask() {
   currentPrior = document.getElementById("urgentAddTask").innerText;
   let urgent = document.getElementById("urgentAddTask");
   let medium = document.getElementById("mediumAddTask");
   let low = document.getElementById("lowAddTask");
   urgent.classList.add("urgent-bg-color");
   medium.classList.remove("medium-bg-color");
   low.classList.remove("low-bg-color");
   changeColorUrgentReverseAddTask();
}

function changeColorUrgentReverseAddTask() {
   let changeColorFirst = document.getElementById("mediumFirstAddTask");
   let changeColorSecond = document.getElementById("mediumSecondAddTask");
   changeColorFirst.classList.remove("change-color-img");
   changeColorSecond.classList.remove("change-color-img");
   let changeColorFirstLow = document.getElementById("lowFirstAddTask");
   let changeColorSecondLow = document.getElementById("lowSecondAddTask");
   changeColorFirstLow.classList.remove("change-color-img");
   changeColorSecondLow.classList.remove("change-color-img");
   let changeColorFirstUrgent = document.getElementById("urgentFirstAddTask");
   let changeColorSecondUrgent = document.getElementById("urgentSecondAddTask");
   changeColorFirstUrgent.classList.add("change-color-img");
   changeColorSecondUrgent.classList.add("change-color-img");
}

/*
 * change bg color of medium
 */
function changeColorMediumAddTask() {
   currentPrior = document.getElementById("mediumAddTask").innerText;
   let urgent = document.getElementById("urgentAddTask");
   let medium = document.getElementById("mediumAddTask");
   let low = document.getElementById("lowAddTask");
   urgent.classList.remove("urgent-bg-color");
   medium.classList.add("medium-bg-color");
   low.classList.remove("low-bg-color");
   changeColorMediumReverseAddTask();
}

function changeColorMediumReverseAddTask() {
   let changeColorFirst = document.getElementById("mediumFirstAddTask");
   let changeColorSecond = document.getElementById("mediumSecondAddTask");
   changeColorFirst.classList.add("change-color-img");
   changeColorSecond.classList.add("change-color-img");
   let changeColorFirstLow = document.getElementById("lowFirstAddTask");
   let changeColorSecondLow = document.getElementById("lowSecondAddTask");
   changeColorFirstLow.classList.remove("change-color-img");
   changeColorSecondLow.classList.remove("change-color-img");
   let changeColorFirstUrgent = document.getElementById("urgentFirstAddTask");
   let changeColorSecondUrgent = document.getElementById("urgentSecondAddTask");
   changeColorFirstUrgent.classList.remove("change-color-img");
   changeColorSecondUrgent.classList.remove("change-color-img");
}

/*
 * change bg color of low
 */
function changeColorLowAddTask() {
   currentPrior = document.getElementById("lowAddTask").innerText;
   let urgent = document.getElementById("urgentAddTask");
   let medium = document.getElementById("mediumAddTask");
   let low = document.getElementById("lowAddTask");
   urgent.classList.remove("urgent-bg-color");

   medium.classList.remove("medium-bg-color");
   low.classList.add("low-bg-color");
   changeColorLowReverseAddTask();
}

function changeColorLowReverseAddTask() {
   let changeColorFirst = document.getElementById("mediumFirstAddTask");
   let changeColorSecond = document.getElementById("mediumSecondAddTask");
   changeColorFirst.classList.remove("change-color-img");
   changeColorSecond.classList.remove("change-color-img");
   let changeColorFirstLow = document.getElementById("lowFirstAddTask");
   let changeColorSecondLow = document.getElementById("lowSecondAddTask");
   changeColorFirstLow.classList.add("change-color-img");
   changeColorSecondLow.classList.add("change-color-img");
   let changeColorFirstUrgent = document.getElementById("urgentFirstAddTask");
   let changeColorSecondUrgent = document.getElementById("urgentSecondAddTask");
   changeColorFirstUrgent.classList.remove("change-color-img");
   changeColorSecondUrgent.classList.remove("change-color-img");
}

function addSubtaskAddTask() {
   let input = document.getElementById("subtasksInput");
   if (input.value != "") {
      document.getElementById("subtasksList").innerHTML += `
        <div class="subTaskSubFrame">
            <img id="subtask${subtaskCount}" src="assets/img/addTask_rectangle.png" onclick='changeSubtaskAddTask(${subtaskCount})'>
            <div class="">${input.value}</div>
        </div>`;
      currentSubtasks.push(input.value);
      currentInstance.push("todo");
      subtaskCount + 1;
      input.value = "";
   }
}

function changeSubtaskAddTask(index) {
   let img = document.getElementById(`subtask${index}`);
   if (img.src == "https://erteldg.github.io/projects/join/Join/assets/img/addTask_rectangle.png") {
      currentInstance.splice(index, 1, "done");
      img.src = "assets/img/checkbox.png";
   } else if (img.src == "https://erteldg.github.io/projects/join/Join/assets/img/checkbox.png") {
      img.src = "assets/img/addTask_rectangle.png";
      currentInstance.splice(index, 1, "todo");
   }
}

async function createTodoFromAddTask() {
   await updateArrayTodo();
   currentTitle.value = ``;
   currentDescription.value = ``;
   currentDuedate.value = ``;
   changeColorAfterCreateTask();
   closeForm();
   changePrior();
   subtaskCount = 0;
   index++;
   currentPrior = "Low";
   createTaskNotification();
}

function createTaskNotification() {
   document.getElementById("createNotification").classList.remove("d-none");
   setTimeout(() => {
      document.getElementById("createNotification").classList.add("d-none");
   }, 2000);
}

async function updateArrayTodo() {
   currentTitle = document.getElementById("title");
   currentDescription = document.getElementById("description");
   currentCategory = document.getElementById("category");
   currentDuedate = document.getElementById("duedate");

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
   currentSubtasks = [];
   currentInstance = [];
   currentAssigned = [];
   await saveToDosInBackend(toDosArray);
   updateTasks();
}
/**
 * function to save the new contact in the backend JSON
 *
 * @param {*} toDosArray => new ToDo to save
 */
async function saveToDosInBackend(toDosArray) {
   await backend.setItem("toDos", JSON.stringify(toDosArray));
}

function changeColorAfterCreateTask() {
   let urgent = document.getElementById("urgentAddTask");
   let medium = document.getElementById("mediumAddTask");
   let low = document.getElementById("lowAddTask");
   urgent.classList.remove("change-color-img");
   medium.classList.remove("change-color-img");
   low.classList.remove("change-color-img");
   urgent.classList.remove("urgent-bg-color");
   medium.classList.remove("medium-bg-color");
   low.classList.remove("low-bg-color");
   changeColorAfterCreateTaskReverse();
}

function setAllUserAndContactsToAssigned() {
   allUsersAndContacts = [].concat(contacts, users);
   let assignCount = 0;
   let optionTag = document.getElementById("assignedto");
   optionTag.innerHTML = " ";
   if (!expanded) {
      allUsersAndContacts.forEach((user) => {
         currentAssigned.push("");
         optionTag.innerHTML += `
            <label>
        <input class="inputCheckboxField" type="checkbox" onclick="changeAssign(${assignCount})" id="Check${assignCount}"/>${user.second_name} ${user.first_name}</label>
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

function changeAssign(assignCount) {
   let valueCheck = document.getElementById(`Check${assignCount}`);
   if (valueCheck.checked) {
      currentAssigned.splice(assignCount, 1, allUsersAndContacts[assignCount].second_name);
   } else {
      currentAssigned.splice(assignCount, 1, "");
   }
}
