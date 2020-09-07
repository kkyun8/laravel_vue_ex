<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
  /**
   * 
   */
  public function layouts()
  {
    return $this->hasMany('App\Layout');
  }

  /**
   * 
   */
  public function activeLayout()
  {
    return $this->hasOne('App\ActiveLayout');
  }
}
