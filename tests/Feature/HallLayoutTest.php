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
   * @test TODO: 必須
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
   * @test
   */
  // public function should_レイアウト更新()
  // {
  //   factory(Photo::class)->create();
  //   $photo = Photo::first();

  //   $response = $this->json('GET', route('photo.show', [
  //     'id' => $photo->id,
  //   ]));

  //   $response->assertStatus(200)
  //     ->assertJsonFragment([
  //       'id' => $photo->id,
  //       'url' => $photo->url,
  //       'owner' => [
  //         'name' => $photo->owner->name,
  //       ],
  //       'comments' => $photo->comments
  //         ->sortByDesc('id')
  //         ->map(function ($comment) {
  //           return [
  //             'author' => [
  //               'name' => $comment->author->name,
  //             ],
  //             'content' => $comment->content,
  //           ];
  //         })
  //         ->all(),
  //     ]);
  // }
}
