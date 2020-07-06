<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('groups', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->integer('group_code');
      $table->string('group_name');
      $table->timestamp('start_time');
      $table->timestamp('end_time');
      $table->jsonb('seat')->nullable();
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
    Schema::dropIfExists('groups');
  }
}
