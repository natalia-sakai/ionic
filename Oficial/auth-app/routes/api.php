<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get('get', 'UserController@get');

/*php artisan serve -- > para subir a api*/

Route::prefix('auth')->group(function () {
    Route::post('login', 'Auth\AuthController@login')->name('login');
    Route::post('register', 'Auth\AuthController@register');
    Route::post('listapresenca', 'Auth\AuthController@listapresenca');
    Route::post('reuniao', 'Auth\AuthController@reuniao');
    Route::put('updateuser', 'Auth\AuthController@updateuser');
    Route::put('updatepassword', 'Auth\AuthController@updatepassword');
    Route::post('checkpassword', 'Auth\AuthController@checkpassword');

    Route::middleware(['auth:api'])->group(function () {
        Route::get('logout', 'Auth\AuthController@logout');
        Route::get('user', 'Auth\AuthController@user');
        Route::get('getid', 'Auth\AuthController@getid');
        Route::get('getreuniao', 'Auth\AuthController@getreuniao');
        Route::get('getordem', 'Auth\AuthController@getordem');
        Route::get('getinfo', 'Auth\AuthController@getinfo');
        Route::get('getlista', 'Auth\AuthController@getlista');
    });
});

        
    
