#!/bin/sh

# Run `sh sass.sh`.

# Minification
# sass --watch --style compressed lib/css/scss/main.scss:lib/css/main.css

# No Minification
# sass --watch --style compressed lib/css/scss/main.scss:lib/css/main.css

# Minification & Sourcemap
sass --watch --scss --sourcemap --style compressed lib/css/scss/main.scss:lib/css/main.css

exit 0
