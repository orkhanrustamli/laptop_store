module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ["airbnb-typescript", "plugin:react/recommended", "prettier", "plugin:jest/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
        "react/prop-types": "off",
        "react/jsx-one-expression-per-line": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
    },
};
