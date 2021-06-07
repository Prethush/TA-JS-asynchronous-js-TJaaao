const input = document.querySelector("input");
const img = document.querySelector(".user-img");
const name = document.querySelector(".name");
const username = document.querySelector(".username");
const followers = document.querySelectorAll(".followers div img");
const following = document.querySelectorAll(".following div img");
const button = document.querySelector("button");
const catImg = document.querySelector(".cat-img");
catImg.style.width = "600px";
catImg.style.height = "400px";

function displayUI(data) {
    name.innerText = data.name;
    img.src = data.avatar_url;
    username.innerText = `@${data.login}`;
}

function displayFollowers(data) {
    for(let i = 0; i < 5; i++) {
        followers[i].src = data[i].avatar_url;
    }
}

function displayFollowing(data) {
    for(let i = 0; i < 5; i++) {
        following[i].src = data[i].avatar_url;
    }
}


function handleChange(event) {
    if(event.keyCode === 13) {
        let xhr = new XMLHttpRequest();
        let abc = new XMLHttpRequest();
        let xyz = new XMLHttpRequest();
        xhr.open("GET", `https://api.github.com/users/${event.target.value}`);
        abc.open("GET", `https://api.github.com/users/${event.target.value}/followers`);
        xyz.open("GET", `https://api.github.com/users/${event.target.value}/following`);

        abc.onload = function() {
            let followersData = JSON.parse(abc.response);
            
            displayFollowers(followersData);
        }
        
        xyz.onload = function() {
            let followingData = JSON.parse(xyz.response);
            console.log(followingData);
            displayFollowing(followingData);
        }

        xhr.onload = function() {
            let userData = JSON.parse(xhr.response);
            
            displayUI(userData);
        }

       
        xhr.onerror = function() {
            console.log("Something went wrong");
        }

        abc.onerror = function() {
            console.log("Something went wrong");
        }

        xyz.onerror = function() {
            console.log("Something went wrong");
        }

        xhr.send();
        abc.send();
        xyz.send();

        event.target.value = "";
    }

    
}


function handleClick(e) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.thecatapi.com/v1/images/search?limit=1&size=full`);
    xhr.onload = function() {
        let catArray = JSON.parse(xhr.response);
        console.log(catArray);
        catImg.src = catArray[0].url;

    }
   xhr.onerror = function() {
       console.log("Something went wrong");
   }

    xhr.send();
}

input.addEventListener("keyup", handleChange);
button.addEventListener("click", handleClick);