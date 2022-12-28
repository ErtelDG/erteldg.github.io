let users = [];
let currentUserFirstname = "";
let rmCheck;
let emailInput;
let emailReset;

setURL("https://erteldg.github.io/projects/join/smallest_backend_ever");

/**
 * loading all data from the backend
 *
 */
async function init() {
   await downloadFromServer();
   users = JSON.parse(backend.getItem("users")) || [];
   currentUserFirstname = JSON.parse(backend.getItem("currentUserFirstname")) || [];
   renderMain();
}

/**
 * function check local storage have data
 *
 */
function checkStorage() {
   rmCheck = document.getElementById("rememberMe");
   emailInput = document.getElementById("emailAccount");

   /**
    *function check local storage have user login data or not
    *
    */
   if (localStorage.checkbox && localStorage.checkbox !== "") {
      rmCheck.setAttribute("checked", "checked");
      emailInput.value = localStorage.username;
   } else {
      rmCheck.removeAttribute("checked");
      emailInput.value = "";
   }
}

/**
 *function check remeber me checkbox is activate or not
 *
 */
function lsRememberMe() {
   if (rmCheck.checked && emailInput.value !== "") {
      localStorage.username = emailInput.value;
      localStorage.checkbox = rmCheck.value;
   } else {
      localStorage.username = "";
      localStorage.checkbox = "";
   }
}

// -------------------------------
async function logIn() {
   lsRememberMe();

   let logInEmail = document.getElementById("emailAccount");
   let logInPassword = document.getElementById("passwordAccount");

   setTimeout(function () {
      document.getElementById("warning-info-password-is-wrong").classList.add("hidden");
      document.getElementById("warning-info-email-is-not-available").classList.add("hidden");
   }, 5000);

   let userExists = false;

   if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
         const user = users[i];
         if (user.email == logInEmail.value) {
            userExists = true;
            if (user.password == logInPassword.value) {
               userPasswordCorrectForwardOntoLandingPage(user);
               break;
            } else {
               document.getElementById("warning-info-password-is-wrong").classList.remove("hidden");
               break;
            }
         }
      }
   } else {
      renderSignUpSide();
   }
   if (userExists === false) {
      document.getElementById("warning-info-email-is-not-available").classList.remove("hidden");
   }
}

async function userPasswordCorrectForwardOntoLandingPage(user) {
   currentUserFirstname = user.first_name;
   await saveCurrentUserFirstnameInBackend(currentUserFirstname);
   forwardOntoLandingPage();
}

function forwardOntoLandingPage() {
   setTimeout(() => {
      window.location.replace("../landingpage.html");
   }, 1000);
}

async function logInGuest() {
   currentUserFirstname = "Guest";
   await saveCurrentUserFirstnameInBackend(currentUserFirstname);
   window.open("../landingpage.html", "_self");
}
// -------------------------------
function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {}
}

/**
 * functione send the updated array to backend in json format
 *
 * @param {*} currentUserFirstname - the current log in user
 */
async function saveCurrentUserFirstnameInBackend(currentUserFirstname) {
   await backend.setItem("currentUserFirstname", JSON.stringify(currentUserFirstname));
}

/**
 * function check the email exists or not for reset
 *
 * @returns true => email exists or false => email not exists
 */
function checkEmail() {
   let emailCheck = document.getElementById("emailToReset").value;
   let valueExists = false;

   for (let k = 0; k < users.length; k++) {
      const user = users[k];
      if (user.email == emailCheck) {
         emailReset = k;
         valueExists = true;
         break;
      }
   }

   if (valueExists == true) {
      let renderContain = document.getElementById("renderContain");
      renderContain.innerHTML = forgottenPassword();
      return true;
   } else {
      document.getElementById("warning-info-email-is-not-available").classList.remove("hidden");
      setTimeout(function () {
         document.getElementById("warning-info-email-is-not-available").classList.add("hidden");
      }, 2000);
      return false;
   }
}

async function checkNewPassword() {
   let newPassword = document.getElementById("newPassword").value;
   let confirmPassword = document.getElementById("confirmPassword").value;
   if (newPassword == confirmPassword) {
      users[emailReset].password = newPassword;
      await saveUsersInBackend(users);
      resetPasswordAnimation();
   } else {
      console.log("Beide nicht gleich");
      document.getElementById("warning-info-username-is-taken").classList.remove("hidden");
      setTimeout(function () {
         document.getElementById("warning-info-username-is-taken").classList.add("hidden");
      }, 2000);
   }
}
