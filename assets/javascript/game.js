$(document).ready(function(){ 
   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgZ8gdQMcD3HoayHZWMrSs1FU6HmAnoEg",
    authDomain: "rock-paper-scissors-e52aa.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-e52aa.firebaseio.com",
    projectId: "rock-paper-scissors-e52aa",
    storageBucket: "rock-paper-scissors-e52aa.appspot.com",
    messagingSenderId: "990003492779"
  };
    firebase.initializeApp(config);

    var database = firebase.database();

    // Our array of possible computer choices.
    var choices = ["rock", "paper", "scissors"];

    // Variables for tracking our wins, losses and ties. They begin at 0.

    var playerOneName = "";
    var playerOneChoice = "";
    var playerOneWins = 0;
    var playerOneLosses = 0;
    var playerTwoName = "";
    var playerTwoChoice = "";
    var playerTwoWins = 0;
    var playerTwoLosses = 0;
    var ties = 0;

  $("#add-name").on("click", function(event) {
          // prevent form from trying to submit/refresh the page
          event.preventDefault();

          // Capture User Inputs and store them into variables
          playerOneName = $("#name-input").val().trim(); //getting value and triming off extra space.

          //Clear the input box once name has been submitted
          $("#name-input").val("");

    database.ref().set({

      players: {

        player1: {
          playerOneName: playerOneName,
          playerOneChoice: playerOneChoice,
          playerOneWins: playerOneWins,
          playerOneLosses: playerOneLosses,
          ties: ties
        },

        player2: {
          playerTwoName: playerTwoName,
          playerTwoChoice: playerTwoChoice,
          playerTwoWins: playerTwoWins,
          playerTwoLosses: playerTwoLosses,
          ties: ties
        }

      }

    });

  database.ref().on("value", function(snapshot) {

          // Change the HTML to reflect
          $("#player1-name").html(snapshot.val().players.player1.playerOneName);
          $("#results").html(snapshot.val().players.player1.playerOneChoice);
          $("#player1-wins").html("Wins: " + snapshot.val().players.player1.playerOneWins);
          $("#player1-losses").html("Losses: " + snapshot.val().players.player1.playerOneLosses);
          $("#ties1").html("Ties: " + snapshot.val().players.player1.ties);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  });

    // If the user clicks "rock" or "paper" or "scissors", run the game logic.
    function whoWon(){

    if ((playerOneChoice === "rock") || (playerOneChoice === "paper") || (playerOneChoice === "scissors")) {

        // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
        if ((playerOneChoice === "rock") && (playerTwoChoice === "scissors")) {
          playerOneWins++;
          playerTwoLosses++;
        }
        else if ((playerOneChoice === "rock") && (playerTwoChoice === "paper")) {
          playerOneLosses++;
          playerTwoWin++;
        }
        else if ((playerOneChoice === "scissors") && (playerTwoChoice === "rock")) {
          playerOneLosses++;
          playerTwoWin++;
        }
        else if ((playerOneChoice === "scissors") && (playerTwoChoice === "paper")) {
          playerOneWins++;
          playerTwoLosses++;
        }
        else if ((playerOneChoice === "paper") && (playerTwoChoice === "rock")) {
          playerOneWins++;
          playerTwoLosses++;
        }
        else if ((playerOneChoice === "paper") && (playerTwoChoice === "scissors")) {
          playerOneLosses++;
          playerTwoWin++;
        }
        else if (playerOneChoice === playerTwoChoice) {
          ties++;
        }
    }

  }







});