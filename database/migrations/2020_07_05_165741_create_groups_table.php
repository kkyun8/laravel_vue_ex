<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

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
      $table->integer('group_number')->default(0);
      $table->timestamp('start_time');
      $table->timestamp('end_time');
      $table->integer('lock')->nullable();
      $table->integer('layout_id')->nullable();
      $table->jsonb('seats')->nullable();
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
    Schema::dropIfExists('groups');
  }
}
