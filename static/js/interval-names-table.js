//Code to map note intervals to the english music theory names
//MM, DGM, AR, ST for COS 333 Spring 2014


//Summon Satan


//For mapping the numbers to vexflow notation
var pitchClassNames = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];


function intervalClassName(level)
{
    switch(level)
    {
        case 1:
            return "unisons, octaves.";
            break;
        case 2:
            return "fourths, fifths";
            break;
        case 3:
            return "unisons, perfect fourths, perfect fifths, octaves";
            break;
        case 4:
            return "minor seconds, major seconds";
            break;
        case 5:
            return "major seconds, minor thirds";
            break;
        case 6:
            return "minor thirds, major thirds";
            break;
        case 7:
            return "major seconds, minor thirds, major thirds";
            break;
        case 8:
            return "review of tests 1 through 7.";
            break;           
        case 9:
            return "major thirds, perfect fourths";
            break;
        case 10:
            return "tritones";
            break;
        case 11:
            return "perfect fourths, tritones";
            break;
        case 12:
            return "tritones, perfect fifths";
            break;
        case 13:
            return "perfect fourths, tritones, perfect fifths";
            break;
        case 14:
            return "review of tests 1 through 13";
            break;
        case 15:
            return "perfect fifths, minor sixths";
            break;
        case 16:
            return "minor sixths, major sixths";
            break;
        case 17:
            return "perfect fifths, minor sixths, major sixths";
            break;
        case 18:
            return "review of tests 1 through 17";
            break;  
        case 19:
            return "minor sevenths";
            break; 
        case 20:
            return "major sixths, minor sevenths";
            break; 
        case 21:
            return "major sevenths";
            break;
        case 22:
            return "minor sevenths, major sevenths";
            break;
        case 23:
            return "major sixths, minor sevenths, major sevenths";
            break;
        case 24:
            return "review of tests 1 through 23";
            break;  
        case 25:
            return "final test";
            break;          
    }
}

function melodyClassName(level)
{
    switch(level)
    {
        case 1:
            return "three notes";
            break;
        case 2:
            return "four notes";
            break;
        case 3:
            return "five notes";
            break;
        case 4:
            return "six notes";
            break;
        case 5:
            return "seven notes";
            break;
        case 6:
            return "eight notes";
            break;
    }
}

function showIntervalName(){
    var promptField = document.getElementById(prompt);
    
    var interval = correctInterval;
    var base = interval[0];
    var top = interval[2];
    var tonediff = Math.abs(top - base);
    
    var base_offset = interval[1];
    var top_offset = interval[3];

    var base_written = base + base_offset;
    var top_written = top + top_offset;
    
    var string ="";
    switch(tonediff)
    {
        case 0:
            string = "perfect unison";
            if (top_written - base_written == 2)
                string = "diminished second";
            break;
        case 1:
            string = "minor second";
            if (top_written - base_written == 0)
                string = "augmented unison";
            if (top_written - base_written == 3)
                string ="doubly diminished third";
            break;
        case 2:
            string = "major second";
            if (top_written - base_written == 3)
                string = "diminished third";
            if (top_written - base_written == 0)
                string ="doubly augmented unison";
            break;
        case 3:
            string = "minor third";
            if (top_written - base_written == 2)
                string = "augmented second";
            if (top_written - base_written == 5)
                string ="doubly diminished fourth";
            break;
        case 4:
            string = "major third";
            if (top_written - base_written == 5)
                string = "diminshed fourth";
            if (top_written - base_written == 2)
                string ="doubly augmented second";
            break;
        case 5:
            string = "perfect fourth";
            if (top_written - base_written == 4)
                string ="augmented third";
            if (top_written - base_written == 7)
                string ="doubly diminished fifth";

            break;
        case 6:
            if (Math.random() < 0.5) {
                string = "tritone";
                break;
            }
            else
            {
                string = "augmented fourth";
                if (top_written - base_written == 7)
                    string = "diminished fifth";
                if (top_written - base_written == 4 || top_written - base_written == 3)
                    string = "doubly augmented third";

                break;
            }
        case 7:
            string = "perfect fifth";
            if (top_written - base_written == 9)
                string ="diminished sixth";
            if (top_written - base_written == 5)
                string = "doubly augmented fourth";
            break;
        case 8:
            string = "minor sixth";
            if (top_written - base_written == 7)
                string ="augmented fifth";
            if (top_written - base_written == 11)
                string ="doubly diminished seventh";
            if (top_written - base_written == 5)
                string = "doubly augmented fourth";
            break;
        case 9:
            string = "major sixth";
            if (top_written - base_written == 10)
                string ="diminished seventh";
            if (top_written - base_written == 7)
                string = "doubly augmented fifth";
            break;
        case 10:
            string = "minor seventh";
            if (top_written - base_written == 9)
                string ="augmented sixth";
            if (top_written - base_written == 12)
                string = "doubly diminished octave";
            break;
        case 11:
            string = "major seventh";
            if (top_written - base_written == 12 || top_written - base_written == 13)
                string ="diminshed octave";
            if (top_written - base_written == 9)
                string = "doubly augmented sixth";
            break;
        case 12:
            string = "octave";
            if (top_written - base_written == 11)
                string ="augmented seventh";
            if (top_written - base_written == 13)
                string = "diminished ninth";
            break;
        default:
            string = tonediff;

        //diminished octave, major 7, octave, major 6
            
    }
    promptField.innerHTML = "Pick the ".concat(string);
}