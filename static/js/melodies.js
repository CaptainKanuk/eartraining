//Code to display music staff in browser canvases.
//Uses Vexflow
//MM, DGM, AR, ST for COS 333 Spring 2014

var labels = ["choice_one", "choice_two", "choice_three", "choice_four"];
var prompt = "prompt";

//Summon Satan


//For mapping the numbers to vexflow notation
var pitchClassNames  = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
var middleC          = 60;//semitone starting point
var middleCHz        = 261.625565;
var semitoneConstant = 1.05946;

var defaultColor   = "#000000";
var correctColor   = "#439400";
var incorrectColor = "#94002D";

var canvas1, canvas2, canvas3, canvas4;

var renderer1, renderer2, renderer3, renderer4;

var ctx1, ctx2, ctx3, ctx4;

var stave1, stave2, stave3, stave4;

var correctChoice;
//intervals are [basetone, baseoffset, toptone, topoffset]
var correctMelody;
var answerChosen = true;

var melcount = 0;
var mel_button = document.getElementById("mel-play");

function drawStaff(elem)
{
    if (elem == "choice_one")
    {
        canvas1 = document.getElementById("choice_one");
        renderer1 = new Vex.Flow.Renderer(canvas1,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx1 = renderer1.getContext();
        stave1 = new Vex.Flow.Stave(0, -10, 420);
        stave1.addClef("treble").setContext(ctx1).draw();
    }
    else if (elem == "choice_two")
    {
        canvas2 = document.getElementById("choice_two");
        renderer2 = new Vex.Flow.Renderer(canvas2,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx2 = renderer2.getContext();
        stave2 = new Vex.Flow.Stave(10, -10, 420);
        stave2.addClef("treble").setContext(ctx2).draw();
    }
    else if (elem == "choice_three")
    {
        canvas3 = document.getElementById("choice_three");
        renderer3 = new Vex.Flow.Renderer(canvas3,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx3 = renderer3.getContext();
        stave3 = new Vex.Flow.Stave(10, -10, 420);
        stave3.addClef("treble").setContext(ctx3).draw();
    }
    else if (elem == "choice_four")
    {
        canvas4 = document.getElementById("choice_four");;
        renderer4 = new Vex.Flow.Renderer(canvas4,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx4 = renderer4.getContext();
        stave4 = new Vex.Flow.Stave(10, -10, 420);
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


function showMelody(notes, elem)
{
    var voice = new Vex.Flow.Voice({
                           num_beats: notes.length,
                           beat_value: 4,
                           resolution: Vex.Flow.RESOLUTION
                           });
    voice.addTickables(notes);
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 420);
    
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

// function verify()
// {
//     alert("HELLO");
// }

function clearCanvases(){
    ctx1.clearRect(0, 0, 500, 120);
    ctx2.clearRect(0, 0, 500, 120);
    ctx3.clearRect(0, 0, 500, 120);
    ctx4.clearRect(0, 0, 500, 120);
}

function drawStaves(){
    for(var i = 0; i < labels.length; i++){
        drawStaff(labels[i]);
    }
}
/*
function setup(elem)
{
    drawStaff(elem); 
    showInterval(elem);
}
*/
function setup(elem)
{
    drawStaff(elem); 
}

/*
function getRandomInterval(){
    //Generate random interval
    var base = Math.floor(Math.random()*13.0)+60;
    var interval = Math.floor(Math.random()*13.0);
    var top = base + interval;
    var base_offset = Math.floor(Math.random()*3)-1;
    var top_offset = Math.floor(Math.random()*3)-1;
    return [base, base_offset, top, top_offset];
}
*/

function getRandomNote()
{
    //generate random note
    var note = Math.floor(Math.random()*13.0)+60;
    var note_offset;
    if (Math.random() < .33)
    {
        if (Math.random() < .5)
            note_offset = 1;
        else
            note_offset = -1;
    }
    else
        note_offset = 0;
    return [note, note_offset];
}

function getRandomMelody(length)
{
    var i;
    var mel = new Array(length);
    for (i = 0; i < length; i++) {
      mel[i] = new Array(2);
    }
    var note;
    for (i = 0; i < length; i++)
    {
        note = getRandomNote();
        mel[i][0] = note[0];
        mel[i][1] = note[1];
    }
    return mel;
}

function printMel(mel)
{

    var i = 0;
    for (i = 0; i < mel.length; i++)
    {
        alert("note: " + mel[i][0].toString() + ", offset: " + mel[i][1].toString());
    }
}

// function thisIsDumb(){
//     alert("You better get here.");
// }

//need showMelody, melodyToNotes, getNewMelodies, getRandomMelody, also have getRandomNote
function getNewMelodies()
{
    clearCanvases();
    resetBorderColors();
    drawStaves();
    //melody_test = 1;  
    var length = Math.floor(Math.random()*6) + 3;

    //Get a random melody
    var melody = getRandomMelody(length);

    //playMelody(melody);
    //playMelody([[60,1], [62,1], [64,1], [60,1], [60,1], [62,1], [64,1]]);
    var notes = melodyToNotes(melody);

    //choose which canvas will draw it
    var select = Math.floor(Math.random()*labels.length);
    var outelem = labels[select];
    
    var outelem;

    /*
    var altmel = [];
    for (var n = 0; n < 3; n++)
        altmel[n] = varyMelody();
    */

    correctChoice = outelem;
    correctMelody = melody;

    showMelody(notes, correctChoice);

    //n = 0;
    //show the intervals on the canvas
    for(var i = 0; i < labels.length; i++){
        if(i != select){
            //populate the wrong answers
            showMelody(melodyToNotes(varyMelody(.8)), labels[i]);
            //n++;
        }
    }
    //finally, make the correct melody name display as a prompt???
    //showMelodyPrompt();

}


function varyMelody(variance)
{
    var length = correctMelody.length;
    var newMel = new Array(length);
    for (var i = 0; i < length; i++)
        newMel[i] = new Array(2);
    for (i = 0; i < length; i++)
    {
        if (Math.random()<variance)
        {
            if (Math.random()<.5)
                newMel[i][0] = correctMelody[i][0] + Math.round(Math.random() * 3);
            else
                newMel[i][0] = correctMelody[i][0] - Math.round(Math.random() * 3);
            newMel[i][1] = 0;
        }
        else
        {
            newMel[i][0] = correctMelody[i][0];
            newMel[i][1] = correctMelody[i][1];
        }
    }
    return newMel;

}





/*
function parseMelody()
{
    var mel = new Array(correctMelody.length);
    for (var i = 0; i < correctMelody.length; i++)
    {
        mel[i] = new Array(2);
        mel[i][0] = correctMelody[i][0];
        mel[i][1] = 2;
    }
    return mel;

}
*/
//convert semitone rep and offset values to parse-able note strings for vexflow
function melodyToNotes(melody)
{
    var i = 0;
    var notes = new Array(melody.length);
    var note;
    var offset;
    var Snote;
    var noteVex;
    var Sryth;
    var length = melody.length;
    for (i = 0; i < length; i++)
    {
        note = melody[i][0];
        offset = melody[i][1];
        Snote = noteToString(note, offset);
        //Sryth = rythToString(i, length);
        noteVex = new Vex.Flow.StaveNote({ keys:[Snote], duration: "q"});
        if (Snote.charAt(1) == "#"){
            if (Snote.charAt(2) == "#")
                noteVex.addAccidental(0, new Vex.Flow.Accidental("##"));
            else
                noteVex.addAccidental(0, new Vex.Flow.Accidental("#"));
        }
        if (Snote.charAt(1) == "b"){
            if (Snote.charAt(2) == "b")
                noteVex.addAccidental(0, new Vex.Flow.Accidental("bb"));
            else
                noteVex.addAccidental(0, new Vex.Flow.Accidental("b"));
        }
        //HERE
        notes[i] = noteVex;
    }
    var fillRests = 4-length%4;
    var tail = i;
    if (fillRests < 4)
    {
        while (i < tail + fillRests) { 
            notes[i] = new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" });
            i++;
        }
    }
        
    return notes;
}

function resetBorderColors(){
    for(var i = 0; i < labels.length; i++){
        var canvasElement = document.getElementById(labels[i]);
        canvasElement.style.border = "4px solid ".concat(defaultColor);
    }
}

//Change the border colors to reflect a good or bad answer
function changeBorderColors() {
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
function chooseAnswer(answer){
    if(!answerChosen){
        answerChosen = true;
        var promptField = document.getElementById(prompt);
        changeBorderColors();
        if( answer==correctChoice ){
            promptField.innerHTML = "Got it!";
            //playInterval(semitoneToFrequency(correctInterval[0]), semitoneToFrequency(correctInterval[2]), 2, 30);
            //playMelody(correctMelody);
            answeredCorrectly();
        }
        else{
            promptField.innerHTML = "Uh-oh!";
            answeredIncorrectly();
            //playInterval(semitoneToFrequency(correctInterval[0]), semitoneToFrequency(correctInterval[2]), 2, 30);
            //playMelody(correctMelody);
        }
    }
}

//convert the semitone number to a frequency
function semitoneToFrequency(semitone){
    return middleCHz * Math.pow(semitoneConstant, semitone - middleC );
}


function playMelody()
{
    var gain = 30;
    var audio = new Audio(); //html5 audio element
    var wave = new RIFFWAVE(); //empty wavefile
    var data = [];
    var sR = 44100;
    //var melArray = parseMelody();

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

    alert(melcount);
    while (numnote < correctMelody.length)
    {
        length = 2;

        gainstepI = (length*2) * gain/sR;
        gainstepD = (-(length)/3)*gain/sR;

        //alert(correctMelody[numnote][0]);
        freq = semitoneToFrequency(correctMelody[numnote][0])/sR * 2 * Math.PI;

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
    //audio.setAttribute('src',wave.dataURI);
    audio.load();
    audio.play(); // we should hear two tones one on each speaker

}

function deactivateMelPlay()
{
    var mel_button = document.getElementById("mel-play");
    mel_button.setAttribute("onclick","");
    if (melcount == 2)
    {
        deleteMelPlay();
    }
    if (melcount < 3)
        setTimeout(activateMelPlay, correctMelody.length*1001);

}

function deleteMelPlay()
{
    // mel_button.setAttribute("onclick","");
    // mel_button.innerHTML = "";
    // mel_button.class="";
    alert("hey...");
    mel_button.setAttribute("display", "none");
}

function instantiateMelPlay()
{
    // mel_button.setAttribute("onclick","playMelody(); melcount++; deactivateMelPlay();");
    // mel_button.innerHTML = "Play melody.";
    // mel_button.class="btn btn-lg btn-default";
    mel_button.setAttribute("display", "initial");

}

function activateMelPlay()
{
    document.getElementById("mel-play").setAttribute("onclick", "playMelody(); melcount++; deactivateMelPlay()");
}

// function playInterval(freq1, freq2, length, gain)
// {
//     playMelody([ [freq1, length] , [freq2, length] ], gain);
//     //melodyMaker();
// }

// function melodyMaker()
// {
//     playMelody([[60,1], [62,1], [64,1], [60,1], [60,1], [62,1], [64,1], [60,1], [64,1],[65,1],[67,1]], 30);
// }