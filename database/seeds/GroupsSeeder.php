<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GroupsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('groups')->insert([
      [
        'group_code' => 1,
        'group_name' => Str::random(2),
        'group_number' => 4,
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 1,
        'group_name' => Str::random(2),
        'group_number' => 4,
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 1,
        'group_number' => 4,
        'group_name' => Str::random(4),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 2,
        'group_number' => 2,
        'group_name' => Str::random(4),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 3,
        'group_number' => 10,
        'group_name' => Str::random(4),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 4,
        'group_number' => 4,
        'group_name' => Str::random(8),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 4,
        'group_number' => 4,
        'group_name' => Str::random(8),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 4,
        'group_number' => 4,
        'group_name' => Str::random(8),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 4,
        'group_number' => 4,
        'group_name' => Str::random(8),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 5,
        'group_number' => 4,
        'group_name' => Str::random(8),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 6,
        'group_number' => 4,
        'group_name' => Str::random(8),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 7,
        'group_number' => 4,
        'group_name' => Str::random(8),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
      [
        'group_code' => 8,
        'group_number' => 4,
        'group_name' => Str::random(8),
        'start_time' => new DateTime(),
        'end_time' => new DateTime(),
      ],
    ]);
  }
}
