var connectedUsers = [];
var autoincrement = 0;

exports.connectUser = function(id) {
    connectedUsers.push({
        id: id,
        roomId: null,
        board: []
    });
}

exports.disconnectUser = function(id) {
    for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].id == id) {
            return connectedUsers.splice(i, 1);
        }
    }
    return null;
}

exports.getUser = function(id) {
    for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].id == id) {
            return connectedUsers[i];
        }
    }
    return null;
}

exports.getOpponent = function(id) {
    for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].id != id) {
            return connectedUsers[i];
        }
    }
    return null;
}
