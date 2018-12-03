// socket io

const socket = io();

$('form').submit(function(){
	socket.emit('chat message', $('#m').val());
});

socket.on('startgame', function(msg){
	$('#subtitle').text('Batalha');
	$('#frame-1').hide();
	$('#frame-2').show();
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
		var element = $(this);
		element.removeClass("cor-azul-claro");
		var id = element.attr('id');
		console.log(id)
		$.ajax({
			type: "POST",
			url: "/ajax/post/battle/attack/",
			data: {
				position: id,
				csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val() 
			},
			success: function(data) {
				if(data['hit']){
					element.addClass("cor-verde-claro");
				}else{
					element.addClass("cor-vermelho-claro");
				}
				if(data['status'] == "You won"){
					alert("Você venceu o jogo");
				}else if(data['endgame'] == "You lost"){
					alert("Você perdeu o jogo");
				}
			}
		})
	}
}); 
