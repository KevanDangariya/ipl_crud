<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function createTeam(Request $request) {
        $input = $request->all();

        $validator = Validator::make($input['data'], [
            'name' => 'required|unique:team',
            'nickname' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            $team = Team::create($input['data']);
            return response()->json(['message' => 'Team Created'], 200);
        }
    }

    public function getTeam() {
        $team = Team::select('id','name','nickname','status')->get()->toArray();
        return response()->json(['message' => 'Record Found.', 'data' => $team], 200);
    }

    public function getTeamById($id) {
        $team = Team::select('id','name','nickname','status')->where('id','=',$id)->get()->toArray();
        if ($team) {
            return response()->json(['message' => 'Record Found.', 'data' => $team], 200);
        } else {
            return response()->json(['message' => 'Record not Found.'], 422);
        }
    }

    public function editTeamById($id, Request $request) {
        $input = $request->all();

        $validator = Validator::make($input['data'], [
            'name' => 'required|unique:team,name,'.$id,
            'nickname' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {            
            $team = Team::where('id', $id)->update($input['data']);
            if ($team) {
                return response()->json(['message' => 'Team Updated'], 200);
            } else {
                return response()->json(['message' => 'Something went wrong.'], 402);            
            }
        }
    }

    public function deleteTeamById($id) {
        $team = Team::where('id', $id)->update(['status' => 1]);
        if ($team) {
            return response()->json(['message' => 'Team Deleted'], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 402);            
        }
    }
}
