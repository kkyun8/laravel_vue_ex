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

Route::get('/halls', 'HallLayoutController@getHalls')->name('getHalls');
Route::get('/layout/{id}', 'HallLayoutController@getLayout')->name('getLayout');
Route::post('/layout', 'HallLayoutController@create')->name('createLayout');
Route::put('/layout', 'HallLayoutController@store')->name('storeLayout');
