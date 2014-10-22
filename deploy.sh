#!/bin/bash
#
# deploy.sh
#
# HOW TO USE:
# Beware about ownership. This script assumes the SSH deployment user is also the one
# who owns the directory you are deploying to. It is recommended you use a 'deploy'
# user for any deployment or public facing file tasks.
#
# 1. Make sure you have environments setup in /deploy/environments in the form of:
#	 `production.sh` | `staging.sh` | `dev.sh`
#
# 2. Your server must be setup with SSH key pairs. It will not work with servers
# 	 that require passwords to SSH.
#
# 3. To do a normal deploy run:
#	./deploy.sh <environment>
#
# 4. To do a rollback run:
#	./deploy.sh <environment> rollback <commit_to_rollback_to_id>
#

VERSION=1.0.0

preloader(){
	echo -ne "$(tput setaf 3)-* (25%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-*-*-* (50%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 3)-*-*-*-*-*-*-* (75%)\r$(tput sgr0)"
	sleep 1
	echo -ne "$(tput setaf 2)-*-*-*-*-*-*-*-*-*-* (100%) Done!\r$(tput sgr0)"
	sleep 1
}

echo -e "\nDeploy system version: ${VERSION}"
echo -e "------------------------------------------------"
# ---------------------------------------------------------------------------
# Check this is a valid Git repo
# ---------------------------------------------------------------------------
if [[ ! -d ./.git ]]; then
	echo -e "$(tput setaf 1)This is not a valid Git repository$(tput sgr0)"
	echo -e "------------------------------------------------"
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
		echo -e "------------------------------------------------"
		exit 1
	fi
elif [ "$2" = 'rollback' ]; then
	if [[ -n "$3" ]] ; then
		ROLLBACK_REQUEST=true
		COMMIT_RANGE_TO=$3
	else
		echo -e "$(tput setaf 1)You must supply a commit ID to rollback to$(tput sgr0)"
		echo -e "------------------------------------------------"
		exit 1
	fi
else
	echo -e "$(tput setaf 1)You have supplied to many arguments. The correct usage is: deploy.sh <environment>$(tput sgr0)"
	echo -e "------------------------------------------------"
	exit 1
fi

# Include .sh from the deploy folder
DEPLOY_ENV=$1
# Set the deploy file
DEPLOY_FILE=./deploy/environments/$DEPLOY_ENV.sh
# Source the deploy file
source $DEPLOY_FILE
# Check SSH connection
echo -e "Running connection tests to each of your servers. Please wait..."
echo -e "------------------------------------------------"
for SERVER in ${DEPLOY_SERVER[@]}; do
	if ssh -o BatchMode=yes $DEPLOY_USER@$SERVER true 2>/dev/null; then
		echo -e "$(tput setaf 2)$DEPLOY_USER@$SERVER: Connected successfully!$(tput sgr0)"
    else
		echo -e "$(tput setaf 1)$DEPLOY_USER@$SERVER: Connection failed!$(tput sgr0)"
		LOGIN_FAILED=true
    fi
	echo -e "------------------------------------------------"
done
if [[ -n "${LOGIN_FAILED}" ]] ; then
	echo -e "$(tput setaf 1)Either the details on one of your servers are wrong or the server requires a password. Deployment only supports servers with SSH key pairs.$(tput sgr0)"
	exit 1
else
	echo -e "$(tput setaf 2)Continuing to deploy $APP to $DEPLOY_ENV environment...$(tput sgr0)"
fi

# ---------------------------------------------------------------------------
# Check if we need to do a Git push
# ---------------------------------------------------------------------------
#
GIT_LOCAL=$(git rev-parse @)
GIT_REMOTE=$(git rev-parse @{u})
GIT_BASE=$(git merge-base @ @{u})
if [ $GIT_LOCAL = $GIT_REMOTE ]; then
    echo -e "$(tput setaf 2)Local Git repo is up-to-date with remote. Continuing...$(tput sgr0)"
elif [ $GIT_REMOTE = $GIT_BASE ]; then
	read -p "$(tput setaf 5)The local Git repo is not up-to-date with the remote. Deployment will not deploy file not on the remote server. Would you like to push first? y/n $(tput sgr0)" choice
	if [[ $choice = "y" ]]; then
		git push origin $DEPLOY_ENV
	fi
else
    echo -e "Diverged"
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
REMOTE_RELEASE=$SERVER_PATH/releases/$RELEASE_NAME.tar.tgz
# Commit log name
COMMIT_LOG="$SERVER_PATH/${BRANCH}_release_commit_log"
# Temp commit_log
TEMP_COMMIT_LOG=deploy/temp_commit_log

# ---------------------------------------------------------------------------
# Make local releases directory
# ---------------------------------------------------------------------------
#
if [[ ! -d ./deploy/releases ]]; then
	echo -e "Creating releases directory..."
	mkdir -p ./deploy/releases
fi

# ---------------------------------------------------------------------------
# Get release for each server
# ---------------------------------------------------------------------------
#
for SERVER in ${DEPLOY_SERVER[@]}; do

	# ---------------------------------------------------------------------------
	# Get release
	# ---------------------------------------------------------------------------
	# Check for commit log
	if( ssh $DEPLOY_USER@$SERVER "[ ! -f $COMMIT_LOG ]" ); then
		echo -e "Creating releases commit log..."
		# Create commit log
		ssh -t $DEPLOY_USER@$SERVER "sudo touch $COMMIT_LOG"
		FRESH_DEPLOYMENT=true
	fi

	# Get COMMIT_LOG contents
	echo -e "Getting the commit log from the server..."
	scp $DEPLOY_USER@$SERVER:$COMMIT_LOG $TEMP_COMMIT_LOG

	# Rollback request
	if [[ -n "${ROLLBACK_REQUEST}" ]] ; then
		# Get first commit from release_commit_log
		COMMIT_RANGE_FROM="$(sed -n '$p' $TEMP_COMMIT_LOG)"
		# Remove temp_commit_log
		rm $TEMP_COMMIT_LOG
		# Check commit range
		if [[ ! $COMMIT_RANGE_TO = $COMMIT_RANGE_FROM ]]; then
			# Create tarball
			preloader
			git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $BRANCH
		else
			echo -e "$(tput setaf 1)Commit range is the same. Nothing to deploy.$(tput sgr0)"
			echo -e "------------------------------------------------"
			exit 1
		fi
	# Not a rollback
	else
		echo -e "Creating release..."
		# Deployment from scratch
		if [ "$FRESH_DEPLOYMENT" = true ] ; then
			echo -e "This is a fresh deployment..."
			# Get first ever commit
			COMMIT_RANGE_FROM="$(git rev-list HEAD | tail -n 1)"
			# Get latest commit from remote origin
			COMMIT_RANGE_TO="$(git ls-remote origin | awk '/master/ {print $1}')"
			# Remove temp_commit_log
			rm $TEMP_COMMIT_LOG
			# Check commit range
			if [[ ! $COMMIT_RANGE_TO = $COMMIT_RANGE_FROM ]]; then
				# Create tarball
				preloader
				git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $BRANCH
			else
				echo -e "$(tput setaf 1)Commit range is the same. Nothing to deploy.$(tput sgr0)"
				echo -e "------------------------------------------------"
				exit 1
			fi
		# Deployment from commit range
		else
			echo -e "Previous deployments detected..."
			# Get latest commit from release_TEMP_COMMIT_LOG
			COMMIT_RANGE_FROM="$(sed -n '1p' $TEMP_COMMIT_LOG)"
			# Get latest commit from remote origin
			COMMIT_RANGE_TO="$(git ls-remote origin | awk '/master/ {print $1}')"
			# Remove temp_commit_log
			rm $TEMP_COMMIT_LOG
			# Check commit range
			if [[ ! $COMMIT_RANGE_TO = $COMMIT_RANGE_FROM ]]; then
				# Create tarball
				preloader
				git archive --format tar --output ./deploy/releases/$RELEASE_NAME.tar.tgz $COMMIT_RANGE_TO $(git diff --name-only $COMMIT_RANGE_FROM $COMMIT_RANGE_TO $BRANCH)
			else
				echo -e "$(tput setaf 1)Commit range is the same. Nothing to deploy.$(tput sgr0)"
				echo -e "------------------------------------------------"
				exit 1
			fi
		fi
	fi

	# ---------------------------------------------------------------------------
	# Check file size
	# ---------------------------------------------------------------------------
	MIN_FILE_SIZE=1
	TARBALL_SIZE=$(du -k "$LOCAL_RELEASE" | cut -f 1)
	echo $TARBALL_SIZE
	# Check if the release is above 1kb
	if [ $TARBALL_SIZE -ge $MIN_FILE_SIZE ]; then
	    echo -e "$(tput setaf 2)File is valid. Continuing...$(tput sgr0)"
	else
		echo -e "$(tput setaf 1)The tarball is empty. Exiting...$(tput sgr0)"
		exit 1
	fi

	# ---------------------------------------------------------------------------
	# Deploy to servers
	# ---------------------------------------------------------------------------
	# Commit message
	COMMIT_MESSAGE="$(git log -1 HEAD --pretty=format:%s)"
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
		sudo rm -rf $REMOTE_RELEASE"
	# Deploy release
	if [[ -n "${ROLLBACK_REQUEST}" ]] ; then
		echo -e "Rolling back to commit: \"$(tput setaf 3)$COMMIT_MESSAGE$(tput sgr0)\""
		ssh -t $DEPLOY_USER@$SERVER "sudo rm -rf $FILES_PATH/* &&
			sudo cp -rf $SERVER_PATH/releases/$RELEASE_NAME/$GIT_PATH/* $FILES_PATH"
	else
		echo -e "Deploying commit: \"$(tput setaf 3)$COMMIT_MESSAGE$(tput sgr0)\""
		ssh -t $DEPLOY_USER@$SERVER "sudo cp -rf $SERVER_PATH/releases/$RELEASE_NAME/$GIT_PATH/* $FILES_PATH"
	fi

	# After successful deployment update the commit log
	ssh -t $DEPLOY_USER@$SERVER "echo $COMMIT_RANGE_FROM | cat - $COMMIT_LOG > temp && mv temp $COMMIT_LOG &&
	echo $COMMIT_RANGE_TO | cat - $COMMIT_LOG > temp && mv temp $COMMIT_LOG"
done

# ---------------------------------------------------------------------------
# End deployment
# ---------------------------------------------------------------------------
#
end_seconds="$(date +%s)"
echo -e "$(tput setaf 2)Deployment completed successfully in "$(expr $end_seconds - $start_seconds)" seconds.$(tput sgr0)"
echo -e "------------------------------------------------"