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


# ------------------------------------------------------------------------
# Get version number from package.json.
# ------------------------------------------------------------------------
#
PACKAGE_VERSION=$(cat package.json \
| grep version \
| head -1 \
| awk -F: '{ print $2 }' \
| sed 's/[",]//g' \
| tr -d '[[:space:]]')


# ------------------------------------------------------------------------
# Set version number check.
# ------------------------------------------------------------------------
#
read -p "$(tput setaf 5)Is the version number $PACKAGE_VERSION correct and also updated in changelog.md? y/n $(tput sgr0)" choice
if [[ $choice = "n" ]]; then
  echo -e "$(tput setaf 1)Please update the package.json and/or changelog.md file and try again.$(tput sgr0)"
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

echo -e "Creating version $PACKAGE_VERSION of Framework."
git tag $PACKAGE_VERSION
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
