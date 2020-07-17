<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
  /**
   * 
   */
  public function halls()
  {
    return $this->belongsTo('App\Hall');
  }

  /**
   * 
   */
  public function seats()
  {
    return $this->hasMany('App\Seat');
  }

  /**
   * 
   */
  public function seatGroups()
  {
    return $this->hasMany('App\SeatGroup');
  }
}
