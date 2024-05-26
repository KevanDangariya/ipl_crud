<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type_id',
        'team_id',
        'status',
    ];

    protected $table = 'player';

    const CREATED_AT = 'itp';
    const UPDATED_AT = 'utp';
}
