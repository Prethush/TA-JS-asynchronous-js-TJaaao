
const dropDown = document.querySelector("select");
const subContainer = document.querySelector(".sub-container");
const container = document.querySelector(".container");
const loading = document.querySelector(".loading");

function displayCategory(data, userData) {
    
    data.forEach((news) => {
        let option = document.createElement("option");
        option.value = news;
        option.innerText = news;
        option.style.padding = "1rem";
        dropDown.append(option);
    })
   
    dropDown.addEventListener("change", (e) => {
        handleChange(e, userData);
    });

}

function handleChange(e, userData) {
    
    let news = userData;
    if(e.target.value) {
        news = userData.filter((data) => data.newsSite === e.target.value);
    } 
    
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
        img.classList.add("w-full", "object-cover", "object-center");
        box1.append(img);
        let box2 = document.createElement("div");
         box2.classList.add("relative");
        box2.classList.add("flex-45");
        let h5 = document.createElement("h5");
        h5.innerText = obj.newsSite;
        h5.classList.add("bg-green-300", "inline-block", "py-1.1", "mt-1", "px-1.5", "rounded-lg", "text-white");
        let title = document.createElement("h2");
        title.innerText = obj.title;
        title.classList.add("text-3xl", "mt-8", "font-bold");
        let button = document.createElement("a");
        button.innerText = "Read More";
        button.href = obj.url;
        button.classList.add("absolute", "right-0", "bottom-0", "bg-black", "text-white", "p-2", "rounded-lg");
        box2.append(h5, title, button);
        subContainer.append(box1, box2);
        container.append(subContainer);
    })


}

if(!navigator.onLine) {
    document.body.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.innerText = "Check your Internet connection ❌";
    h1.classList.add("text-red-500", "text-center", "text-2xl", "my-8")
    document.body.append(h1);
}
fetch(`https://spaceflightnewsapi.net/api/v2/articles?_limit=30`)
.then((res) => 
{
    
    loading.classList.toggle("hidden");
    loading.classList.add("visible");
    return res.json();
})
.then((userData) => {
    displayUI(userData);
    let news = userData.map((data) => data.newsSite);
    news = Array.from(new Set(news));
    displayCategory(news, userData);
    console.log(userData);
})
.catch(console.log)
.finally(() => {
    loading.classList.toggle("visible");
    loading.classList.add("hidden");
})


