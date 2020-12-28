<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActiveLayout extends Model
{

  protected $fillable = ['layout_id','start_time','end_times'];

  public function halls()
  {
    return $this->hasOne('App\Hall', 'id', 'hall_id');
  }

  public function layouts()
  {
    return $this->hasOne('App\Layout', 'id', 'layout_id');
  }
}
