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

    var db = firebase.database().ref('game');
    var db2 = firebase.database().ref('/game/player2');
    
    
    $("#score1").hide();
    $("#player1-options").hide();
    $("#score2").hide();
    $("#player2-options").hide();
    $("#login").show();




function startGame() {
  $('#start-status').text('Click Start to Begin!');
}

function changeState(snapshot) {
  var key = snapshot.key;
  var val = snapshot.val();

  // If player amount is 2, start game, else increase player amount
  if ( key == 'players' ) {
      if ( val > 1 ) {
          startGame();
          console.log("I am 2!!");
          db.once("child_added", function(snapshot) {
              $("#player1-name").html(snapshot.val().player1_name);
              $("#player1-wins").html("Wins: " + snapshot.val().player1_wins);
              $("#player1-losses").html("Losses: " + snapshot.val().player1_losses);
              $("#ties1").html("Ties: " + snapshot.val().player1_ties);
              $("#score1").show();
              $("#player1-options").show();
          });
      }
      $('#player-amount').text(val);    
  }

  if ( key == 'started' ) {
    if ( val )
      $('#start-status').text('Game Started');
  }
}

function savePlayerName() {
  var name = $('#name-input').val();

  db.once('value')
  .then(function(state) {
    if ( state.val().players < 2 ) {
      db.update({
        player1: {
          player1_name: name,
          player1_wins: 0,
          player1_losses: 0,
          player1_ties: 0
        }
      });

      db.once("child_added", function(snapshot) {
        console.log(name);
          $("#player1-name").html(snapshot.val().player1_name);
          $("#player1-wins").html("Wins: " + snapshot.val().player1_wins);
          $("#player1-losses").html("Losses: " + snapshot.val().player1_losses);
          $("#ties1").html("Ties: " + snapshot.val().player1_ties);
          $("#login").hide();
          $("#score1").show();
          $("#player1-options").show();
          $("#credentials").html("Hello <strong>" + snapshot.val().player1_name + "</strong>! You are player #1.  Waiting for player #2 to join...");

      });
    }
    else {
      db.update({
        player2: {
          player2_name: name,
          player2_wins: 0,
          player2_losses: 0,
          player2_ties: 0
        }
      });


      db2.on("value", function(snapshot) {
          // Change the HTML to reflect
           var name = $('#name-input').val();
           console.log(name);
          $("#player2-name").html(snapshot.val().player2_name);
          $("#player2-wins").html("Wins: " + snapshot.val().player2_wins);
          $("#player2-losses").html("Losses: " + snapshot.val().player2_losses);
          $("#ties2").html("Ties: " + snapshot.val().player2_ties);
          $("#login").hide();
          $("#score2").show();
          $("#player2-options").show();
          $("#credentials").html("Hello <strong>" + snapshot.val().player2_name + "</strong>! You are player #2.  Waiting for player #1 to make a choice...");

      });
    }
  });
}


function init() {
  db.onDisconnect().set({
  players: 0,
});
  db.once('value')
  .then(function(game) {
    var state = game.val();
    var player_amount = state.players;

    if ( player_amount === 2 ) {
      $('#results').text('Game currently in progress - PLease come back a little later');
      $('#max-amount').hide();
      $('#name-input').hide();
      $('#btnLogin').hide();
    } else {
      player_amount++;
      db.update({ players: player_amount });
    }
  });

  $('#btnLogin').on('click', savePlayerName);

  

  db.on('child_changed', changeState);
}

init();

});