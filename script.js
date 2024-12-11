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
let valueStack = []
let operatorStack = []
let expression = ""
let buttons = [num1, num2, num3, num4, num5, num6, num7, num8, num9, num0, btnPlus, btnMinus, btnPoint, btnMult, btnDivide, btnPower, btnLBracket, btnRBracket, btnAC, btnEquals];
let operators = "+-^*/";
let numbers = "1234567890";
buttons.forEach(btn =>{
    btn.addEventListener("click", pushStack);
})


function pushStack(e){
    
    let pushedBtn = e.currentTarget;
    if(pushedBtn == btnAC){
        expression = ""
        calcDisplay.textContent = expression;
    }
    else if(pushedBtn == btnEquals){
        evaluateExpression();
    }
    else{
        expression = expression + pushedBtn.textContent;
    }
    updateDisplay();
}

function updateDisplay(){
    
    calcDisplay.textContent = expression;
}

function evaluateExpression(){


    for(let i = 0; i < expression.length; i++){
        let element = expression.charAt(i);
        if(isOperator(element)){
            operatorStack.push(element);
        }
        else if(isOperand(element)){
            valueStack.push(element);
        }
    }
    console.log(expression);
    console.log(valueStack);
    console.log(operatorStack);
    
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




