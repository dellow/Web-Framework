#!/bin/bash
#
# deploy.sh
#
# HOW TO USE:
# Beware about ownership. This script assumes the SSH user is also the one
# who owns the directory you are deploying to. It is recommended you use
# a 'deploy' user for any deployment or public facing file tasks.
#
# 1. Make sure you have environments setup in /deploy/environments in the form of: `production.sh` | `staging.sh` | `dev.sh`
#
# 2. Run
#	bash deploy.sh <environment>
#
# TO DO:
# 1. Rollback
#

preloader(){
	echo -ne "$(tput setaf 3)-* (10%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-* (20%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-*-* (30%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-*-*-* (40%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-*-*-*-* (50%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-*-*-*-*-* (60%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-*-*-*-*-*-* (70%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-*-*-*-*-*-*-* (80%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 2)-*-*-*-*-*-*-*-*-* (100%) Done!\r$(tput sgr0)"
	sleep 1
}

echo -e "\n------------------------------------------------"
# ---------------------------------------------------------------------------
# Check this is a valid Git repo
# ---------------------------------------------------------------------------
if [[ ! -d ./.git ]]; then
	echo -e "$(tput setaf 1)This is not a valid Git repository$(tput sgr0)"
	echo -e "------------------------------------------------\n"
	exit 1
fi

# ---------------------------------------------------------------------------
# Vars
# ---------------------------------------------------------------------------
#
# Set the start time
start_seconds="$(date +%s)"
# Fresh deployment
FRESH_DEPLOYMENT=false

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
		echo -e "$(tput setaf 1)Could not find deploy file for $DEPLOY_ENV environment, it should be located in $DEPLOY_FILE.$(tput sgr0)"
		echo -e "------------------------------------------------\n"
		exit 1
	fi
	echo -e "Deploying $APP to $DEPLOY_ENV environment..."
else
	echo -e "$(tput setaf 1)You have supplied to many arguments. The correct usage is: deploy.sh <environment>$(tput sgr0)"
	echo -e "------------------------------------------------\n"
	exit 1
fi

# ---------------------------------------------------------------------------
# Vars
# ---------------------------------------------------------------------------
#
# Release name
RELEASE_NAME=`date +"%Y-%m-%d-%H%M%S"`
# Local release location
LOCAL_RELEASE=deploy/releases/$RELEASE_NAME.tar.tgz
# Remote release
REMOTE_RELEASE=$DEPLOY_PATH/release/$RELEASE_NAME.tar.tgz

# ---------------------------------------------------------------------------
# Check commit log
# ---------------------------------------------------------------------------
#
if [[ ! -f ./deploy/release_commit_log ]]; then
	echo -e "Creating releases commit log..."
	touch ./deploy/release_commit_log

	FRESH_DEPLOYMENT=true
fi

# ---------------------------------------------------------------------------
# Check for releases directory
# ---------------------------------------------------------------------------
#
if [[ ! -d ./deploy/releases ]]; then
	echo -e "Creating releases directory..."
	mkdir -p ./deploy/releases
fi

# ---------------------------------------------------------------------------
# Create a release for the Git archive
# ---------------------------------------------------------------------------
#
echo -e "Creating release for GitHub and deploying tarball to server..."
if [ "$FRESH_DEPLOYMENT" = true ] ; then
	# Get latest commit from remote origin
	COMMIT_RANGE_TO="$(git ls-remote origin | awk '/master/ {print $1}')"
	# Get first ever commit
	COMMIT_RANGE_FROM="$(git rev-list HEAD | tail -n 1)"
	# Show preloader
	#preloader
	# Check commit range
	if [[ ! $COMMIT_RANGE_TO = $COMMIT_RANGE_FROM ]]; then
		# Create tarball
		git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $BRANCH
	else
		echo -e "$(tput setaf 1)Commit range is the same. Nothing to deploy.$(tput sgr0)"
		echo -e "------------------------------------------------\n"
		exit 1
	fi
else
	# Get latest commit from remote origin
	COMMIT_RANGE_TO="$(git ls-remote origin | awk '/master/ {print $1}')"
	# Get latest commit from release_commit_log
	COMMIT_RANGE_FROM="$(sed -n '1p' ./deploy/release_commit_log)"
	# Show preloader
	#preloader
	# Check commit range
	if [[ ! $COMMIT_RANGE_TO = $COMMIT_RANGE_FROM ]]; then
		# Create tarball
		git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $COMMIT_RANGE_TO $(git diff --name-only $COMMIT_RANGE_FROM $COMMIT_RANGE_TO $BRANCH)
	else
		echo -e "$(tput setaf 1)Commit range is the same. Nothing to deploy.$(tput sgr0)"
		echo -e "------------------------------------------------\n"
		exit 1
	fi
fi

# Update release_commit_log
echo -e "$COMMIT_RANGE_TO" >> ./deploy/release_commit_log
echo -e "$COMMIT_RANGE_FROM" >> ./deploy/release_commit_log

# ---------------------------------------------------------------------------
# Deploy to servers
# ---------------------------------------------------------------------------
#
for SERVER in ${DEPLOY_SERVER[@]}; do
	# Create releases directory
	ssh -t $DEPLOY_USER@$SERVER "sudo mkdir -p $DEPLOY_PATH/releases &&
	sudo chown -R $USER:www-data $DEPLOY_PATH/releases"
	# Rsync release to server
	echo -e "Rsynching to $SERVER..."
	rsync -v -e ssh $LOCAL_RELEASE $DEPLOY_USER@$SERVER:$DEPLOY_PATH/releases
	echo -e "Deployed tarball to: $REMOTE_RELEASE"
	ssh -t $DEPLOY_USER@$SERVER "echo 'Extracting release...' &&
		sudo tar -xf $REMOTE_RELEASE --directory $DEPLOY_PATH/release/ &&
		echo 'Removing tarball...' &&
		sudo rm -rf $REMOTE_RELEASE &&
		sudo cp -rf $DEPLOY_PATH/release/$RELEASE_NAME $DEPLOY_PATH"
done

# ---------------------------------------------------------------------------
# End deployment
# ---------------------------------------------------------------------------
#
end_seconds="$(date +%s)"
echo -e "$(tput setaf 2)Deployment completed successfully in "$(expr $end_seconds - $start_seconds)" seconds.$(tput sgr0)"
echo -e "------------------------------------------------\n"