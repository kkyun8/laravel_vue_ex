<?php

namespace App\Http\Controllers;

use App\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class GroupController extends Controller
{
  /**
   * groups
   *
   * @return 
   */
  public function getGroups(String $date)
  {
    $startTtme = $date . ' 00:00:00';
    $endTtme = $date . ' 23:59:59';

    $groups = Group::where('delflg', false)
      ->whereBetween('start_time', [$startTtme, $endTtme])
      ->orderBy('start_time')->get();

    return $groups;
  }

  /**
   * groups
   *
   * @return 
   */
  public function layoutReserveSeats(String $date, Int $layoutId)
  {
    $startTtme = $date . ' 00:00:00';
    $endTtme = $date . ' 23:59:59';

    $groups = Group::where('delflg', false)
      ->where('layout_id', $layoutId)
      ->whereBetween('start_time', [$startTtme, $endTtme])
      ->orderBy('start_time')->get();

    $result = $collection = new Collection($groups);
    $collection->mapWithKeys(function ($group) {
      return [$group['id'] => $group['seats']];
    });

    return $result->all();
  }

  /**
   * 
   */
  public function setReserveSeats(Request $request)
  {
    $reserveSeats = $request->reserveSeats;
    $layoutId = $request->layoutId;
    $groupId = $request->groupId;
    $date = $request->date;

    $group = Group::find($groupId);
    $group->layout_id = $layoutId;
    $group->seats = json_encode($reserveSeats);
    $group->save();

    return $this->getGroups($date);
  }
}
