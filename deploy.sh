#!/bin/bash
#
# deploy.sh
#
# HOW TO USE:
# This will take an archive of the current Git project using `git archive`.
# It will not work if this project does not have a valid Git repo.
#
# 1. Make sure you have environments setup in /deploy/environments in the form of: `production.sh` | `staging.sh` | `dev.sh`
#
# 2. Run
#	bash deploy.sh <environment>
#
# NOTES:
# Beware about ownership. This script assumes the SSH user is also the one
# who owns the directory you are deploying to. By default you should use
# a 'deploy' user on your server.
#
# TO DO:
# 1. Rollback
# 2. Shared files
#

# ---------------------------------------------------------------------------
# Vars
# ---------------------------------------------------------------------------
#
set -e
# Set the start time
start_seconds="$(date +%s)"

# ---------------------------------------------------------------------------
# Check the environment
# ---------------------------------------------------------------------------
#
# Detect exactly 1 argument
if (($# == 1)); then
	# Include .sh from the deploy folder
	DEPLOY_ENV=$1
	# Set the deploy file
	DEPLOY_FILE=./deploy/environments/$DEPLOY_ENV.sh

	if [[ -f $DEPLOY_FILE ]]; then
		source $DEPLOY_FILE
	else
		echo "Could not find deploy file for $DEPLOY_ENV environment, it should be located in $DEPLOY_FILE"
		exit 1
	fi
	echo "Deploying $APP to $DEPLOY_ENV environment."
else
	echo "Usage: deploy.sh "
	exit 1
fi

# ---------------------------------------------------------------------------
# Vars
# ---------------------------------------------------------------------------
#
CURRENT_DIR=$DEPLOY_PATH/$APP/current
RELEASE_NAME=`date +"%Y-%m-%d-%H%M%S"`
CURRENT_RELEASE=$DEPLOY_PATH/$APP/releases/$RELEASE_NAME
REMOTE_RELEASES=$DEPLOY_PATH/$APP/releases

# ---------------------------------------------------------------------------
# Check for releases directory
# ---------------------------------------------------------------------------
#
if [[ ! -d ./deploy/releases ]]; then
	echo "Creating releases directory..."
	mkdir -p ./deploy/releases
fi

# ---------------------------------------------------------------------------
# Create a release for the Git archive
# ---------------------------------------------------------------------------
#
echo "Creating release for Git and deploying tarball to server..."
git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $BRANCH

# ---------------------------------------------------------------------------
# Deploy to servers
# ---------------------------------------------------------------------------
#
for SERVER in ${DEPLOY_SERVER[@]}; do
	echo "Rsynching to $SERVER..."
	rsync -v -e ssh deploy/releases/$RELEASE_NAME.tar.tgz $DEPLOY_USER@$SERVER:$DEPLOY_PATH/$APP/releases/
	echo "Deployed tarball to: $CURRENT_RELEASE.tar.tgz"
	ssh -t $DEPLOY_USER@$SERVER "sudo rm -rf $REMOTE_RELEASES/current &&
		echo 'Creating new release directory...' &&
		sudo mkdir $REMOTE_RELEASES/$RELEASE_NAME &&
		echo 'Extracting release...' &&
		sudo tar -xf $REMOTE_RELEASES/$RELEASE_NAME.tar.tgz --directory $REMOTE_RELEASES/$RELEASE_NAME &&
		echo 'Removing tarball...' &&
		sudo rm $REMOTE_RELEASES/$RELEASE_NAME.tar.tgz &&
		echo 'Creating symlink...'"

	# Check the source and create the symlink
	if ssh -t $DEPLOY_USER@$SERVER stat $CURRENT_RELEASE/releases/current \> /dev/null 2\>\&1
        then
            ssh -t $DEPLOY_USER@$SERVER "sudo ln -nfs $CURRENT_RELEASE/releases/current $CURRENT_DIR"
        else
            ssh -t $DEPLOY_USER@$SERVER "sudo ln -nfs $CURRENT_RELEASE/src $CURRENT_DIR"
	fi
done

# ---------------------------------------------------------------------------
# End deployment
# ---------------------------------------------------------------------------
#
end_seconds="$(date +%s)"
echo "Deployment completed successfully in "$(expr $end_seconds - $start_seconds)" seconds"