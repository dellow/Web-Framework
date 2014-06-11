# Git Workflow
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## Installing git
Set up a global git config file or alternatively run any of the following commands:

### Global user

	git config --global user.name "First Last"
	git config --global user.email "email@address.com"

### Local user (navigate to directory where "gitting")

	git config user.name "First Last"
	git config user.email "email@address.com"

### Colours

	git config --global color.diff auto
	git config --global color.status auto
	git config --global color.branch auto

## Understanding Git
#### [http://rogerdudler.github.io/git-guide/](http://rogerdudler.github.io/git-guide/)
- A local repository consists of three "trees" maintained by git. the first one is your Working Directory which holds the actual files. the second one is the Index which acts as a staging area and finally the HEAD which points to the last commit you've made.
- A branch is not available to others unless you push the branch to your remote repository.
- Git tries to auto-merge changes when pulling. Unfortunately, this is not always possible and results in conflicts. You are responsible to merge those conflicts manually by editing the files shown by git. After changing, you need to mark them as merged with:

		git add <filename>
Before merging changes, you can also preview them by using:

		git diff <source_branch> <target_branch>

- In case you did something wrong you can replace local changes using the command:

		git checkout -- <filename>
This replaces the changes in your working tree with the last content in HEAD. Changes already added to the index, as well as new files, will be kept.

- If you instead want to drop all your local changes and commits, fetch the latest history from the server and point your local master branch at it like this:

		git fetch origin
		git reset --hard origin/master

## Managing Source
#### [https://www.sonassi.com/wp-content/uploads/2012/07/simple_git_daily_workflow.pdf](https://www.sonassi.com/wp-content/uploads/2012/07/simple_git_daily_workflow.pdf)
1. Pull all changes from remote repository

		git pull

2. Create a new branch for bug/feature/issue

		git checkout -b <branch-name>

3. Do work. Commit regularly.
4. Add any new files created

		git add . / git add --all

5. See changes about to be committed

		git status and/or git diff

6. Make a detailed commit

		git commit -m "Detailed message here"

7. Back to head branch

		git checkout master

8. Update head branch to update with all changes

		git merge <branch-name>

9. Push changes to remote repo

		git push origin <branch-name>

## Versioning
1. Make individual changes, updating the changelog as you go.
2. When version is ready update the version number in applicable files and with a tag - Version number should be based on the density of changes.
3. Create a tag

		git tag x.x.x

4. Push tag

		git push origin --tags

## Branches
- Master branch is never committed to. This causes problems when you switch back to another branch which will now be behind.
- All commits to "dev" or child branches.
- Every branch pushed to remote repo at the end of the day to keep up to date.
- When a new version is ready it's tagged and merged to "master" and pushed.

### Structure
- master
- staging
- dev
	- templates
		- feature-xxx
		- bug-xxx
	- frontend
		- feature-xxx
		- bug-xxx
	- backend
		- feature-xxx
		- bug-xxx
	- bug-xxx
