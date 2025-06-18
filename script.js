let myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // const book = new Book(title, author, pages, read);

  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("m", "M", 2, false);
addBookToLibrary("me", "ME", 23, true);
addBookToLibrary("mee", "MEe", 233, false);

console.log(myLibrary);

const cards = document.querySelector(".cards");
console.log(cards);

function displayBooks() {
  myLibrary.forEach((item) => {
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
            <p>Title: ${item.title}</p>
            <p>Author: ${item.author}</p>
            <p>Pages: ${item.pages}</p>
          </div>
        </section>
        <button class="remove btn">Remove</button>
        <button class="read btn">${
          item.read === true ? "Read" : "Not Read"
        }</button>
      </div>
    `;
  });
}

displayBooks();
