- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

//
let promise1 = new Promise((res) => {
    setTimeout(() => res(5), 1000);
});

let promise2 = new Promise((res) => {
    setTimeout(() => res(10), 2000);
});

let promise3 = new Promise((res) => {
    setTimeout(() => res(15), 3000);
});

let promise4 = new Promise((res) => {
    setTimeout(() => res(20), 4000);
});

let result = Promise.all([promise1, promise2, promise3, promise4])
.then((value) => console.log(value));


- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

//const usernames = [
    "prank7",
    "getify",
    "andrew",
    "egoist",
    "fabpot"
]

let userArray = Promise.all(usernames.map((user) => 
fetch(`https://api.github.com/users/${user}`).
then((res) => res.json()).then((data) => data.followers)))
.then((data) =>console.log(data));


- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

  //let dogs = fetch(`https://random.dog/woof.json`).then((res) => res.json());
let cats = fetch(`https://aws.random.cat/meow`).then((res) => res.json());

 Promise.race([dogs, cats])
.then((data) => console.log(data));


- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

//const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

let result =Promise.allSettled([one, two, three])
.then((value) => console.log(value));

let result2 = Promise.all([one, two, three])
.then((value) => console.log(value)); //it will give error
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);
```
//1001 sec
["Arya", "Sam", {name: "John"}]