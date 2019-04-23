<?php
    Breadcrumbs::register('clientes', function ($breadcrumbs) {
        $breadcrumbs->push('Home', route('clientes'));
    });

    Breadcrumbs::for('cliente',function($breadcrumbs,$cliente){
        $breadcrumbs->parent('clientes');
        $breadcrumbs->push('Cliente', route('cliente',$cliente));
    });

    Breadcrumbs::for('venta',function($breadcrumbs,$cliente,$venta){
        $breadcrumbs->parent('cliente',$cliente);
        $breadcrumbs->push('Venta', route('venta',$venta));
    });
?>