/**
 * 
 * @param {*} parent Elemento padre donde se introducirá el form (usualmente debería ser una lista o un div)
 * @param {*} data Array que incluirá un objeto en formato JSON en su interior
 * @param {*} params Objeto con elementos clave valor, por ejemplo: {class:'container',name:'elemento1'}
 */
function CreateTable(parent,data,params){
    var TableReturn = filterData(data);
    var Keys = TableReturn[0];
    var Values = TableReturn[1];
    var Table = CreateElement(parent,"table",undefined,undefined);
    var Thead = CreateElement(Table,"thead",undefined,undefined);
    var Tbody = CreateElement(Table,"tbody",undefined,undefined);
    var TRhead;
    var control=false;

    Keys.forEach(function(element){
        if(control===false){
            TRhead=CreateElement(Thead,"tr",undefined,undefined);
            control=true;
        }else{
            CreateElement(TRhead,"th",element,{name:element}); 
        }
    });

    Values.forEach(function(items){
        var TRbody;
        var control=false;
        items.forEach(function(item){
            if(control===false){
                TRbody=CreateElement(Tbody,"tr",undefined,{"class":"clickable","id":item});
                control=true;
            }else{
            CreateElement(TRbody,"td",item,undefined); 
            }
        });
    });
}
/**
 * 
 * @param {*} parent "Elemento al que se añadirá la tabla"
 * @param {*} text "Título que recibirá el elemento"
 * @param {*} attr "Elemento de tipo objeto que contiene los posibles atributos que se quieran añadir"
 * @param {*} data "Elemento que debe tener un array con uno o más objetos de tipo JSON"
 */
function SimpleTable(parent,text,attr,data){
    var Split=SplitData(data,text);
    var Tr=CreateElement(parent,"tr");
    var Th = CreateElement(Tr,"th",text,{colspan:4});
    var Span = CreateElement(Th,"span","Añadir "+text, {class:"file-input btn btn-primary btn-file add"});
    CreateElement(Span,"input",undefined,{"type":"file",class:"fileInput","name":"archivo","tipo":text});

    Split.forEach(function(elements){
        var NewTr=CreateElement(parent,"tr");
        for(element in elements){
            var id;
            if(element === "id"){
                NewTr.attr({id:elements[element]});
            }else if(element === "Tipo"){
            }else if( element == "Archivo"){
                NewTr.attr({"archivo":elements[element]});
            }else{
                CreateElement(NewTr,"td",elements[element],{id:id});
            }
        }
        var IconsTD = CreateElement(NewTr,"td");
        
        var showDocument = CreateElement(IconsTD,"i",undefined,{class:"fas fa-search-plus fileIcon",'title':'Ver','name':"verDoc"});
        var url = '/storage/' + elements.Archivo;
        showDocument.click(function(){ 
            window.open(url,'blank');
        });

        var modifyIcon = CreateElement(IconsTD,"i",undefined,{class:"fas fa-edit btn-file modify fileIcon",'title':'Modificar','name':"editDoc"});
        CreateElement(modifyIcon,"input",undefined,{"type":"file",class:"modifyInput","name":"archivo","tipo":text});

        CreateElement(IconsTD,"i",undefined,{class:"fas fa-file-download fileIcon",'title':'Descargar','name':"downDoc"});
    });
}


function SplitData(data,type){
    var SplitArray=[];
    data.forEach(function(items){

        if(items.Tipo.toLowerCase()===type.toLowerCase()){
            SplitArray.push(items);
        }

    })
    return SplitArray;
}

/**
 * 
 * @param {*} parent Elemento al que añadiremos el componente que vamos a crear. Se debe pasar una string con un formato parecido a: '#id','.class',etc...
 * @param {*} element String que contiene el tipo de elemento que deseamos crear: 'div','p','button','form',etc...
 * @param {*} text String con un texto que se printará en el elemento creado.
 * @param {*} params Objeto en formato JSON que contendrá los diversos atributos que dseamos que tenga el componente (class:'clase',name:'nombre',etc...)
 */
function CreateElement(parent,element,text,params){
    if(params===undefined || params === null){
        params={};
    }
    var element=$('<'+element+'>')
            .attr(params)
            .text(text)
            .appendTo(parent);
    return element;
}

//Función que recibe un array y devuelve uno nuevo con los elementos únicos. Si se repiten elimina los repetidos para dejar uno solo.
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

//Función que recibe un JSON y lo convierte en dos arrays, uno que contiene las keys y otro que contiene los valores
function filterData(result){
    //var result = result.data;
    var keys = [];
    var values = [];
        result.forEach(function(items){
            var list = [];
            for(item in items){
                keys.push(item);
                list.push(items[item]);
            };
            values.push(list);
            
        });

    keys = keys.filter(onlyUnique); 
    return [keys,values];
}

/**
 * 
 * @param {*} parent Elemento padre donde se introducirá el form (usualmente debería ser una lista o un div)
 * @param {*} data Array que incluirá un objeto en formato JSON en su interior
 * @param {*} params Objeto con elementos clave valor, por ejemplo: {class:'container',name:'elemento1'}
 */
function CreateForm(parent,data,params){
    var form=CreateElement(parent,"form",undefined,{id:"form"});
    var csrfVar = $('meta[name="csrf-token"]').attr('content');
    form.append("<input name='_token' value='" + csrfVar + "' type='hidden'>");
    data.forEach(function(elements){
        for(item in elements){
            if(item==="id"){
                CreateElement(form,"input",undefined,{'value':elements[item],name:'ruta',hidden:true});
            }else{
                var label=CreateElement(form,"label",item,undefined);
                CreateElement(form,"input",undefined,{'value':elements[item],name:item,'required':true});
            }
        }
        CreateElement(form,"button","Modificar Cliente",{class:"btn btn-primary saveClient"});
    })
}