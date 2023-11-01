//Goal to have functions which we reuse across multiple files

import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

// will return a promise which will reject after a certain time has passed
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    //as soon as either of the promises rejects or fullfils, that promise will become the winner
    //if timeout wins, we will have a rejected promise which then gets caught
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    //convert to JSON
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data; //this wil be the resolved value of the returned promise by this async function
  } catch (err) {
    throw err; // the promise returned by getJSON will reject
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    //as soon as either of the promises rejects or fullfils, that promise will become the winner
    //if timeout wins, we will have a rejected promise which then gets caught

    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    //convert to JSON
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data; //this wil be the resolved value of the returned promise by this async function
  } catch (err) {
    throw err; // the promise returned by getJSON will reject
  }
};
