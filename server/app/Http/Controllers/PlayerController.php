<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Player;
use App\Models\PlayerType;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class PlayerController extends Controller
{
    public function getPlayer() {
        $player = Player::select('player.id','player.name','player.status')
                    ->addSelect('team.id AS team_id', 'team.name AS team_name')
                    ->addSelect('player_type.id AS type_id', 'player_type.name AS type_name')
                    ->leftJoin('team','team.id','=','player.team_id')
                    ->leftJoin('player_type','player_type.id','=','player.type_id')
                    ->get()->toArray();
        return response()->json(['message' => 'Record Found.', 'data' => $player], 200);
    }

    public function getPlayerById($id) {
        $player = Player::select('player.id','player.name','player.status')
                    ->addSelect('team.id AS team_id')
                    ->addSelect('player_type.id AS type_id')
                    ->leftJoin('team','team.id','=','player.team_id')
                    ->leftJoin('player_type','player_type.id','=','player.type_id')
                    ->where('player.id','=',$id)
                    ->get()->toArray();
        if ($player) {
            return response()->json(['message' => 'Record Found.', 'data' => $player], 200);
        } else {
            return response()->json(['message' => 'Record not found.'], 422);
        }
    }

    public function createPlayer(Request $request) {
        $input = $request->all();

        $validator = Validator::make($input['data'], [
            'name' => 'required',
            'type_id' => 'required',
            'team_id' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            $player = Player::create($input['data']);
            return response()->json(['message' => 'Player Type Created'], 200);
        }
    }
    
    public function editPlayerById($id, Request $request) {
        $input = $request->all();

        $validator = Validator::make($input['data'], [
            'name' => 'required',
            'type_id' => 'required',
            'team_id' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            $player = Player::where('id', $id)->update($input['data']);
            if ($player) {
                return response()->json(['message' => 'Player Updated'], 200);
            } else {
                return response()->json(['message' => 'Something went wrong.'], 402);            
            }
        }
    }

    public function deletePlayerById($id) {
        $player = Player::where('id', $id)->update(['status' => 1]);
        if ($player) {
            return response()->json(['message' => 'Player Deleted'], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 402);            
        }
    }   
}
