# laravel_vue_ex

~~~
composer global require laravel/installer
~~~
~~~
composer create-project --prefer-dist laravel/laravel blog *プロジェクト名
~~~
~~~
php artisan serve *500エラーになる場合、envファイル確認
~~~

~~~
npm install
~~~

~~~
composer require laravel/ui --dev
~~~

~~~
php artisan ui bootstrap
php artisan ui vue
~~~

~~~
npm install -D vuex
~~~
~~~
npm install -D vue-router
~~~

~~~
route/web.phpにindex追加、既存の物は削除
Route::get('/{any?}', fn() => view('index'))->where('any', '.+');
~~~

~~~
resources/views/index.blade.php作成
app.jsにvue設定
~~~
