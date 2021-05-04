rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M master &&
git remote add origin git@github.com:Lu9709/vue-note-website.git &&
git push -f -u origin master &&
cd -
