<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*php artisan serve -- > para subir a api*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'Auth\AuthController@login')->name('login');
    Route::post('register', 'Auth\AuthController@register');
    Route::post('listapresenca', 'Auth\AuthController@listapresenca');
    Route::group([
      'middleware' => 'auth:api'
    ], 
    function() {
        Route::get('logout', 'Auth\AuthController@logout');
        Route::get('user', 'Auth\AuthController@user');
        Route::get('getid', 'Auth\AuthController@getid');
        Route::get('getreuniao', 'Auth\AuthController@getreuniao');
    });
});

