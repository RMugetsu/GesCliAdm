var global_countTime;

function uniqueError(id){
    var control = true;
    $('.Error').each(function(){
        if($(this).attr('id') === id){
            control = false;
        }
    });

    return control;
}
//Función que crea el error y le pasa un mensaje por parámetro
function createError(Message,id){

    if(uniqueError(id)){
        $('<div>')
        .attr({class:'Error',id:id})
        .text(Message)
        .prepend($('<img>',{src:'/img/exclamacion.png',width:'40px'}))
        .appendTo('.ErrorContainer');
        $('.ErrorContainer').show();
        setTimer();
    }
}

//Función que crea un timer que, tras 5 segundos, oculta de nuevo la ventana de error.
function setTimer(){
	clearTimeout(global_countTime);
	global_countTime =	setTimeout(function (){
        var errorContainer = $('.ErrorContainer');
        errorContainer.hide();
        errorContainer.empty();
	}, 5000);
}

/**
 * 
 * @param {*} parent "String con el elemento padre al que añadiremos el filtro"
 * @param {*} url "Ruta a la que irá el formulario"
 * @param {*} vista "Indica la view de la que viene el filtro"
 * @param {*} tipo "Indica el tipo de elemento al que se quiere añadir. Si es una tabla creará filas y columnas, y si es un div, añadirá un div."
 */
function createFilter(parent,url,vista,tipo){
    if(tipo === "table"){
        var tr = $('<tr>')
        .prependTo(parent);

        $('<th>')
            .attr({"colspan":"5",class:'filterInputs'})
            .appendTo(tr);
    }else if(tipo === "div"){
        $('<div>')
            .attr({class:'filterInputs'})
            .appendTo(parent);
    }

    var form = $('<form>')
        .attr({'method':'GET',"action":url})
        .appendTo(".filterInputs");

    $('<input>')
            .attr({'type':'text','name':'filtro','tipo':vista})
            .appendTo(form)
    $('<input>')
        .attr({'type':'submit','value':'Filtrar',class:"btn"})
        .appendTo(form);
    var reset = $('<input>')
        .attr({'type':'button','value':'Resetear',class:"btn"})
        .appendTo(form);

    $(reset).click(function(){window.location.assign(url)});

    $('<input>')
        .attr({'type':'hidden',"name":"tipo", "value":vista})
        .appendTo(form);
}

/**
 * 
 * @param {*} idArchivo Se requiere enviar un string con el número de id del archivo que se desea descargar
 */
function downloadFile(idArchivo){
    var form = CreateElement("body","form",undefined,{"method":"POST","action":"/download/"+idArchivo});
    var csrfVar = $('meta[name="csrf-token"]').attr('content');
            form.append("<input name='_token' value='" + csrfVar + "' type='hidden'>");
    form.submit();
}

function fileActionForm(element,link,id){
    var form = $('<form action="' + link + id + '" enctype="multipart/form-data" method="POST" id="query"></form>').appendTo(".sale");
    var csrfVar = $('meta[name="csrf-token"]').attr('content');
    form.append("<input name='_token' value='" + csrfVar + "' type='hidden'>");
    var tipo = element.attr("tipo");
    CreateElement(form,"input",undefined,{"type":"hidden","name":"tipo","value":tipo});
    var newFile = element.clone().appendTo(form);
    form.submit();
    $('input').hide();
}

//Función que se utiliza para darle estilo al estado de las ventas
function estadoVentas(){
    $('tbody tr').each(function(){
        var estado = $(this).find('td').eq(1); 
        if(estado.html() === "Sin validar"){
            estado.html("")
            CreateElement(estado,"div","Sin validar",{class:"notValidated"});
        }else if(estado.html() === "Validado"){
            estado.html("")
            CreateElement(estado,"div","Validado",{class:"validated"});
        }else if(estado.html() === "En espera"){
            estado.html("")
            CreateElement(estado,"div","En espera",{class:"waiting"});
        }
    });
}

function crearPaginado(info){
    var divPaginado = $("<div>"); 
    for (var i = 1; i< info.last_page; index++) {
        if (i==1) {
            var inicioPaginado = $("<label>").text("<").on("click",{url: info.path+"?page="+info.current_page-1},redirigir);
            $(divPaginado).append(inicioPaginado);
        }
        var paginaIntermedia = $("<label>").text(i).on("click",{url: info.path+"?page="+i},redirigir);
        $(divPaginado).append(paginaIntermedia);
        if (i==info.last_page){
            var finalPaginado = $("<label>").text(">").on("click",{url: info.path+"?page="+info.current_page+1},redirigir);
            $(divPaginado).append(finalPaginado);
        }
    }
}
function redirigir(event){
    window.location = event.data.url;
}