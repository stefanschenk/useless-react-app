/* eslint-disable no-undef */
const contactHost = "http://useless-api.dev/api/contacts";

function getAll(cb) {
  return fetch(`${contactHost}`, {
    headers: { Accept: "application/json" }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getCount(cb) {
  return fetch(`${contactHost}/count`, {
    headers: { Accept: "application/json" }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getOne(id, cb) {
  return fetch(`${contactHost}/${id}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function deleteOne(id, cb) {
  return fetch(`${contactHost}/${id}`, {
    method: "delete"
  })
    .then(checkStatus)
    .then(cb);
}

function saveOne(id, contact, cb) {
  if (id === "") {
    return fetch(`${contactHost}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb);
  } else {
    return fetch(`${contactHost}/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    })
      .then(checkStatus)
      .then(cb);
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

const ContactsClient = { deleteOne, getAll, getCount, getOne, saveOne };
export default ContactsClient;
