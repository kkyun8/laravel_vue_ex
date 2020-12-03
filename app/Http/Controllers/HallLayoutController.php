<?php

namespace App\Http\Controllers;

use App\ActiveLayout;
use App\Hall;
use App\Layout;
use App\LayoutActive;
use App\Seat;
use App\SeatGroup;
use Faker\Provider\ar_JO\Internet;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Integer;
use Illuminate\Support\Collection;
use Carbon\Carbon;

class HallLayoutController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  // public function __construct()
  // {
  //     $this->middleware('auth');
  // }

  /**
   * Show the application dashboard.
   *
   * @return \Illuminate\Contracts\Support\Renderable
   */
  public function getHalls()
  {
    $halls = Hall::with(['layouts'])
      ->where('delflg', false)
      ->orderBy('id')->get();
    return $halls;
  }

  public function getActiveLayouts()
  {
    $activeLayouts = ActiveLayout::with(['halls', 'layouts'])
      ->where('start_time', '<=', Carbon::now())
      ->where('end_time', '>=', Carbon::now())->get();

    return $activeLayouts;
  }
  /**
   * 
   *
   * @param  Request  $request
   * @return 
   */
  public static function getLayout(int $id)
  {
    $layout = Layout::with(['seats', 'seatGroups'])
      ->where('id', $id)
      ->where('delflg', false)->get();

    return $layout;
  }

  /**
   * 新規レイアウト保存 
   */
  public function create(Request $request)
  {
    //バリデーション
    $request->validate([
      'hallId'     => 'required',
      'layoutName' => 'required',
      'layoutCode' => 'required',
      'seats'      => 'required',
    ]);
    $hallId = $request->hallId;
    $layoutName = $request->layoutName;
    $layoutCode = $request->layoutCode;
    $seats = $request->seats;

    $layout = new Layout;
    $layout->hall_id = $hallId;
    $layout->layout_name = $layoutName;
    $layout->layout_code = $layoutCode;

    $layout->save();

    $layoutId = $layout->id;

    if (!empty($seats)) {
      foreach ($seats as $seat) {
        $createSeat = new Seat;
        $createSeat->layout_id = $layoutId;
        $createSeat->name = $seat['name'];
        $createSeat->seat_group_id = $seat['seatGroupId'];
        $createSeat->w = $seat['position']['w'];
        $createSeat->h = $seat['position']['h'];
        $createSeat->x = $seat['position']['x'];
        $createSeat->y = $seat['position']['y'];
        $createSeat->count = $seat['count'];
        $createSeat->type = $seat['type'];
        $createSeat->save();
      }
    }

    $createLayout =  self::getLayout($layoutId);
    return response($createLayout, 201);
  }

  /**
   * 席レイアウト保存
   */
  public function store(Request $request)
  {
    //バリデーション
    $request->validate([
      'layoutId' => 'required',
      'editSeats' => 'required',
    ]);

    $layoutId = $request->layoutId;
    $layoutName = $request->layoutName;
    $layoutCode = $request->layoutCode;
    $seats = $request->editSeats;
    $seatGroups = $request->editSeatGroups;

    $layout = Layout::find($layoutId);

    if (!empty($layoutName)) {

      $layout->layout_name = $layoutName;
    }

    if (!empty($layoutCode)) {
      $layout->layout_code = $layoutCode;
    }

    $layout->save();

    if (!empty($seatGroups)) {
      $resultSeatGroups = self::createSeatGroups($layoutId, $seatGroups);
    }

    if (!empty($seats)) {
      self::createUpdateSeats($layoutId, $seats, $resultSeatGroups);
    }

    return response(self::getLayout($layoutId), 200);
  }

  /**
   * 
   */
  private static function createUpdateSeats(int $layoutId, array $seats, $resultSeatGroups)
  {
    $allSeats = [];

    foreach ($seats as $seat) {

      $updateSeat = Seat::find($seat['id']);

      if (!empty($updateSeat)) {
        $updateSeat->name = $seat['name'];
        $updateSeat->w = $seat['position']['w'];
        $updateSeat->h = $seat['position']['h'];
        $updateSeat->x = $seat['position']['x'];
        $updateSeat->y = $seat['position']['y'];
        $updateSeat->count = $seat['count'];
        $updateSeat->type = $seat['type'];
        $updateSeat->save();
        array_push($allSeats, $updateSeat->id);
      } else {
        $createSeat = new Seat;
        $createSeat->layout_id = $layoutId;
        $createSeat->name = $seat['name'];

        $collection = new Collection($resultSeatGroups);
        $targetSeatGroups = $collection->filter(function ($value, $key) use ($seat) {
          $jsonSeats = json_decode($value->seats);
          return in_array($seat['name'], $jsonSeats);
        });
        $group = $targetSeatGroups->all();
        $createSeat->seat_group_id = $group[1]['id'];

        $createSeat->w = $seat['position']['w'];
        $createSeat->h = $seat['position']['h'];
        $createSeat->x = $seat['position']['x'];
        $createSeat->y = $seat['position']['y'];
        $createSeat->count = $seat['count'];
        $createSeat->type = $seat['type'];
        $createSeat->save();
        array_push($allSeats, $createSeat->id);
      }
    }

    Seat::whereNotIn('id', $allSeats)->delete();

    return $seats;
  }

  /**
   */
  private static function createSeatGroups(int $layoutId, array $seatGroups)
  {
    $allSeatGroups = [];

    foreach ($seatGroups as $seatGroup) {

      $updateGroup = SeatGroup::find($seatGroup['id']);

      if (!empty($updateGroup)) {
        $updateGroup->seat_group_name = $seatGroup['seat_group_name'];
        $updateGroup->seats =  json_encode($seatGroup['seats']);

        $updateGroup->w = $seatGroup['position']['w'];
        $updateGroup->h = $seatGroup['position']['h'];
        $updateGroup->x = $seatGroup['position']['x'];
        $updateGroup->y = $seatGroup['position']['y'];
        $updateGroup->count = $seatGroup['count'];
        $updateGroup->type = $seatGroup['type'];
        $updateGroup->save();
        array_push($allSeatGroups, $updateGroup->id);
      } else {
        $createGroup = new SeatGroup;
        $createGroup->layout_id = $layoutId;
        $createGroup->seat_group_name = $seatGroup['seat_group_name'];
        $createGroup->seats = json_encode($seatGroup['seats']);

        $createGroup->w = $seatGroup['position']['w'];
        $createGroup->h = $seatGroup['position']['h'];
        $createGroup->x = $seatGroup['position']['x'];
        $createGroup->y = $seatGroup['position']['y'];
        $createGroup->count = $seatGroup['count'];
        $createGroup->type = $seatGroup['type'];
        $createGroup->save();
        array_push($allSeatGroups, $createGroup->id);
      }
    }

    SeatGroup::whereNotIn('id', $allSeatGroups)->delete();

    $resultSeatGroups = SeatGroup::where('delflg', false)->get();

    return $resultSeatGroups;
  }
}
