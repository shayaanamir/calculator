const calcDisplay = document.getElementById("calculatorDisplay");

const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");
const num0 = document.getElementById("num0");
const btnPlus = document.getElementById("btnPlus");
const btnMinus = document.getElementById("btnMinus");
const btnPoint = document.getElementById("btnPoint");
const btnMult = document.getElementById("btnMult");
const btnDivide = document.getElementById("btnDivide");
const btnPower = document.getElementById("btnPower");
const btnLBracket = document.getElementById("btnLBracket");
const btnRBracket = document.getElementById("btnRBracket");
const btnAC = document.getElementById("btnAC");
const btnEquals = document.getElementById("btnEquals");

let expression = ""
let buttons = [num1, num2, num3, num4, num5, num6, num7, num8, num9, num0, btnPlus, btnMinus, btnPoint, btnMult, btnDivide, btnPower, btnLBracket, btnRBracket, btnAC, btnEquals];
let operators = "+-^*/";
let numbers = "1234567890.";
buttons.forEach(btn =>{
    btn.addEventListener("click", pushStack);
})


function pushStack(e){
    
    let pushedBtn = e.currentTarget;
    if(pushedBtn == btnAC){
        expression = "";
    }
    else if(pushedBtn == btnEquals){
        if(expression != 'ERROR')
            expression = evaluateExpression();
    }
    else if(pushedBtn == btnPoint){
        if(expression != 'ERROR'){
            let operands = expression.split(/[\+\-\*\^\/\(\)\s]+/);

            if(!(operands[operands.length - 1].includes('.'))){
                expression = expression + pushedBtn.textContent;
            }
        }
        
    }
    else{
        if(expression != 'ERROR')
            expression = expression + pushedBtn.textContent;
    }
    updateDisplay(expression);
}

function updateDisplay(text){
    
    calcDisplay.textContent = text;

    let baseFontSize = 50;
    
    if (text.length > 14) {  
        let fontSize = (baseFontSize*14)/ text.length; 
        calcDisplay.style.fontSize = `${fontSize}px`;
    } else {
        calcDisplay.style.fontSize = `${baseFontSize}px`;
    }
}
function isValidExpression(){
    if(isValidParenthesis(expression)){
        for(let i = 0; i < expression.length; i++){
            let character = expression.charAt(i);
    
            if(isOperator(character)){
                if(isOperator(expression.charAt(i+1))){
                    return false;
                }
            }
            else if(isOperand(character)){
                if(expression.charAt(i+1) == '('){
                    return false;
                }
            }
    
        }
        return true;
    }
    else{
        return false;
    }
    
}
function isValidParenthesis(str) {
    let count = 0;

    for (let char of str) {
        if (char === "(") {
            count++;
        } else if (char === ")") {
            if (count === 0) {
                return false;
            }
            count--;
        }
    }

    return count === 0;
}

function evaluateExpression(){

    let valueStack = []
    let operatorStack = []
    if(isValidExpression()){
        for(let i = 0; i < expression.length; i++){
            let character = expression.charAt(i);
    
            if(character == '('){
                operatorStack.push(character);
            }
            else if(isOperand(character)){
                let val = ''
                while(i < expression.length && isOperand(expression.charAt(i))){
                    val = val + expression.charAt(i++);
                }
                valueStack.push(parseFloat(val));
                i--;
            }
            else if (isOperator(character)) {
                while ((operatorStack.length > 0) && (operatorStack[operatorStack.length - 1] !== '(') && (checkPrecedence(character, operatorStack[operatorStack.length - 1]))) {
                    let operator = operatorStack.pop();
                    let right = valueStack.pop();
                    let left = valueStack.pop();
                    valueStack.push(operate(operator, left, right));
                }
                operatorStack.push(character);
            }
            else if (character === ')') {
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                    let operator = operatorStack.pop();
                    let right = valueStack.pop();
                    let left = valueStack.pop();
                    valueStack.push(operate(operator, left, right));
                }
                operatorStack.pop();
            }
            else{
                return 'ERROR';
            }
        
        }
            while(operatorStack.length > 0){
                let operator = operatorStack.pop();
                let right = valueStack.pop();
                let left = valueStack.pop();
                valueStack.push(operate(operator, left, right));
            }
            console.log(expression);
            console.log(valueStack);
            console.log(operatorStack);
            
            if(valueStack[valueStack.length-1] != 'ERROR'){
                return +valueStack.pop().toFixed(7);
            }
            else{
                return 'ERROR';
            }

    }
    else{
        return 'ERROR';
    }


    
}

function isOperator(ele){
    if(operators.includes(ele)){
        return true;
    }
    else{
        return false;
    }
}

function isOperand(ele){
    if(numbers.includes(ele)){
        return true;
    }
    else{
        return false;
    }
}

function operate(operator, a, b){

    
    switch (operator)
    {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '^':
            return Math.pow(a,b);
        case '/':
            if (b == 0)
            {

                return 'ERROR';
            }
            return parseFloat(a / b);
    }
    return 0;
}

function checkPrecedence(op1, op2){
    if((op1 == '/' || op1 == '*') && (op2 == '+' || op2 == '-')){
        return false;
    }
    else if(op2 == '(' || op2 == ')'){
        return false;
    }
    else{
        return true;
    }
}





