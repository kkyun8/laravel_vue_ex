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

  /**
   * 
   */
  public function getActiveLayouts()
  {
    $activeLayouts = ActiveLayout::with(['halls', 'layouts'])
      ->where('start_time', '<=', Carbon::now())
      ->where('end_time', '>=', Carbon::now())->orderBy('hall_id')->get();

    return $activeLayouts;
  }

  /**
   * 
   */
  public function getActiveLayoutIds()
  {
    $activeLayoutIds = ActiveLayout::where("delflg", false)->get();

    $collection = new Collection($activeLayoutIds);
    $activeLayoutIdsMap = $collection->mapWithKeys(function ($item) {
      return [$item['hall_id'] => $item['layout_id']];
    });

    return $activeLayoutIdsMap->all();
  }

  /**
   * 
   */
  public function updateActiveLayout(Request $request)
  {
    $hallId = $request->hallId;
    $layoutId = $request->activeLayoutId;
    $startTime = $request->activeStartTime . ' 00:00:00';
    $endTime = $request->activeEndTime . ' 23:59:59';

    $activeLayout = ActiveLayout::updateOrCreate(
      ['hall_id' => $hallId],
      ['layout_id' => $layoutId, 'start_time' => $startTime, 'end_time' => $endTime]
    );

    return $this->getActiveLayoutIds();
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

    $resultSeatGroups = [];
    if (!empty($seatGroups)) {
      $resultSeatGroups = self::createUpdateSeatGroups($layoutId, $seatGroups);
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

      $group = [];

      if (!empty($resultSeatGroups)) {
        $collection = new Collection($resultSeatGroups);
        $targetSeatGroups = $collection->filter(function ($value, $key) use ($seat) {
          $jsonSeats = json_decode($value->seats);
          return in_array($seat['name'], $jsonSeats);
        });
        $group = $targetSeatGroups->all();
      }

      $firstKey = array_key_first($group);
      $seatGroupId = null;

      if(!is_null($firstKey)){
        $seatGroupId = $group[$firstKey]['id'];
      }

      $updateSeat = Seat::updateOrCreate(
        ['id' => $seat['id'], 'layout_id' => $layoutId ],
        ['name' => $seat['name'], 'w' => $seat['position']['w'],'h' => $seat['position']['h'],
          'x' => $seat['position']['x'], 'y' => $seat['position']['y'], 'count' => $seat['count'], 'type' => $seat['type'],
          'seat_group_id' => $seatGroupId ]
      );

      array_push($allSeats, $updateSeat->id);
    }

    Seat::where("layout_id", $layoutId)->whereNotIn('id', $allSeats)->delete();

    return $seats;
  }

  /**
   */
  private static function createUpdateSeatGroups(int $layoutId, array $seatGroups)
  {
    $allSeatGroups = [];

    foreach ($seatGroups as $seatGroup) {

      $updateGroup = SeatGroup::updateOrCreate(
        ['id' => $seatGroup['id'], 'layout_id' => $layoutId ],
        ['seat_group_name' => $seatGroup['seat_group_name'], 'w' => $seatGroup['position']['w'], 'h' => $seatGroup['position']['h'],
          'x' => $seatGroup['position']['x'], 'y' => $seatGroup['position']['y'], 'count' => $seatGroup['count'], 'type' => $seatGroup['type'],
          'seats' => json_encode($seatGroup['seats']) ]
      );

      array_push($allSeatGroups, $updateGroup->id);
      
    }

    SeatGroup::where("layout_id", $layoutId)->whereNotIn('id', $allSeatGroups)->delete();

    $resultSeatGroups = SeatGroup::where('delflg', false)->get();

    return $resultSeatGroups;
  }
}
