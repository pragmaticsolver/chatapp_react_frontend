var newMessageList = {};

function setNewMessage(data) {
    console.log(data);
    if (newMessageList[data.from.email] == undefined || newMessageList[data.from.email] == null) {
        newMessageList[data.from.email] = 0;
    }
    newMessageList[data.from.email] ++;
}

function removeNewMessageCount(user) {
    newMessageList[user.email] = 0;
}

function getNewMessageList() {
    return newMessageList;
}

export { setNewMessage, getNewMessageList, removeNewMessageCount };