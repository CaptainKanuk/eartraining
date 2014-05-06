//Code to display music staff in browser canvases.
//Uses Vexflow
//MM, DGM, AR, ST for COS 333 Spring 2014

var labels = ["choice_one", "choice_two", "choice_three", "choice_four"];
var prompt = "prompt";
var direction = 0;   //1 == up, -1 == down

//Summon Satan


//For mapping the numbers to vexflow notation
var pitchClassNames = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
var middleC = 60;//semitone starting point
var middleCHz = 261.625565;
var semitoneConstant = 1.05946;

var defaultColor = "#000000";
var correctColor = "#439400";
var incorrectColor = "#94002D";

var canvas1, canvas2, canvas3, canvas4;

var renderer1, renderer2, renderer3, renderer4;

var ctx1, ctx2, ctx3, ctx4;

var stave1, stave2, stave3, stave4;


var answerChosen = true;

function drawStaff(elem)
{
    if (elem == "choice_one")
    {
        canvas1 = document.getElementById("choice_one");
        renderer1 = new Vex.Flow.Renderer(canvas1,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx1 = renderer1.getContext();
        stave1 = new Vex.Flow.Stave(0, -10, 200);
        stave1.addClef("treble").setContext(ctx1).draw();
    }
    else if (elem == "choice_two")
    {
        canvas2 = document.getElementById("choice_two");
        renderer2 = new Vex.Flow.Renderer(canvas2,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx2 = renderer2.getContext();
        stave2 = new Vex.Flow.Stave(10, -10, 200);
        stave2.addClef("treble").setContext(ctx2).draw();
    }
    else if (elem == "choice_three")
    {
        canvas3 = document.getElementById("choice_three");
        renderer3 = new Vex.Flow.Renderer(canvas3,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx3 = renderer3.getContext();
        stave3 = new Vex.Flow.Stave(10, -10, 200);
        stave3.addClef("treble").setContext(ctx3).draw();
    }
    else if (elem == "choice_four")
    {
        canvas4 = document.getElementById("choice_four");;
        renderer4 = new Vex.Flow.Renderer(canvas4,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx4 = renderer4.getContext();
        stave4 = new Vex.Flow.Stave(10, -10, 200);
        stave4.addClef("treble").setContext(ctx4).draw();
    }
    
    
}

//takes a note and an index into the array of possible represetations
//trusts caller to not input representation out of range
function noteToString(note, offset)
{
    
    //Determine representation for note
    var writtenNote = note + offset;
    var octave = Math.floor(writtenNote / 12)-1;//60 (middleC) maps to octave 4
    var pitchClass = writtenNote % 12;

    //here's the base note
    var writtenNoteString  = pitchClassNames[pitchClass];
    
    //if offset is negative then just add sharps
    if(offset < 0){
        for(var i = 0; i < -offset; i++){
            writtenNoteString = writtenNoteString.concat("#");
        }
    }
    else if(offset > 0){
        if(writtenNoteString.length == 2){
            //start by stripping sharp
            writtenNoteString = writtenNoteString.charAt(0);
            for(var i = 0; i < (offset-1); i++){
                writtenNoteString = writtenNoteString.concat("b");
            }
        }
        else{//no starting sharp so just add that many flats
            for(var i = 0; i < offset; i++){
                writtenNoteString = writtenNoteString.concat("b");
            }
        }
    }
    
    //add octave string
    writtenNoteString = writtenNoteString.concat("/",octave);
    
    return writtenNoteString;
}

function showInterval(notes, elem)
{
    //print out the interval to the elem canvas
    
    var voice = new Vex.Flow.Voice({
                                   num_beats: 4,
                                   beat_value: 4,
                                   resolution: Vex.Flow.RESOLUTION
                                   });
    voice.addTickables(notes);
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 200);
    
    if (elem == "choice_one")
    {
        voice.draw(ctx1, stave1);
    }
    if (elem == "choice_two")
    {
        voice.draw(ctx2, stave2);
    }
    if (elem == "choice_three")
    {
        voice.draw(ctx3, stave3);
    }
    if (elem == "choice_four")
    {
        voice.draw(ctx4, stave4);
    }
}

function verify()
{
    alert("HELLO");
}

function clearCanvases(){
    ctx1.clearRect(0,0,250,120);
    ctx2.clearRect(0,0,250,120);
    ctx3.clearRect(0,0,250,120);
    ctx4.clearRect(0,0,250,120);
}

function drawStaves(){
    for(var i = 0; i < labels.length; i++){
        drawStaff(labels[i]);
    }
}

function setup(elem)
{
    drawStaff(elem); 
    showInterval(elem);
}

function getRandomInterval(){
    //Generate random interval
    var base = Math.floor(Math.random()*13.0)+60;
    var interval = Math.floor(Math.random()*13.0);
    var top = base + interval;
    var base_offset = Math.floor(Math.random()*2)-1;
    var top_offset = Math.floor(Math.random()*2)-1;
    return [base, base_offset, top, top_offset];
}

function getRandomIntervalNotX(displace){
    //Generate random interval
    var base = Math.floor(Math.random()*13.0)+60;
    var interval = Math.floor(Math.random()*13.0);
    while (interval == displace)
        interval = Math.floor(Math.random()*13.0);
    var top = base + interval;
    var base_offset = Math.floor(Math.random()*2)-1;
    var top_offset = Math.floor(Math.random()*2)-1;
    return [base, base_offset, top, top_offset];
}

function toInterval(disp){
    //Generate random interval
    var base = Math.floor(Math.random()*13.0)+60;
    var interval = disp;
    var top = base + interval;
    //var base_offset = Math.floor(Math.random()*2)-1;
    var base_offset = 0;
    var top_offset = Math.floor(Math.random()*2)-1;
    if (Math.random() < .5) {
        return [base, base_offset, top, top_offset];
        direction = 1;
    }
    else    
    {
        return [top, top_offset, base, base_offset];
        direction = -1;
    }
}

function intervalToNotes(interval) {
    //convert interval int values to vexflow notes
    var base = interval[0];
    var baser = interval[1];
    var top = interval[2];
    var topr = interval[3]
    var Sbase = noteToString(base,baser);
    var Stop = noteToString(top,topr);
    var noteB = new Vex.Flow.StaveNote({ keys: [Sbase], duration: "h" });
    var noteT = new Vex.Flow.StaveNote({ keys: [Stop], duration: "h" });
    if (Sbase.charAt(1) == "#"){
        if (Sbase.charAt(2) == "#")
            noteB.addAccidental(0, new Vex.Flow.Accidental("##"));
        else
            noteB.addAccidental(0, new Vex.Flow.Accidental("#"));
    }
    if (Sbase.charAt(1) == "b"){
        if (Sbase.charAt(2) == "b")
            noteB.addAccidental(0, new Vex.Flow.Accidental("bb"));
        else
            noteB.addAccidental(0, new Vex.Flow.Accidental("b"));
    }
    if (Stop.charAt(1) == "#"){
        if (Stop.charAt(2) == "#")
            noteT.addAccidental(0, new Vex.Flow.Accidental("##"));
        else
            noteT.addAccidental(0, new Vex.Flow.Accidental("#"));
    }
    if (Stop.charAt(1) == "b"){
        if (Stop.charAt(2) == "b")
            noteT.addAccidental(0, new Vex.Flow.Accidental("bb"));
        else
            noteT.addAccidental(0, new Vex.Flow.Accidental("b"));
    }

    notes =  [noteB, noteT];
    return notes;
}


function newIntervalFromTest(set, test)
{
    if (set == 0)
    {
        switch(test)
        {
            case 1:
                var notesI = [0, 12];
                break;
            case 2:
                var notesI = [0,1];
                break;
            case 3:
                var notesI = [1,2];
                break;
            case 4:
                var notesI = [2,3];
                break;
            case 5:
                var notesI = [1,2,3];
                break;
            case 6:
                var notesI = [3,4];
                break;
            case 7:
                var notesI = [1,2,3,4];
                break;
            case 8:
                var notesI = [4,5];
                break;
            case 9:
                var notesI = [5,6];
                break;
            case 10:
                var notesI = [6,7];
                break;
            case 11:
                var notesI = [5,6,7];
                break;
            case 12:
                var notesI = [1,2,3,4,5,6,7];
                break;
            case 13:
                var notesI = [7,8];
                break;
            case 14:
                var notesI = [8,9];
                break;
            case 15:
                var notesI = [6,7,8,9];
                break;
            case 16:
                var notesI = [1,2,3,4,5,6,7,8,9];
                break;
            case 17:
                var notesI = [9,10];
                break;
            case 19:
                var notesI = [10,11];
                break;
            case 20:
                var notesI = [10, 11, 12];
                break;
            case 21:
                var notesI = [8,9,10,11,12];
                break;
            case 22:
                var notesI = [0,1,2,3,4,5,6,7,8,9,10,11,12];
                break;
        }
    }
    else if (set == 1)
    {
        switch(test)
        {
            case 1:
                var notesI = [0,12];
                break;
            case 2:
                var notesI = [12,11];
                break;
            case 3:
                var notesI = [12,10];
                break;
            case 4:
                var notesI = [10,9];
                break;
            case 5:
                var notesI = [12,11,10,9];
                break;
            case 6:
                var notesI = [9,8];
                break;
            case 7:
                var notesI = [12,11,10,9,8];
                break;
            case 8:
                var notesI = [8,7];
                break;
            case 9:
                var notesI = [7,6];
                break;
            case 10:
                var notesI = [6,5];
                break;
            case 11:
                var notesI = [12,8,7,6];
                break;
            case 12:
                var notesI = [12,11,10,9,8,7,6];
                break;
            case 13:
                var notesI = [6,5];
                break;
            case 14:
                var notesI = [5,4];
                break;
            case 15:
                var notesI = [7,6,5,4];
                break;
            case 16:
                var notesI = [12,11,10,9,8,7,6,5,4];
                break;
            case 17:
                var notesI = [4,3];
                break;
            case 19:
                var notesI = [3,2];
                break;
            case 20:
                var notesI = [12,4,3,2];
                break;
            case 21:
                var notesI = [12,2,1];
                break;
            case 22:
                var notesI = [0,1,2,3,4,5,6,7,8,9,10,11,12];
                break;
        }
    }

    var rand_ind = Math.floor(Math.random()*notesI.length);
    return notesI[rand_ind];
}


function getNewIntervals(staff, correct_int)//interval_class arg
{
    clearCanvases();
    resetBorderColors();
    drawStaves();
    //Get a random interval

    //var index = Math.floor(Math.random()*interval_class.length);
    // var interval = interval_class[index];
    var interval = toInterval(correct_int);
    var notes = intervalToNotes(interval);
    //choose which canvas will draw it
    var select = Math.floor(Math.random()*labels.length);
    var outelem = labels[select];
    
    var outelem;

    correctChoice = outelem;
    correctInterval = interval;
    var displace = Math.abs(correctInterval[2]-correctInterval[0]);
    showInterval(intervalToNotes(interval), correctChoice);
    /*
    if (staff == 1)
        showInterval(intervalToNotes(interval), correctChoice);
    if (staff == 0)
        showIntervalChoice(correctInterval, correctChoice);
    */

    //show the intervals on the canvas
    for(var i = 0; i < labels.length; i++){
        if(i != select){
            //populate the wrong answers
            interval = getRandomIntervalNotX(displace);
            showInterval(intervalToNotes(interval), labels[i]);
            /*
            if (staff == 1)
                
            if (staff == 0)
                showIntervalChoice(interval, labels[i]);
            */
        }
    }
    
    if (staff == 1)
        showIntervalName();
}

function resetBorderColors(){
    for(var i = 0; i < labels.length; i++){
        var canvasElement = document.getElementById(labels[i]);
        canvasElement.style.border = "4px solid ".concat(defaultColor);
    }
}

//Change the border colors to reflect a good or bad answer
function changeBorderColors(){
    for(var i = 0; i < labels.length; i++){
        var canvasElement = document.getElementById(labels[i]);
        if(labels[i]==correctChoice){
            canvasElement.style.border = "4px solid ".concat(correctColor);
        }
        else{
            canvasElement.style.border = "4px solid ".concat(incorrectColor);
        }
    }
}

//Called by the canvas on click
//Determines whether the choice was correct
function chooseAnswerInt(answer){
    if(!answerChosen){
        answerChosen = true;
        var promptField = document.getElementById(prompt);
        changeBorderColors();
        if( answer==correctChoice ){
            promptField.innerHTML = "Got it!";
            //playInterval(semitoneToFrequency(correctInterval[0]), semitoneToFrequency(correctInterval[2]), 2, 30);
            playInterval(correctInterval[0], correctInterval[2], 2, 30);
            answeredCorrectlyInt();
        }
        else{
            promptField.innerHTML = "Uh-oh!";
            answeredIncorrectlyInt();
            //playInterval(semitoneToFrequency(correctInterval[0]), semitoneToFrequency(correctInterval[2]), 2, 30);
            playInterval(correctInterval[0], correctInterval[2], 2, 30);
        }
    }
}

//convert the semitone number to a frequency
function semitoneToFrequency(semitone){
    return middleCHz * Math.pow(semitoneConstant, semitone - middleC );
}


function playIMelody(melArray, gain)
{
    var audio = new Audio(); //html5 audio element
    var wave = new RIFFWAVE(); //empty wavefile
    var data = [];
    var sR = 44100;

    wave.header.sampleRate = sR; //set sample rate
    wave.header.numChannels = 2; //two channels

    var i=0;
    var numnote = 0; 
    var samples = 0;
    var freq = 0;
    var gainI =1;
    var length = 0;
    var gainstepI;
    var gainstepD;
    var gstep = 0;
    while (numnote < melArray.length)
    {
        length = melArray[numnote][1];

        gainstepI = (length*2) * gain/sR;
        gainstepD = (-(length*2)/3)*gain/sR;

        freq = semitoneToFrequency(melArray[numnote][0])/sR * 2 * Math.PI;

        samples = samples + length*sR;

        gstep = gainstepI;

        gainI = 1;

        while (i<samples) {
            if (gainI <= 0) //necessary?
                gainI = 0.1;
            data[i++] = 128+Math.round(gainI*Math.sin(freq*i)); // left speaker
            data[i++] = 128+Math.round(gainI*Math.sin(freq*i)); // right speaker
            if (gainI > 40)
                gstep = gainstepD;
            gainI = gainI + gstep;

        }
        numnote++;
    }
    wave.Make(data); // make the wave file
    audio.src = wave.dataURI; // set audio source
    audio.play(); // we should hear two tones one on each speaker


}


function playInterval(freq1, freq2, length, gain)
{
    playIMelody([ [freq1, length] , [freq2, length] ], gain);
    //melodyMaker();
}


function melodyMaker()
{
    playIMelody([[60,1], [62,1], [64,1], [60,1], [60,1], [62,1], [64,1], [60,1], [64,1],[65,1],[67,1]], 30);
}

