var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.listen(5000);


game = {
    player1: 'DLKUsbXLUB', 
    player2: 'FwBlPigwQ0',
    round: 'player1'
}


players = [
    {
        id: 1,
        token: 'DLKUsbXLUB',
        board: [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ]
    },
    {
        id: 2,
        token: 'FwBlPigwQ0',
        board: [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ]
    }
]



app.get('/status/:token', function(req, res) {
    var token = req.params.token;
    for (let i = 0; i < 2; i++) {
        if (players[i].token == token) {
            res.json(players[i]);
            return;
        }
    }
    res.json({
        msg: 'forbidden'
    })
})

app.post('/attack', function(req, res) {
    let msg = req.body;
    if (msg.src == game.player1 && game.round == 'player1') {
        players[1].board[msg.x][msg.y] = 1;
        res.json({
            msg: 'ok'
        })
    }    
    else if (msg.src == game.player2 && game.round == 'player2') {
        players[0].board[msg.x][msg.y] = 1;
        res.json({
            msg: 'ok'
        })
    }
    else {
        res.json({
            msg: 'forbidden'
        })
    }
})