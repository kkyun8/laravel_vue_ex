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
}
