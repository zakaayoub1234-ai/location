<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'brand', 'model', 'year', 'plate', 'fuel',
        'transmission', 'seats', 'price_per_day',
        'image', 'description', 'status',
    ];

    protected $casts = [
        'year' => 'integer',
        'seats' => 'integer',
        'price_per_day' => 'decimal:2',
    ];
}
