// Pre-load images to call from container once altogether
var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    "/images/F.png",
    "/images/C.png",
    "/images/G.png",
    "/images/D.png",
    "/images/A.png",
    "/images/E.png",
    "/images/B7.png",
    "/images/G7.png",
    "/images/D7.png",
    "/images/A7.png"
)

"use strict"

const totalNumberOfQuestions = 10;
const delayAfterCorrectAnswer_mS = 800;

const question1 = { id:1, image:"/images/F.png", button1:"G7", button2:"F", button3:"D", correctanswer:"button2" }
const question2 = { id:2, image:"/images/C.png", button1:"A", button2:"D", button3:"C", correctanswer:"button3" }
const question3 = { id:3, image:"/images/G.png", button1:"G", button2:"B7", button3:"C", correctanswer:"button1" }
const question4 = { id:4, image:"/images/D.png", button1:"D", button2:"C7", button3:"E", correctanswer:"button1" }
const question5 = { id:5, image:"/images/A.png", button1:"B7", button2:"A", button3:"E", correctanswer:"button2" }
const question6 = { id:6, image:"/images/E.png", button1:"F", button2:"E", button3:"D", correctanswer:"button2" }
const question7 = { id:7, image:"/images/B7.png", button1:"A7", button2:"G", button3:"B7", correctanswer:"button3" }
const question8 = { id:8, image:"/images/G7.png", button1:"C", button2:"G7", button3:"F", correctanswer:"button2" }
const question9 = { id:9, image:"/images/D7.png", button1:"D7", button2:"E", button3:"D", correctanswer:"button1" }
const question10 = { id:10, image:"/images/A7.png", button1:"C", button2:"A", button3:"A7", correctanswer:"button3" }

const questions = new Array(question1, question2, question3, question4, question5, question6, question7, question8, question9, question10)

const defaultButtonColour = $("#button1").css("background-color");

var score = 0;
var currentquesitionId = 0;
var retries = 0;

ShowQuestion();

$( "button, input" ).on( "click", function( event ) {
  event.preventDefault();
  if (this.id == "welldonebutton") 
  {
    // Reset clicked
    console.log("Well Done Button Clicked");
    ShowQuestionDivsAndReset();
  }
  else if (this.id == questions[currentquesitionId].correctanswer)
  {
    score++;
    currentquesitionId++;
    if (currentquesitionId < totalNumberOfQuestions)
    {
        // Correct answer clicked
        $(".ui-button").prop('disabled', true);
        $("#" + this.id).css("background-color","green");
        setTimeout(() => { ShowQuestion(); }, delayAfterCorrectAnswer_mS);
    } 
    else
    {
        // Quiz ended
        ShowResultDivs();
    }
  }
  else 
  {
    // Wrong answer clicked
    retries++;
    $("#message").html("Try another one:");
    $("#retries").html("retries " + retries);
    $("#" + this.id).css("background-color","red");
  }
} );

function ShowQuestion() 
{
    $(".welldonebuttonrow").hide();
    $("#message").html("Choose either:");
    PopulateScore();
    $("#chordImage").attr("src",images[currentquesitionId].src);
    $("#button1").attr("value",questions[currentquesitionId].button1);
    $("#button1").css("background-color",defaultButtonColour);
    $("#button2").attr("value",questions[currentquesitionId].button2);
    $("#button2").css("background-color",defaultButtonColour);
    $("#button3").attr("value",questions[currentquesitionId].button3);
    $("#button3").css("background-color",defaultButtonColour);
    $("#retries").html("retries " + retries);
    $(".ui-button").prop('disabled', false);
}

function ShowResultDivs()
{
  PopulateScore();
  console.log("Hiding divs");
  $(".chordrow").hide();
  $(".buttonrow").hide();
  $(".welldonebuttonrow").show();
  $(".welldonebuttonrow #welldonebutton").css("background-color","green");
  $(".welldonebuttonrow #welldonebutton").css("color","white");
  $(".ui-button").prop('disabled', false);
}

function ShowQuestionDivsAndReset()
{
    retries = 0;
    score = 0;
    currentquesitionId = 0;
    $(".welldonebuttonrow").hide();
    $(".chordrow").show();
    $(".buttonrow").show();
    ShowQuestion();
}

function PopulateScore()
{
  if (score == 0)
    {
      $("#score").html(" Ready to Start ");
    }
    else
    {
      $("#score").html(score + " / 10");
    }
}

// Ideas for testing
// console.log("currentquesitionId = " + currentquesitionId);
// alert(this.id);