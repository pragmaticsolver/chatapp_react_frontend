var user = {};

function setUser(data) {
    user = data;
}

function getUser() {
    return user;
}

export { setUser, getUser };