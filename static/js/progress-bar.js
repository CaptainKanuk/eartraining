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
var in_interval_test = 0;
var in_melody_test = 0;

//=================VARIABLES FOR PROGRESS IN THE GAME===================
var quiz_progress = 0;//expressed as percent completion (1-100)
var HP = 3;//Number of chances to get it wrong
var numberOfQuestionsInModule = 3;//default to 10 questions, need this for progress

//=================VARIABLES FOR PROGRESS IN WEBSITE===================
//DATABASE: get test number from current test number chosed out of available tests for specific user
 //DATABASE: get current test set number (1 or 2) from user database

//Invoked on correct answer.
//Update the progress bar.
function answeredCorrectlyInt(){
    updateProgressIntervals();
}

function answeredCorrectlyMel(){
    updateProgressMelodies();
}

//Invoked on incorrect answer.
//Update the progress bar and lose HP
function answeredIncorrectlyInt(){
	loseHP(1);
    updateProgressIntervals();
}

function answeredIncorrectlyMel(){
	loseHP(1);
    updateProgressMelodies();
}
<<<<<<< HEAD
function passButtonInt()
{
  document.getElementById("start").setAttribute("href", "/game_winInt");
  document.getElementById("start").innerHTML = "You passed! Continue.";
}
=======

>>>>>>> fdedc93d3b4a48792bb1822534682838b4a071fc

//update the progress variable and the progress bar
function updateProgressIntervals() {
    quiz_progress = 1+ quiz_progress + (100/numberOfQuestionsInModule);
    if (quiz_progress >= 100 && HP != 0) {
<<<<<<< HEAD
//    	document.getElementById("start").setAttribute("href", "/game_winInt");
//      //Dajaxice.database.intervalLvlUp(level_callback, {'text':'{{user.username}}'});
//      document.getElementById("start").setAttribute("onclick", "progress(); Dajaxice.database.intervalLvlUp(level_callback, {'text':'{{user.username}}'});");
//    	document.getElementById("start").innerHTML = "You passed! Continue.";
      setInterval(passButtonInt, 100);
=======
      document.getElementById("start").setAttribute("href", "/game_winInt");
      document.getElementById("start").innerHTML = "You passed! Continue.";
>>>>>>> fdedc93d3b4a48792bb1822534682838b4a071fc
    	if (test_num == 22){
    		test_num = 1; //USER_TEST_NUM = 1;
    		test_set = 2; //USER_TEST_SET = 2;
    	}
    	else {
    		test_num++;
        incLevel();

      }

    }
    if (HP == 0) {
    	document.getElementById("start").setAttribute("href","/game_lossInt");
    	document.getElementById("start").innerHTML = "Bummer, man, you failed... Get results.";
    }
    document.getElementById(p_bar_label).style.width= (quiz_progress) +'%';

}

//update the progress variable and the progress bar
function updateProgressMelodies() {
    quiz_progress = 1+ quiz_progress + (100/numberOfQuestionsInModule);
    if (quiz_progress >= 100 && HP != 0) {
    		test_num++;
        document.getElementById("start").setAttribute("href", "/game_winMel");
        document.getElementById("start").innerHTML = "You passed! Continue.";
        incMLevel();
    }
    if (HP == 0) {
    	document.getElementById("start").setAttribute("href","/game_lossMel");
    	document.getElementById("start").innerHTML = "Bummer, man, you failed... Get results.";

    }
    document.getElementById(p_bar_label).style.width= (quiz_progress) +'%';
    
}

function loseHP(amount){
    HP = HP - amount;
    //alert("You have "+HP+" HP left.");
}