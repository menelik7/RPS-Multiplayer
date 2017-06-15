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
// var players = 0; var started = false; var moves = 0;


function startGame() {
  $('#start-status').text('Click Start to Begin!');
}

function changeState(snapshot) {
  var key = snapshot.key;
  var val = snapshot.val();

  // If player amount is 2, start game, else increase player amount
  if ( key == 'players' ) {
    if ( val > 1 ) startGame();

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
    if ( state.val().players < 2 ) 
      db.update({
        player1: {
          name: name,
          wins: 0,
          losses: 0,
          ties: 0
        }


      });
    else db.update({
        player2: {
          name: name,
          wins: 0,
          losses: 0,
          ties: 0
        }
    });
  });
}


function init() {
  db.onDisconnect({
    players: 0,
    user1_name: 0
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