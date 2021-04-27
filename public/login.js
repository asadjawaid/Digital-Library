const loginButton = document.getElementById("sign-in-google");

loginButton.addEventListener("click", googleLogin);

function googleLogin(e) {
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

// check the state. If the user has signed in before then redirect them to the main page (main.html) otherwise stay on the login page
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // if the user has successfully logged into their google account then redirect them to main.html
    window.location = "main.html";
  }
});
