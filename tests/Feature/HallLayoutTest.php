<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HallLayoutTest extends TestCase
{

  //./vendor/bin/phpunit
  //./vendor/bin/phpunit tests/Feature/HallLayoutTest.php 
  /**
   * 
   */
  public function should_新規レイアウト保存()
  {
    $data = [
      'hallId' => 1,
      'layoutName' => 'レイアウトテスト6',
      'layoutCode' => 'TEST_CODE56',
      'seats' => [
        [
          'name' => 'testName',
          'seatGroupId' => null,
          'position' => [
            'w' => 20,
            'h' => 30,
            'x' => 100,
            'y' => 100
          ],
          'count' => 3
        ]
      ]
    ];

    $response = $this->json('POST', route('createLayout'), $data);

    $response->assertStatus(201);
  }

  /**
   * 
   */
  public function should_レイアウト更新()
  {
    $data = [
      'layoutId' => 1,
      'layoutName' => 'レイアウト更新2',
      'layoutCode' => '_UPDATE1',
      'seats' => [
        [
          'name' => 'updateName1',
          'seatGroupId' => 1,
          'position' => [
            'w' => 20,
            'h' => 30,
            'x' => 99,
            'y' => 99
          ],
          'count' => 1
        ],
        [
          'name' => 'updateName2',
          'seatGroupId' => 1,
          'position' => [
            'w' => 20,
            'h' => 30,
            'x' => 99,
            'y' => 99
          ],
          'count' => 1
        ]
      ]
    ];

    $response = $this->json('PUT', route('storeLayout'), $data);

    $response->assertStatus(200);
  }
}
