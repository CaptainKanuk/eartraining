//Code to display music staff in browser canvases.
//Uses Vexflow
//MM, DGM, AR, ST for COS 333 Spring 2014

var labels = ["choice_one", "choice_two", "choice_three", "choice_four"];
var prompt = "prompt";

var englishNames = ["unison", "second", "third", "fourth", "fifth", "sixth", "seventh", "octave", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifthteenth", "double octave","Summon Satan"];
var englishAccidentals = ["perfect", "major", "minor", "augmented", "diminished"];

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
function noteToString(note)
{
    note = note % 11;
    var temp;
    if (note == 0)
        return "c/4";
    else if (note == 1)
    {
        temp = "db/4";
        if (Math.random() < .5)
            temp = "c#/4";
        return temp;
    }
    else if (note == 2)
        return "d/4";
    else if (note == 3)
    {
        temp = "eb/4";
        if (Math.random() < .5)
            temp = "d#/4";
        return temp;
    }
    else if (note == 4)
        return "e/4";
    else if (note == 5)
        return "f/4";
    else if (note == 6)
    {
        temp = "gb/4";
        if (Math.random() < .5)
            temp = "f#/4";
        return temp;
    }
    else if (note == 7)
        return "g/4";
    else if (note == 8)
    {
        temp = "ab/4";
        if (Math.random() < .5)
            temp = "g#/4";
        return temp;
    }
    else if (note == 9)
        return "a/5";
    else if (note == 10)
    {
        temp = "bb/5";
        if (Math.random() < .5)
            temp = "a#/5";
        return temp;
    }
    else if (note == 11)
        return "b/5";
    else if (note == 12)
        return "c/5";
    else if (note == 13)
    {
        temp = "c#/5";
        if (Math.random() < .5)
            temp = "db/5";
        return temp;
    }
    else if (note == 14)
        return "d/5";
    else if (note == 15)
    {
        temp = "d#/5";
        if (Math.random() < .5)
            temp = "eb/5";
        return temp;
    }
    else if (note == 16)
        return "e/5";
    else if (note == 17)
        return "f/5";
    else if (note == 18)
    {
        temp = "f#/5";
        if (Math.random() < .5)
            temp = "gb/5";
        return temp;
    }
    else if (note == 19)
        return "g/5";
    else if (note == 20)
    {
        temp = "g#/5";
        if (Math.random() < .5)
            temp = "ab/6";
        return temp;
    }
    else if (note == 21)
        return "a/6";
    else if (note == 22)
    {
        temp = "a#/6";
        if (Math.random() < .5)
            temp = "bb/6";
        return temp;
    }
    else if (note == 23)
        return "b/6";
    else if (note == 24)
        return "c/6";
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
    var interval = Math.floor(Math.random()*13.0);
    var base = Math.floor(Math.random()*13.0);
    var top = base + interval;
    return [base, top];
}

function intervalToNotes(interval){
    //convert interval int values to vexflow notes
    var base = interval[0]
    var top = interval[1];
    var Sbase = noteToString(base);
    var Stop = noteToString(top);
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
    drawStaves();
    //Get a random interval
    var interval = getRandomInterval();
    var notes = intervalToNotes(interval);
    //choose which canvas will draw it
    var select = Math.floor(Math.random()*labels.length);
    var outelem = labels[select];
    
    var outelem;

    rightChoice = outelem;
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