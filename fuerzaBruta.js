var tests = ["2 1", "1 2 4 3 5 6", "9 1 5 8", "9 80 1"];
var tiempo0 = 0 , tiempo1 = 0, html = "", error, mejorComb, muestra;
var inicioBateria = "<h1 style='margin:10px 10px;'><b>Batería de pruebas</b></h1>";

$('.container').append(inicioBateria);
for (var i = 0; i < tests.length; i++) {

    muestra = [];
    muestra = tests[i].split(" ");

    if(muestra.length >= 3){

        tiempo0 = performance.now();
        mejorComb = bruteForce(muestra);
        tiempo1 = performance.now();
        console.log("----------------------------------");
        
        html="";
        if(mejorComb != undefined && mejorComb.length != 0) {
            for(var j=0; j<mejorComb.length;j++){
                html += "<div class='row'><div class='col s8 m8 '>" +
                            "<div class='card black darken-1'>" +
                                "<div class='card-content red-text'>" + "<p style='color: #7B68EE;'>TEST "  + (i+1) + ": FINALIZADO" + "</p>" + 
                                    "<p style='color: #00FA9A;'>¡Combinación correcta!: " + "<b style='color: #00FA9A;'>" + 
                                    mejorComb[j] + "</b>" + "</p>" + "</div>" +
                                    "<div class='card-action white-text'>" +
                                    "<p>El tiempo de ejecución ha sido: " + (tiempo1 - tiempo0) / 1000 + " segundos.</p>"
                            + "</div>" +
                            "</div>" +
                        "</div>" + "</div>";
            }
        }else{
            error = "";
            for(var j = 0; j < muestra.length; j++){
                error += muestra[j] + " ";
            }
            html = "<div class='row'><div class='col s8 m8 '><div class='card black darken-1'>"+
                        "<div class='card-content red-text'>" + "<p style='color: #7B68EE;'>TEST "  + (i+1) + ": FINALIZADO" + "</p>" 
                        +"No hay solución para la combinación: " + "<b>" + error + "</b></p>" + "</div>" + 
                        "<div class='card-action white-text'>" +
                            "<p>El tiempo de ejecución ha sido: " + (tiempo1 - tiempo0) / 1000 + " segundos.</p>"
                        + "</div>" +
                        "</div>" +
                "</div>" + "</div>";
        }
    }else{
        error = "";
        for(var j = 0; j < muestra.length; j++){
            error += muestra[j] + " ";
        }
        html = "<div class='row'><div class='col s8 m8 '><div class='card black darken-1'>"+
                    "<div class='card-content red-text'>" + "<p style='color: #7B68EE;'>TEST " + (i+1)  + ": FINALIZADO" + "</p>" 
                    +"No hay solución para la combinación: " + "<b>" + error + 
                    "</b></p><p style='color: #FFFACD;'>Debe contener mínimo 3 números.</p>"
                    + "</div>" + "</div>" +
            "</div>" + "</div>";
    }

    $('.container').append(html);
}
var finalBateria = "<h1 style='margin:10px 10px;'><b>Batería de pruebas finalizada</h1><br/>";
$('.container').append(finalBateria);


function bruteForce(texto) {
    var it = Iterator(3, texto.length, texto); 
    it.init();

    var combinaciones = [], sumaTotal = 0, iter = 0, iterConsola = 1;
    
    while (it.hasNext()) {
        var flagCombinaciones = false;
        var combPosiciones = it.next(); 
        
        var msjConsola = "";
        for(var i = 0; i < combPosiciones.length; i++){
            msjConsola += combPosiciones[i] + " "; 
        }

        console.log("La combinación es: ", iterConsola++, msjConsola);
        sumaTotal = parseInt(combPosiciones[0]*2) + parseInt(combPosiciones[1]);

        if (sumaTotal==combPosiciones[2]){ 
            
            console.log("¡COMBINACIÓN CORRECTA! ---> ", msjConsola);

            /*No repetir combinaciones generadas*/
            for(var i=0; i<combinaciones.length;i++){
                if(combinaciones[i] == msjConsola) flagCombinaciones = true;
            }

            if(!flagCombinaciones) combinaciones[iter++] = msjConsola;
        }
    }

    return combinaciones; 
}

function Iterator(nCont, nElem, comb) { 

    var iterador = [];
    var nelem = nElem; /*Tamaño de la cadena*/
    var flagNoceros;
    var combinacionPositiva = 0;
    return {
        init: function () { 
            for (var i = 0; i < nCont; i++) iterador[i] = 0;
           	var flagNoceros = false;
        },
        next: function () {
            var ret = iterador;
            while(true){
            	var flagNumeros = false;
            	var posiciones = [];
            	var combinacion = [];
	        	for(var i=0; i<iterador.length;i++){
	                /*Comprobamos el límite*/
	                if (iterador[i] === nelem) {
	                    iterador[i] = 1;
	                } else {
	                    iterador[i]++;
	                    break;
	                }
		         }
		        
	            while(!flagNoceros){
	            	for(var i=0; i<iterador.length;i++){
		                /*Comprobamos el límite*/
		                if (iterador[i] === nelem) {
		                    iterador[i] = 1;
		                } else {
		                    iterador[i]++;
		                }
			            if (iterador[i] != 0 && i == iterador.length-1) flagNoceros = true;
			         }
		        }

	            for (var i = 0; i < ret.length; i++) {
		            for (var k = 0; k < posiciones.length; k++){
		            	/*Posiciones coinciden entonces repite valor*/
		                if ((ret[i]-1) == posiciones[k]){ 
		                	flagNumeros = true; 
		                	break;
		                }
		            }
		            /*Introducimos si no repite valor*/
		            if (!flagNumeros) { 
		            	combinacion[i] = comb[ret[i]-1];  
		            	posiciones[i] = ret[i]-1;
		            }
		        }
		        if(combinacion.length == 3) break;
		    }
           	combinacionPositiva++;
            return combinacion;
        },
        hasNext: function () {
        	var cuenta = 1;
        	var cuenta2 = 1;
            for(var i=1; i<comb.length+1;i++){
            	cuenta *= i;
            }
        	for(var i=1;i<(comb.length-3)+1;i++){
        		cuenta2 *= i;
        	}
            if ((cuenta/cuenta2) == combinacionPositiva) return false;
            return true;
        }

    }
}

function newCombination() {
    var test = prompt("Por favor introduzca una serie de números");
    var time = prompt("¿Desea que se muestre el tiempo de ejecución? Si/No","Si");

    if (test == null || test == "" ) {
        newCombination();
    }else{
        var html = "";
        console.log("Nueva combinación introducida: ", test.split(" "));
        tiempo0 = performance.now();
        var cadena = test.split(" ");
        if(cadena.length >= 3) var nuevaComb = bruteForce(cadena);
        tiempo1 = performance.now();
        console.log("----------------------------------");

        var newHtml = "<h3 style='margin:10px 10px;'>Se ha introducido una nueva combinación: </h3>";
        $('.container').append(newHtml);
        
        if(nuevaComb != undefined && nuevaComb.length != 0) {
            for(var i=0; i<nuevaComb.length;i++){
                html += "<div class='row'><div class='col s8 m8 '>" +
                            "<div class='card black darken-1'>" +
                                "<div class='card-content red-text'>" + 
                                    "<p style='color: #00FA9A;'>¡Combinación correcta!: " + 
                                    "<b style='color: #00FA9A;'>" + 
                                    nuevaComb[i] + "</b>" + "</p>" + "</div>";

                if(time == "Si"){
                	html += "<div class='card-action white-text'>" +
                				"<p>El tiempo de ejecución ha sido: " + (tiempo1 - tiempo0) / 1000 + 
                				" segundos.</p>" + "</div>" + "</div>" + "</div>";
                }else{
                	html += "</div>" + "</div>";
                }
                                    
            }
        }else{
            html = "<div class='row'><div class='col s8 m8 '>" +
            			"<div class='card black darken-1'>"+
                        	"<div class='card-content red-text'>" + 
                        		"<p>Ninguna combinación para: " + test + "</p>" + "</div>";
            if (time == "Si"){
            	html += "<div class='card-action white-text'>" + 
            			"<p>El tiempo de ejecución ha sido: " + (tiempo1 - tiempo0) / 1000 +  " segundos.</p>" + 
            			"</div>" + "</div>" + "</div>";
            }else{
            	html += "</div>" + "</div>";
            }
        }
    }
    $('.container').append(html);
}