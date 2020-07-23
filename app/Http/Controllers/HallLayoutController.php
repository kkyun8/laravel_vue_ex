<?php

namespace App\Http\Controllers;

use App\Hall;
use App\Layout;
use App\Seat;
use Faker\Provider\ar_JO\Internet;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Integer;

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
    $halls = Hall::with('layouts')
      ->where('delflg', false)
      ->orderBy('id')->get();

    // $halls = Hall::with(['layouts' => function ($query) {
    //   $query->with(['seats']);
    // }])->where('delflg', false)
    //   ->orderBy('id')->get();

    // $halls = $this->hasManyThrough('App\Seat', 'App\Layout');

    return $halls;
  }

  /**
   * 
   *
   * @param  Request  $request
   * @return 
   */
  public function getLayout(Request $request)
  {
    $id = $request->id;

    $layout = Layout::with('seats')
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
        $createSeat->save();
      }
    }

    return response($layout, 201);
  }

  /**
   * 席レイアウト保存
   */
  public function store(Request $request)
  {
    //バリデーション
    $request->validate([
      'layoutId' => 'required',
      'seats' => 'required',
    ]);

    $layoutId = $request->layoutId;
    $layoutName = $request->layoutName;
    $layoutCode = $request->layoutCode;
    $seats = $request->seats;

    $layout = Layout::find($layoutId);

    $layout->layout_name = $layoutName;
    $layout->layout_code = $layoutCode;
    $layout->save();

    if (!empty($seats)) {
      //削除後登録
      $seat = Seat::where('layout_id', $layoutId);
      $seat->delete();
      self::createSeats($layoutId, $seats);
    }

    return response($layout, 200);
  }

  /**
   */
  private static function createSeats(int $layoutId, array $seats)
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
      $createSeat->save();
    }
    return $seats;
  }
}
