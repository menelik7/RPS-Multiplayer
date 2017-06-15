# RPS-Multiplayer


PSEUDOCODE


JOINING THE GAME

    *Once the first user logs on
		->display "Enter a name to join" in the input box;

        *Once the first user enters a name and clicks "join"
			-> clear the value of the name-input box;
			-> add an object named "player1" to the players folder (/'players');
			---> initially the "player1" object will have three elements: name=name, wins=0, and losses=0.
			-> display a message in player2's box that the game is awaiting player2.
			-> display in player1's box his/her name
			-> display the three options (Rock, Paper, Scissors)
			-> display status of wins, and losses.
			-> hide the input box and join button 
			-> display a message in "#credentials1" that this user is now player1 and that we are- 
			-> awaiting player2 to join;

    *Once the second user enters
		-> display the current display on player1's page with the exception of the input/join showing-
		for this user to enter a name;

        *Once the second user enters a name and clicks "join"
			-> clear the value of the name-input box;
			-> add an object named "player2" to the players folder (/'players');
			--->initially the "player2" object will have three elements: name=name, wins=0, and losses=0.
			-> hide the input box and join button 
			-> for player1 display a message in "#credentials1" that it is his turn.
			-> for player2 display a message in "#credentials2" that they are player2 and 
			   the game is waiting for player 1 to choose.
			-> display in player1's box his/her name
			-> display the three options (Rock, Paper, Scissors)
			-> display status of wins, and losses.
			-> SET THE "turn" VARIABLE TO 1!!!



LIMITING THE NUMBER OF PLAYERS THAT CAN JOIN CONCURRENTLY TO 2

	If the value of the variable "turn" is 1 when a new user tries to join
	-> display in the message box that a game is currently in progress, and that they should try a little
	   later.    
	-> hide the input and join fields.


STARTING THE GAME

    Once the player1 has made a choice
		hide the three options;
		display in block letters their choice;
		display in the current message box that the game is waiting for player2 to make a choice;
		display in player2's message box that it is their turn

    Once player2 makes a choice
		hide the three options;
		display in block letters their choice;
		run the function that determines the winner (function whoWon());
		display in the status box who won;
		increment the corresponding variables (wins, losses)
		set a three second timeout and reset the game to turn 1.


STARTING CHAT

    *Once either player types a text and clicks send
        -> clear the value of the message-input box;
        -> create a folder (/"chat") 
        -> append the name of the sender and text value to the message div;
        -> clear the message div at disconnect;




      
