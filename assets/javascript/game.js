                                  //Copyright 2017 Menelik Tefera//
                                  //Georgia Tech Coding Bootcamp//
                                        //Week 7 assignment//

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

    $("#score1").hide();
    $("#player1-options").hide();
    $("#score2").hide();
    $("#player2-options").hide();
    $("#login").show();

    database.ref().on("value", function(snapshot) {
          // Change the HTML to reflect
          $("#player1-name").html(snapshot.val().players.player1.name);
          $("#player1-wins").html("Wins: " + snapshot.val().players.player1.wins);
          $("#player1-losses").html("Losses: " + snapshot.val().players.player1.losses);
          $("#ties1").html("Ties: " + snapshot.val().players.player1.ties);
          $("#score1").show();
          $("#player1-options").show();


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  $("#btnLogin").on("click", function(event) {
    // prevent form from trying to submit/refresh the page
    event.preventDefault();

    // Capture User Inputs and store them into variables
    name = $("#name-input").val().trim(); //getting value and triming off extra space.

    //Clear the input box once name has been submitted
    $("#name-input").val("");

    database.ref().set({

      players: {

        player1: {
          name: name,
          wins: 0,
          losses: 0,
          ties: 0
        },
      }

    });

    database.ref().on("value", function(snapshot) {
          // Change the HTML to reflect
          $("#player1-name").html(snapshot.val().players.player1.name);
          $("#player1-wins").html("Wins: " + snapshot.val().players.player1.wins);
          $("#player1-losses").html("Losses: " + snapshot.val().players.player1.losses);
          $("#ties1").html("Ties: " + snapshot.val().players.player1.ties);
          $("#login").hide();
          $("#score1").show();
          $("#player1-options").show();
          $("#credentials").html("Hello <strong>" + name + "</strong>! You are player #1.  Waiting for player #2 to join...");


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
  });


});




    