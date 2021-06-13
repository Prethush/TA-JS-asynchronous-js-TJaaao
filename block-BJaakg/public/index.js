
function init() {
const ul = document.querySelector("ul");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const charactersData = document.querySelector(".characters-data");
const error = document.querySelector(".error");
const main = document.querySelector(".main");

/* <div class="donut"></div> */

function handleErrorMessage(msg = `Something went wrong ❌`) {
    main.style.display = "none";
    error.innerText = msg;
    error.style.display = "block";
   
}
function handleSpinner(rootElm, status = false) {
    if(status) {
        rootElm.innerHTML = `<div class="donut"></div>`;
    }
}
close.addEventListener("click", (e) => {
    e.target.parentElement.style.display = "none";
})
const url = `https://www.anapioficeandfire.com/api/books`;

function displayCharacters(characters) {
    handleSpinner(charactersData, true);   
    Promise.all(characters.map((character) =>fetch(character).then((res) => res.json())))
    .then((data) => {
        console.log(data);
        charactersData.innerHTML = "";
        data.forEach((character) => {
        let li = document.createElement("li");
        li.classList.add("border-solid", "border-2", "border-white", "p-2", "my-2", "text-xl");
         li.innerText = `${character.name}: ${character.aliases.join(" ")}`;
        charactersData.append(li);
        
        })
        
        
    });

    modal.append(charactersData);
    
    // li.innerText = `${}`
}


function displayUI(books) {
    ul.innerHTML = "";
    books.forEach((book) => {
        let li = document.createElement("li");
        li.classList.add("flex-50", "p-6", "border-dashed", "border-2", "border-red-500");
        let title = document.createElement("h2");
        title.classList.add("text-2xl", "font-bold", "mb-5");
        title.innerText = book.name;
        let author = document.createElement("h3");
        author.innerText = book.authors[0];
        author.classList.add("text-xl", "mb-6");
        let button = document.createElement("a");
        button.innerText = `Show Characters ${book.characters.length}`;
        button.classList.add("bg-black", "text-white", "py-2", "px-2", "rounded-xl", "cursor-pointer");
        button.addEventListener("click", (e) => {
            displayCharacters(book.characters);
            modal.style.display = "block";
        })
        li.append(title, author, button);
        ul.append(li);
    })
}



function booksData() {
    handleSpinner(ul, true);
    fetch(url).then((res) => {
        if(res.ok) {
            return res.json();
        }
        throw new Error("Reponse is not Ok");
    })
    .then((booksData) =>displayUI(booksData))
    .catch((error) => handleErrorMessage(error))
    .finally(() => handleSpinner(ul));
}
        
// Promise.all(books.map((book) => book).then(console.log));

modal.addEventListener("load", (e) => {
    console.log("Hi");
modal.style.display = "none";
});
console.log(modal);


 


if(navigator.onLine) {
    booksData();

} else {
    handleErrorMessage("Check your Internet Connection ❌");
}

}

init();