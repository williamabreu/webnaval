crypto = require('crypto');

var connectedUsers = [];
var battleRooms = []

function generateToken() {
    return crypto.pseudoRandomBytes(8).toString('hex');
}

function createRoom() {
    battleRooms.push({
        player1: null,
        player2: null,
        round: 0,
        token: generateToken()
    });
}



exports.joinRoom = function(user) {
    if (battleRooms.length == 0) {
        // cria primeira sala com ele sozinho
        createRoom();
        battleRooms[0].player1 = user;
        user.roomId = 0;
        return 'waiting';
    }
    else {
        // procura uma sala para entrar
        for (let roomId = 0; roomId < battleRooms.length; roomId++) {
            let room = battleRooms[roomId];
            if (room.player1 == null) {
                room.player1 = user;
                user.roomId = roomId;
                return 'waiting';
            }
            else if (room.player2 == null) {
                room.player2 = user;
                user.roomId = roomId;
                return 'ready';
            }
        }
        // não achou sala com vaga, cria uma e entra sozinho
        createRoom();
        let roomId = battleRooms.length - 1;
        battleRooms[roomId].player1 = user;
        user.roomId = roomId;
        return 'waiting';
    }
}


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

exports.getRoom = function(id) {
    return battleRooms[id];
}

exports.attack = function(user, position) {
    let room = battleRooms[user.roomId];
    if (room.player1 == user && room.round == 1) {
        let index = room.player2.board.indexOf(position);
        if (index != -1) {
            room.player2.board.splice(index, 1);
            return 'hit';
        }
        else {
            return 'miss';
        }
    }
    else if (room.player2 == user && room.round == 2) {
        let index = room.player1.board.indexOf(position);
        if (index != -1) {
            room.player1.board.splice(index, 1);
            return 'hit';
        }
        else {
            return 'miss';
        }
    }
    else {
        return 'forbidden';
    }
}

exports.getOpponent = function(id) {
    for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].id != id) {
            return connectedUsers[i];
        }
    }
    return null;
}
