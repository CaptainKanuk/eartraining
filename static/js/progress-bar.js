//Code to display progress bar in browser canvases.
//MM, DGM, AR, ST for COS 333 Spring 2014

var labels = ["choice_one", "choice_two", "choice_three", "choice_four"];
var prompt = "prompt";
var p_bar_label = "progress-bar";

//Summon Satan

var defaultColor = "#000000";
var correctColor = "#439400";
var incorrectColor = "#94002D";

//=================VARIABLES FOR PROGRESS IN THE GAME===================
var quiz_progress = 0;//expressed as percent completion (1-100)
var HP = 0;//Number of chances to get it wrong
var numberOfQuestionsInModule = 10;//default to 10 questions, need this for progress

//Invoked on correct answer.
//Update the progress bar.
function answeredCorrectly(){
    updateProgress();
}

//Invoked on incorrect answer.
//Update the progress bar and lose HP
function answeredIncorrectly(){
    updateProgress();
    loseHP(1);
}

//update the progress variable and the progress bar
function updateProgress(){
    quiz_progress = quiz_progress + (100/numberOfQuestionsInModule);
    document.getElementById(p_bar_label).style.width= (quiz_progress) +'%';

}

function loseHP(amount){
    HP = HP - amount;
    alert("You have "+HP+" HP left.");
}