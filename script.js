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

const body = document.querySelector("body");

function displayBooks() {
  myLibrary.forEach((item) => {
    const div = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const p5 = document.createElement("p");

    p1.textContent = item.title;
    p2.textContent = item.author;
    p3.textContent = item.pages;
    p4.textContent = item.read;
    p5.textContent = item.id;

    div.appendChild(p5);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    body.appendChild(div);
  });
}

displayBooks();
