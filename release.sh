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
gulp assets
git commit -am "Final dev compile"

git checkout master
git merge dev

gulp assets
git commit -am "Final master compile"

echo -e "Creating version $release_ver of Framework"
git tag $release_ver
git push origin --all

git checkout dev
git merge master
printf "\n"


# ---------------------------------------------------------------------------
# Complete.
# ---------------------------------------------------------------------------
#
END_SECONDS="$(date +%s)"
echo -e "------------------------------------------------"
echo -e "$(tput setaf 2)New release created in "$(expr $END_SECONDS - $START_SECONDS)" seconds$(tput sgr0)"
echo -e "------------------------------------------------"
