const input = document.querySelector("input");
const img = document.querySelector(".user-img");
const name = document.querySelector(".name");
const username = document.querySelector(".username");

const followers = document.querySelectorAll(".followers div img");
const following = document.querySelectorAll(".following div img");
const button = document.querySelector("button");
const catImg = document.querySelector(".cat-img");
catImg.style.width = "700px";
catImg.style.height = "500px";

function displayUI(data) {
    name.innerText = data.name;
    img.alt = data.name;
    img.src = data.avatar_url;
    username.innerText = `@${data.login}`;
    displayFollowers(data.login);
    displayFollowing(data.login);
    
}

function displayFollowers(name) {
    console.log(name);
    fetch(`https://api.github.com/users/${name}/followers`, function(followersList = data)  {
        
            
            followersArray = followersList.slice(0, 5);
            followersArray.forEach((el, i) => {
                followers[i].src = el.avatar_url;
                followers[i].alt = el.name;
            })
           
        
    });
    
}

function displayFollowing(name) {
    console.log(name);
    fetch(`https://api.github.com/users/${name}/following`, function(followingList)  {
            console.log(followingList);
            let followingArray = [];
            followingArray = followingList.slice(0, 5);
            followingArray.forEach((el, i) => {
                following[i].src = el.avatar_url;
                following[i].alt = el.name;
            })
           
        
    });
}

function fetch(url, successHandler) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => successHandler(JSON.parse(xhr.response));
    xhr.onerror =  function() {
        console.log("Something went wrong");
    }

    xhr.send();
}

function handleChange(event) {
    if(event.keyCode === 13 && event.target.value) {
       const url = `https://api.github.com/users/`;
        // xhr.open("GET", ${event.target.value}`);
        // abc.open("GET", `https://api.github.com/users/${event.target.value}/followers`);
        // xyz.open("GET", `https://api.github.com/users/${event.target.value}/following`);

        fetch(url + event.target.value, displayUI)
       
        event.target.value = "";
    }

    
}


function handleClick(e) {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=1&size=full`, (data) => {
        catImg.src = data[0].url;
    })
    
}

input.addEventListener("keyup", handleChange);
button.addEventListener("click", handleClick);