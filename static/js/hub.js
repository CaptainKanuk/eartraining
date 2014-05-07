
//SHOULD BE LOADED FROM DATABASE AS MAX LEVEL
var currentMelodyLevel = 1;
//SHOULD ALSO BE LOADED FROM DATABASE
var maxMelodyLevel = 20;

//SHOULD BE LOADED FROM DATABASE AS MAX LEVEL
var currentIntervalLevel = 1;
//SHOULD ALSO BE LOADED FROM DATABASE
var maxIntervalLevel = 20;



function decreaseCurMelLvl()
{
    if(currentMelodyLevel > 1){
        currentMelodyLevel = currentMelodyLevel - 1;
        //update the counter
        document.getElementById("curMelLvl").innerHTML=currentMelodyLevel.toString();
    }
}

function increaseCurMelLvl(max)
{
    if(currentMelodyLevel < maxMelodyLevel && currentMelodyLevel < max){
        currentMelodyLevel = currentMelodyLevel + 1;
        //update the counter
        document.getElementById("curMelLvl").innerHTML=currentMelodyLevel.toString();
    }
}

function decreaseCurIntLvl()
{
    if(currentIntervalLevel > 1){
        currentIntervalLevel = currentIntervalLevel - 1;
        //update the counter
        document.getElementById("curIntLvl").innerHTML=currentIntervalLevel.toString();
    }
}

function increaseCurIntLvl(max)
{
    if(currentIntervalLevel < maxIntervalLevel && currentIntervalLevel < max){
        currentIntervalLevel = currentIntervalLevel + 1;
        //update the counter
        document.getElementById("curIntLvl").innerHTML=currentIntervalLevel.toString();
    }
}