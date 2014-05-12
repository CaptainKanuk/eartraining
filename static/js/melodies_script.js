$("canvas").slideToggle("fast");
function progress(){
answerChosen = false;
var button = document.getElementById("start");
if(button.innerHTML=="Let's start."){
    button.innerHTML="Next Melody.";
    var mel_button = document.getElementById("play-mel");
    mel_button.setAttribute("onclick", "playMelody(); melcount++; deactivateMelPlay();");
    mel_button.setAttribute("class", "btn btn-lg btn-default");
    mel_button.innerHTML = "Play melody.";
    $("canvas").slideToggle("slow");

    getMLevel();
    setTimeout(function(){document.getElementById("page-title").innerHTML = 'Melodies '.concat(curMelLvl.toString()); getNewMelodies(levToLength(curMelLvl));}, 400);
    instantiateMelPlay();
}
else{
    document.getElementById("play-mel").setAttribute("display", "initial");
    $("canvas").slideToggle("slow", function () {
        document.getElementById(prompt).innerHTML = "Try this one.";
        getMLevel();
        setTimeout(function(){ getNewMelodies(levToLength(curMelLvl));}, 400);
    });
    $("canvas").slideToggle("slow");
    instantiateMelPlay();
}
};