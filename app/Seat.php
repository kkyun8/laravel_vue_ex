<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
  public function author()
  {
    return $this->belongsTo(Layout::class);
  }
}
