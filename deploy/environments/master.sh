# Site name on the server
APP="Application Name"
# Branch to deploy from
BRANCH=master
# Servers to deploy to (array)
DEPLOY_SERVER=(127.0.0.1)
# Webserver path
SERVER_PATH=/var/www/sitedomain.com
# Webfiles path
FILES_PATH=/var/www/sitedomain.com/public_html
# Git path to deploy from
GIT_PATH=release/current
# SSH User
DEPLOY_USER=deploy