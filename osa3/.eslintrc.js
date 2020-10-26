module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-undef": 1,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
}
