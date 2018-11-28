$(".unit").click(function(){
	if($(this).hasClass("cor-cinza-claro")){
		$(this).removeClass("cor-cinza-claro");
    	$(this).addClass("cor-cinza-escuro");
	}else{
		$(this).removeClass("cor-cinza-escuro");
    	$(this).addClass("cor-cinza-claro");
	}
}); 

$("#confirma").click(function(){
	$( ".unit" ).each(function( index ) {		
		if($(this).hasClass("cor-cinza-escuro")){
			$(this).removeClass("cor-cinza-escuro");
	    	$(this).addClass("cor-azul-escuro");
		}
	});
}); 

