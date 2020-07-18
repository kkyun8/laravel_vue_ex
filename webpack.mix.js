const mix = require("laravel-mix");

mix.browserSync({
    proxy: "127.0.0.1:8000", // アプリの起動アドレス
    open: false // ブラウザを自動で開かない
})
    .ts("resources/js/app.ts", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .version();

mix.webpackConfig({
    resolve: {
        extensions: [".js", ".jsx", ".vue", ".ts", ".tsx"],
        alias: {
            // vue$: "vue/dist/vue.esm.js",
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
