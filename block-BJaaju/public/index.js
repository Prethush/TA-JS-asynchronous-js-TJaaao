let imgContainer = document.querySelector(".img-container");
let input = document.querySelector("input");




function handleChange(event) {


    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.unsplash.com/search/photos?page=1&query=${event.target.value}&client_id=IBHskJXnOj3hIHuE42rGXHUqsvOUd4YI8aHXYH26js8`);


    xhr.onload = function() {
        imgContainer.innerHTML = "";
        let data = JSON.parse(xhr.response);
    
        let imageArray = JSON.parse(xhr.response).results;
        imageArray.forEach((el) => {
            
            let div = document.createElement("div");
            div.classList.add("img-div");
            div.style.background = `url(${el.urls.small}) center center no-repeat`;
            div.style.backgroundSize = "cover";
            div.style.height = "300px";
            imgContainer.append(div);
            
        })
       

    }

    xhr.onerror = function() {
        console.log("Something went Wrong");
    }

    xhr.send();

}
input.addEventListener("input", handleChange);
