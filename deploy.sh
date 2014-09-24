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
# 2. To do a normal deploy run:
#	bash deploy.sh <environment>
#
# 2. To do a rollback run:
#	bash deploy.sh <environment> rollback <commit_to_rollback_to_id>
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
	# Check for deploy file
	if [[ ! -f $DEPLOY_FILE ]]; then
		echo -e "$(tput setaf 1)Could not find deploy file for $DEPLOY_ENV environment, it should be located in $DEPLOY_FILE.$(tput sgr0)"
		echo -e "------------------------------------------------\n"
		exit 1
	fi
elif [ "$2" = 'rollback' ]; then
	if [[ -n "$3" ]] ; then
		ROLLBACK_REQUEST=true
		COMMIT_RANGE_TO=$3
	else
		echo -e "$(tput setaf 1)You must supply a commit ID to rollback to$(tput sgr0)"
		echo -e "------------------------------------------------\n"
		exit 1
	fi
else
	echo -e "$(tput setaf 1)You have supplied to many arguments. The correct usage is: deploy.sh <environment>$(tput sgr0)"
	echo -e "------------------------------------------------\n"
	exit 1
fi

# Include .sh from the deploy folder
DEPLOY_ENV=$1
# Set the deploy file
DEPLOY_FILE=./deploy/environments/$DEPLOY_ENV.sh
# Source the deploy file
source $DEPLOY_FILE

echo -e "Deploying $APP to $DEPLOY_ENV environment..."

# ---------------------------------------------------------------------------
# Vars
# ---------------------------------------------------------------------------
#
# Release name
RELEASE_NAME=`date +"%Y-%m-%d-%H%M%S"`
# Local release location
LOCAL_RELEASE=deploy/releases/$RELEASE_NAME.tar.tgz
# Remote release
REMOTE_RELEASE=$SERVER_PATH/releases/$RELEASE_NAME.tar.tgz
# Commit log name
COMMIT_LOG="./deploy/${BRANCH}_release_commit_log"

# ---------------------------------------------------------------------------
# Check commit log
# ---------------------------------------------------------------------------
#
if [[ ! -f $COMMIT_LOG ]]; then
	echo -e "Creating releases commit log..."
	touch $COMMIT_LOG

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
# Create a release from the Git archive
# ---------------------------------------------------------------------------
#
# Rollback request
if [[ -n "${ROLLBACK_REQUEST}" ]] ; then
	# Get first commit from release_commit_log
	COMMIT_RANGE_FROM="$(sed -n '$p' $COMMIT_LOG)"
	# Check commit range
	if [[ ! $COMMIT_RANGE_TO = $COMMIT_RANGE_FROM ]]; then
		# Create tarball
		preloader
		git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $BRANCH
	else
		echo -e "$(tput setaf 1)Commit range is the same. Nothing to deploy.$(tput sgr0)"
		echo -e "------------------------------------------------\n"
		exit 1
	fi
# Not a rollback
else
	echo -e "Creating release and deploying tarball to server..."
	# Deployment from scratch
	if [ "$FRESH_DEPLOYMENT" = true ] ; then
		# Get first ever commit
		COMMIT_RANGE_FROM="$(git rev-list HEAD | tail -n 1)"
		# Get latest commit from remote origin
		COMMIT_RANGE_TO="$(git ls-remote origin | awk '/master/ {print $1}')"
		# Check commit range
		if [[ ! $COMMIT_RANGE_TO = $COMMIT_RANGE_FROM ]]; then
			# Create tarball
			preloader
			git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $BRANCH
		else
			echo -e "$(tput setaf 1)Commit range is the same. Nothing to deploy.$(tput sgr0)"
			echo -e "------------------------------------------------\n"
			exit 1
		fi
	# Deployment from commit range
	else
		# Get latest commit from release_commit_log
		COMMIT_RANGE_FROM="$(sed -n '1p' $COMMIT_LOG)"
		# Get latest commit from remote origin
		COMMIT_RANGE_TO="$(git ls-remote origin | awk '/master/ {print $1}')"
		# Check commit range
		if [[ ! $COMMIT_RANGE_TO = $COMMIT_RANGE_FROM ]]; then
			# Create tarball
			preloader
			git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $COMMIT_RANGE_TO $(git diff --name-only $COMMIT_RANGE_FROM $COMMIT_RANGE_TO $BRANCH)
		else
			echo -e "$(tput setaf 1)Commit range is the same. Nothing to deploy.$(tput sgr0)"
			echo -e "------------------------------------------------\n"
			exit 1
		fi
	fi
fi

# Commit message
COMMIT_MESSAGE="$(git log -1 HEAD --pretty=format:%s)"
# Update release_commit_log
echo "$COMMIT_RANGE_FROM" | cat - $COMMIT_LOG > temp && mv temp $COMMIT_LOG # 2nd Line
echo "$COMMIT_RANGE_TO" | cat - $COMMIT_LOG > temp && mv temp $COMMIT_LOG # 1st Line

# ---------------------------------------------------------------------------
# Deploy to servers
# ---------------------------------------------------------------------------
#
for SERVER in ${DEPLOY_SERVER[@]}; do
	# Create releases directory on server
	ssh -t $DEPLOY_USER@$SERVER "sudo mkdir -p $SERVER_PATH/releases &&
	sudo mkdir -p $FILES_PATH &&
	sudo chown -R $DEPLOY_USER:www-data $SERVER_PATH/releases"
	# Rsync release to server
	echo -e "Sending release to $SERVER..."
	rsync -v -e ssh $LOCAL_RELEASE $DEPLOY_USER@$SERVER:$SERVER_PATH/releases
	# Run tasks
	ssh -t $DEPLOY_USER@$SERVER "echo 'Extracting release...' &&
		sudo mkdir $SERVER_PATH/releases/$RELEASE_NAME &&
		sudo tar -xf $REMOTE_RELEASE --directory $SERVER_PATH/releases/$RELEASE_NAME &&
		echo 'Removing tarball...' &&
		sudo rm -rf $REMOTE_RELEASE &&
		echo 'Copying files to web root...' &&
		sudo cp -rf $SERVER_PATH/releases/$RELEASE_NAME/$GIT_PATH/* $FILES_PATH"
	# Deploy release
	if [[ -n "${ROLLBACK_REQUEST}" ]] ; then
		echo -e "Rolling back to commit: \"$(tput setaf 3)$COMMIT_MESSAGE$(tput sgr0)\""
		ssh -t $DEPLOY_USER@$SERVER "sudo rm -rf $FILES_PATH/* &&
			sudo cp -rf $SERVER_PATH/releases/$RELEASE_NAME/$GIT_PATH/* $FILES_PATH"
	else
		echo -e "Deploying commit: \"$(tput setaf 3)$COMMIT_MESSAGE$(tput sgr0)\""
		ssh -t $DEPLOY_USER@$SERVER "sudo cp -rf $SERVER_PATH/releases/$RELEASE_NAME/$GIT_PATH/* $FILES_PATH"
	fi
done

# ---------------------------------------------------------------------------
# End deployment
# ---------------------------------------------------------------------------
#
end_seconds="$(date +%s)"
echo -e "$(tput setaf 2)Deployment completed successfully in "$(expr $end_seconds - $start_seconds)" seconds.$(tput sgr0)"
echo -e "------------------------------------------------\n"