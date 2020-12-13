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
Route::get('/active_layouts', 'HallLayoutController@getActiveLayouts')->name('getActiveLayouts');

Route::get('/groups/{date}', 'GroupController@getGroups')->name('getGroups');
Route::get('/groups/{date}/layout_id/{layout_id}', 'GroupController@layoutReserveSeats')->name('layoutReserveSeats');
Route::post('/groups/reserve_seats', 'GroupController@setReserveSeats')->name('setReserveSeats');
Route::post('/groups/reserve_seats/reset', 'GroupController@resetReserveSeats')->name('resetReserveSeats');
