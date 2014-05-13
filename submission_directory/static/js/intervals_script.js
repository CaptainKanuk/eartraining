function progress(){
answerChosen = false;
var button = document.getElementById("start");
if (button.innerHTML=="Let's start.")
{
  button.innerHTML="Next Interval";
  var interval_button = document.getElementById("interval-play");
  interval_button.setAttribute("onclick","playInterval(correctInterval[0], correctInterval[2], 2, 30);");
  interval_button.setAttribute("class", "btn btn-lg btn-default");
  interval_button.innerHTML = "Play interval.";
  $("canvas").slideToggle("slow");

  getLevel();
  setTimeout(function(){document.getElementById("page-title").innerHTML = 'Intervals: Level '.concat(curIntLvl.toString());},100);
  setTimeout(function(){ getNewIntervals(0,newIntervalFromTest(0,curIntLvl)); /*playInterval(correctInterval[0], correctInterval[2], 2, 30);*/}, 100);

  //alert(max_level);
}
else
{
    document.getElementById("interval-play").setAttribute("display", "initial");
    $("canvas").slideDown("slow", function () {
        document.getElementById(prompt).innerHTML = "Next interval.";
      });

  $("canvas").slideDown("slow");
  getLevel();
  setTimeout(function(){getNewIntervals(0,newIntervalFromTest(0,curIntLvl));/*playInterval(correctInterval[0], correctInterval[2], 2, 30);*/}, 100);
  //alert(max_level);

}
}