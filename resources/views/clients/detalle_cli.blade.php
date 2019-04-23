@extends('home')

@section('breadcrumbs')
    {{ Breadcrumbs::render('cliente',$cliente[0]) }}
@stop

@section('ownCSS')

    <style>
    	#Input,#Sales{
    		margin: 15px;
    	}
        #Input{
            padding: 60px 60px 10px 60px;
            background-color: rgb(241, 241, 187) ;
            box-shadow: 0 0 20px rgba(0,0,0,0.4);
            position: relative;
            width: 40%;
        }
        #Input form{
            width: 300px;
            clear: both;
            text-align: left !important;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        form input{
            width: 70%;
            clear: both;
            float: right;
            opacity: 0.9;
            padding: 4px;
            border-radius: 2px;
            box-shadow: 0 0 5px rgba(0,0,0,0.6);
            border: 0;
            outline: none;
            transition: border-bottom 0.2s linear;
        }

        form input:focus{
            border-bottom: 2px solid black;
        }

        form input::placeholder{
            opacity: 0.3;
            text-transform: capitalize;
            padding-left: 5px;
        }

        form input:read-only{
            background-color: rgb(200, 200, 200);
        }  

        form input:read-only:focus{
            border-bottom: 0;
        }

        label{
            text-transform: capitalize;
            text-align: left !important;
            margin: 5px 10px 5px 0;
            width: 100%;
            display: inline-block;
            line-height: 20px;
        }
        table{
            border-radius: 5px;
        }
        table td,th,tr{
            padding: 10px !important;
            width: auto !important;
        }   
        #contenedor{
            width: 100%;
            display: flex;
            flex-direction: row; 
            justify-content: center;
        }

        .saveClient{
            margin: 20px 20px 20px 0px;
            width:130px;
        }

        .divtop{
            padding: 10px;
            background-color: rgba(0,0,0,0.8);
            color: white;
            top: 0;
            position: absolute;
            width: 100%;
            left: 0;
            font-size: 15px;
            font-weight: 700;
            text-align: left !important;
        }

        .NoResults{
            width: 100%;
            padding: 100px;
            position: relative;
            background-color: rgb(241, 241, 187) ;
            box-shadow: 0 0 20px rgba(0,0,0,0.4);
        }

        .buttonTop{
            top: -102px;
            right: 0;
            bottom: 0;
            position: absolute;
        }

        .btn{
            height: 40px;
        }

        select{
            width: 100%;
            height: 30px;
        }

    </style>

@stop

@section('content')
	<div id="contenedor">
        <div id="Input"></div>
		<div style="display:flex;flex-direction:column; align-items:center;">
            <div id="Sales"></div>
            {{ $ventas->links() }}
        </div>
	</div>
    <script type="text/javascript">
        var cliente = {!! json_encode($cliente, JSON_HEX_TAG) !!};
        //console.log(cliente)
        var listadoventas = {!! json_encode($ventas, JSON_HEX_TAG) !!};
        var ventas = listadoventas.data;
        CreateForm('#Input',cliente,undefined);

        if(ventas.length != 0){
            CreateTable('#Sales',ventas,undefined);
            createFilter("#Sales table thead","/clients/{{$cliente[0]->id}}","ventas","table");
            $('.clickable').click(function(){
                window.location=$(this).data('href');
            });
        }else{
            var div = $('<div class="NoResults"><h3>No hay ventas disponibles</h3></div>')
                        .appendTo('#Sales');
            var div = CreateElement(div,'div','Ventas',{class:'divtop'})
            createFilter(div,"/clients/{{$cliente[0]->id}}","ventas","div");
        }
	    
        $('input[name="cif/nif"]').prop('readonly',true);
        
        CreateElement('#Input',"div","Información de Cliente",{class:"divtop"});

        //Añadimos el botón para poder agregar una nueva venta
        $('th:last').css('position','relative');
        var a = CreateElement('th:last',"a",undefined,{"href":"#costumModal10","data-toggle":"modal",class:"buttonTop"});
        CreateElement(a,'button','Añadir Venta',{class:'btn btn-primary','type':'submit'});

        $('.clickable').each(function(){
            $(this).attr("data-href","/sales/"+$(this).attr("id"));
        });

        $('.clickable').click(function(){
            window.location=$(this).data('href');
        });

        estadoVentas();
        $('input[name="filtro"]').val('{{$filtro}}');
	</script>
@stop

@section('modal')
    <div id="costumModal10" class="modal" data-easein="bounceIn"  tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×
                        </button>
                        <h4 class="modal-title">
                            Añadir una nueva venta
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="modal-form">
                        <form id="createSale" action="/sales/create" method="POST">
                            @csrf
                            <label for="descripcion">Descripción: <input type="text" name="descripcion" class="input"></label>
                            <label for="estado">Estado <br>
                                <select name="estado">
                                    <option selected="selected" value="" disabled>-- Escoge una opción --</option>
                                    <option value="Sin validar">Sin validar</option>
                                    <option value="Validado">Validado</option>
                                    <option value="En espera">En espera</option>
                                </select>
                            </label>
                            <input type="hidden" name="id_cliente" value="{{$cliente[0]->id}}">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal" aria-hidden="true">
                            Close
                        </button>
                        <button class="btn btn-primary" type="submit">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop