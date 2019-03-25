const Promise = require('bluebird');

function makeRandom(min, max){
  var RandVal = Math.random() * (max- min) + min;
  return Math.floor(RandVal);
}


// Will resolve
function randomPromise() {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      console.log('Random promise call');
      resolve('Promise resolve!');
    }, makeRandom(100, 500));
  });
}

// Will resolve after 200ms
function resolvePromise() {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      console.log('Resolve promise call');
      resolve('Promise resolve!');
    }, 200);
  });
}


// Will reject after 100ms
function rejectPromise() {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      console.log('Reject promise call');
      reject('Promise reject!');
    }, 100);
  });
}


Promise.map([1, 2, 3], i => {
  if (i === 1) {
    return rejectPromise();
  }
  return randomPromise();
}, {concurrency: 5})
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
