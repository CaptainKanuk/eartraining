//Code to display music staff in browser canvases.
//Uses Vexflow
//MM, DGM, AR, ST for COS 333 Spring 2014

var labels = ["choice_one", "choice_two", "choice_three", "choice_four"];
var prompt = "prompt";

var englishNames = [["unison"], ["minor second", "second"], "third", "fourth", "fifth", "sixth", "seventh", "octave", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifthteenth", "double octave","Summon Satan"];
var englishModifierClass = [0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 666];
//grouped into the two classes
var englishAccidentals = [["perfect", "augmented", "diminished"], [ "major", "minor", "augmented", "dimished"]];


//For mapping the numbers to vexflow notation
var scaleNoteNames = [["a"], ["a#", "bb"], ["b", "cb"], ["b#","c"], ["c#", "db"], ["d"], ["d#","eb"], ["e","fb"], ["e#","f"], ["f#","gb"], ["g"], ["g#","ab"]];

var defaultColor = "#000000";
var correctColor = "#439400";
var incorrectColor = "#94002D";

var canvas1, canvas2, canvas3, canvas4;

var renderer1, renderer2, renderer3, renderer4;

var ctx1, ctx2, ctx3, ctx4;

var stave1, stave2, stave3, stave4;

var correctChoice;
var correctInterval;

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
function noteToString(note, representation)
{
    tone = note % 11;
    var string = scaleNoteNames[tone][representation];
    if(note < 11){
        string = string.concat("/4");
    }
    else{
        string = string.concat("/5");
    }
    return string;
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
    var interval = Math.floor(Math.random()*12.0);
    var base = Math.floor(Math.random()*12.0);
    var top = base + interval;
    var baser = Math.floor(Math.random()*scaleNoteNames[base%11].length);
    var topr = Math.floor(Math.random()*scaleNoteNames[top%11].length);
    return [base, baser, top, topr];
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
    if (Sbase.charAt(1) == "#")
        noteB.addAccidental(0, new Vex.Flow.Accidental("#"));
    if (Sbase.charAt(1) == "b")
        noteB.addAccidental(0, new Vex.Flow.Accidental("b"));
    if (Stop.charAt(1) == "#")
        noteT.addAccidental(0, new Vex.Flow.Accidental("#"));
    if (Stop.charAt(1) == "b")
        noteT.addAccidental(0, new Vex.Flow.Accidental("b"));

    var notes = [
                 noteB, noteT
                 ];
    
    return notes;
}

function showIntervalName(){
    var promptField = document.getElementById(prompt);
    
    promptField.innerHTML = "Pick the ".concat(englishNames[correctInterval[1]-correctInterval[0]]);
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
    
    //show the intervals on the canvas
    showInterval(notes, outelem);
    for(var i = 0; i < labels.length; i++){
        if(i != select){
            //populate the wrong answers
            showInterval(intervalToNotes(getRandomInterval()), labels[i]);
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
    var promptField = document.getElementById(prompt);
    changeBorderColors();
    if( answer==correctChoice ){
        promptField.innerHTML = "Got it!";
    }
    else{
        promptField.innerHTML = "Uh-oh!";
    }
}