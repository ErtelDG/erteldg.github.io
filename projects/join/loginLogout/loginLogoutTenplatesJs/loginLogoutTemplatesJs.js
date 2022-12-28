/**
 * The function render HTML structur and tags
 *
 * @returns - Return the sign up side in HTML
 *
 */
function renderFrame156SingUp() {
   return `
   <!-- start sign up here -->
            <div class="frame156">
               <div class="not-a-join-user">Not a Join user?</div>
               <button class="button-sign-up pointer" onclick="renderSignUpSide()">
                  <div class="sign-up pointer">
                     Sign up
                  </div>
               </button>
            </div>`;
}

/**
 * The function render HTML structur and tags
 *
 * @returns - Return the log in formular side in HTML
 *
 */
function renderFrame153LoginFormular() {
   return `
      <!-- start login formular -->
      <!-- Frame 153 -->
      <div class="frame153">
         <!-- Frame 159 -->
         <div class="frame159">
            <!-- Text Log in -->
            <div class="Log-in">Log in</div>

         </div>

         <!-- Log in v1 -->
         <form class="Log-in-v1" action="" onsubmit="logIn(); return false">
            <!-- Frame 155 -->
            <div class="frame155">
               <!-- Frame14 -->
               <div class="frame14">
                  <!-- Frame157 -->
                  <div class="frame157">
                     <!-- EMail -->
                     <input class="Email" onfocus="this.placeholder=''" onblur="this.placeholder='Email'" type="email"
                        name="" id="emailAccount" placeholder="Email" required>
                     <!-- Vector -->
                     <div>
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M1 0.5H19C19.2652 0.5 19.5196 0.605357 19.7071 0.792893C19.8946 0.98043 20 1.23478 20 1.5V17.5C20 17.7652 19.8946 18.0196 19.7071 18.2071C19.5196 18.3946 19.2652 18.5 19 18.5H1C0.734784 18.5 0.48043 18.3946 0.292893 18.2071C0.105357 18.0196 0 17.7652 0 17.5V1.5C0 1.23478 0.105357 0.98043 0.292893 0.792893C0.48043 0.605357 0.734784 0.5 1 0.5ZM18 4.738L10.072 11.838L2 4.716V16.5H18V4.738ZM2.511 2.5L10.061 9.162L17.502 2.5H2.511Z"
                              fill="#A8A8A8" />
                        </svg>
                     </div>
                  </div>
               </div>
               <!-- info email not available -->
               <div class="warning-info-input1">
                  <div id="warning-info-email-is-not-available" class="warning-info-input-hidden hidden">
                     <div class="warning-info-input-inner-box">
                        <div class="warning-info-input-text">
                           <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 21 22"
                              fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                 d="M19.7218 20.211H19.7289C20.1841 20.211 20.5531 19.842 20.5527 19.3876C20.5527 19.2023 20.492 19.0314 20.3884 18.894L11.211 3.19704C11.0634 2.94235 10.7914 2.78552 10.4969 2.78552C10.2023 2.78552 9.92993 2.94235 9.78267 3.19704L0.557713 18.9754C0.41045 19.2301 0.41045 19.5445 0.557713 19.7995C0.704642 20.0538 0.977365 20.211 1.27189 20.211H19.7218ZM10.5 4.02892L19.4454 19.2647H1.55459L10.5 4.02892ZM10.7476 14.9765L11.0551 11.6557V9.48003H9.89966V11.6748L10.1699 14.9765H10.7476ZM11.1483 15.7113V17.0759H9.8065V15.7113H11.1483Z"
                                 fill="#4B4B4B" />
                           </svg>
                           <div style="margin-left: 1rem;">Email does not exist.</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="frame155">
               <!-- Frame14 -->
               <div class="frame14">
                  <!-- Frame157 -->
                  <div class="frame157">
                     <!-- Password -->
                     <input class="password" type="password" name="" id="passwordAccount" onfocus="this.placeholder=''"
                        onblur="this.placeholder='Password'" placeholder="Password" required>
                     <!-- Vector -->
                     <div>
                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M3 7V6C3 4.4087 3.63214 2.88258 4.75736 1.75736C5.88258 0.632141 7.4087 0 9 0C10.5913 0 12.1174 0.632141 13.2426 1.75736C14.3679 2.88258 15 4.4087 15 6V7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8V20C18 20.2652 17.8946 20.5196 17.7071 20.7071C17.5196 20.8946 17.2652 21 17 21H1C0.734784 21 0.48043 20.8946 0.292893 20.7071C0.105357 20.5196 0 20.2652 0 20V8C0 7.73478 0.105357 7.48043 0.292893 7.29289C0.48043 7.10536 0.734784 7 1 7H3ZM16 9H2V19H16V9ZM8 14.732C7.61872 14.5119 7.32072 14.1721 7.15224 13.7653C6.98376 13.3586 6.9542 12.9076 7.06815 12.4823C7.1821 12.057 7.43319 11.6813 7.78248 11.4132C8.13177 11.1452 8.55973 10.9999 9 10.9999C9.44027 10.9999 9.86823 11.1452 10.2175 11.4132C10.5668 11.6813 10.8179 12.057 10.9319 12.4823C11.0458 12.9076 11.0162 13.3586 10.8478 13.7653C10.6793 14.1721 10.3813 14.5119 10 14.732V17H8V14.732ZM5 7H13V6C13 4.93913 12.5786 3.92172 11.8284 3.17157C11.0783 2.42143 10.0609 2 9 2C7.93913 2 6.92172 2.42143 6.17157 3.17157C5.42143 3.92172 5 4.93913 5 6V7Z"
                              fill="#A8A8A8" />
                        </svg>

                     </div>
                  </div>
               </div>
               <!-- password is wrong -->
               <div class="warning-info-input1">
                  <div id="warning-info-password-is-wrong" class="warning-info-input-hidden hidden">
                     <div class="warning-info-input-inner-box">
                        <div class="warning-info-input-text">
                           <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 21 22"
                              fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                 d="M19.7218 20.211H19.7289C20.1841 20.211 20.5531 19.842 20.5527 19.3876C20.5527 19.2023 20.492 19.0314 20.3884 18.894L11.211 3.19704C11.0634 2.94235 10.7914 2.78552 10.4969 2.78552C10.2023 2.78552 9.92993 2.94235 9.78267 3.19704L0.557713 18.9754C0.41045 19.2301 0.41045 19.5445 0.557713 19.7995C0.704642 20.0538 0.977365 20.211 1.27189 20.211H19.7218ZM10.5 4.02892L19.4454 19.2647H1.55459L10.5 4.02892ZM10.7476 14.9765L11.0551 11.6557V9.48003H9.89966V11.6748L10.1699 14.9765H10.7476ZM11.1483 15.7113V17.0759H9.8065V15.7113H11.1483Z"
                                 fill="#4B4B4B" />
                           </svg>
                           <div style="margin-left: 1rem;">Password is wrong.</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>


            <!-- Frame 158 -->
            <div class="frame158">
               <div class="frame37">
                  <div class="rectangle6">
                     <input type="checkbox" value="lsRememberMe" id="rememberMe" class="rectangle5">
                     <label for="rememberMe" class="remeber-me">Remember me</label>
                  </div>
                  <div onclick="renderIForgotMyPasswordSide()" class="forgotMyPassword pointer">Forgot my password</div>
               </div>
            </div>

            <!-- Frame 176 -->
            <div class="frame176">
               <button class="btn-log-in pointer">
                  <div class="text-log-in">Log in</div>
               </button>
               <button class="btn-guest-log-in pointer" type="button" onclick="logInGuest()">
                  <div class="text-guest-log-in">Guest Log in</div>
               </button>
            </div>

         </form>
      </div>




`;
}

/**
 * The function render HTML structur and tags
 *
 * @returns - Return the forgot my password side to send me a Email for reset in HTML
 *
 */

//

function renderIforgotmypassword() {
   return `
    <!-- start i forgot my password -->
            <!-- Frame 153 -->
            <div class="frame153 frame153Forgotten">
               <!-- Frame 159 -->
               <div class="frame159">
                  <!-- arrow-left-line -->
                  <img class="arrow-left-line pointer" onclick="renderMain()" src="img/arrow-left-line.png" alt="">
                  <!-- Text Log in -->
                  <div class="iForgotMyPassword">I forgot my password</div>
               </div>
               <div class="dontWorry">
                  Don't worry! We will send you an email with the instructions to reset your password.
               </div>
               <!-- I forgot my password -->
               <form class="Log-in-v1 forgotten-Log-in-v1" onSubmit="checkEmail(); return false">
                  <!-- Frame 155 -->
                  <div class="frame155">
                     <!-- Frame14 -->
                     <div class="frame14">
                        <!-- Frame157 -->
                        <div class="frame157">
                           <!-- EMail -->
                           <input class="Email" name="name" onfocus="this.placeholder=''" onblur="this.placeholder='Email'" type="email" name="" id="emailToReset" placeholder="Email"  required>
                           <!-- Vector -->
                           <div>
                              <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                 <path
                                    d="M1 0.5H19C19.2652 0.5 19.5196 0.605357 19.7071 0.792893C19.8946 0.98043 20 1.23478 20 1.5V17.5C20 17.7652 19.8946 18.0196 19.7071 18.2071C19.5196 18.3946 19.2652 18.5 19 18.5H1C0.734784 18.5 0.48043 18.3946 0.292893 18.2071C0.105357 18.0196 0 17.7652 0 17.5V1.5C0 1.23478 0.105357 0.98043 0.292893 0.792893C0.48043 0.605357 0.734784 0.5 1 0.5ZM18 4.738L10.072 11.838L2 4.716V16.5H18V4.738ZM2.511 2.5L10.061 9.162L17.502 2.5H2.511Z"
                                    fill="#A8A8A8" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  </div>


                  <div class="warning-info-input1">
                     <div id="warning-info-email-is-not-available" class="warning-info-input-hidden hidden">
                        <div class="warning-info-input-inner-box">
                           <div class="warning-info-input-text">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 21 22"
                                 fill="none">
                                 <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M19.7218 20.211H19.7289C20.1841 20.211 20.5531 19.842 20.5527 19.3876C20.5527 19.2023 20.492 19.0314 20.3884 18.894L11.211 3.19704C11.0634 2.94235 10.7914 2.78552 10.4969 2.78552C10.2023 2.78552 9.92993 2.94235 9.78267 3.19704L0.557713 18.9754C0.41045 19.2301 0.41045 19.5445 0.557713 19.7995C0.704642 20.0538 0.977365 20.211 1.27189 20.211H19.7218ZM10.5 4.02892L19.4454 19.2647H1.55459L10.5 4.02892ZM10.7476 14.9765L11.0551 11.6557V9.48003H9.89966V11.6748L10.1699 14.9765H10.7476ZM11.1483 15.7113V17.0759H9.8065V15.7113H11.1483Z"
                                    fill="#4B4B4B" />
                              </svg>
                              <div style="margin-left: 1rem;">Email does not exist.</div>
                           </div>
                        </div>
                     </div>
                  </div>


                  <!-- Frame 176 -->
                  <div class="frame176" style="justify-content:center; margin-top:2rem;">
                     <button class="btn-log-in forgotten-btn" type="submit">
                        <div class="text-log-in pointer">Send me the email</div>
                     </button>
                  </div>

               </form>
            </div>`;
}

/**
 * The function render HTML structur and tags
 *
 * @returns - Return the reset password form side in HTML
 *
 */
function renderResetYourPasswordForm() {
   return `
   <!-- start reset your password -->
            <!-- Frame 153 -->
            <div class="frame153">
               <!-- Frame 159 -->
               <div class="frame159">
                  <!-- arrow-left-line -->
                  <img class="arrow-left-line pointer" onclick="renderMain()" src="img/arrow-left-line.png" alt="">
                  <!-- Text Log in -->
                  <div class="reset-your-password">Reset your password</div>
               </div>
               <div class="dontWorry">
                  Change your account password
               </div>
               <!-- I forgot my password -->
               <form class="Log-in-v1" action="">
                  <!-- Frame 155 -->
                  <div class="frame155">
                     <!-- Frame14 -->
                     <div class="frame14 mb-2-5rem">
                        <!-- Frame157 -->
                        <div class="frame157">
                           <!-- Password -->
                           <input class="password" type="password" name="" id="newPassword" onfocus="this.placeholder=''" onblur="this.placeholder='New Password'" placeholder="New password" required>
                        </div>
                     </div>

                     <div class="frame14 mb-2-5rem">
                        <!-- Frame157 -->
                        <div class="frame157">
                           <!-- Password -->
                           <input class="password" type="password" name="" id="confirmPassword" onfocus="this.placeholder=''" onblur="this.placeholder='confirm Password'" placeholder="Confirm password" required>
                        </div>
                     </div>
                     <!-- Frame 176 -->
                     <div class="frame176 frame176-resetPW" style="justify-content:center; margin-top:2rem; width:100%">
                        <button class="btn-log-in pointer">
                           <div class="text-log-in" onclick="resetPasswordAnimation()">Continue</div>
                        </button>
                     </div>
                  </div>
               </form>
            </div>
   `;
}

/**
 * The function render HTML structur and tags
 *
 * @returns - Return animation confirmation reset password information in HTML
 *
 */
function confirmationOfResetPasswordProcessInfo() {
   return `
   <div id="confirmationOfResetPasswordProcess" class="confirmationOfResetPasswordProcess overflow-hidden">
      <img id="imgConfirmationOfResetPasswordProcess" src="img/Frame73.png" alt="" class="frame73 overflow-hidden">
   </div>
   `;
}

/**
 * The function render HTML structur and tags
 *
 * @returns - Return sign up side in HTML
 *
 */
function signUpForm() {
   return `
   <!-- start sign up -->
         <!-- Frame 153 -->
         <div class="frame153">
            <!-- Frame 159 -->
            <div class="frame159 width-80">
               <!-- arrow-left-line -->
               <img class="arrow-left-line pointer" onclick="renderMain()" src="img/arrow-left-line.png" alt="">
               <!-- Text Log in -->
               <div class="sign-up-side">Sign up</div>
            </div>

            <!-- I forgot my password -->
            <form class="Log-in-v1" action="" onsubmit="addUser(); return false;" style="gap: 0px !important;">

 <!-- Frame 155 -->
               <!-- Name -->
               <div class="frame155">
                  <!-- Frame14 -->
                  <div class="frame14">
                     <!-- Frame157 -->
                     <div class="frame157">
                        <!-- EMail -->
                        <input class="Email inputfield-no-border" onfocus="this.placeholder=''"
                           onblur="this.placeholder='First Name'" type="text" minlength="3" maxlength="20" name=""
                           id="nameFirstNewUser" placeholder="First Name" required>
                        <!-- Vector -->
                        <div>
                           <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M4 22.5C4 20.3783 4.84285 18.3434 6.34315 16.8431C7.84344 15.3429 9.87827 14.5 12 14.5C14.1217 14.5 16.1566 15.3429 17.6569 16.8431C19.1571 18.3434 20 20.3783 20 22.5H18C18 20.9087 17.3679 19.3826 16.2426 18.2574C15.1174 17.1321 13.5913 16.5 12 16.5C10.4087 16.5 8.88258 17.1321 7.75736 18.2574C6.63214 19.3826 6 20.9087 6 22.5H4ZM12 13.5C8.685 13.5 6 10.815 6 7.5C6 4.185 8.685 1.5 12 1.5C15.315 1.5 18 4.185 18 7.5C18 10.815 15.315 13.5 12 13.5ZM12 11.5C14.21 11.5 16 9.71 16 7.5C16 5.29 14.21 3.5 12 3.5C9.79 3.5 8 5.29 8 7.5C8 9.71 9.79 11.5 12 11.5Z"
                                 fill="#A8A8A8" />
                           </svg>

                        </div>
                     </div>
                  </div>
                  <!-- info username is already taken -->
                  <div class="warning-info-input1">
                     <div id="" class="warning-info-input-hidden hidden">
                        <div class="warning-info-input-inner-box">
                           <div class="warning-info-input-text">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 21 22"
                                 fill="none">
                                 <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M19.7218 20.211H19.7289C20.1841 20.211 20.5531 19.842 20.5527 19.3876C20.5527 19.2023 20.492 19.0314 20.3884 18.894L11.211 3.19704C11.0634 2.94235 10.7914 2.78552 10.4969 2.78552C10.2023 2.78552 9.92993 2.94235 9.78267 3.19704L0.557713 18.9754C0.41045 19.2301 0.41045 19.5445 0.557713 19.7995C0.704642 20.0538 0.977365 20.211 1.27189 20.211H19.7218ZM10.5 4.02892L19.4454 19.2647H1.55459L10.5 4.02892ZM10.7476 14.9765L11.0551 11.6557V9.48003H9.89966V11.6748L10.1699 14.9765H10.7476ZM11.1483 15.7113V17.0759H9.8065V15.7113H11.1483Z"
                                    fill="#4B4B4B" />
                              </svg>
                              <div style="margin-left: 1rem;">Username is already taken.</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>



               <!-- Frame 155 -->
               <!-- Name -->
               <div class="frame155">
                  <!-- Frame14 -->
                  <div class="frame14">
                     <!-- Frame157 -->
                     <div class="frame157">
                        <!-- EMail -->
                        <input class="Email inputfield-no-border" onfocus="this.placeholder=''"
                           onblur="this.placeholder='Last Name'" type="text" minlength="3" maxlength="20" name=""
                           id="nameNewUser" placeholder="Last Name" required>
                        <!-- Vector -->
                        <div>
                           <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M4 22.5C4 20.3783 4.84285 18.3434 6.34315 16.8431C7.84344 15.3429 9.87827 14.5 12 14.5C14.1217 14.5 16.1566 15.3429 17.6569 16.8431C19.1571 18.3434 20 20.3783 20 22.5H18C18 20.9087 17.3679 19.3826 16.2426 18.2574C15.1174 17.1321 13.5913 16.5 12 16.5C10.4087 16.5 8.88258 17.1321 7.75736 18.2574C6.63214 19.3826 6 20.9087 6 22.5H4ZM12 13.5C8.685 13.5 6 10.815 6 7.5C6 4.185 8.685 1.5 12 1.5C15.315 1.5 18 4.185 18 7.5C18 10.815 15.315 13.5 12 13.5ZM12 11.5C14.21 11.5 16 9.71 16 7.5C16 5.29 14.21 3.5 12 3.5C9.79 3.5 8 5.29 8 7.5C8 9.71 9.79 11.5 12 11.5Z"
                                 fill="#A8A8A8" />
                           </svg>

                        </div>
                     </div>
                  </div>
                  <!-- info username is already taken -->
                  <div class="warning-info-input1">
                     <div id="warning-info-username-is-taken" class="warning-info-input-hidden hidden">
                        <div class="warning-info-input-inner-box">
                           <div class="warning-info-input-text">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 21 22"
                                 fill="none">
                                 <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M19.7218 20.211H19.7289C20.1841 20.211 20.5531 19.842 20.5527 19.3876C20.5527 19.2023 20.492 19.0314 20.3884 18.894L11.211 3.19704C11.0634 2.94235 10.7914 2.78552 10.4969 2.78552C10.2023 2.78552 9.92993 2.94235 9.78267 3.19704L0.557713 18.9754C0.41045 19.2301 0.41045 19.5445 0.557713 19.7995C0.704642 20.0538 0.977365 20.211 1.27189 20.211H19.7218ZM10.5 4.02892L19.4454 19.2647H1.55459L10.5 4.02892ZM10.7476 14.9765L11.0551 11.6557V9.48003H9.89966V11.6748L10.1699 14.9765H10.7476ZM11.1483 15.7113V17.0759H9.8065V15.7113H11.1483Z"
                                    fill="#4B4B4B" />
                              </svg>
                              <div style="margin-left: 1rem;">Username is already taken.</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <!-- Email -->
               <div class="frame155">
                  <!-- Frame14 -->
                  <div class="frame14">
                     <!-- Frame157 -->
                     <div class="frame157">
                        <!-- EMail -->
                        <input class="Email inputfield-no-border" onfocus="this.placeholder=''"
                           onblur="this.placeholder='Email'" type="email" name="" id="emailNewUser" placeholder="Email"
                           required>
                        <!-- Vector -->
                        <div>
                           <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M1 0.5H19C19.2652 0.5 19.5196 0.605357 19.7071 0.792893C19.8946 0.98043 20 1.23478 20 1.5V17.5C20 17.7652 19.8946 18.0196 19.7071 18.2071C19.5196 18.3946 19.2652 18.5 19 18.5H1C0.734784 18.5 0.48043 18.3946 0.292893 18.2071C0.105357 18.0196 0 17.7652 0 17.5V1.5C0 1.23478 0.105357 0.98043 0.292893 0.792893C0.48043 0.605357 0.734784 0.5 1 0.5ZM18 4.738L10.072 11.838L2 4.716V16.5H18V4.738ZM2.511 2.5L10.061 9.162L17.502 2.5H2.511Z"
                                 fill="#A8A8A8" />
                           </svg>
                        </div>
                     </div>
                  </div>
                  <!-- info email is already taken -->
                  <div class="warning-info-input1">
                     <div id="warning-info-email-is-taken" class="warning-info-input-hidden hidden">
                        <div class="warning-info-input-inner-box">
                           <div class="warning-info-input-text">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 21 22"
                                 fill="none">
                                 <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M19.7218 20.211H19.7289C20.1841 20.211 20.5531 19.842 20.5527 19.3876C20.5527 19.2023 20.492 19.0314 20.3884 18.894L11.211 3.19704C11.0634 2.94235 10.7914 2.78552 10.4969 2.78552C10.2023 2.78552 9.92993 2.94235 9.78267 3.19704L0.557713 18.9754C0.41045 19.2301 0.41045 19.5445 0.557713 19.7995C0.704642 20.0538 0.977365 20.211 1.27189 20.211H19.7218ZM10.5 4.02892L19.4454 19.2647H1.55459L10.5 4.02892ZM10.7476 14.9765L11.0551 11.6557V9.48003H9.89966V11.6748L10.1699 14.9765H10.7476ZM11.1483 15.7113V17.0759H9.8065V15.7113H11.1483Z"
                                    fill="#4B4B4B" />
                              </svg>
                              <div style="margin-left: 1rem;">Email is already taken.</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <!-- Frame 155 -->
               <!-- Password -->
               <div class="frame155">
                  <!-- Frame14 -->
                  <div class="frame14">
                     <!-- Frame157 -->
                     <div class="frame157">
                        <!-- EMail -->
                        <input class="Email inputfield-no-border" onfocus="this.placeholder=''"
                           onblur="this.placeholder='Password'" type="password" name="" id="passwordNewUser"
                           placeholder="Password" required>
                        <!-- Vector -->
                        <div>
                           <svg width="18" height="21" viewBox="0 0 18 21" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M3 7V6C3 4.4087 3.63214 2.88258 4.75736 1.75736C5.88258 0.632141 7.4087 0 9 0C10.5913 0 12.1174 0.632141 13.2426 1.75736C14.3679 2.88258 15 4.4087 15 6V7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8V20C18 20.2652 17.8946 20.5196 17.7071 20.7071C17.5196 20.8946 17.2652 21 17 21H1C0.734784 21 0.48043 20.8946 0.292893 20.7071C0.105357 20.5196 0 20.2652 0 20V8C0 7.73478 0.105357 7.48043 0.292893 7.29289C0.48043 7.10536 0.734784 7 1 7H3ZM16 9H2V19H16V9ZM8 14.732C7.61872 14.5119 7.32072 14.1721 7.15224 13.7653C6.98376 13.3586 6.9542 12.9076 7.06815 12.4823C7.1821 12.057 7.43319 11.6813 7.78248 11.4132C8.13177 11.1452 8.55973 10.9999 9 10.9999C9.44027 10.9999 9.86823 11.1452 10.2175 11.4132C10.5668 11.6813 10.8179 12.057 10.9319 12.4823C11.0458 12.9076 11.0162 13.3586 10.8478 13.7653C10.6793 14.1721 10.3813 14.5119 10 14.732V17H8V14.732ZM5 7H13V6C13 4.93913 12.5786 3.92172 11.8284 3.17157C11.0783 2.42143 10.0609 2 9 2C7.93913 2 6.92172 2.42143 6.17157 3.17157C5.42143 3.92172 5 4.93913 5 6V7Z"
                                 fill="#A8A8A8" />
                           </svg>

                        </div>
                     </div>
                  </div>
                  <!-- info email is already taken -->
                  <div style="height: 1.3rem">
                     <div class="">
                        <div class="">
                           <div style="margin-left: 1rem;"></div>
                        </div>
                     </div>
                  </div>
               </div>


               <!-- Frame 176 -->
               <div class="frame176">
                  <button class="btn-log-in">
                     <div class="text-log-in pointer">Sign up</div>
                  </button>
               </div>

            </form>
         </div>
   `;
}

/**
 * The function render HTML structur and tags
 *
 * @returns - Return animation you sign up information in HTML
 *
 */
function youHaveBeenRegisteredAnimation() {
   return `
     <div id="confirmationOfResetPasswordProcess" class="confirmationOfResetPasswordProcess overflow-hidden">
      <img id="imgConfirmationOfResetPasswordProcess" src="img/registrationSuccessful.png" alt="" class="frame73 overflow-hidden">
   </div>
   `;
}

function forgottenPassword() {
   return `
   
            <!-- start reset your password -->
            <!-- Frame 153 -->
            <div class="frame153">
               <!-- Frame 159 -->
               <div class="frame159">
                  <!-- Text Log in -->
                  <div class="reset-your-password">Reset your password</div>
               </div>
               <div class="dontWorry">
                  Change your account password
               </div>
               <!-- I forgot my password -->
               <form class="Log-in-v1" action="" onsubmit="checkNewPassword(); return false">
                  <!-- Frame 155 -->
                  <div class="frame155 width-auto">
                     <!-- Frame14 -->
                     <div class="frame14 width-100">
                        <!-- Frame157 -->
                        <div class="frame157 width-auto">
                           <!-- Password -->
                           <input class="password width-auto pointer" type="password" name="" id="newPassword"
                              onfocus="this.placeholder=''" onblur="this.placeholder='New Password'"
                              placeholder="New password" required="">
                        </div>

                     </div>
                     <!-- info username is already taken -->
                     <div class="warning-info-input1">
                        <div id="warning-info-username-is-taken" class="warning-info-input-hidden hidden">
                           <div class="warning-info-input-inner-box">
                              <div class="warning-info-input-text">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem"
                                    viewBox="0 0 21 22" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                       d="M19.7218 20.211H19.7289C20.1841 20.211 20.5531 19.842 20.5527 19.3876C20.5527 19.2023 20.492 19.0314 20.3884 18.894L11.211 3.19704C11.0634 2.94235 10.7914 2.78552 10.4969 2.78552C10.2023 2.78552 9.92993 2.94235 9.78267 3.19704L0.557713 18.9754C0.41045 19.2301 0.41045 19.5445 0.557713 19.7995C0.704642 20.0538 0.977365 20.211 1.27189 20.211H19.7218ZM10.5 4.02892L19.4454 19.2647H1.55459L10.5 4.02892ZM10.7476 14.9765L11.0551 11.6557V9.48003H9.89966V11.6748L10.1699 14.9765H10.7476ZM11.1483 15.7113V17.0759H9.8065V15.7113H11.1483Z"
                                       fill="#4B4B4B" />
                                 </svg>
                                 <div style="margin-left: 1rem;">Passwords do not match!</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="frame14 width-100">
                        <!-- Frame157 -->
                        <div class="frame157 width-auto">
                           <!-- Password -->
                           <input class="password width-auto pointer" type="password" name="" id="confirmPassword"
                              onfocus="this.placeholder=''" onblur="this.placeholder='confirm Password'"
                              placeholder="Confirm password" required="">
                        </div>
                     </div>
                     <!-- info username is already taken -->
                     <div class="warning-info-input1">
                        <div id="warning-info-username-is-taken" class="warning-info-input-hidden hidden">
                           <div class="warning-info-input-inner-box">
                              <div class="warning-info-input-text">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem"
                                    viewBox="0 0 21 22" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                       d="M19.7218 20.211H19.7289C20.1841 20.211 20.5531 19.842 20.5527 19.3876C20.5527 19.2023 20.492 19.0314 20.3884 18.894L11.211 3.19704C11.0634 2.94235 10.7914 2.78552 10.4969 2.78552C10.2023 2.78552 9.92993 2.94235 9.78267 3.19704L0.557713 18.9754C0.41045 19.2301 0.41045 19.5445 0.557713 19.7995C0.704642 20.0538 0.977365 20.211 1.27189 20.211H19.7218ZM10.5 4.02892L19.4454 19.2647H1.55459L10.5 4.02892ZM10.7476 14.9765L11.0551 11.6557V9.48003H9.89966V11.6748L10.1699 14.9765H10.7476ZM11.1483 15.7113V17.0759H9.8065V15.7113H11.1483Z"
                                       fill="#4B4B4B" />
                                 </svg>
                                 <div style="margin-left: 1rem;">Passwords do not match!</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <!-- Frame 176 -->
                     <div class="frame176 frame176-resetPW" style="justify-content:center; width:100%">
                        <button class="btn-log-in pointer">
                           <div class="text-log-in">Continue</div>
                        </button>
                     </div>
                  </div>
               </form>
            </div>

         </div>
   `;
}
