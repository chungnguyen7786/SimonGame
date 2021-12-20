let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const playSound = (name) => {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};
const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setInterval(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const gameOver = () => {
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
};

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $(`#${randomChosenColor}`).fadeOut(50).fadeIn();
  playSound(randomChosenColor);
};

const checkAnswer = (indexOfAnswer) => {
  if (gamePattern[indexOfAnswer] !== userClickedPattern[indexOfAnswer]) {
    gameOver();
  } else {
    if (indexOfAnswer === level - 1) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
};

$(document).keydown(() => {
  if (!started) {
    $("#level-title").text(`Level ${level}`); //level 0
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (event) {
  // let userChosenColor = event.target.id;
  let userChosenColor = $(this).attr("id");
  if (started) {
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    let indexOfLastAnswer = userClickedPattern.length - 1;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(indexOfLastAnswer);
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 100);
  }
});
