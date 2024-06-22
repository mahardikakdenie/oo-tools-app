#!/bin/bash

# request to input a commit message
read -p "Enter a commit message: " commit_message

# get a current batch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# add a all changes
git add .

# exec a commit command
git commit -m "$commit_message"

# push in current branch
git push origin "$current_branch"
