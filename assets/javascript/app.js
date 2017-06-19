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
            var db = firebase.database().ref('game');
            var db1 = firebase.database().ref('game/player1');
            var db2 = firebase.database().ref('game/player2');
            var player1_name = "";
            var player2_name = "";
            var playerOneChoice = "";
            var playerTwoChoice = "";

            
            
            $("#score1").hide();
            $("#player1-options").hide();
            $("#score2").hide();
            $("#player2-options").hide();
            $("#login").show();


//function startGame() {
        //$('#start-status').text('Click Start to Begin!');
//}

function changeState(snapshot) {
        var key = snapshot.key;
        var val = snapshot.val();

      // If player amount is 2, start game, else increase player amount
      if ( key == 'players' ) {
            if ( val > 1 ) {
                  //startGame();
                  console.log("I am 2!!");
                  db1.on("value", function(snapshot) {
                        $("#player1-name").html(snapshot.val().player1_name);
                        $("#player1-wins").html("Wins: " + snapshot.val().player1_wins);
                        $("#player1-losses").html("Losses: " + snapshot.val().player1_losses);
                        $("#ties1").html("Ties: " + snapshot.val().player1_ties);
                        $("#score1").show();
                        $("#player1-options").show();
                  });
                  db2.on("value", function(snapshot) {
                        // Change the HTML to reflect
                        $("#player2-name").html(snapshot.val().player2_name);
                        $("#player2-wins").html("Wins: " + snapshot.val().player2_wins);
                        $("#player2-losses").html("Losses: " + snapshot.val().player2_losses);
                        $("#ties2").html("Ties: " + snapshot.val().player2_ties);
                        $("#login").hide();
                        $("#score2").show();
                        $("#player2-options").show();
                  });
            }
            $('#player-amount').text(val);    
      };

      if ( key == 'started' ) {
            if ( val )
              $('#start-status').text('Game Started');
      };
};

function savePlayerName() {
      db.once('value')
      .then(function(state) {
            if ( state.val().players < 2 ) {
                  player1_name = $('#name-input').val();//Grab name string
                  db.update({
                        player1: {
                          player1_name: player1_name,
                          player1_wins: 0,
                          player1_losses: 0,
                          player1_ties: 0
                        }
                  });

                  db1.on("value", function(snapshot) {
                        console.log(player1_name);
                        $("#player1-name").html(snapshot.val().player1_name);
                        $("#player1-wins").html("Wins: " + snapshot.val().player1_wins);
                        $("#player1-losses").html("Losses: " + snapshot.val().player1_losses);
                        $("#ties1").html("Ties: " + snapshot.val().player1_ties);
                        $("#login").hide();
                        $("#score1").show();
                        $("#player1-options").show();
                        $("#credentials").html("Hello <strong>" + snapshot.val().player1_name + "</strong>! You are player 1.<br>  Waiting for player 2 to join.");

                  db.on("child_changed", function(snapshot) {
                        $("#credentials").html("Hello <strong>" + player1_name + "</strong>! You are player 1.<br>  It's your turn.");
                        });
                  });
            }
          else {
                player2_name = $('#name-input').val();//Grab name string
                db.update({
                      player2: {
                        player2_name: player2_name,
                        player2_wins: 0,
                        player2_losses: 0,
                        player2_ties: 0
                      }
                });
                db2.on("value", function(snapshot) {
                      // Change the HTML to reflect
                       
                      $("#player2-name").html(snapshot.val().player2_name);
                      $("#player2-wins").html("Wins: " + snapshot.val().player2_wins);
                      $("#player2-losses").html("Losses: " + snapshot.val().player2_losses);
                      $("#ties2").html("Ties: " + snapshot.val().player2_ties);
                      $("#login").hide();
                      $("#score2").show();
                      $("#player2-options").show();
                      $("#credentials").html("Hello <strong>" + snapshot.val().player2_name + "</strong>! You are player 2.<br>  Waiting for ");

                      player1_name = database.ref("game/player1/player1_name");//reference the folder for player1_name
                      player1_name.on('value', function(snapshot){
                            console.log(snapshot.val())
                            $("#credentials").append("<strong>" + snapshot.val() + "</strong> to make a move.");
                      });
                });
          };
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

// If the user clicks "rock" or "paper" or "scissors", run the game logic.
function whoWon(){
      $("#rock1").on('click', function(){
            var playerOneChoice = "Rock";
            $("#player1-options").html("<strong>" + playerOneChoice + "</strong>");
      })
      $("#paper1").on('click', function(){
            var playerOneChoice = "Paper";
            $("#player1-options").html("<strong>" + playerOneChoice + "</strong>");
      })
      $("#scissors1").on('click', function(){
            var playerOneChoice = "Scissors";
            $("#player1-options").html("<strong>" + playerOneChoice + "</strong>");
      })


      $("#rock2").on('click', function(){
            var playerTwoChoice = "Rock";
            $("#player2-options").html("<strong>" + playerTwoChoice + "</strong>");
      })
      $("#paper2").on('click', function(){
            var playerTwoChoice = "Paper";
            $("#player2-options").html("<strong>" + playerTwoChoice + "</strong>");
      })
      $("#scissors2").on('click', function(){
            var playerTwoChoice = "Scissors";
            $("#player2-options").html("<strong>" + playerTwoChoice + "</strong>");
      })

      if ((playerOneChoice === "Rock") || (playerOneChoice === "Paper") || (playerOneChoice === "Scissors")) {

            // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
            if ((playerOneChoice === "Rock") && (playerTwoChoice === "Scissors")) {
              player1_wins++;
              player2_losses++;
              $("#results").html(playerOneName + " wins!");
            }
            else if ((playerOneChoice === "Rock") && (playerTwoChoice === "Paper")) {
              player1_losses++;
              player2_win++;
            }
            else if ((playerOneChoice === "Scissors") && (playerTwoChoice === "Rock")) {
              player1_losses++;
              player2_win++;
            }
            else if ((playerOneChoice === "Scissors") && (playerTwoChoice === "Paper")) {
              player1_wins++;
              player2_losses++;
            }
            else if ((playerOneChoice === "Paper") && (playerTwoChoice === "Rock")) {
              player1_wins++;
              player2_losses++;
            }
            else if ((playerOneChoice === "Paper") && (playerTwoChoice === "Scissors")) {
              player1_losses++;
              player2_win++;
            }
            else if (playerOneChoice === playerTwoChoice) {
              ties++;
            }
      }

}

whoWon();
init();

});