/**
 * Greate global var für all functions
 *
 */
let renderContain = document.getElementById("renderContain");
let renderContain2 = document.getElementById("renderContain2");

/**
 * This function render the login side
 *
 */
function renderMain() {
   renderContain.innerHTML = "";
   renderContain2.innerHTML = "";
   renderContain.innerHTML += renderFrame156SingUp();
   renderContain.innerHTML += renderFrame153LoginFormular();
   checkStorage();
}

/**
 * This function render the SignUp side
 *
 */
function renderSignUpSide() {
   renderContain.innerHTML = "";
   renderContain.innerHTML += signUpForm();
}

/**
 * This function render the I forgot my password side to send me a Email for reset
 *
 */
function renderIForgotMyPasswordSide() {
   renderContain.innerHTML = "";
   renderContain.innerHTML += renderIforgotmypassword();
}

/**
 * This function render the side who reset the password
 *
 */
function renderResetYourPassword() {
   renderContain.innerHTML = "";
   renderContain.innerHTML += renderResetYourPasswordForm();
}

/**
 * This function show a animation that the passwor is reset. The animation coming down to center up
 *
 */
function resetPasswordAnimation() {
   renderContain.innerHTML += confirmationOfResetPasswordProcessInfo();
   setTimeout(function () {
      init();
   }, 3000);
}

/**
 * This function show a animation that "You have been registered". The animation coming down to center up
 *
 */
function renderYouHaveBeenRegisteredAnimation() {
   renderContain2.innerHTML += youHaveBeenRegisteredAnimation();
   setTimeout(function () {
      renderMain();
   }, 3500);
}
