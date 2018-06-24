/* eslint-disable no-undef */
function getAll(cb) {
  return fetch(`https://useless-api.azurewebsites.net/contacts`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getOne(id, cb) {
  return fetch(`https://useless-api.azurewebsites.net/contacts/${id}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function deleteOne(id, cb) {
  return fetch(`https://useless-api.azurewebsites.net/contacts/${id}`, {
    method: "delete"
  })
    .then(checkStatus)
    .then(cb)
}

function saveOne(id, contact, cb) {
  if (id === "") {
    return fetch(`https://useless-api.azurewebsites.net/contacts`, {
      method: "post",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(contact)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb)
  } else {
    return fetch(`https://useless-api.azurewebsites.net/contacts/${id}`, {
      method: "put",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(contact)
    })
      .then(checkStatus)
      .then(cb)
  }
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

const ContactsClient = { deleteOne, getAll, getOne, saveOne };
export default ContactsClient;
