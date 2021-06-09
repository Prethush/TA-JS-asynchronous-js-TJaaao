
// let promise = new Promise((res, rej) => {
//     setTimeout(() => res(`Problem solved`), 1000);
// })
// .then((value) => console.log(value));

// let promise = new Promise((res, rej) => {
//     rej(`Rejected Promise`);
// })
// .catch((error) => console.log(error));


// let promise = new Promise((res, rej) => {
//     rej(`Rejected promise`);
// })
// .catch((error) => console.log(error))
// .finally(() => console.log("Promise Settled"));

// function wait(time) {
//     return new Promise((res, rej) => {
//        setTimeout(() => res("Done"), time);
//     })
// }

// let result = wait(5000).then((value) => console.log(value));

// let promise = new Promise((res, rej) => {
//     res(21);
// })
// .then((value) => value + 10)
// .then((value) => value + 100)
// .then((value) => {
//     if(value > 100) {
//         throw new Error("Invalid");
//     }
// })
// .catch((error) => console.log(error));

// let promise = new Promise((res, rej) => {
//     res(['A']);
// })
// .then((value) => value.concat('B'))
// .then((value) => value.reduce((acc, curr, index)=> {
//     acc[index] = curr;
//     return acc;
// }, {}))
// .then((value) => console.log(value));

// let first = new Promise((res, rej) => {
//     res(1);
// })
// .then((value) => {
    
//     console.log(value);
//     return value + 1;
    
// })
// .then((value) => {
    
//     console.log(value);
//     return value + 1;
   
// })
// .then((value) => {
    
//     console.log(value);
//     return value + 1;
    
// })

let first = new Promise((res, rej) => {
    res(1);
})
.then((value) => {
    
    console.log(value);
    return value + 1;
    
})



first.then((value) => {
    
    console.log(value);
    return value + 2;
   
})

first.then((value) => {
    
    console.log(value);
    return value + 3;
    
})