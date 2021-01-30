const argv = require("yargs").argv;

const glob = argv["_"] && argv["_"][0];

const isJsTsxFiles = glob && /.{js,jsx,tsx}/.test(glob);

if (isJsTsxFiles) {
    module.exports = {
        extends: ["stylelint-config-recommended", "stylelint-config-styled-components"],
        processors: ["stylelint-processor-styled-components"],
        plugins: ["stylelint-order"],
        rules: {
        }
    };
}

module.exports = {
    extends: ["stylelint-config-standard", "stylelint-config-sass-guidelines"],
    processors: [],
    plugins: ["stylelint-scss", "stylelint-order"],
    rules: {
        "selector-list-comma-newline-after": null,
         // sass indented syntax
         "block-opening-brace-space-before": null,
         "block-closing-brace-space-before": null,
         "block-closing-brace-newline-before": null,
         "declaration-block-trailing-semicolon": null,
    },
    ignoreFiles: ["build/**/*"]
};