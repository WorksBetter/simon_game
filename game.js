buttonColours = ["red", "blue", "green", "yellow"];
randomNumber = 0;
randomChosenColour = 0;
gamePattern = [];
userClickedPattern = [];
level = 0;
started = false;

$(document).on("keypress", function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true
  }
});

function nextSequence(){
  level++;

  userClickedPattern = [];

  $("#level-title").text("Level " + level.toString());

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$(".btn").on("click", function(){
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
  var gameSound = new Audio("sounds/" + name + ".mp3");
  gameSound.play();
}

function animatePress(currenColour){
  $("#" + currenColour).addClass("pressed");
  setTimeout(function() {
       $("#" + currenColour).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
           nextSequence();
       }, 1000);
    }
  }
  else{
    playSound("wrong");

    $('body').addClass("game-over");
    setTimeout(function() {
         $('body').removeClass("game-over");
     }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
  randomNumber = 0;
  randomChosenColour = 0;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
