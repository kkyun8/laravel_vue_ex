<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HallsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('halls')->insert([
      [
        'hall_code' => 'A1',
        'hall_name' => 'A_Hall_1階',
        'number' => 500,
      ],
      [
        'hall_code' => 'A2',
        'hall_name' => 'A_Hall_2階',
        'number' => 400,
      ],
      [
        'hall_code' => 'T',
        'hall_name' => 'テラス',
        'number' => 100,
      ],
      [
        'hall_code' => 'BBQ',
        'hall_name' => 'バーベキュー',
        'number' => 1000,
      ],
    ]);
    DB::table('layouts')->insert([
      [
        'hall_id' => 1,
        'layout_code' => 'A_1_N',
        'layout_name' => 'A_Hall1_一般',
      ],
      [
        'hall_id' => 1,
        'layout_code' => 'A_1_G',
        'layout_name' => 'A_Hall1_団体',
      ],
      [
        'hall_id' => 2,
        'layout_code' => 'A_2_N',
        'layout_name' => 'A_Hall2_一般',
      ],
      [
        'hall_id' => 3,
        'layout_code' => 'T_WE',
        'layout_name' => 'T_テラス週末',
      ],
    ]);
    DB::table('seats')->insert([
      [
        'hall_id' => 1,
        'layout_id' => 1,
        'name' => 'テスト席',
        'w' => 20,
        'h' => 30,
        'x' => 0,
        'y' => 20,
        'count' => 4,
      ],
    ]);
  }
}
