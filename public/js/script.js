var global_countTime;
var AjUrl = "/api/clientes";

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

function crearPaginado(parent,info){
    var divPaginado = $("<div>");
    console.log(info);
    for (var i = 1; i<= info.last_page; i++) {
        if (info.current_page!=1) {
            var inicioPaginado = $("<a>").text("<").attr("href",info.current_page-1).addClass("paginacion");
            $(divPaginado).append(inicioPaginado);
        }else if(i==1 && info.current_page==1){
            var inicioPaginado = $("<a>").text("<");
            $(divPaginado).append(inicioPaginado);
        }
        var paginaIntermedia = $("<a>").text(i).attr("href",i).addClass("paginacion");
        $(divPaginado).append(paginaIntermedia);
        if (i==info.last_page && info.current_page!=info.last_page){
            var finalPaginado = $("<a>").text(">").attr("href",info.current_page+1).addClass("paginacion");
            $(divPaginado).append(finalPaginado);
        }else if(info.current_page==info.last_page){
            var finalPaginado = $("<a>").text(">");
            $(divPaginado).append(finalPaginado);
        }
        console.log(divPaginado);
    }
    $(parent).append(divPaginado);
}

function AsignarLinks(){
    $('.clickable').each(function(){
    $(this).attr("data-href","/clients/"+$(this).attr("id"));
})
    $('.clickable').click(function(){
            window.location=$(this).data('href');
    });
}

function ajaxClientes(page){
    //console.log("Pagina antes del done:"+page);
    console.log(AjUrl);
    $.ajax({
            url:AjUrl,
            data: {
                page:page
            },
        })
        .done(function(res){
            $('#ClientsTable').empty();
            CreateTable("#ClientsTable",res.data); //crear tabla nuevo contenido
            AsignarLinks();
            crearPaginado("#ClientsTable",res)
            console.log(res);
            $(document).ready(function(){
                console.log($(".paginacion a"));
                $(".paginacion").on('click',function(e){
                    e.preventDefault();
                    ajaxClientes($(this).attr('href'));
                });
            });
        })
        .fail(function(jqXHR,textStatus){
            console.log("fail: "+textStatus);
        });  
    }