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
  var computerChoices = ["r", "p", "s"];

  // Variables for tracking our wins, losses and ties. They begin at 0.
  var wins = 0;
  var losses = 0;
  var ties = 0;

  // When the user presses a key, it will run the following function...
  document.onkeyup = function(event) {

    // Determine which key was pressed
    var userGuess = event.key;

    // Sets the computerGuess variable equal to a random choice from the computerChoice array.
    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    // If the user presses "r" or "p" or "s", run the game logic.
    if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

        // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
        if ((userGuess === "r") && (computerGuess === "s")) {
          wins++;
        }
        else if ((userGuess === "r") && (computerGuess === "p")) {
          losses++;
        }
        else if ((userGuess === "s") && (computerGuess === "r")) {
          losses++;
        }
        else if ((userGuess === "s") && (computerGuess === "p")) {
          wins++;
        }
        else if ((userGuess === "p") && (computerGuess === "r")) {
          wins++;
        }
        else if ((userGuess === "p") && (computerGuess === "s")) {
          losses++;
        }
        else if (userGuess === computerGuess) {
          ties++;
        }
    }
  };








});