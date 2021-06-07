let imgContainer = document.querySelector(".img-container");
let input = document.querySelector("input");

const url = `https://api.unsplash.com/photos/?client_id=IBHskJXnOj3hIHuE42rGXHUqsvOUd4YI8aHXYH26js8`;
const search_url = (query) => `https://api.unsplash.com/search/photos?&query=${query}&client_id=IBHskJXnOj3hIHuE42rGXHUqsvOUd4YI8aHXYH26js8`;

function fetch(url, successhandler) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => successhandler(JSON.parse(xhr.response));
    xhr.onerror = function() {
        console.log("Something went wrong");
    }
    xhr.send();
}

function displayImages(images) {
    console.log(images);
    imgContainer.innerHTML = "";
    images.forEach((image) => {
        let div = document.createElement("div");
        div.classList.add("img-div");
        div.style.background = `url(${image.urls.small}) center center no-repeat`;
        div.style.backgroundSize = "cover";
        div.style.height = "300px";
        imgContainer.append(div);
    })
}


fetch(url, displayImages);

function handleChange(event) {
    if(event.keyCode === 13 && input.value) {
        fetch(search_url(input.value), (searchresult) => {
            displayImages(searchresult.results);
        })

        event.target.value = "";
    }

}
input.addEventListener("keydown", handleChange);
