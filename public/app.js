// Variables that will be used throughout the program
let myLibrary = [];

// class that defines a book (blue print)
class Book {
  constructor(bookName, bookAuthor, totalPages, readOrNot) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.totalPages = totalPages;
    this.readOrNot = readOrNot;
  }
}

/* Firebase variables */

/* Get elements from main.html */
// side bar elements
const navUsernameTitle = document.getElementById("nav-username");
const logoutButton = document.getElementById("logout-btn");
const nameOfBook = document.getElementById("sidebar-book-name");
const nameOfAuthor = document.getElementById("sidebar-book-author");
const numberOfPages = document.getElementById("sidebar-book-pages");
const checkBoxRead = document.getElementById("sidebar-checkbox-read");
const addBookButton = document.getElementById("add-book-btn");
const removeAllBooksButton = document.getElementById("remove-all-books-btn");
const gridContainerDiv = document.getElementById("grid-books-container"); // reference to main grid container

console.log(gridContainerDiv);
/* Event listeners */
logoutButton.addEventListener("click", logoutUserOut);
addBookButton.addEventListener("click", addBookToLibrary);

/* Functions */

// Logout Function
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

// add book to the library function
function addBookToLibrary(e) {
  let bookName = nameOfBook.value;
  let bookAuthor = nameOfAuthor.value;
  let bookPages = numberOfPages.value;
  let isChecked = checkBoxRead.checked;

  if (bookName === "" && bookAuthor === "" && bookPages === "") {
    alert("Please enter all fields before adding a book!");
  } else if (bookName === "") {
    alert("Please enter book name");
  } else if (bookAuthor === "") {
    alert("Please enter book author");
  } else if (bookPages === "") {
    alert("Please enter the number of pages");
  } else {
    const newBook = new Book(bookName, bookAuthor, bookPages, isChecked); // create a new book object
    myLibrary.push(newBook); // add book to list

    let bookItemDiv = document.createElement("div"); // child container of grid (individual book)
    bookItemDiv.className = "book-item";

    // paragraph and icon
    let removeBookText = document.createElement("p"); // parent of icon (removeBookIcon)
    removeBookText.id = "close-icon-text";

    let removeBookIcon = document.createElement("i"); // child of removeBookText
    removeBookIcon.className = "material-icons";
    removeBookIcon.appendChild(document.createTextNode("close"));
    removeBookText.appendChild(removeBookIcon);
    bookItemDiv.appendChild(removeBookText);

    // Book Name div
    let iconTextDiv = document.createElement("div");
    iconTextDiv.className = "icon-text-div";

    let bookText = document.createElement("p");
    let bookIcon = document.createElement("i");
    bookIcon.className = "material-icons";
    bookIcon.appendChild(document.createTextNode("book"));
    bookText.appendChild(bookIcon);

    let titleOfBook = document.createElement("p");
    titleOfBook.appendChild(document.createTextNode(`Name: ${bookName}`));

    iconTextDiv.appendChild(bookText);
    iconTextDiv.appendChild(titleOfBook);

    bookItemDiv.appendChild(iconTextDiv);

    // Author Name div
    let secondIconDiv = document.createElement("div");
    secondIconDiv.className = "icon-text-div";

    let personText = document.createElement("p");
    let personIcon = document.createElement("i");
    personIcon.className = "material-icons";
    personIcon.appendChild(document.createTextNode("person"));
    personText.appendChild(personIcon);

    let titleOfAuthor = document.createElement("p");
    titleOfAuthor.appendChild(
      document.createTextNode(`Author Name: ${bookAuthor}`)
    );

    secondIconDiv.appendChild(personText);
    secondIconDiv.appendChild(titleOfAuthor);

    bookItemDiv.appendChild(secondIconDiv);

    // third
    let thirdIconDiv = document.createElement("div");
    thirdIconDiv.className = "icon-text-div";

    let pagesText = document.createElement("p");
    let pagesIcon = document.createElement("i");
    pagesIcon.className = "material-icons";
    pagesIcon.appendChild(document.createTextNode("tag"));
    pagesText.appendChild(pagesIcon);

    let pagesNumberElement = document.createElement("p");
    pagesNumberElement.appendChild(
      document.createTextNode(`Total Number of pages: ${bookPages}`)
    );

    thirdIconDiv.appendChild(pagesText);
    thirdIconDiv.appendChild(pagesNumberElement);
    bookItemDiv.appendChild(thirdIconDiv);

    let readButton = document.createElement("button");
    readButton.id = "read-status-btn";
    readButton.appendChild(document.createTextNode("Read"));

    bookItemDiv.appendChild(readButton);

    gridContainerDiv.appendChild(bookItemDiv);
  }
}

//if the user is not signed in then redirect them to the login page (index.html) otherwise stay on the main page
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (user.displayName == null) {
      navUsernameTitle.innerHTML = "Welcome!";
    } else {
      navUsernameTitle.innerHTML = "Welcome " + user.displayName;
    }
    console.log(user);
  } else {
    // No user is signed in.
    window.location = "index.html";
  }
});
