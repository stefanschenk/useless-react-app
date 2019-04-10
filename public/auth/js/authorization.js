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
            username: "show_me_quotes",
            password: "1234Pass!",
            pages: ["quotes"]
        }
    ]
}