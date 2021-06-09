
function fetch(url) {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => res(JSON.parse(xhr.response));
        xhr.onerror = () => rej(console.log("Something went wrong"));
        xhr.send();
    });
}

let promise = fetch("https://api.github.com/users/getify");