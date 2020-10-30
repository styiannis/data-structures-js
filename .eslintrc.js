module.exports = {
    "extends": ["eslint:recommended"],
    "env": {
        "es6": true,
        "browser": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        'no-empty': ["error", { "allowEmptyCatch": true }],
        'no-constant-condition': ["error", { "checkLoops": false }],
    }
}