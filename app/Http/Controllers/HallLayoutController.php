<?php

namespace App\Http\Controllers;

use App\ActiveLayout;
use App\Hall;
use App\Layout;
use App\LayoutActive;
use App\Seat;
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
    // $id = $request->id;

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

    $layout = Layout::find($layoutId);

    if (!empty($layoutName)) {

      $layout->layout_name = $layoutName;
    }

    if (!empty($layoutCode)) {
      $layout->layout_code = $layoutCode;
    }
    $layout->save();

    if (!empty($seats)) {
      self::createUpdateSeats($layoutId, $seats);
    }

    return response(self::getLayout($layoutId), 200);
  }


  /**
   */
  private static function createUpdateSeats(int $layoutId, array $seats)
  {
    // $collection = new Collection($seats);

    // $ids = $collection->map(function ($s) {
    //   return $s['id'];
    // })->all();

    // $updateSeats = Seat::whereIn('id', $ids);

    foreach ($seats as $seat) {
      //TODO: bug
      //$updateSeat = $updateSeats::where('id', '=', $seat['id']);
      $updateSeat = Seat::where('id', $seat['id']);
      if (!empty($updateSeat)) {
        $updateSeat->update([
          'name' => $seat['name'],
          'w' => $seat['position']['w'],
          'h' => $seat['position']['h'],
          'x' => $seat['position']['x'],
          'y' => $seat['position']['y'],
          'count' => $seat['count'],
          'type' => $seat['type']
        ]);
      } else {
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


    return $seats;
  }

  /**
   */
  private static function createSeatGroups(int $layoutId, array $seats)
  {
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
    return $seats;
  }
}
