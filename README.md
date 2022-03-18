# tic-tac-toe
Tic Tac Toe project from The Odin Project.

Live: https://luuu-xu.github.io/tic-tac-toe/

Added random-picked AI feature!
This AI randomly picks a tile in the remaining gameboard and play there, I don't think you can lose!

At the beginning, this project was going fairly smoothly and easily. However, when the basic features are finished, and I was trying to add the reset button to the game, it just couldn't initialize the gameboard to empty and render it again. After some head-scratching and frustrations, I realized that declaring the variable gameBoard alone in the gobal scope would easily solve my problems.

Now the project is finished, I am not so sure that leaving the gameBoard variable in global scope is a good idea or not. I have put almost every functions, variables inside a factory function or module patterns, some have private functions inside their scope, some have public functions and public varaibles.

I probably need a lot more practices on this kind of project so I would come up a conclusion that either exposing gameBoard variable to global scope is a good idea.

Now I will try to make an AI which the player can play against!