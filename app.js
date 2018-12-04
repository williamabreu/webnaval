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
        if (user.board.length == 1) {
            let status = game.joinRoom(user);

            // envia info de volta somente para ele
            socket.emit('general', {
                status: status,
                roomId: game.getRoom(user.roomId).token
            })

            if (status == 'ready') {
                // enviar iniciar partida em broadcast
                let roomToken = game.getRoom(user.roomId).token;
                io.emit('startgame', {
                    roomId: roomToken
                });
            }
            
            // enviar aguardar oponente
            
             
            // console.log(socket.id + ' ready!');
        }
    });

    // DISPARA EVENTO ASSINCRONO
    // socket.on('startgame', function(msg) {
    //     let opponent = game.getOpponent(socket.id);
    //     console.log(opponent);
    //     if (opponent != null) {
    //         io.emit('startgame', {status: true});
    //     }
    //     else {
    //         socket.emit('startgame', {status: false});
    //     }
    // }); 

    // DISPARA O EVENTO DE ATAQUE
    socket.on('attack', function(msg) {
        let opponent = game.getOpponent(socket.id);
        console.log(opponent);
        if (opponent != null) {
            let pos = msg.position;
            console.log(pos);
            if(Math.floor((Math.random() * 10) + 1) > 5){
                socket.emit('attackresponse', {
                    position: pos,
                    hitted: true
                });
                socket.broadcast.emit('enemyattack', {
                    position: pos,
                    hitted: true
                });
            }else{
                socket.emit('attackresponse', {
                    position: pos,
                    hitted: false
                });
                socket.broadcast.emit('enemyattack', {
                    position: pos,
                    hitted: false
                });
            }
        }
        else {
            socket.emit('startgame', {status: false});
        }
    }); 
});
