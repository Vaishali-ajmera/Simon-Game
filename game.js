const buttonColors = ["red", "blue", "green" , "yellow"];

let userClickedPattern = [];
let gamePattern = [];

let started = false;
let level = 0;


$(document).keypress(() => {
    if (!started) {
      $("#level-title").text(`Level ${level}`);
      nextSequence();
      started = true;
    }
  }); 

//check which button is pressed
$('div[type = "button"]').on('click', handler);

//handler function define
function handler(e){
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //sending last index
    checkAnswer(userClickedPattern.length-1);


}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(nextSequence, 1000);

      }
    }
    
    else {
      // console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      $('#level-title').text("Game Over, Press Any Key to Restart");
      setTimeout(() => {
        $("body").removeClass("game-over");
        
      }, 200);

      startOver();

    }

}

function nextSequence(){
  userClickedPattern = []; 
  level++;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  
  //Adding visual effect 
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  //playing sound  
  playSound(randomChosenColor);
  

}


//playSound function
function playSound(name){

    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
   
}

//animatePress function
function animatePress(currentColour){
   $(`#${currentColour}`).addClass("pressed");
   setTimeout(() => {
       $(`#${currentColour}`).removeClass("pressed"); 
   },100);
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;

}


 





