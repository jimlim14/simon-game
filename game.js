var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var level = 0;
var started = false;

var localStorageName = "crackalien";
var bestScore;

$(document).on("keydown", function(event) {
  if (!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    if (gamePattern.length === userClickedPattern.length)
    {
      setTimeout (function (){
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }
  else
  {
    var wrong = new Audio ("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
