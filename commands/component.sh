#!/bin/bash
#
# component.sh
#

# ---------------------------------------------------------------------------
# Vars & Config.
# ---------------------------------------------------------------------------
#
## Check for a component name.
if [ -z ${1} ]; then
  echo -e "$(tput setaf 1)You must provide a component name.$(tput sgr0)"
  exit 0
else
  COMPONENTNAME=$1
  COMPONENTNAME_LOWER="$(tr [A-Z] [a-z] <<< "$COMPONENTNAME")"
  COMPONENTNAME_UPPER="$(tr [a-z] [A-Z] <<< "$COMPONENTNAME")"
  DISTPATH=$(cat package.json \
  | grep dirSCSSTheme \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
  FILE="$DISTPATH"components/_$COMPONENTNAME_LOWER.scss
fi

# ---------------------------------------------------------------------------
# Create component.
# ---------------------------------------------------------------------------
#
## Check if component exists.
if [[ -e $FILE ]]; then
  echo -e "$(tput setaf 1)Component already exists.$(tput sgr0)"
  exit 0
else
  ## Set path.
  COMPPATH="'components\/$COMPONENTNAME_LOWER',"
  ## Copy source file.
  cp ./assets/scss/template $FILE
  ## Update component file name.
  sed -i '' -e "s/Site > Components > Template/Site > Components > $COMPONENTNAME_LOWER/g" $FILE
  ## Update component class name.
  sed -i '' -e "s/template/$COMPONENTNAME_LOWER/g" $FILE
  ## Add to bootstrap.
  sed -i '' 's/Components.*$/&\
    '"$COMPPATH"'/' "$DISTPATH"_#bootstrap.scss
  ## Output.
  echo -e "Created file: $FILE"
  ## Open in Atom current window.
  atom -a $FILE
fi
