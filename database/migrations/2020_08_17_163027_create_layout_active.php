<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLayoutActive extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('active_layouts', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->integer('hall_id');
      $table->integer('layout_id');
      $table->timestamp('start_time');
      $table->timestamp('end_time');
      $table->boolean('delflg')->default(false);
      $table->timestamp('created_at')->useCurrent()->nullable();
      $table->timestamp('updated_at')->useCurrent()->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('layout_active');
  }
}
