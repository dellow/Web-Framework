#!/bin/bash
#
# release.sh
#


# ---------------------------------------------------------------------------
# Check Git Tree.
# ---------------------------------------------------------------------------
#
if [[ -n $(git status -s) ]]; then
  echo -e "$(tput setaf 1)Your git tree is not clean. Commit any changes and run the release script again. $(tput sgr0)"
  exit 0
fi


# ---------------------------------------------------------------------------
# Get Version.
# ---------------------------------------------------------------------------
#
read -p "$(tput setaf 5)Create version number... $(tput sgr0)" release_ver


# ------------------------------------------------------------------------
# Set version number check.
# ------------------------------------------------------------------------
#
read -p "$(tput setaf 5)Have you updated the changelog with a $release_ver entry and updated the package.json file with the version number? y/n $(tput sgr0)" choice
if [[ $choice = "n" ]]; then
  echo -e "$(tput setaf 1)Please update the changelog and/or package.json file and try again.$(tput sgr0)"
  exit 0
fi
printf "\n"


# ---------------------------------------------------------------------------
# Vars & Config.
# ---------------------------------------------------------------------------
#
# Set the start time.
START_SECONDS="$(date +%s)"


# ------------------------------------------------------------------------
# Run.
# ------------------------------------------------------------------------
#
gulp css
gulp js
git commit -am "Final dev compile"

git checkout master
git merge dev

gulp css
gulp js
git commit -am "Final master compile"

echo -e "Creating version $release_ver of Framework."
git tag $release_ver
echo -e "Tagged a new version."
git push origin --all
echo -e "Pushed to repo."

git checkout dev
git merge master


# ------------------------------------------------------------------------
# Push to repository.
# ------------------------------------------------------------------------
#
git push origin --all
git push origin --tags


# ---------------------------------------------------------------------------
# Complete.
# ---------------------------------------------------------------------------
#
END_SECONDS="$(date +%s)"
echo -e "------------------------------------------------"
echo -e "$(tput setaf 2)New release created in "$(expr $END_SECONDS - $START_SECONDS)" seconds$(tput sgr0)"
echo -e "------------------------------------------------"
