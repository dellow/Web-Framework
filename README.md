# Web Framework Readme

[![Dependency Status](https://david-dm.org/sdellow/web-framework.svg)](https://david-dm.org/sdellow/web-framework)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Contents
1. [About](#about)
1. [Requirements](#requirements)
1. [Install](#install)
1. [Changelog](#changelog)

<a name="about"></a>
## About
This is a fast Framework and/or Project Wrapper and workflow for web projects that utilises Webpack as a build tool.

<a name="requirements"></a>
## Requirements
The only system requirement is Node & NPM.

- [NodeJS](http://nodejs.org/)

> __Please note:__ This should be installed before using this Framework.

<a name="install"></a>
## Install
_Please make sure your system meets the requirements above._

#### Git
You can get Web Framework by cloning this repository simply by running `git clone git@github.com:sdellow/web-framework.git`.

#### Init
Once complete simply run `bash commands/install.sh` from your command line. This will do the following:

- Remove the Git wrapper and replace with a fresh Git initialisation.
- Remove any un-necessary files/directories.
- Get all Bower dependencies.
- Get all NPM dependencies.
- Does an initial commit on the new Git initialisation.

__All additional instructions below assume you have followed the installation process.__

> __Pro Tip:__ You can make the install script executable by running `chmod u+x commands/install.sh`. This will allow you to run the script like this: `./commands/install.sh`.

<a name="changelog"></a>
## Changelog
See the main [Changelog](CHANGELOG.md) for entries.