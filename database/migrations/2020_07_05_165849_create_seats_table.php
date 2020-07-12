<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeatsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('seats', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->integer('layout_id');
      $table->string('name')->unique();
      $table->integer('seat_group_id')->nullable();;
      $table->integer('w');
      $table->integer('h');
      $table->integer('x');
      $table->integer('y');
      $table->integer('count')->default(4);
      $table->boolean('delflg')->default(false);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('seats');
  }
}
