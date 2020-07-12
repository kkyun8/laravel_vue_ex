<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
  public function layouts()
  {
    return $this->belongsTo('App\Layout');
  }
}
