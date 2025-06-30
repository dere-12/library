let myLibrary = [];
let exist = [];
class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    const readBtn = cards.querySelector(`[data-id="${this.id}"].read`);

    if (readBtn.textContent === "Read") {
      readBtn.textContent = "Not Read";
      myLibrary.forEach((book) => {
        if (book.id === this.id) {
          book.read = false;
        }
      });
    } else if (readBtn.textContent === "Not Read") {
      readBtn.textContent = "Read";
      myLibrary.forEach((book) => {
        if (book.id === this.id) {
          book.read = true;
        }
      });
    }
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
}

const newBookBtn = document.querySelector("header .new-book");
let cards = document.querySelector(".cards");
const dialog = document.querySelector("dialog");
const cancel = document.querySelector("dialog .cancel");
const discard = document.querySelector("dialog .discard");
const save = document.querySelector("dialog .save");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

// books display example. use 'New Book' button to create more book display on the page.
addBookToLibrary("Demo title", "Demo author", 1, true);
displayBooks();
setEventListeners();

function setEventListeners() {
  const removeBtns = document.querySelectorAll(".remove");
  const readStatusBtns = document.querySelectorAll(".read");
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      const id = removeBtn.dataset.id;
      removeCard(id);
    });
  });

  readStatusBtns.forEach((readStatusBtn) => {
    readStatusBtn.addEventListener("click", () => {
      const id = readStatusBtn.dataset.id;
      myLibrary.forEach((book) => {
        if (book.id === id) {
          book.toggleReadStatus();
        }
      });
    });
  });
}

function displayBooks() {
  const i = document.createElement("i");
  i.textContent =
    "It seems like our library is empty. Use 'New Book' button to create more books on the page.";

  if (myLibrary.length >= 1) {
    myLibrary.forEach((book) => {
      if (!exist.includes(book.id)) {
        if (cards.querySelector("i")) {
          cards.innerHTML = "";
        }
        cards.innerHTML += `
      <div>
        <section>
          <div>
            <img
              src="icon/book-open.svg"
              width="150px"
              alt="an icon of open book"
            />
          </div>
          <div class="book-info">
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
          </div>
        </section>
        <button class="remove btn" data-id="${book.id}">Remove</button>
        <button class="read btn" data-id="${book.id}">${
          book.read === true ? "Read" : "Not Read"
        }</button>
      </div>
    `;
        exist.push(book.id);
      }
    });
  } else {
    cards.appendChild(i);
  }
}

function resetInputs() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.value = "";
}

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancel.addEventListener("click", () => {
  dialog.close();
});

discard.addEventListener("click", () => {
  resetInputs();
  dialog.close();
});

save.addEventListener("click", () => {
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readInput.value.toLowerCase() === "yes" ? true : false;

  if (title !== "" && author !== "" && pages !== "" && read !== "") {
    addBookToLibrary(title, author, pages, read);
    setEventListeners();
  } else {
    alert("Please fill in all fields.");
  }
});

function removeCard(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    cards.innerHTML = "";
    exist = [];
    displayBooks();
    setEventListeners();
  } else {
    console.log("can't find object to be deleted");
  }
}
