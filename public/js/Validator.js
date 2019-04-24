
$('#form').submit(function(e){
    e.preventDefault();
    if(checkNulls() && validate()){
		console.log($("input[name='ruta']").val())
		var ruta = '/clients/'+$("input[name='ruta']").val()
		console.log(ruta);
        $.ajax({
			url: ruta, 
			type: 'POST', 
			dataType: 'html', 
			data: $('#form').first().serialize(), 
			success: function() {
				console.log("bien");
				if ($("input[name='ruta']").val()=='create'){
					$('#costumModal10').modal('toggle');
					//modal.empty.... vaciar y poner un mensaje Satisfactorio.
				}
				//$('#form')[0].ajaxSubmit({url: '/clients/'+$("input[name='ruta']").val(), type: 'post'})
				//nose si hace falta la linea de arriba, creo q no
			},
			error: function(e) {
				console.log("error");
				//console.log($('#form').first().serialize());
				console.log(e);
			}
	  }); 
    }
});

function showHideModal(quehacer) {
	$('#costumModal10').modal(quehacer);
};


/*$('#createSale').submit(function(e){
    e.preventDefault();
    if(checkNulls() &&validate()){
        $('#createSale')[0].submit();
    }
});*/

$("#form .input" ).change(function() {
	$(this).css("border","1px solid rgba(0,0,0,0.4");
	checkNulls();
    validate();
});

//Función que valida si un formulario es correcto o no
function validate(){
    var control = true;
    var email = $("input[name='email']");
    var telefono = $("input[name='telefono']");
	var dni = $("input[name='cif/nif']");
	//var stateDropDown = $('[name="estado"]');
	//stateDropDown.css("border","1px solid rgba(0,0,0,0.4");
    if(!validateEmail(email.val()) && email.val() != ""){
        email.css('border','1px solid red');
        createError("El correo tiene un formato incorrecto.", "mail");
        control = false;
    }
    if(!validateNumber(telefono.val())  && telefono.val() != ""){
        telefono.css('border','1px solid red');
        createError("El teléfono tiene que tener 9 dígitos.","phone");
        control = false;
    }
    if(!validateCIF(dni.val())  && dni.val() != ""){
		dni.css('border','1px solid red');
		createError("cif/nif incorrecto","nif");
        control = false;
	}
	
	/*if(stateDropDown.children("option:selected").val() === ""){
		stateDropDown.css('border','1px solid red');
		createError("Todos los campos son obligatorios.","blank");
		control = false;
	}*/
    
    if(control){
        return true;
    }else{
        return false;
    }
}

function checkNulls(){
    let control = true;
    $('#form .input').each(function(){
        if($(this).val() === ""){
            $(this).css('border','1px solid red');
            control = false;
        }else if($(this).children("option:selected").val() === ""){
			$(this).css('border','1px solid red');
            control = false;
		}
    })

    if(control){
        return true;
    }else{
        createError("Todos los campos son obligatorios.","blank");
        return false;
    }
}

//Función para validar un email, recibira una string con el email y devolverá un true o un false
function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Función para validar un teléfono, recibira una string con el número y devolverá un true o un false
function validateNumber(number){
    var re = /\d{9}/;
    return re.test(number);
}


function validateDNI(dni)
{
	var lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
	var valueDni=dni.substr(0,dni.length-1);
	var letra=dni.substr(dni.length-1,1).toUpperCase();
 
	if(lockup.charAt(valueDni % 23)==letra){
        return true;
    }else{
        return false;
    }
}

function validateCIF(cif)
{
	//Quitamos el primer caracter y el ultimo digito
	var valueCif=cif.substr(1,cif.length-2);
 
	var suma=0;
 
	//Sumamos las cifras pares de la cadena
	for(i=1;i<valueCif.length;i=i+2)
	{
		suma=suma+parseInt(valueCif.substr(i,1));
	}
 
	var suma2=0;
 
	//Sumamos las cifras impares de la cadena
	for(i=0;i<valueCif.length;i=i+2)
	{
		result=parseInt(valueCif.substr(i,1))*2;
		if(String(result).length==1)
		{
			// Un solo caracter
			suma2=suma2+parseInt(result);
		}else{
			// Dos caracteres. Los sumamos...
			suma2=suma2+parseInt(String(result).substr(0,1))+parseInt(String(result).substr(1,1));
		}
	}
 
	// Sumamos las dos sumas que hemos realizado
	suma=suma+suma2;
 
	var unidad=String(suma).substr(1,1)
	unidad=10-parseInt(unidad);
 
	var primerCaracter=cif.substr(0,1).toUpperCase();
 
	if(primerCaracter.match(/^[FJKNPQRSUVW]$/))
	{
		//Empieza por .... Comparamos la ultima letra
		if(String.fromCharCode(64+unidad).toUpperCase()==cif.substr(cif.length-1,1).toUpperCase())
			return true;
	}else if(primerCaracter.match(/^[XYZ]$/)){
		//Se valida como un dni
		var newcif;
		if(primerCaracter=="X")
			newcif=cif.substr(1);
		else if(primerCaracter=="Y")
			newcif="1"+cif.substr(1);
		else if(primerCaracter=="Z")
			newcif="2"+cif.substr(1);
		return validateDNI(newcif);
	}else if(primerCaracter.match(/^[ABCDEFGHLM]$/)){
		//Se revisa que el ultimo valor coincida con el calculo
		if(unidad==10)
			unidad=0;
		if(cif.substr(cif.length-1,1)==String(unidad))
			return true;
	}else{
        //Se valida como un dni
		return validateDNI(cif);
	}
	return false;
}


//Función para validar una subida de archivo. Recibira un string con el nombre y se comprobará que sea PDF
function checkFileType(file){
	var extension = file.name.split('.').pop();
	if(extension === "pdf"){
		return true;
	}else{
		createError("Los archivos deben estar en formato PDF");
		return false;
	}	
}