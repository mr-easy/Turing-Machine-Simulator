var states, inputSymbols, tapeAlphabets, blank, finalStates, initialState;
var err = false;
function resetTM() {

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
    t.style.border = "1px solid black";
}
function generateStates() {
    var i, j, s;
    s = document.getElementById("stateSymbols").value.split(",");
    states = new Array();
    for(i = 0; i < s.length; i++) {
        s[i] = s[i].trim();
        if(s[i] != "" && states.indexOf(s[i]) == -1) {
            states.push(s[i]);
        }
    }
    document.getElementById("stateSymbols").value = states.toString();
    if(states.length == 0) {
        err = true;
        alert('No states found!');
    }
}
function generateTapeAlphabets() {
    var i, j, s;
    s = document.getElementById("tapeSymbols").value.split(",");
    tapeAlphabets = new Array();
    for(i = 0; i < s.length; i++) {
        s[i] = s[i].trim();
        if(s[i] != "" && tapeAlphabets.indexOf(s[i]) == -1) {
            tapeAlphabets.push(s[i]);
        }
    }
    document.getElementById("tapeSymbols").value = tapeAlphabets.toString();
    if(tapeAlphabets.length == 0) {
        err = true;
        alert('No Tape Alphabets found!');
    }
}
function generateInputSymbols() {
    var i, j, s;
    s = document.getElementById("inputSymbols").value.split(",");
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
    document.getElementById("inputSymbols").value = inputSymbols.toString();
    if(inputSymbols.length == 0) {
        err = true;
        alert('No Input Alphabets found!');
    }
}
function generateFinalStates() {
    var i, j, s;
    s = document.getElementById("finalStates").value.split(",");
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
    document.getElementById("finalStates").value = finalStates.toString();
}
