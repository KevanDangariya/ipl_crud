<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlayerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// dropdown 
Route::get('/playerTypeDropdown', 'App\Http\Controllers\DropdownController@playerType');
Route::get('/teamDropdown', 'App\Http\Controllers\DropdownController@team');

// player type
Route::get('/playerType', 'App\Http\Controllers\PlayerTypeController@getPlayerType');
Route::post('/createPlayerType', 'App\Http\Controllers\PlayerTypeController@createPlayerType');
Route::post('/getPlayerTypeById/{id}', 'App\Http\Controllers\PlayerTypeController@getPlayerTypeById');
Route::post('/editPlayerTypeById/{id}', 'App\Http\Controllers\PlayerTypeController@editPlayerTypeById');
Route::post('/deletePlayerTypeById/{id}', 'App\Http\Controllers\PlayerTypeController@deletePlayerTypeById');

// team
Route::get('/team', 'App\Http\Controllers\TeamController@getTeam');
Route::post('/createTeam', 'App\Http\Controllers\TeamController@createTeam');
Route::post('/getTeamById/{id}', 'App\Http\Controllers\TeamController@getTeamById');
Route::post('/editTeamById/{id}', 'App\Http\Controllers\TeamController@editTeamById');
Route::post('/deleteTeamById/{id}', 'App\Http\Controllers\TeamController@deleteTeamById');

// player type
Route::get('/player', 'App\Http\Controllers\PlayerController@getPlayer');
Route::post('/createPlayer', 'App\Http\Controllers\PlayerController@createPlayer');
Route::post('/getPlayerById/{id}', 'App\Http\Controllers\PlayerController@getPlayerById');
Route::post('/editPlayerById/{id}', 'App\Http\Controllers\PlayerController@editPlayerById');
Route::post('/deletePlayerById/{id}', 'App\Http\Controllers\PlayerController@deletePlayerById');
