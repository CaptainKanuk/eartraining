//Code to map note intervals to the english music theory names
//MM, DGM, AR, ST for COS 333 Spring 2014


//Summon Satan


//For mapping the numbers to vexflow notation
var scaleNoteNames = [["b#","c"], ["c#", "db"], ["d"], ["d#","eb"], ["e","fb"], ["e#","f"], ["f#","gb"], ["g"], ["g#","ab"], ["a"], ["a#", "bb"], ["b", "cb"]];


function showIntervalName(){
    var promptField = document.getElementById(prompt);
    
    var base = correctInterval[0];
    var top = correctInterval[2];
    var tonediff = top - base;
    
    //don't need, maybe
    var baser = correctInterval[1];
    var topr = correctInterval[3];
    
    /*var scaleNoteNames = [["b#","c"], ["c#", "db"], ["d"], ["d#","eb"], ["e","fb"], ["e#","f"], ["f#","gb"], ["g"], ["g#","ab"], ["a"], ["a#", "bb"], ["b", "cb"]];
    
    c - c#
    d - d#
    e - e#
    f - f#
    g - g#
    a - a#
    b - b#*/
    
    /*var string ="";
    switch(tonediff)
    {
        case 0:
            string = "perfect unison";
            if (baser != topr)
                string = "diminished second";
            break;
        case 1:
            string = "minor second";
            if (base == top)
                string == "augmented unison";
            if (top-base == 2)
                string = "minor second";
            break;
        case 2:
            string = "minor second";
            break;
        case 3:
            string = "minor second";
            break;
        case 4:
            string = "minor second";
            break;
        case 5:
            string = "minor second";
            break;
        case 6:
            string = "minor second";
            break;
        case 7:
            string = "minor second";
            break;
        case 8:
            string = "minor second";
            break;
        case 9:
            string = "minor second";
            break;
        case 10:
            string = "minor second";
            break;
        case 11:
            string = "minor second";
            break;
        case 12:
            string = "minor second";
            break;
        default:
            string = tonediff;
            
    }*/
    promptField.innerHTML = "Pick the ".concat(tonediff);
}