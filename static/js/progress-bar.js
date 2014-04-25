//Code to display progress bar in browser canvases.
//MM, DGM, AR, ST for COS 333 Spring 2014

var labels = ["choice_one", "choice_two", "choice_three", "choice_four"];
var prompt = "prompt";
var p_bar_label = "progress-bar";

//Summon Satan

var defaultColor = "#000000";
var correctColor = "#439400";
var incorrectColor = "#94002D";

//=================VARIABLES FOR GAME DETAILS===================
var game_category = 0;
var category_level = 0;
var interval_test = 0;
var melody_test = 0;

//=================VARIABLES FOR PROGRESS IN THE GAME===================
var quiz_progress = 0;//expressed as percent completion (1-100)
var HP = 3;//Number of chances to get it wrong
var numberOfQuestionsInModule = 5;//default to 10 questions, need this for progress

//Invoked on correct answer.
//Update the progress bar.
function answeredCorrectly(){
    updateProgress();
}

//Invoked on incorrect answer.
//Update the progress bar and lose HP
function answeredIncorrectly(){
	loseHP(1);
    updateProgress();
}

//update the progress variable and the progress bar
function updateProgress(){
	alert(HP);
    quiz_progress = 1+ quiz_progress + (100/numberOfQuestionsInModule);
    if (quiz_progress >= 100 && HP != 0) {
    	document.getElementById("start").setAttribute("href","/game_win");
    	document.getElementById("start").innerHTML = "You passed! Get results.";
    	if (melody_test == 1)
    	{
    		document.getElementById("about_win").innerHTML = "You passed the melody quiz.";
    		melody_test = 0;
    	}
    	if (interval_test == 1)
    	{
    		document.getElementById("about_win").innerHTML = "You passed the interval quiz.";
    		interval_test = 0;
    	}
    }
    if (HP == 0) {
    	document.getElementById("start").setAttribute("href","/game_loss");
    	document.getElementById("start").innerHTML = "Bummer, man, you failed... Get results.";
    	if (melody_test == 1)
    	{
    		document.getElementById("about_loss").innerHTML = "You failed the melody quiz.";
    		melody_test = 0;
    	}
    	if (interval_test == 1)
    	{
    		document.getElementById("about_loss").innerHTML = "You failed the interval quiz.";
    		interval_test = 0;
    	}
    }
    document.getElementById(p_bar_label).style.width= (quiz_progress) +'%';

}

function loseHP(amount){
    HP = HP - amount;
    alert("You have "+HP+" HP left.");
}