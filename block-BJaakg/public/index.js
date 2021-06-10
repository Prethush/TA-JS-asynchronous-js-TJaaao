const ul = document.querySelector("ul");

function displayUI(books) {
    books.forEach((book) => {
        let li = document.createElement("li");
        li.classList.add("flex-33");
        let title = document.createElement("h2");
        title.innerText = book.name;
        let author = document.createElement("h3");
        author.innerText = book.authors[0]
        let button = document.createElement("a");
        button.innerText = `Show Characters ${book.characters.length}`;
        li.append(title, author, button);
        ul.append(li);
    })
}



fetch(`https://www.anapioficeandfire.com/api/books`).then((res) => res.json())
.then((books) => {
        displayUI(books);
        books.forEach((book) => {
            
        })
        
        })
        

// Promise.all(books.map((book) => book).then(console.log));
 