/**
 *
 * function add a new user to the join database
 *
 */
async function addUser() {
   let first_name = document.getElementById("nameFirstNewUser");
   let nameNewUser = document.getElementById("nameNewUser");
   let second_name = document.getElementById("nameNewUser");
   let emailNewUser = document.getElementById("emailNewUser");
   let passwordNewUser = document.getElementById("passwordNewUser");
   checkUsersAndEmailAlreadyExistsOrSaveNewUserInBackend(users, nameNewUser, first_name, second_name, emailNewUser, passwordNewUser);
}

/**
 *
 * function check user email are exists
 *
 * @param {*} users - is the json data from backend
 * @param {*} nameNewUser - name of the new user
 * @param {*} emailNewUser  - email of the new user
 * @param {*} passwordNewUser  - password of the new user
 */
async function checkUsersAndEmailAlreadyExistsOrSaveNewUserInBackend(users, nameNewUser, first_name, second_name, emailNewUser, passwordNewUser) {
   setTimeout(() => hiddenInformation(), 5000);

   // check min. one user exists
   if (users.length == 0) {
      saveNewUserinArray(nameNewUser, first_name, second_name, emailNewUser, passwordNewUser);
      await saveUsersInBackend(users);
      renderYouHaveBeenRegisteredAnimation();
      renderMain();
   } else {
      let userExists = true;
      let userEmailExists = true;
      for (let i = 0; i < users.length; i++) {
         const user = users[i];
         if (user.name == nameNewUser.value) {
            userExists = true;
            showWarningInfoUsernameIsTaken();
            signUpForm();
            break;
         } else {
            userExists = false;
         }
      }

      if (userExists === false) {
         for (let j = 0; j < users.length; j++) {
            const emailUser = users[j].email;
            if (emailUser == emailNewUser.value) {
               userEmailExists = true;
               showWarningInfoEmailIsTaken();
               signUpForm();
               break;
            } else {
               userEmailExists = false;
            }
         }
      }

      if (userExists === false && userEmailExists === false) {
         saveNewUserinArray(nameNewUser, first_name, second_name, emailNewUser, passwordNewUser);
         await saveUsersInBackend(users);
         renderYouHaveBeenRegisteredAnimation();
      }
   }
}

/**
 * function to save new user data in array for to send to the the backend
 *
 * @param {*} nameNewUser - name of the new user
 * @param {*} emailNewUser  - email of the new user
 * @param {*} passwordNewUser  - password of the new user
 * @returns - all parameter are save in array for sending to the backend
 */
function saveNewUserinArray(nameNewUser, first_name, second_name, emailNewUser, passwordNewUser) {
   return users.push({
      name: nameNewUser.value,
      first_name: first_name.value,
      second_name: second_name.value,
      initials: (first_name.value.charAt(0) + second_name.value.charAt(0)).toUpperCase(),
      email: emailNewUser.value,
      password: passwordNewUser.value,
      phone: 0,
      addetAt: new Date().getTime(),
   });
}

/**
 * functione send the updated array to backend in json format
 *
 * @param {*} users - array with all the user data
 */
async function saveUsersInBackend(users) {
   await backend.setItem("users", JSON.stringify(users));
}

/**
 * fuction to show info warning email is taken
 *
 * @returns - remove the hidden warning
 */
function showWarningInfoEmailIsTaken() {
   return document.getElementById("warning-info-email-is-taken").classList.remove("hidden");
}

/**
 * fuction to show info warning username is taken
 *
 * @returns - remove the hidden warning
 */
function showWarningInfoUsernameIsTaken() {
   return document.getElementById("warning-info-username-is-taken").classList.remove("hidden");
}

/**
 * fuction to hidden the info warning email is taken
 *
 * @returns - add the hidden warning
 */
function hiddenWarningInfoEmailIsTaken() {
   if (document.getElementById("warning-info-email-is-taken") != null) {
      return document.getElementById("warning-info-email-is-taken").classList.add("hidden");
   }
}

/**
 * fuction to hidden the info warning username is taken
 *
 * @returns - add the hidden warning
 */
function hiddenWarningInfoUsernameIsTaken() {
   if (document.getElementById("warning-info-username-is-taken") != null) {
      return document.getElementById("warning-info-username-is-taken").classList.add("hidden");
   }
}

/**
 * -function deleted a user
 *
 * @param {*} name - the user who must be deleted
 */
async function deleteUser(name) {
   await backend.deleteItem("users");
}

function hiddenInformation() {
   hiddenWarningInfoUsernameIsTaken();
   hiddenWarningInfoEmailIsTaken();
}
