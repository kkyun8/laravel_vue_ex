<?php

namespace App\Http\Controllers;

use App\Hall;
use App\Layout;
use App\Seat;
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

    $layout = new Layout();

    $layout->name = $layoutName;
    $layout->code = $layoutCode;

    $layout->save();
    $layoutId = $layout->id;

    $seatArray = json_decode($seats, true);

    foreach ($seatArray as $seat) {
      $createSeat = new Seat();
      $createSeat->layou_id = $layoutId;
      $createSeat->hall_id = $hallId;
      $createSeat->name = $seat->name;
      $createSeat->seat_group_id = $seat->seatGroupId;
      $createSeat->w = $seat->position('w');
      $createSeat->h = $seat->position('h');
      $createSeat->x = $seat->position('x');
      $createSeat->y = $seat->position('y');
      $createSeat->count = $seat->count;
      $createSeat->save();
    }


    return $seats;
  }

  /**
   * 席レイアウト保存
   */
  public function store(Request $request)
  {
    //バリデーション
    $request->validate([
      'layoutid' => 'required',
      'layoutName' => 'required',
      'layoutCode' => 'required',
      'seats' => 'required',
    ]);

    $layoutid = $request->layoutid;
    $layoutName = $request->layoutName;
    $layoutCode = $request->layoutCode;
    $seats = $request->seats;

    //TODO:作業中

    // $layout = Layout::with('seats')
    //   ->where('id', $id)
    //   ->where('delflg', false)->get();

    return $seats;
  }
}
