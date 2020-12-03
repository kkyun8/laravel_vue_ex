const mix = require("laravel-mix");

mix.browserSync({
    proxy: "127.0.0.1:8000", // アプリの起動アドレス
    open: false // ブラウザを自動で開かない
})
    .ts("resources/js/app.ts", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    // TODO:
    // .ts("resources/js/**/*", "public/js");
    // TODO: こうすることで、ビルドするごとに作成されたランダムなパラメータがURLに追加され、毎回新しいソースコードが読み込まれることになります。
    //.version();

mix.webpackConfig({
    resolve: {
        extensions: [".js", ".jsx", ".vue", ".ts", ".tsx"],
        alias: {
          // TODO:
            vue$: "vue/dist/vue.esm.js",
            "@": __dirname + "/resources/js"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: { appendTsSuffixTo: [/\.vue$/] },
                exclude: /node_modules/
            }
        ]
    }
});
