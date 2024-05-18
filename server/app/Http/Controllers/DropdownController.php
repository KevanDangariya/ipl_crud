<?php

namespace App\Http\Controllers;

use App\Models\PlayerType;
use App\Models\Team;
use Illuminate\Http\Request;

class DropdownController extends Controller
{
    public function playerType() {
        $playerType = PlayerType::select('id','name')->get()->toArray();
        return response()->json(['data' => $playerType], 200);
    }

    public function team() {
        $team = Team::select('id','name')->get()->toArray();
        return response()->json(['data' => $team], 200);
    }
}
