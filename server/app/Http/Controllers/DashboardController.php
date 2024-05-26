<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Player;
use App\Models\PlayerType;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getDashboard() {
        $total['totalPlayer'] = Player::select('id')->get()->count();
        $total['activePlayer'] = Player::select('id')->where('status','=','0')->get()->count();
        $total['inactivePlayer'] = Player::select('id')->where('status','=','1')->get()->count();
        $total['activeTeam'] = Team::select('id')->where('status','=','0')->get()->count();
        $total['activeBatsman'] = Player::select('id')->where('type_id','=','1')->where('status','=','0')->get()->count();
        $total['activeBolwers'] = Player::select('id')->where('type_id','=','2')->where('status','=','0')->get()->count();
        $total['activeAllrounder'] = Player::select('id')->where('type_id','=','3')->where('status','=','0')->get()->count();
        $total['activeWicketKeeper'] = Player::select('id')->where('type_id','=','4')->where('status','=','0')->get()->count();
        return response()->json(['message' => 'Record Found.', 'data' => $total], 200);
    }
}
