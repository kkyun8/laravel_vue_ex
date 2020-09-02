<?php

namespace App\Http\Controllers;

use App\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
  /**
   * groups
   *
   * @return 
   */
  public function getGroup(Request $request)
  {
    $date = $request->date;
    $startTtme = $date. + ' 00:00:00'; 
    $endTtme = $date. + ' 00:00:00';

    $groups = Group::where('delflg', false)
      ->whereBetween('start_time', [$startTtme, $endTtme])
      ->orderBy('start_time')->get();

    return $groups;
  }

}