/* eslint-disable no-undef */
const quotesHost = 'http://localhost:3001/quotes';

function search(query, cb) {
  return fetch(`${quotesHost}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getCount(cb) {
  return fetch(`${quotesHost}/count`, {
    headers: {"Accept": "application/json"}
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search, getCount };
export default Client;
