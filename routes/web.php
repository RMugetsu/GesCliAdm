<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', 'ClientsController@index');

Route::get('/',  ['as' => 'clientes', 'uses' => 'ClientsController@index']);

Route::post('/clients/create','ClientsController@create');

//Route::get('/clients/{id}', 'ClientsController@showClient');

Route::get('/clients/{id}',  ['as' => 'cliente', 'uses' => 'ClientsController@showClient']);

//Route::get('/sales/{id}', 'ClientsController@showSale');

Route::get('/sales/{id}',  ['as' => 'venta', 'uses' => 'ClientsController@showSale']);

Route::post('/clients/{id}', 'ClientsController@edit');

Route::post('/uploadFile/{id}', 'ClientsController@upload');

Route::post('/download/{id}','ClientsController@download');

Route::post('/modify/{id}','ClientsController@modify');

Route::post('/sales/create','ClientsController@createSale');