echo make sure branches are available in local repo before running read-tree commands

git read-tree --prefix=angular/ -u angular
echo git read-tree --prefix=owin/ -u owin
echo git read-tree --prefix=owin-identityserver3/ -u owin-identityserver3
echo git read-tree --prefix=mvc6/ -u mvc6
echo git read-tree --prefix=react/ -u react

git merge --squash -s subtree --no-commit angular
echo git merge --squash -s subtree --no-commit owin
echo git merge --squash -s subtree --no-commit owin-identityserver3
echo git merge --squash -s subtree --no-commit mvc6
echo git merge --squash -s subtree --no-commit react