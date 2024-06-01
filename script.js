let display = document.getElementById('display');
let currentInput = '';

function solve(value) {
    if (value === 'sin' || value === 'cos' || value === 'log' || value === 'ln') {
        currentInput += value + '(';
    } else if (value === '^') {
        currentInput += '**'; // In JavaScript, exponentiation is done using **
    } else {
        currentInput += value;
    }
    display.value = currentInput;
}

function result() {
    try {
        // Add closing parenthesis for each function if needed
        let openParens = (currentInput.match(/\(/g) || []).length;
        let closeParens = (currentInput.match(/\)/g) || []).length;
        while (closeParens < openParens) {
            currentInput += ')';
            closeParens++;
        }

        // Replace sin, cos, log, ln with Math functions
        let result = currentInput
            .replace(/sin\(/g, 'Math.sin(');
            .replace(/cos\(/g, 'Math.cos(');
            .replace(/log\(/g, 'Math.log10(') ;// log base 10
            .replace(/ln\(/g, 'Math.log('); // natural log

        // Evaluate the expression
        display.value = eval(result);
        currentInput = display.value; // Update currentInput with the result
    } catch (e) {
        display.value = 'Error';
        currentInput = '';
    }
}

function Clearval(){
    display.value='';
    currentInput = '';
}
