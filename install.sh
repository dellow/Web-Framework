# Framework installer by Stewart Dellow
# Installs dependencies with NPM and Bower and cleans redundant files.
# How to: `bash install.sh`
#!/bin/bash

echo "Installation in progress. Please wait..."
# ------------------------------------------------------------------------
# Remove `.git` directory
rm -rf .git/         && \
# ------------------------------------------------------------------------
# Remove the `.sass-cache` directory
rm -rf .sass-cache/  && \
# ------------------------------------------------------------------------
# Initialize a new Git instance
git init             && \
# ------------------------------------------------------------------------
# Remove the clean file
rm install.sh        && \
# ------------------------------------------------------------------------
# README
if [[ -e ./README.md ]]; then
	read -p "Do you need the Readme file? y/n " choice
	if [[ $choice = "n" ]]
	then
		# Remove `README.md`
		rm ./README.md
	fi
	printf "\n"
fi
# ------------------------------------------------------------------------
# htaccess
if [[ -e ./app/.htaccess ]]; then
	read -p "Do you need the htaccess file? y/n " choice
	if [[ $choice = "n" ]]
	then
		# Remove `.htaccess`
		rm ./app/.htaccess
	fi
	printf "\n"
fi
# ------------------------------------------------------------------------
# Update / get dependencies with Bower
bower install                                        && \
# ------------------------------------------------------------------------
# Update / get dependencies with NPM
npm install                                          && \
# ------------------------------------------------------------------------
# Move bower dependency
cp -r bower_components/framework-library/dist ./src  && \
# ------------------------------------------------------------------------
# Add all current files
git add --all                                        && \
# ------------------------------------------------------------------------
# Check for a commit
read -p "Do you want to do an initial commit? y/n " choice
if [[ $choice = "y" ]]
then
	# Initial commit
	git commit -am "Initial commit"
fi
printf "\n"
# ------------------------------------------------------------------------
echo "Framework successfully installed!"
# ------------------------------------------------------------------------
# Run a Git status
git status