module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/recommended",
        "plugin:prettier/recommended",
        "prettier/vue",
        "prettier/@typescript-eslint",
    ],
    rules: {},
};
