// Will resolve after 200ms
let promiseA = new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
    console.log('Promise A call');
    resolve('Promise A resolve!');
  }, 200);
});

// Will resolve after 400ms
let promiseB = new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
    console.log('Promise B call');
    resolve('Promise B resolve!');
  }, 400);
});

// Will reject after 100ms
let promiseC = new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
    console.log('Promise C call');
    reject('Promise C reject!');
  }, 100);
});

Promise.all([promiseA, promiseB, promiseC])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
