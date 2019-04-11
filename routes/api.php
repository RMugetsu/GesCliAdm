<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('clientes', 'ClientsController@index2');
Route::get('clientes/{id}', 'ClientController@show');
Route::post('clientes', 'ClientController@create');
Route::put('clientes/{id}', 'ClientController@update');
Route::delete('clientes/{id}', 'ClientController@delete');