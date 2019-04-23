@extends('home')

@section('breadcrumbs')
    <a href="/">{{ Breadcrumbs::render('clientes') }}</a>
@stop

@section('content')
    <div class="content">
        <!--<p id="aleatorio"></p>-->
        <div class="topContainer">
            <div class="top-title">
                Listado de Clientes: 
            </div> 
            <div class="addUserIcon">
                <a href="#costumModal10" data-toggle="modal">
                    <button class="btn btn-primary" type="submit">Añadir Cliente</button>
                </a>
            </div>
            
        </div>
    </div>
    
    <div id="ClientsTable"></div>
    {{ $clientes->links() }}
    <script>
        
        var clientes = {!! json_encode($clientes->toArray(), JSON_HEX_TAG) !!} ;

        //console.log(clientes)

        function llamadaAjax(metodo,direccion,datos,succesFunction){
          $.ajax({
            method: metodo,
            url: direccion,
            data: datos
          })
          .done(function( num ) {
            pintarAlumno
          });
        }
        

        $(document).ready( function(){
            ajaxClientes("1");    
        });
       

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
                            Añadir un nuevo cliente
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="modal-form">
                        <form id="form">
                            @csrf
                            <label for="nombre">Nombre: <input type="text" name="nombre" class="input"></label>
                            <label for="direccion">Dirección: <input type="text" name="direccion" class="input"></label>
                            <label for="provincia">Provincia: <input type="text" name="provincia" class="input"></label>
                            <label for="localidad">Localidad: <input type="text" name="localidad" class="input"></label>
                            <label for="cif/nif">CIF/NIF: <input type="text" name="cif/nif" class="input"></label>
                            <label for="email">E-Mail: <input type="text" name="email" class="input"></label>
                            <label for="telefono">Teléfono: <input type="text" name="telefono" class="input"></label>
                            <label for="cp">Código Postal: <input type="text" name="cp" class="input"></label>
                            <input type="text" name="ruta" value="create" hidden="true">
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


