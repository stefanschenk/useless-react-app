function authorizationEnabled() {
    return true;
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
            pages: ["contacts"]
        }
    ];
}
