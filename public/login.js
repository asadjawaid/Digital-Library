// Sign Up Form, input and button
const signUpForm = document.getElementById("sign-up-div");
const nameInputResiter = document.getElementById("name_register");
const emailInputRegister = document.getElementById("email_register");
const passwordInputRegister = document.getElementById("password_register");
const signUpButton = document.getElementById("sign-up-button");

// Sign In Form, input and button
const signInForm = document.getElementById("sign-in-div");
const emailInputLogin = document.getElementById("email_login");
const passwordInputLogin = document.getElementById("password_login");
const loginButton = document.getElementById("sign-in-button");

// google sign in button
const googleLoginButton = document.getElementById("sign-in-google"); // google sign in button

// event listeners
googleLoginButton.addEventListener("click", googleLogin);
signUpButton.addEventListener("click", registerUser);
loginButton.addEventListener("click", loginUser);

// This function shows a pop up menu to to allow the user to login into the website using their google account
function googleLogin(e) {
  e.preventDefault(); // prevent default behavior of submit
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      window.location = "main.html";
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
    });
}

// This function is used to register a user and redirect them to the main page
function registerUser(e) {
  e.preventDefault();
  const userName = nameInputResiter.value;
  const userEmail = emailInputRegister.value;
  const userPassword = passwordInputRegister.value;

  // check if all input is not entered!
  if (userName === "" && userEmail === "" && userPassword === "") {
    window.alert("Please enter your information before registering!");
  } else if (userName === "") {
    window.alert("Please enter your full name before registering!");
  } else if (userEmail === "") {
    window.alert("Please enter your email before registering!");
  } else if (userPassword === "") {
    window.alert("Please enter your password before registering!");
  }
  // it is required the user enters a password greater than 6 characters
  else if (userPassword.length < 6) {
    window.alert("Password must be greater than 6 characters to register!");
  } else {
    // register the user then redirect them to the main page.
    console.log(userName, userEmail, userPassword);
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        const user = firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: userName,
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
          });

        signUpForm.reset(); // clear input fields
        window.location = "main.html"; // redirect the user to the main page
      })
      .catch((error) => {
        var errorCode = error.code;
        console.log(errorCode);
        window.alert("Error registering! Please try again!");
      });
  }
}

// this function is used to login the user into their account and redirect them to the main page
function loginUser(e) {
  e.preventDefault();
  const userEmail = emailInputLogin.value;
  const userPassword = passwordInputLogin.value;

  if (userEmail === "" && userPassword === "") {
    window.alert("Please enter your information before you login!");
  } else if (userEmail === "") {
    window.alert("Please enter your email before you login!");
  } else if (userPassword === "") {
    window.alert("Please enter your password before you login!");
  } else if (userPassword.length < 6) {
    window.alert("Password must be greater than 6 characters to register!");
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        signUpForm.reset(); // clear input fields
        window.location = "main.html"; // redirect the user to the main page
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
      });
  }
}

// check the state. If the user has signed in before then redirect them to the main page (main.html) otherwise stay on the login page
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // if the user has successfully logged into their google account then redirect them to main.html
    window.location = "main.html";
  }
});
