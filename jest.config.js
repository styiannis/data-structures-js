module.exports = {
    "rootDir": ".",
    "verbose": false,
    "collectCoverage": false,
    "collectCoverageFrom": [
        "./src/**",
        "./lib/**",
    ],
    "coverageDirectory": "./coverage/",
    "testPathIgnorePatterns": [],
    "transform": {
        "^.+\\.js$": "babel-jest"
    }
};
