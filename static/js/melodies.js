//Code to display music staff in browser canvases.
//Uses Vexflow
//MM, DGM, AR, ST for COS 333 Spring 2014

var labels = ["choice_one", "choice_two", "choice_three", "choice_four"];
var prompt = "prompt";

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

var correctChoice;
//intervals are [basetone, baseoffset, toptone, topoffset]
var correctInterval;
var answerChosen = true;

function drawStaff(elem)
{
    if (elem == "choice_one")
    {
        canvas1 = document.getElementById("choice_one");
        renderer1 = new Vex.Flow.Renderer(canvas1,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx1 = renderer1.getContext();
        stave1 = new Vex.Flow.Stave(0, -10, 400);
        stave1.addClef("treble").setContext(ctx1).draw();
    }
    else if (elem == "choice_two")
    {
        canvas2 = document.getElementById("choice_two");
        renderer2 = new Vex.Flow.Renderer(canvas2,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx2 = renderer2.getContext();
        stave2 = new Vex.Flow.Stave(10, -10, 400);
        stave2.addClef("treble").setContext(ctx2).draw();
    }
    else if (elem == "choice_three")
    {
        canvas3 = document.getElementById("choice_three");
        renderer3 = new Vex.Flow.Renderer(canvas3,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx3 = renderer3.getContext();
        stave3 = new Vex.Flow.Stave(10, -10, 400);
        stave3.addClef("treble").setContext(ctx3).draw();
    }
    else if (elem == "choice_four")
    {
        canvas4 = document.getElementById("choice_four");;
        renderer4 = new Vex.Flow.Renderer(canvas4,
                                          Vex.Flow.Renderer.Backends.CANVAS);
        
        ctx4 = renderer4.getContext();
        stave4 = new Vex.Flow.Stave(10, -10, 400);
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
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 400);
    
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


function showInterval(notes, elem)
{
    var voice = new Vex.Flow.Voice({
                           num_beats: notes.length,
                           beat_value: 4,
                           resolution: Vex.Flow.RESOLUTION
                           });
    voice.addTickables(notes);
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 400);
    
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
    var base_offset = Math.floor(Math.random()*3)-1;
    var top_offset = Math.floor(Math.random()*3)-1;
    return [base, base_offset, top, top_offset];
}

function getRandomNote(){
    //generate random note
    var note = Math.floor(Math.random()*13.0)+60;
    var note_offset = Math.floor(Math.random()*3)-1;
    return [note, note_offset];
}

function getRandomMelody(length)
{
    var i = 0;
    var mel = [][];
    var note;
    for (i = 0; i < length; i++)
    {
        note = getRandomNote();
        mel[i][0] = note[0];
        mel[i][1] = note[1];
    }
    return mel;
}


//need showMelody, melodyToNotes, getNewMelodies, getRandomMelody, also have getRandomNote
function getNewMelodies()
{
    clearCanvases();
    resetBorderColors();
    drawStaves();
    //Get a random melody
    var melody = getRandomMelody();
    var notes = melodyToNotes(melody);
    //choose which canvas will draw it
    var select = Math.floor(Math.random()*labels.length);
    var outelem = labels[select];
    
    var outelem;

    correctChoice = outelem;
    correctMelody = melody;
    showMelody(melodyToNotes(melody), correctChoice);
    //show the intervals on the canvas
    for(var i = 0; i < labels.length; i++){
        if(i != select){
            //populate the wrong answers
            melody = getRandomMelody();
            showMelody(melodyToNotes(melody), labels[i]);
        }
    }
    //finally, make the correct interval display as a prompt
    //showIntervalName();
}

//convert semitone rep and offset values to parse-able note strings for vexflow
function melodyToNotes(melody)
{
    var i = 0;
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
        if (note.charAt(1) == "b"){
            if (Sbase.charAt(2) == "b")
                noteVex.addAccidental(0, new Vex.Flow.Accidental("bb"));
            else
                noteVex.addAccidental(0, new Vex.Flow.Accidental("b"));
        }
        //HERE
        notes[i] = noteVex;
    }
    return notes;
}

//based
function rythToString(beat, length)
{
    ;
}

function intervalToNotes(interval){
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

    var notes = [
                 noteB, noteT
                 ];
    
    return notes;
}

function getNewIntervals()
{
    clearCanvases();
    resetBorderColors();
    drawStaves();
    //Get a random interval
    var interval = getRandomInterval();
    var notes = intervalToNotes(interval);
    //choose which canvas will draw it
    var select = Math.floor(Math.random()*labels.length);
    var outelem = labels[select];
    
    var outelem;

    correctChoice = outelem;
    correctInterval = interval;
    showInterval(intervalToNotes(interval), correctChoice);
    //show the intervals on the canvas
    for(var i = 0; i < labels.length; i++){
        if(i != select){
            //populate the wrong answers
            interval = getRandomInterval();
            showInterval(intervalToNotes(interval), labels[i]);
        }
    }
    //finally, make the correct interval display as a prompt
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
function chooseAnswer(answer){
    if(!answerChosen){
        answerChosen = true;
        var promptField = document.getElementById(prompt);
        changeBorderColors();
        if( answer==correctChoice ){
            promptField.innerHTML = "Got it!";
            //playInterval(semitoneToFrequency(correctInterval[0]), semitoneToFrequency(correctInterval[2]), 2, 30);
            playInterval(correctInterval[0], correctInterval[2], 2, 30);
            answeredCorrectly();
        }
        else{
            promptField.innerHTML = "Uh-oh!";
            answeredIncorrectly();
            //playInterval(semitoneToFrequency(correctInterval[0]), semitoneToFrequency(correctInterval[2]), 2, 30);
            playInterval(correctInterval[0], correctInterval[2], 2, 30);
        }
    }
}

//convert the semitone number to a frequency
function semitoneToFrequency(semitone){
    return middleCHz * Math.pow(semitoneConstant, semitone - middleC );
}


function playMelody(melArray, gain)
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
        gainstepD = (-(length)/3)*gain/sR;

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
    playMelody([ [freq1, length] , [freq2, length] ], gain);
    //melodyMaker();
}

function melodyMaker()
{
    playMelody([[60,1], [62,1], [64,1], [60,1], [60,1], [62,1], [64,1], [60,1], [64,1],[65,1],[67,1]], 30);
}