<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SeatGroup extends Model
{
  
  protected $fillable = ['seat_group_name','layout_id','w','h','x','y','count','type','seats'];

  public function layouts()
  {
    return $this->belongsTo('App\Layout');
  }
}
