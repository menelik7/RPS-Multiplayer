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
  var playerTwoName = "";
  var playerOneChoice = "";
  var playerTwoChoice = "";
  var playerOneWins = 0;
  var playerTwoWins = 0;
  var playerOneLosses = 0;
  var playerTwoLosses = 0;
  var ties = 0;

  $("#add-name").on("click", function(event) {
      // prevent form from trying to submit/refresh the page
      event.preventDefault();

      // Capture User Inputs and store them into variables
      var name = $("#name-input").val().trim(); //getting value and triming off extra space.
      var email = $("#email-input").val().trim();
      var age = $("#age-input").val().trim();
      var comment = $("#comment-input").val().trim();

      // Console log each of the user inputs to confirm we are receiving them
      console.log(name);
      console.log(email);
      console.log(age);
      console.log(comment);

      // Output all of the new information into the relevant HTML sections
      $("#name-display").html(name);
      $("#email-display").html(email);
      $("#age-display").html(age);
      $("#comment-display").html(comment);

    });

  // When a player makes a choice by clicking on one of the choices, it will run the following function...
  $("#xxx").on("click", function(event) {
    
    // If the user presses "r" or "p" or "s", run the game logic.
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
  });








});