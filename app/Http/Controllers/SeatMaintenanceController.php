<?php

namespace App\Http\Controllers;

use App\Hall;
use App\Layout;
use Illuminate\Http\Request;

class SeatMaintenanceController extends Controller
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
    // $halls = Hall::with('layouts')
    //   ->where('delflg', false)
    //   ->orderBy('id');
    // return response()->json(['halls' => $halls]);
    return Hall::all();
  }

  /**
   * 
   */
  public function getLayout(Request $request)
  {
    $id = $request->layoutId;

    $layout = Layout::with('seats')
      ->where('id', $id)
      ->where('delflg', false);

    return $layout;
  }
}
