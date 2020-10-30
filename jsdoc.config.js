module.exports = {
    "plugins": [
        "plugins/markdown",
        "plugins/summarize"
    ],
    "recurseDepth": 10,
    "source":
    {
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags":
    {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc", "closure"]
    },
    "templates":
    {
        "cleverLinks": true,
        "monospaceLinks": false,
        "useLongnameInNav": true,
    },
    "opts": {
        "template": "./node_modules/@pixi/jsdoc-template"
    },
}