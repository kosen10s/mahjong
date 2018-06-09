#!/bin/bash

hash=`git rev-parse HEAD`
commit_message="Release: $hash"

echo $commit_message
npm run build
git add -f ./dist
git commit -m "$commit_message"s
git subtree push --prefix dist origin gh-pages
git push origin `git subtree split --prefix dist master`:gh-pages --force
