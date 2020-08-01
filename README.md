このリポジトリは自分が参画した現場で自分が実装した物を参考して、自分が想定した物です。
スケジュールの厳しさなどでうまくいかなかったものをアレンジしたバージョンです。
どこからコピペした物ではありません。

---

# Seating Chart 

席予約、席配置システムです。 プロジェクト環境は`Laravel + Vue * Typescript + postgressql`です。<br>

現場で担当したロジックをアレンジ、現場ではVueのみだったが、Typescriptを追加（vue+typescriptを触って見たかった）<br>
モックアップ(Bootstrap)をVueファイルに適用したのでコンポーネントのTempleteがちょっと見にくかったのでBootstrap-Vueを追加<br>
スケジュールがキツく、フログラム内にいろいろ残念なところがあったまま、リリースされたのでここでは残念なところをカッコよくするなど<br>

# Set Up

cloneしてプロジェクトをセットアップする<br>
＊以下のdockerで setup おすすめ（まだdockerも作業中）<br>
https://github.com/kkyun8/docker_ex

```sh
npm i
npm run dev
composer i
```

.envにpostgresqlをセットしてからDBを作成する
```sh
php artisan migrate --seed
```

Laravel起動
```sh
php artisan serve
```

## 参考したURL
Vue+Typescript<br>
https://megu-tech.hatenablog.com/entry/2019/08/02/154710<br>
https://qiita.com/yam0918/items/68d4d6c74b06d589a195<br>
https://codeburst.io/vuex-and-typescript-3427ba78cfa8<br>
http://one-way.tech/programing/basic-typescript/<br>

Laravel
https://readouble.com/laravel/7.x/ja/installation.html

and 

