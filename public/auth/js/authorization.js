function authorizationEnabled() {
  return false;
}

function listUsers() {
  return [
    {
      username: "mr_norights",
      password: "1234Pass!",
      pages: []
    },
    {
      username: "mr_contacts",
      password: "1234Pass!",
      pages: ["[deleted]"]
    },
    {
      username: "mr_allrights",
      password: "!ssaP4321",
      pages: ["contacts", "quotes"]
    }
  ];
}
