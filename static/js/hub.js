
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

function increaseCurMelLvl()
{
    if(currentMelodyLevel < maxMelodyLevel){
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

function increaseCurIntLvl()
{
    if(currentIntervalLevel < maxIntervalLevel){
        currentIntervalLevel = currentIntervalLevel + 1;
        //update the counter
        document.getElementById("curIntLvl").innerHTML=currentIntervalLevel.toString();
    }
}

function submitIntInfo() {
    Dajaxice.database.sendIntLvl(intcurlevel_callback, {'text':'{{user.username}}', 'curIntLvl': currentIntervalLevel});
    //Dajaxice.database.sendIntLvl(intcurlevel_callback, {'text':'{{user.username}}'}, currentIntervalLevel);
}

function submitMelInfo() {
    Dajaxice.database.sendMelLvl(melcurlevel_callback, {'text':'{{user.username}}', 'curMelLvl': currentMelodyLevel});
    //Dajaxice.database.sendMelLvl(melcurlevel_callback, {'text':'{{user.username}}'}, currentMelodyLevel);
}