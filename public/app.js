// Variables that will be used throughout the program
let myLibrary = [];
let totalBooksRead = 0;
let totalBooksNotRead = 0;

// class that defines a book (blue print)
class Book {
  constructor(bookName, bookAuthor, totalPages, readOrNot) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.totalPages = totalPages;
    this.readOrNot = readOrNot;
  }

  get getterBookName() {
    return this.bookName;
  }

  get getterBookAuthor() {
    return this.bookAuthor;
  }

  get getterTotalPages() {
    return this.totalPages;
  }

  get getterReadOrNot() {
    return this.readOrNot;
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
const libTotalBooks = document.getElementById("total-books");
const libTotalBooksRead = document.getElementById("total-books-read");
const libTotalNotRead = document.getElementById("total-books-notread");

/* Event listeners */
logoutButton.addEventListener("click", logoutUserOut);
addBookButton.addEventListener("click", addBookToLibrary);
gridContainerDiv.addEventListener("click", removeBook); // used for removing a book
removeAllBooksButton.addEventListener("click", removeAllBooks);

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

    if (!isChecked) {
      readButton.style.backgroundColor = "#EA4335";
      readButton.appendChild(document.createTextNode("Not Read"));
    } else {
      readButton.appendChild(document.createTextNode("Read"));
    }
    bookItemDiv.appendChild(readButton);

    gridContainerDiv.appendChild(bookItemDiv);

    updateLibraryLog();
    // reset values and remove from form
    nameOfBook.value = "";
    nameOfAuthor.value = "";
    numberOfPages.value = "";
    checkBoxRead.checked = false;
  }
}

// kind of works but needs fixing for duplicate value to totalBooksNotRead
function updateLibraryLog() {
  let totalCurrentBooks = myLibrary.length;

  // iterate over each book object and check if they read the current book. If they read the book, increment totalBooksRead and vice versa.
  myLibrary.forEach((currentBook) => {
    if (currentBook.getterReadOrNot) {
      totalBooksRead++;
    } else {
      totalBooksNotRead++;
    }
  });

  // update ui
  libTotalBooks.innerHTML = `Total Books: ${totalCurrentBooks}`;
  libTotalBooksRead.innerHTML = `Total book(s) read: ${totalBooksRead}`;
  libTotalNotRead.innerHTML = `Total book(s) not read: ${totalBooksNotRead}`;

  // reset back to zero
  totalBooksRead = 0;
  totalBooksNotRead = 0;
}

// using event delegation by adding event listener to grid container then finding remove button
function removeBook(e) {
  // get the entire sentence: "Name: ..."
  let pNode = e.target.parentElement.parentElement.childNodes[1].childNodes[1];

  // check if the icon has a parent with an id of "close-icon-text"
  if (e.target.parentElement.id === "close-icon-text") {
    if (confirm("Are you sure you want to remove this book?")) {
      // select the book-item div and remove the div
      let bookToRemove = e.target.parentElement.parentElement;
      let bookElements = Array.from(gridContainerDiv.children); // convert grid elements to array
      let bookIndex = bookElements.indexOf(bookToRemove); // index of current book

      // if the button is set as Read then get the number of books read from the text and
      // decrement it by one
      if (bookToRemove.lastElementChild.textContent === "Read") {
        let booksRead = parseInt(
          libTotalBooksRead.textContent.split(":")[1].trim()
        );
        totalBooksRead = booksRead - 1;
        libTotalBooksRead.innerHTML = `Total book(s) to read: ${totalBooksRead}`;
      }
      // if the button is set as Not Read then get the number of books not read from the text and
      // decrement it by one
      else if (bookToRemove.lastElementChild.textContent === "Not Read") {
        let notRead = parseInt(
          libTotalNotRead.textContent.split(":")[1].trim()
        );
        totalBooksNotRead = notRead - 1;
        libTotalNotRead.innerHTML = `Total book(s) not read: ${totalBooksNotRead}`;
      }
      bookToRemove.remove(); // remove book from ui

      // remove the object from the array
      myLibrary.forEach((currentBook, index) => {
        // if the book to delete has the same index as the current book then remove from array (myLibrary)
        if (bookIndex === index) {
          myLibrary.splice(index, 1); // remove from array
        }
      });
      libTotalBooks.innerHTML = `Total Books: ${myLibrary.length}`; // update total books
    }
  }
}

function removeAllBooks(e) {
  if (confirm("Are you sure you want to remove all books?")) {
    if (myLibrary.length === 0) {
      alert("Error! You have no books in your library!");
    } else {
      // iterates over each child in the grid container and removes the first child.
      while (gridContainerDiv.firstChild) {
        gridContainerDiv.removeChild(gridContainerDiv.firstChild);
        myLibrary.shift(); // remove book object from library array
      }
    }
  }
  totalBooksRead = 0;
  totalBooksNotRead = 0;

  libTotalBooks.innerHTML = `Total Books: ${0}`;
  libTotalBooksRead.innerHTML = `Total book(s) to read: ${totalBooksRead}`;
  libTotalNotRead.innerHTML = `Total book(s) not read: ${totalBooksNotRead}`;
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
