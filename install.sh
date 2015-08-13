#!/bin/bash
#
# install.sh
#

# ---------------------------------------------------------------------------
# Vars & Config.
# ---------------------------------------------------------------------------
#
# Set the start time.
START_SECONDS="$(date +%s)"



# ------------------------------------------------------------------------
# Clean redundant directories and files
# ------------------------------------------------------------------------
#
# Dir - .git
rm -rf .git/
# Dir - .sass-cache
rm -rf .sass-cache/
# File - .gitkeep
find . -name ".gitkeep" -print0 | xargs -0 rm -rf

## Report.
echo -e "------------------------------------------------"
echo -e "$(tput setaf 2)Removed redundant directories and files...$(tput sgr0)"
echo -e "------------------------------------------------"



# ------------------------------------------------------------------------
# Initialize a new Git instance.
# ------------------------------------------------------------------------
#
# Command.
git init

## Report.
echo -e "------------------------------------------------"
echo -e "$(tput setaf 2)Initialized new Git instance...$(tput sgr0)"
echo -e "------------------------------------------------"



# ------------------------------------------------------------------------
# README
# ------------------------------------------------------------------------
#
if [[ -e ./README.md ]]; then
	read -p "$(tput setaf 5)Do you need the Readme file? y/n $(tput sgr0)" choice
	if [[ $choice = "n" ]]; then
		# Command.
		rm ./README.md

		## Report.
		echo -e "------------------------------------------------"
		echo -e "$(tput setaf 2)Removed README.md file...$(tput sgr0)"
		echo -e "------------------------------------------------"
	fi
	printf "\n"
fi



# ------------------------------------------------------------------------
# htaccess
# ------------------------------------------------------------------------
#
if [[ -e ./src/.htaccess ]]; then
	read -p "$(tput setaf 5)Do you need the htaccess file? y/n $(tput sgr0)" choice
	if [[ $choice = "n" ]]; then
		# Command.
		rm ./src/.htaccess

		## Report.
		echo -e "------------------------------------------------"
		echo -e "$(tput setaf 2)Removed .htaccess file...$(tput sgr0)"
		echo -e "------------------------------------------------"
	fi
	printf "\n"
fi



# ------------------------------------------------------------------------
# robots.txt
# ------------------------------------------------------------------------
#
if [[ -e ./src/robots.txt ]]; then
	read -p "$(tput setaf 5)Do you need the robots.txt file? y/n $(tput sgr0)" choice
	if [[ $choice = "n" ]]; then
		# Command.
		rm ./src/robots.txt

		## Report.
		echo -e "------------------------------------------------"
		echo -e "$(tput setaf 2)Removed robots.txt file...$(tput sgr0)"
		echo -e "------------------------------------------------"
	fi
	printf "\n"
fi



# ------------------------------------------------------------------------
# Get Git origin.
# ------------------------------------------------------------------------
#
read -p "$(tput setaf 5)Enter a URL for your repository. Leave blank if none. $(tput sgr0)" choice
if [[ ! -z "$choice" ]]; then
	# Command.
	REPO_URL=$choice

	## Report.
	echo -e "------------------------------------------------"
	echo -e "$(tput setaf 2)Git repository URL saved...$(tput sgr0)"
	echo -e "------------------------------------------------"
fi
printf "\n"



# ------------------------------------------------------------------------
# Check for a commit.
# ------------------------------------------------------------------------
#
read -p "$(tput setaf 5)Do you want to do an initial commit? y/n $(tput sgr0)" choice
if [[ $choice = "y" ]]; then
	# Command.
	INITIAL_COMMIT=true

	## Report.
	echo -e "------------------------------------------------"
	echo -e "$(tput setaf 2)Will do initial commit after install...$(tput sgr0)"
	echo -e "------------------------------------------------"
fi
printf "\n"



# ------------------------------------------------------------------------
# Update / get dependencies with Bundler.
# ------------------------------------------------------------------------
#
# Command.
bundle install

## Report.
echo -e "------------------------------------------------"
echo -e "$(tput setaf 2)Got Bundler dependencies...$(tput sgr0)"
echo -e "------------------------------------------------"



# ------------------------------------------------------------------------
# Update / get dependencies with NPM.
# ------------------------------------------------------------------------
#
# Command.
npm install

## Report.
echo -e "------------------------------------------------"
echo -e "$(tput setaf 2)Got NPM dependencies...$(tput sgr0)"
echo -e "------------------------------------------------"



# ------------------------------------------------------------------------
# Git commit.
# ------------------------------------------------------------------------
#
if [ "$INITIAL_COMMIT" = true ] ; then
	git add --all
	git commit -am "Initial commit"

	# Do push.
	if [[ ! -z "$REPO_URL" ]]; then
		# Command.
		git remote add origin $REPO_URL
		# Command.
		git push origin --all
	fi

	## Report.
	echo -e "------------------------------------------------"
	echo -e "$(tput setaf 2)Done initial Git commit...$(tput sgr0)"
	echo -e "------------------------------------------------"
fi
printf "\n"



# ------------------------------------------------------------------------
# Create a dev branch.
# ------------------------------------------------------------------------
#
# Command.
git branch dev

## Report.
echo -e "------------------------------------------------"
echo -e "$(tput setaf 2)Created dev branch...$(tput sgr0)"
echo -e "------------------------------------------------"



# ---------------------------------------------------------------------------
# Complete.
# ---------------------------------------------------------------------------
#
END_SECONDS="$(date +%s)"
echo -e "------------------------------------------------"
echo -e "$(tput setaf 2)Web Framework successfully installed in "$(expr $END_SECONDS - $START_SECONDS)" seconds$(tput sgr0)"
echo -e "------------------------------------------------"



# ------------------------------------------------------------------------
# Run a Git status.
# ------------------------------------------------------------------------
#
# Command.
git status
