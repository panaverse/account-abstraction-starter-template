module.exports = {
    semi: true,
    trailingComma: "all",
    singleQuote: false,
    printWidth: 100,
    tabWidth: 4,
    overrides: [
        {
            files: ["*.yml", "*.yaml", "*.json", "*.css", "*.scss", "*.sass"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
