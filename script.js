const cardsContainer = document.querySelector('.banner__cards');
const card = document.querySelector('.banner__card');
const addNewCardButton = document.querySelector('.banner__add-card');
const submitNewBookButton = document.querySelector('.banner__popup-btn');
const newCardPopUp = document.querySelector('.banner__popup');
const bookTitle = document.querySelector('.js-title');
const bookAuthor = document.querySelector('.js-author');
const bookPages = document.querySelector('.js-pages');
const bookRead = document.querySelector('.js-read');
let myLibrary = [
];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary() {
	let title = bookTitle.value;
	let author = bookAuthor.value;
	let pages = bookPages.value;
	let read = (bookRead.checked) ? "Read":"Not read";
	let newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	addNewCard();
	newCardPopUp.style = 'display: none';
	clearInputs();
}

function openPopUp() {
	newCardPopUp.style ='display: block;'
}

function closePopUp(e, helper) {
	if(e.target !== newCardPopUp) {
		return;
	}
	newCardPopUp.style = 'display: none';
}

function addNewCard() {
	const newCard = document.createElement("div");
	const bookTitle = document.createElement("div");
	const bookAuthor = document.createElement("div");
	const bookPages = document.createElement("div");
	const isTheBookRead = document.createElement("div");
	const removeBookButton = document.createElement("button");
	const changeReadStatus = document.createElement("button");
	isTheBookRead.classList.add('banner__card-read');
	bookPages.classList.add('banner__card-pages');
	bookAuthor.classList.add('banner__card-author');
	bookTitle.classList.add('banner__card-title');
	newCard.classList.add('banner__card');
	removeBookButton.classList.add('btn', 'js-remove-card');
	changeReadStatus.classList.add('btn', 'js-change-read');
	bookTitle.textContent = `${myLibrary[myLibrary.length-1].title}`;
	bookAuthor.textContent = `${myLibrary[myLibrary.length-1].author}`;
	bookPages.textContent = `${myLibrary[myLibrary.length-1].pages}`;
	isTheBookRead.textContent = `${myLibrary[myLibrary.length-1].read}`;
	removeBookButton.textContent = 'Remove book';
	changeReadStatus.textContent = 'read/unread';
	newCard.appendChild(bookTitle);
	newCard.appendChild(bookAuthor);
	newCard.appendChild(bookPages);
	newCard.appendChild(isTheBookRead);
	newCard.appendChild(removeBookButton);
	newCard.appendChild(changeReadStatus);
	cardsContainer.appendChild(newCard);
}

function removeACard(e) {
	const current = e.target.closest('.banner__card');
	current.remove();
	removeBookFromLibrary();
}

function clearInputs() {
	bookTitle.value = "";
	bookAuthor.value = "";
	bookPages.value = "";
	bookRead.checked = false;
}

function removeBookFromLibrary() {
	myLibrary.pop();
}

function changeReadStatus(e) {
	const cards = document.querySelectorAll('.banner__card');
	let cardsArray = Array.from(cards);
	let currentIndex;
	const currentCard = e.target.closest('.banner__card');
	for(let i = 0; i < cards.length; i++) {
		if(cards[i] == currentCard) {
			currentIndex = i - 1;
		}
	}
	currentReadCardStatus = currentCard.querySelector('.banner__card-read');
	if(myLibrary[currentIndex].read == "Not read") {
		currentReadCardStatus.textContent = "Read"
		myLibrary[currentIndex].read = "Read";
	} else {
		currentReadCardStatus.textContent = "Not read";
		myLibrary[currentIndex].read = "Not read";
	}
	console.log(myLibrary);
}

function queryRemoveButton() {
	const removeBookButtons = document.querySelectorAll('.js-remove-card');
	removeBookButtons.forEach(button => button.addEventListener('click', removeACard));
}

function queryChangeButton() {
	const changeReadStatusButtons = document.querySelectorAll('.js-change-read');
	changeReadStatusButtons.forEach(button => button.addEventListener('click', changeReadStatus))
}

addNewCardButton.addEventListener('click', openPopUp);
newCardPopUp.addEventListener('click', closePopUp, true);
submitNewBookButton.addEventListener('click', addBookToLibrary);
submitNewBookButton.addEventListener('click', queryRemoveButton);
submitNewBookButton.addEventListener('click', queryChangeButton);
