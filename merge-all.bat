echo git read-tree --prefix=angular2/ -u angular2
echo git read-tree --prefix=owin/ -u owin
echo git read-tree --prefix=owin-identityserver3/ -u owin-identityserver3
echo git read-tree --prefix=mvc6/ -u mvc6

git merge --squash -s subtree --no-commit angular2
git merge --squash -s subtree --no-commit owin
git merge --squash -s subtree --no-commit owin-identityserver3
git merge --squash -s subtree --no-commit mvc6