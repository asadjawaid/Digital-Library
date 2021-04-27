const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click", logoutUserOut);

function logoutUserOut(e) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}

//if the user is not signed in then redirect them to the login page (index.html) otherwise stay on the main page
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
  } else {
    // No user is signed in.
    window.location = "index.html";
  }
});
