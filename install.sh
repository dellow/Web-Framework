#!/bin/bash
#
# install.sh
#
# HOW TO USE:
# 1. Run
#	bash install.sh
#
# NOTES:
# This script will installs dependencies with NPM and Bower and
# clean redundant files.
#

echo -e "\n------------------------------------------------"
echo -e "Installation in progress. Please wait..."

# ---------------------------------------------------------------------------
# Vars
# ---------------------------------------------------------------------------
#
# Set the start time
start_seconds="$(date +%s)"

# ------------------------------------------------------------------------
# Remove initial `.git` directory
# ------------------------------------------------------------------------
#
echo -e "Removing initial .git directory..."
rm -rf .git/         && \

# ------------------------------------------------------------------------
# Remove the `.sass-cache` directory
# ------------------------------------------------------------------------
#
echo -e "Removing .sass-cache directory..."
rm -rf .sass-cache/  && \

# ------------------------------------------------------------------------
# Remove .gitkeep files
# ------------------------------------------------------------------------
#
echo -e "Removing any .gitkeep files..."
find . -name ".gitkeep" -print0 | xargs -0 rm -rf  && \

# ------------------------------------------------------------------------
# Initialize a new Git instance
# ------------------------------------------------------------------------
#
echo -e "Initialize new Git instance..."
git init             && \

# ------------------------------------------------------------------------
# Remove the clean file
# ------------------------------------------------------------------------
#
rm install.sh        && \

echo -e "$(tput setaf 2)Some questions for you:$(tput sgr0)"
# ------------------------------------------------------------------------
# README
# ------------------------------------------------------------------------
#
if [[ -e ./README.md ]]; then
	read -p "$(tput setaf 5)Do you need the Readme file? y/n $(tput sgr0)" choice
	if [[ $choice = "n" ]]; then
		echo -e "$(tput setaf 3)Removing README.md...$(tput sgr0)"
		rm ./README.md
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
		echo -e "$(tput setaf 3)Removing .htaccess...$(tput sgr0)"
		rm ./src/.htaccess
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
		echo -e "$(tput setaf 3)Removing robots.txt...$(tput sgr0)"
		rm ./src/robots.txt
	fi
	printf "\n"
fi

# ------------------------------------------------------------------------
# Install WordPress
# ------------------------------------------------------------------------
#
read -p "$(tput setaf 5)Would you like to install WordPress? y/n $(tput sgr0)" choice
if [[ $choice = "y" ]]; then
	echo -e "$(tput setaf 3)Installing WordPress...$(tput sgr0)"
	rm ./src/*
	git clone git@github.com:sdellow/WordPress-Framework.git ./src
	bash ./src/plugins.sh
fi
printf "\n"

# ------------------------------------------------------------------------
# Check for a commit
# ------------------------------------------------------------------------
#
read -p "$(tput setaf 5)Do you want to do an initial commit? y/n $(tput sgr0)" choice
if [[ $choice = "y" ]]; then
	echo -e "$(tput setaf 3)Will do initial commit after install$(tput sgr0)"
	INITIAL_COMMIT=true
fi
printf "\n"

# ------------------------------------------------------------------------
# Update / get dependencies with Bundler
# ------------------------------------------------------------------------
#
echo -e "Getting Bundler dependencies..."
bundle install                                        && \

# ------------------------------------------------------------------------
# Update / get dependencies with Bower
# ------------------------------------------------------------------------
#
echo -e "Getting Bower dependencies..."
bower install                                        && \

# ------------------------------------------------------------------------
# Update / get dependencies with NPM
# ------------------------------------------------------------------------
#
echo -e "Getting NPM dependencies..."
npm install                                          && \

# ------------------------------------------------------------------------
# Move bower dependency
# ------------------------------------------------------------------------
#
echo -e "Moving /dist/ directory to it's new home..."
cp -r bower_components/framework-library/dist ./src  && \

# ------------------------------------------------------------------------
# Git commit
# ------------------------------------------------------------------------
#
if [ "$INITIAL_COMMIT" = true ] ; then
	echo -e "Adding files to Git..."
	git add --all
	echo -e "Committing files to Git..."
	git commit -am "Initial commit"
fi
printf "\n"

# ------------------------------------------------------------------------
# Create a dev branch
# ------------------------------------------------------------------------
#
echo -e "Creating a dev branch..."
git branch dev

# ---------------------------------------------------------------------------
# Complete
# ---------------------------------------------------------------------------
#
end_seconds="$(date +%s)"
echo -e "$(tput setaf 2)Framework installed successfully in "$(expr $end_seconds - $start_seconds)" seconds$(tput sgr0)"
echo -e "------------------------------------------------\n"

# ------------------------------------------------------------------------
# Run a Git status
# ------------------------------------------------------------------------
#
git status