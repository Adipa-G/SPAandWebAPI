echo make sure branches are available in local repo before running read-tree commands

echo git read-tree --prefix=angular4/ -u angular4
echo git read-tree --prefix=owin/ -u owin
echo git read-tree --prefix=owin-identityserver3/ -u owin-identityserver3
echo git read-tree --prefix=mvc6/ -u mvc6
echo git read-tree --prefix=react/ -u react

git merge --squash -s subtree --no-commit angular4
git merge --squash -s subtree --no-commit owin
git merge --squash -s subtree --no-commit owin-identityserver3
git merge --squash -s subtree --no-commit mvc6
git merge --squash -s subtree --no-commit react