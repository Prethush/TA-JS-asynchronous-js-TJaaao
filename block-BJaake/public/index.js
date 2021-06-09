
const dropDown = document.querySelector("select");
const subContainer = document.querySelector(".sub-container");
const container = document.querySelector(".container");

function displayCategory(data, userData) {
    
    data.forEach((news) => {
        let option = document.createElement("option");
        option.value = news;
        option.innerText = news;
        option.style.padding = "1rem";
        dropDown.append(option);
    })
   
    dropDown.addEventListener("input", (e) => {
        handleChange(e, userData);
    });

}

function handleChange(e, userData) {

   let news = userData.filter((data) => data.newsSite === e.target.value);

    displayUI(news);
}


function displayUI(data) {
    console.log(data);
    container.innerHTML = "";
    data.forEach((obj) => {
        let subContainer = document.createElement("div");
        subContainer.classList.add("flex", "flex-row", "flex-wrap", "my-8", "justify-between");
        let box1 = document.createElement("div");
        box1.classList.add("flex-45");
        let img = document.createElement("img");
        img.src = obj.imageUrl;
        img.alt = obj.title;
        img.classList.add("w-full", "object-cover", "object-center", "h-full");
        box1.append(img);
        let box2 = document.createElement("div");
         box2.classList.add("relative");
        box2.classList.add("flex-45");
        let h5 = document.createElement("h5");
        h5.innerText = obj.newsSite;
        h5.classList.add("bg-green-300", "inline-block", "py-1.1", "mt-1", "px-1.5", "rounded-lg", "text-white");
        let title = document.createElement("h2");
        title.innerText = obj.title;
        title.classList.add("text-3xl", "my-6", "font-bold");
        let button = document.createElement("a");
        button.innerText = "Read More";
        button.href = obj.url;
        button.classList.add("absolute", "right-0", "bottom-0", "bg-black", "text-white", "p-2", "rounded-lg");
        box2.append(h5, title, button);
        subContainer.append(box1, box2);
        container.append(subContainer);
    })


}

let result = fetch(`https://spaceflightnewsapi.net/api/v2/articles?_limit=30`)
.then((res) => res.json())
.then((userData) => {
    displayUI(userData);
    return userData;
})
.then((userData) => {
    let arr = [];
    userData.map((data) => data.newsSite)
    .forEach((news) => {
        if(!arr.includes(news)) {
            arr.push(news);
        }
    })
    displayCategory(arr, userData);
})
.catch(console.log);


