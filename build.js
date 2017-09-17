({
    baseUrl: '.',
    out: 'dist/Storage.js',
    optimize: 'none',
    include: ["node_modules/almond/almond", "src/Storage"],
    wrap: {
        start: 
        "(function (root, factory) { \n" +
        " \t if (typeof define === 'function' && define.amd) { \n" +
        "\t \t define([], factory); \n" +
        "\t} else { \n" +
        "\t \troot.Storage = root.Storage || {}; \n" +
        "\t \troot.Storage = factory();\n" +
        "\t}\n" +
        "}(this, function() {",
        end:
        "\n \t return require('src/Storage'); \n" +
        "}));"
    },
     paths:{
        TypeCheck: "node_modules/jean-type-check/src/TypeCheck",
        StorageNotDefinedError:"node_modules/jean-core-type/src/error/StorageNotDefinedError"
    }
})