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

    // connectionsRef references a specific location in our database.
    // All of our connections will be stored in this directory.
    var connectionsRef = database.ref("/players");

    // '.info/connected' is a special location provided by Firebase that is updated every time
    // the client's connection state changes.
    // '.info/connected' is a boolean value, true if the player is connected and false if they are not.
    var connectedRef = database.ref(".info/connected");

    // When the player's connection state changes...
    connectedRef.on("value", function(snap) {

      // If they are connected..
      if (snap.val()) {

        // Add player to the connections list.
        var con = connectionsRef.push(true);

        // Remove player from the connection list when they disconnect.
        con.onDisconnect().remove();
      }
    });

    // When first loaded or when the connections list changes...
    connectionsRef.on("value", function(snap) {
      // The number of online players is the number of children in the connections list.
      snap.numChildren();
    });

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
    $("#score1").hide();
    $("#player1-options").hide();
    $("#score2").hide();
    $("#player2-options").hide();
    $("#login").show();

  $("#btnLogin").on("click", function(event) {
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
    $("#credentials").html("Hello <strong>" + playerOneName + "</strong>! You are player #1.  Waiting for player #2 to join...");
  });

  database.ref().on("value", function(snapshot) {
          // Change the HTML to reflect
          $("#player1-name").html(snapshot.val().players.player1.playerOneName);
          $("#player1-wins").html("Wins: " + snapshot.val().players.player1.playerOneWins);
          $("#player1-losses").html("Losses: " + snapshot.val().players.player1.playerOneLosses);
          $("#ties1").html("Ties: " + snapshot.val().players.player1.ties);
          $("#login").hide();
          $("#score1").show();
          $("#player1-options").show();


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  $("#rock1").on("click", function() {
    playerOneChoice = "Rock";
    database.ref().on("value", function(snapshot) {
    $("#player1-options").html("");
    $("#player1-options").html("You chose <strong>" + playerOneChoice + "</strong>");
  });
  });
  $("#paper1").on("click", function() {
    playerOneChoice = "Paper";
    $("#player1-options").html("");
    $("#player1-options").html("You chose <strong>" + playerOneChoice + "</strong>");
  });
  $("#scissors1").on("click", function() {
    playerOneChoice = "Scissors";
    $("#player1-options").html("");
    $("#player1-options").html("You chose <strong>" + playerOneChoice + "</strong>");
  });


  $("#rock2").on("click", function() {
    playerTwoChoice = "Rock";
    $("#player1-options").html("");
    $("#player1-options").html("You chose <strong>" + playerTwoChoice + "</strong>");
  });
  $("#paper2").on("click", function() {
    playerTwoChoice = "Paper";
    $("#player1-options").html("");
    $("#player1-options").html("You chose <strong>" + playerTwoChoice + "</strong>");
  });
  $("#scissors2").on("click", function() {
    playerTwoChoice = "Scissors";
    $("#player1-options").html("");
    $("#player1-options").html("You chose <strong>" + playerTwoChoice + "</strong>");
  });


    // If the user clicks "rock" or "paper" or "scissors", run the game logic.
    function whoWon(){

    if ((playerOneChoice === "Rock") || (playerOneChoice === "Paper") || (playerOneChoice === "Scissors")) {

        // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
        if ((playerOneChoice === "Rock") && (playerTwoChoice === "Scissors")) {
          playerOneWins++;
          playerTwoLosses++;
          $("#results").html(playerOneName + " wins!");
        }
        else if ((playerOneChoice === "Rock") && (playerTwoChoice === "Paper")) {
          playerOneLosses++;
          playerTwoWin++;
        }
        else if ((playerOneChoice === "Scissors") && (playerTwoChoice === "Rock")) {
          playerOneLosses++;
          playerTwoWin++;
        }
        else if ((playerOneChoice === "Scissors") && (playerTwoChoice === "Paper")) {
          playerOneWins++;
          playerTwoLosses++;
        }
        else if ((playerOneChoice === "Paper") && (playerTwoChoice === "Rock")) {
          playerOneWins++;
          playerTwoLosses++;
        }
        else if ((playerOneChoice === "Paper") && (playerTwoChoice === "Scissors")) {
          playerOneLosses++;
          playerTwoWin++;
        }
        else if (playerOneChoice === playerTwoChoice) {
          ties++;
        }
    }

  }







});