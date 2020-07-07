<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
  public function author()
  {
    return $this->belongsTo(Hall::class);
  }
  public function seats()
  {
    return $this->hasMany(Seat::class);
  }
}
