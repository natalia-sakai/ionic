<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get('get', 'UserController@get');//mostra todos os dados

/*php artisan serve -- > para subir a api*/

//nao precisa de autorizacao
Route::prefix('auth')->group(function () {
    Route::post('login', 'Auth\AuthController@login')->name('login');
    Route::post('register', 'Auth\AuthController@register');
    Route::post('listapresenca', 'Auth\AuthController@listapresenca');
    Route::post('informativo', 'Auth\AuthController@informativo');
    Route::post('ordem', 'Auth\AuthController@ordem');
    Route::post('agape', 'Auth\AuthController@agape');
    Route::post('checkpassword', 'Auth\AuthController@checkpassword');
    Route::post('getusers', 'Auth\AuthController@getusers');
    Route::post('createreuniao', 'Auth\AuthController@createreuniao');
    Route::get('reuniao', 'Auth\AuthController@reuniao');
    Route::get('getcargos','Auth\AuthController@getcargos');
    Route::get('getinfo', 'Auth\AuthController@getinfo');
    Route::get('getallinfo', 'Auth\AuthController@getallinfo');
    Route::get('getlista', 'Auth\AuthController@getlista');
    Route::post('getalllista', 'Auth\AuthController@getalllista');
    Route::get('getreuniao', 'Auth\AuthController@getreuniao');
    Route::get('getallreuniao', 'Auth\AuthController@getallreuniao');
    Route::get('getordem', 'Auth\AuthController@getordem');
    Route::get('getallordem', 'Auth\AuthController@getallordem');
    Route::get('getagape', 'Auth\AuthController@getagape');
    Route::get('getallagape', 'Auth\AuthController@getallagape');
    Route::get('getavental', 'Auth\AuthController@getavental');
    Route::put('updateuser', 'Auth\AuthController@updateuser');
    Route::put('updatepassword', 'Auth\AuthController@updatepassword');
    Route::put('updateinfo', 'Auth\AuthController@updateinfo');
    Route::put('updateordem', 'Auth\AuthController@updateordem');
    Route::put('updateagape', 'Auth\AuthController@updateagape');
    //precisa de autorizacao
    Route::middleware(['auth:api'])->group(function () {
        Route::get('logout', 'Auth\AuthController@logout');
        Route::get('user', 'Auth\AuthController@user');
        Route::get('getid', 'Auth\AuthController@getid');
        
    });
});

        
    
