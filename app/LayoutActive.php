<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LayoutActive extends Model
{
  public function activeLayout()
  {
    return $this->hasOneThrough('App\Hall', 'App\Layout');
  }
}
