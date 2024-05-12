<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PlayerController extends Controller
{
    //
    public function index() {
        return json_encode(array('success'=>'success to connect with backend api'));
    }
}
