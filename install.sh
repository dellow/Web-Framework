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

echo "Installation in progress. Please wait..."

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
echo "Removing initial .git directory..."
rm -rf .git/         && \
# ------------------------------------------------------------------------
# Remove the `.sass-cache` directory
# ------------------------------------------------------------------------
#
rm -rf .sass-cache/  && \
# ------------------------------------------------------------------------
# Remove .gitkeep files
# ------------------------------------------------------------------------
#
echo "Removing any .gitkeep files..."
find . -name ".gitkeep" -print0 | xargs -0 rm -rf  && \
# ------------------------------------------------------------------------
# Initialize a new Git instance
# ------------------------------------------------------------------------
#
echo "Initialize new Git instance..."
git init             && \
# ------------------------------------------------------------------------
# Remove the clean file
# ------------------------------------------------------------------------
#
rm install.sh        && \

echo "Some questions for you:"
# ------------------------------------------------------------------------
# README
# ------------------------------------------------------------------------
#
if [[ -e ./README.md ]]; then
	read -p "Do you need the Readme file? y/n " choice
	if [[ $choice = "n" ]]; then
		# Remove `README.md`
		rm ./README.md
	fi
	printf "\n"
fi
# ------------------------------------------------------------------------
# htaccess
# ------------------------------------------------------------------------
#
if [[ -e ./src/.htaccess ]]; then
	read -p "Do you need the htaccess file? y/n " choice
	if [[ $choice = "n" ]]; then
		# Remove `.htaccess`
		rm ./src/.htaccess
	fi
	printf "\n"
fi
# ------------------------------------------------------------------------
# Check for a commit
# ------------------------------------------------------------------------
#
read -p "Do you want to do an initial commit? y/n " choice
if [[ $choice = "y" ]]; then
	# Initial commit
	INITIAL_COMMIT=true
fi
printf "\n"
# ------------------------------------------------------------------------
# Update / get dependencies with Bower
# ------------------------------------------------------------------------
#
echo "Getting bower dependencies..."
bower install                                        && \
# ------------------------------------------------------------------------
# Update / get dependencies with NPM
# ------------------------------------------------------------------------
#
echo "Getting NPM dependencies..."
npm install                                          && \
# ------------------------------------------------------------------------
# Move bower dependency
# ------------------------------------------------------------------------
#
echo "Moving /dist/ directory it's new home..."
cp -r bower_components/framework-library/dist ./src  && \
# ------------------------------------------------------------------------
# Git commit
# ------------------------------------------------------------------------
#
if [ "$INITIAL_COMMIT" = true ] ; then
	# Add files
	git add --all
	# Initial commit
	git commit -am "Initial commit"
fi
printf "\n"
# ------------------------------------------------------------------------
# Create a dev branch
# ------------------------------------------------------------------------
#
git branch dev
echo "Creating a dev branch"
# ---------------------------------------------------------------------------
# Complete
# ---------------------------------------------------------------------------
#
end_seconds="$(date +%s)"
echo "Framework installed successfully in "$(expr $end_seconds - $start_seconds)" seconds"
# ------------------------------------------------------------------------
# Run a Git status
# ------------------------------------------------------------------------
#
git status