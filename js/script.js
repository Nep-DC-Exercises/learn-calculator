"use strict";

const input = document.getElementById("input"), // input/output button
    numbers = document.querySelectorAll(".numbers div"), // number buttons
    operators = document.querySelectorAll(".operators div"), // operator buttons
    result = document.getElementById("result"), // equal button
    clear = document.getElementById("clear"); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

// numbers is a NodeList object, we need to make it into an array first, then we can map through it...
numbers.forEach(function(number) {
    number.addEventListener("click", function(e) {
        let lastChar = input.innerHTML.length - 1

        // This won't allow user to have multiple .'s 
        if (this.innerHTML == ".") {
            if (input.innerHTML[lastChar] == "." || input.innerHTML.includes(".")) {
                // do nothing
            } else {
                input.innerHTML += this.innerHTML;
            }
        } else {
            input.innerHTML += this.innerHTML
        }

    });
});

// adding click handlers to the calculation buttons
operators.forEach(function(operator) {
    operator.addEventListener("click", function(e) {
        let operatorsArray = [];
        let lastChar = input.innerHTML.length - 1 // I found myself typing this a lot so buried it within a variable
        // populates an array of the operators
        operators.forEach(function(operator) {
            operatorsArray.push(operator.innerHTML);
        });
        // if the inputString is empty or the last character is an operator, do nothing, otherwise add the operator
        if (input.innerHTML == "" || operatorsArray.includes(input.innerHTML[lastChar])) {
            //pass
        } else {
            input.innerHTML += this.innerHTML;
        }
        // If the last character is an operator, and another operator is clicked
        // this replaces the previous operator with the most recent clicked one.
        if (operatorsArray.includes(input.innerHTML[lastChar])) {
            let a = input.innerHTML.substring(0, lastChar)
            input.innerHTML = a
            input.innerHTML += this.innerHTML
        }
    });
});

// on click of 'equal' button, perform the mathematical operation
result.addEventListener("click", function(e) {
    // This is insecure
    let calculation = eval(input.innerHTML);
    if (!Number.isInteger(calculation)) {
        input.innerHTML = calculation.toFixed(2);
    } else {
        input.innerHTML = calculation;
    }
    resultDisplayed = true;
});

// clear the input on press of clear
clear.addEventListener("click", function(e) {
    input.innerHTML = "";
});
