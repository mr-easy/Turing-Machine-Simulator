var states, inputSymbols, tapeAlphabets, blank, finalStates, initialState;
var resetBtn, doneBtn;
//Input fields
var inStates, inTape, inInp, inFinal;
var err = false;

resetBtn = document.getElementById("resetBtn");
doneBtn = document.getElementById("doneBtn");

inStates = document.getElementById("stateSymbols");
inTape = document.getElementById("tapeSymbols");
inInp = document.getElementById("inputSymbols");
inFinal = document.getElementById("finalStates");

function resetTM() {
    //remove the transition function table
    var t = document.getElementById("transTable");
    if(t != null) {
        t.parentNode.removeChild(t);
    }
    //remove the transition table buttons
    var b = document.getElementById("transFuncBtns");
    if(b != null) {
        b.parentNode.removeChild(b);
    }

    //Enable tuples buttons and input field values
    resetBtn.disabled = false;
    doneBtn.disabled = false;
    inStates.value = "";
    inStates.disabled = false;
    inTape.value = "";
    inTape.disabled = false;
    inInp.value = "";
    inInp.disabled = false;
    inFinal.value = "";
    inFinal.disabled = false;
    err = false;
}
function generateTransFunc() {
    if(!err)
        generateStates();
    if(!err)
        generateTapeAlphabets();
    if(!err)
        generateInputSymbols();
    if(!err)
        generateFinalStates();

    if(err) {
        err = false;
        return ;
    }

    doneBtn.disabled = true;
    inStates.disabled = true;
    inTape.disabled = true;
    inInp.disabled = true;
    inFinal.disabled = true;

    blank = "-";
    var i, j, s = "", statesOptions = "", tapeAlphaOptions = "", directionOptions = "";
    var t = document.createElement("table");
    t.setAttribute("id", "transTable");

    //setting the header part of the table
    s += "<tr><th>States</th>";
    for(i = 0; i < tapeAlphabets.length; i++) {
        s += "<th>" + tapeAlphabets[i] + "</th>";
    }
    s += "<th>-</th></tr>";

    //preparing the options
    statesOptions = "<select>";
    statesOptions += "<option value='b'>-</option>";
    for(i = 0; i < states.length; i++) {
        statesOptions += "<option value=" + states[i] + ">" + states[i] + "</option>";
    }
    statesOptions += "</select>"

    tapeAlphaOptions = "<select>" + "<option value='b'>-</option>";
    for(i = 0; i < tapeAlphabets.length; i++) {
        tapeAlphaOptions += "<option value=" + tapeAlphabets[i] + ">" + tapeAlphabets[i] + "</option>";
    }
    tapeAlphaOptions += "</select>"

    directionOptions = "<select><option value='b'>-</option><option value='L'>L</option><option value='R'>R</option></select>";

    for(i = 0; i < states.length; i++) {
        s += "<tr>";
        if(i == 0) {
            if(finalStates.indexOf(states[i]) != -1)
                s += "<td> &rarr;<b>" + states[i] + "</b></td>";
            else
                s += "<td> &rarr;" + states[i] + "</td>";
        } else {
            if(finalStates.indexOf(states[i]) != -1)
                s += "<td><b>" + states[i] + "</b></td>";
            else
                s += "<td>" + states[i] + "</td>";
        }
        for(j = 0; j <= tapeAlphabets.length; j++) {
            s += "<td>" + statesOptions + tapeAlphaOptions + directionOptions + "</td>"
        }
        s += "</tr>";
    }

    t.innerHTML = s;
    document.getElementById("transitionFunction").appendChild(t);

    //Adding buttons to table
    var btns;
    btns = document.createElement("div");
    btns.setAttribute("id", "transFuncBtns");
    btns.innerHTML = "<button id='transReset' onclick='resetTM()'>Reset</button><button id='run' onclick='runTM()'>Run</button>"
    document.getElementById("transitionFunction").appendChild(btns);
}
function generateStates() {
    var i, j, s;
    s = inStates.value.split(",");
    states = new Array();
    for(i = 0; i < s.length; i++) {
        s[i] = s[i].trim();
        if(s[i] != "" && states.indexOf(s[i]) == -1) {
            states.push(s[i]);
        }
    }
    if(states.length == 0) {
        err = true;
        alert('No states found!');
    } else {
        inStates.value = states.toString();
    }
}
function generateTapeAlphabets() {
    var i, j, s;
    s = inTape.value.split(",");
    tapeAlphabets = new Array();
    for(i = 0; i < s.length; i++) {
        s[i] = s[i].trim();
        if(s[i] != "" && tapeAlphabets.indexOf(s[i]) == -1) {
            tapeAlphabets.push(s[i]);
        }
    }
    if(tapeAlphabets.length == 0) {
        err = true;
        alert('No Tape Alphabets found!');
    } else {
        inTape.value = tapeAlphabets.toString();
    }
}
function generateInputSymbols() {
    var i, j, s;
    s = inInp.value.split(",");
    inputSymbols = new Array();
    for(i = 0; i < s.length; i++) {
        s[i] = s[i].trim();
        if(s[i] != "" && inputSymbols.indexOf(s[i]) == -1) {
            if(tapeAlphabets.indexOf(s[i]) != -1) {
                inputSymbols.push(s[i]);
            } else {
                alert('Tape Alphabets should be a subset of Input Alphabets.');
                err = true;
                break;
            }
        }
    }
    if(inputSymbols.length == 0) {
        err = true;
        alert('No Input Alphabets found!');
    } else {
        inInp.value = inputSymbols.toString();
    }
}
function generateFinalStates() {
    var i, j, s;
    s = inFinal.value.split(",");
    finalStates = new Array();
    for(i = 0; i < s.length; i++) {
        s[i] = s[i].trim();
        if(s[i] != "" && finalStates.indexOf(s[i]) == -1) {
            if(states.indexOf(s[i]) != -1) {
                finalStates.push(s[i]);
            } else {
                alert('Final states should be a subset of all States.');
                err = true;
                break;
            }
        }
    }
    inFinal.value = finalStates.toString();
}
function runTM() {
    //All program to run the Turing machine

    //Validate input
}
