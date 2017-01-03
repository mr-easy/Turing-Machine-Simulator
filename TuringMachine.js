var states, inputSymbols, tapeAlphabets, blank, finalStates, initialState;
var err = false;
function resetTM() {

}
function generateTransFunc() {
    generateStates();
    generateTapeAlphabets();
    generateInputSymbols();
    generateFinalStates();

    blank = "-";
    var i, j, s = "", k = "";
    var t = document.createElement("table");
    t.setAttribute("id", "transTable");

    //setting the header part of the table
    s += "<tr><th>States</th>";
    for(i = 0; i < tapeAlphabets.length; i++) {
        s += "<th>" + tapeAlphabets[i] + "</th>";
    }
    s += "<th>-</th></tr>";

    //preparing the options
    k = "<select>";
    k += "<option value='b'>-</option>";
    for(i = 0; i < states.length; i++) {
        for(j = 0; j < tapeAlphabets.length; j++) {
            k += "<option value=" + states[i] + tapeAlphabets[j] + "L>" + states[i] + ", " + tapeAlphabets[j] + ", L</option>";
            k += "<option value=" + states[i] + tapeAlphabets[j] + "R>" + states[i] + ", " + tapeAlphabets[j] + ", R</option>";
        }
    }
    k += "</select>"

    for(i = 0; i < states.length; i++) {
        s += "<tr>";
        s += "<td>" + states[i] + "</td>";
        for(j = 0; j <= tapeAlphabets.length; j++) {
            s += "<td>" + k + "</td>"
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
}
function generateFinalStates() {
    var i, j, s;
    s = document.getElementById("finalStates").value.split(",");
    finalStates = new Array();
    for(i = 0; i < s.length; i++) {
        s[i] = s[i].trim();
        if(s[i] != "" && finalStates.indexOf(s[i]) == -1) {
            finalStates.push(s[i]);
        }
    }
}
