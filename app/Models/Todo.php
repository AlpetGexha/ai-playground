<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'completed',
        'user_id',
    ];

    /**
     * The user that owns the todo.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
