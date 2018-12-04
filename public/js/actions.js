// socket io

const socket = io();
var room;
var sid;

function getSocketId() {
    if (!socket.id) {
        return setTimeout(getSocketId, 500);
    }

    sid = socket.id;
}

getSocketId(); 

socket.on('general', function(msg) {
	console.log('general', msg);
	room = msg.roomId;
	$('#message-frame-1').text('Aguardando oponente...')
});

socket.on('startgame', function(msg) {
	if (room == msg.roomId) {
		$('#subtitle').text('Batalha');
		$('#frame-1').hide();
		$('#frame-2').show();
		alert('O jogo começou!');

		if (sid == msg.round) {
			$('#message-frame-2').text('Sua vez de atacar');
		}
		else {
			$('#message-frame-2').text('Aguarde seu adversário');
		}
	}

	console.log('startgame', msg);
});

socket.on('attack-response', function(msg){
	let str = "#oponnent-map-" + msg.position;
	$(str).removeClass("cor-azul-claro");
	if(msg.hitted == true){
		$(str).addClass("cor-verde-claro");
	}else{
		$(str).addClass("cor-vermelho-claro");
	}
	console.log(msg);
});

socket.on('enemyattack', function(msg){
	if (room == msg.roomId) {
		let str = "#my-map-" + msg.position;
		$(str).removeClass("cor-azul-claro");
		if (msg.hitted == true) {
			$(str).addClass("cor-verde-claro");
		} else {
			$(str).addClass("cor-vermelho-claro");
		}
	}
	console.log(msg);
});



//funcao para selecao das embarcacoes candidatas
$(".unit").click(function(){
	if($(this).hasClass("cor-azul-claro")){
		$(this).removeClass("cor-azul-claro");
    	$(this).addClass("cor-cinza-claro");
	}else{
		$(this).removeClass("cor-cinza-claro");
    	$(this).addClass("cor-azul-claro");
	}
}); 

//funcao de confirmacao das embarcacoes
$("#confirma").click(function(){
	var cont = 0;
	var list = [];
	
	$( ".unit" ).each(function( index ) {	
		if($(this).hasClass("cor-cinza-claro")){
			$(this).removeClass("cor-cinza-claro");
			$(this).addClass("cor-cinza-escuro");
			list.push(cont);
		}
		cont++;	
	});
	
	socket.emit('postfleet', {
		positions: list
	});
}); 

$("#start").click(function(){
	$.ajax({
		type: "POST",
		url: "/ajax/post/start/",
		data: {
			ready: true,
			csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val() 
		},
		success: function() {
			alert("Inicio confirmado. OBS");
		}
	})
});



//funcao de ataque batalha
$(".my-unit").click(function(){
	if($(this).hasClass("cor-azul-claro")){
		let element = $(this);
		let id = element.attr('id');
		number = id.substr(13);
		console.log(id)
		
		socket.emit('attack-request', {
			position: number
		});
	}
}); 
