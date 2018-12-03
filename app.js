/* https://socket.io/get-started/chat */

const express    = require('express');
const app        = express();
const http       = require('http').Server(app);
const io         = require('socket.io')(http);
const bodyParser = require('body-parser');
const game       = require('./game');


app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/', function(req, res) {    
    res.sendFile(__dirname + '/public/battle.html');
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});


io.on('connection', function(socket) {
    console.log('user    connected ' + socket.id);
    game.connectUser(socket.id);

    socket.on('disconnect', function() {
        console.log('user disconnected ' + socket.id);
        game.disconnectUser(socket.id);
    });

    // ADICIONA EMBARCAÇÃO NO MAPA
    socket.on('postfleet', function(msg) {
        let user = game.getUser(socket.id);
        let positions = msg.positions;
        user.board = user.board.concat(positions);
        console.log(socket.id + ' postfleet ' + positions);
        console.log(user.board.length);
        if (user.board.length == 15) {
            io.emit('startgame', {status: 'ready'});
            console.log(socket.id + ' ready!');
        }
    });

    // DISPARA EVENTO ASSINCRONO
    socket.on('startgame', function(msg) {
        let opponent = game.getOpponent(socket.id);
        console.log(opponent);
        if (opponent != null) {
            io.emit('startgame', {status: true});
        }
        else {
            socket.emit('startgame', {status: false});
        }
    }); 
});
