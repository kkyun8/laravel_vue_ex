<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{

  protected $fillable = ['name','layout_id','w','h','x','y','count','type','seat_group_id'];

  public function layouts()
  {
    return $this->belongsTo('App\Layout');
  }
}
