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

//funcao de batalha
$(".my-unit").click(function(){
	if($(this).hasClass("cor-azul-claro")){
		var cont = 0;
		$( ".my-unit" ).each(function( index ){
			if($(this).hasClass("cor-verde-claro")){
				cont++;
			}
		});
		console.log(cont);
		if(cont < 14){
			$(this).removeClass("cor-azul-claro");
			if(Math.floor(Math.random() * 10 <=4)){ // substituir random por funcao real
				$(this).addClass("cor-vermelho-claro");
			}else{
				$(this).addClass("cor-verde-claro");
			}
		}else{
			if(cont == 14){
				if(Math.floor(Math.random() * 10 <=4)){  // substituir random por funcao real
					$(this).addClass("cor-vermelho-claro");
				}else{
					$(this).addClass("cor-verde-claro");
					alert("Você venceu, jogo encerrado");
				}
			}
		}
		
	}
}); 

