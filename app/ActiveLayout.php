<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActiveLayout extends Model
{
  public function halls()
  {
    return $this->hasOne('App\Hall', 'id', 'hall_id');
  }

  public function layouts()
  {
    return $this->hasOne('App\Layout', 'id', 'layout_id');
  }
}
