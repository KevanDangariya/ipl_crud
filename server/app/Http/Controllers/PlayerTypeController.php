<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\PlayerType;
use Illuminate\Support\Facades\DB;

class PlayerTypeController extends Controller
{
    public function createPlayerType(Request $request) {
        $input = $request->all();

        $validator = Validator::make($input['data'], [
            'name' => 'required|unique:player_type',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            $playerType = PlayerType::create($input['data']);
            return response()->json(['message' => 'Player Type Created'], 200);
        }
    }

    public function getPlayerType() {
        $playerType = PlayerType::select('id','name','status')->get()->toArray();
        return response()->json(['message' => 'Record Found.', 'data' => $playerType], 200);
    }

    public function getPlayerTypeById($id) {
        $playerType = PlayerType::select('id','name','status')->where('id','=',$id)->get()->toArray();
        if ($playerType) {
            return response()->json(['message' => 'Record Found.', 'data' => $playerType], 200);
        } else {
            return response()->json(['message' => 'Record Found.'], 422);
        }
    }

    public function editPlayerTypeById($id, Request $request) {
        $input = $request->all();

        $validator = Validator::make($input['data'], [
            'name' => 'required|unique:player_type',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            $playerType = PlayerType::where('id', $id)->update($input['data']);
            if ($playerType) {
                return response()->json(['message' => 'Player Type Updated'], 200);
            } else {
                return response()->json(['message' => 'Something went wrong.'], 402);            
            }
        }
    }

    public function deletePlayerTypeById($id) {
        $playerType = PlayerType::where('id', $id)->update(['status' => 1]);
        if ($playerType) {
            return response()->json(['message' => 'Player Type Deleted'], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 402);            
        }
    }
}
