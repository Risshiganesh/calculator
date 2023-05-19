
//Unstructured display elements - to be converted to string
let displayArray = [];
//Structured displayed elements - this is what the user sees
let displayString;

//Variables for calculation
let a = 0;
let b = 0;

//Calculator screen reference
const screen = document.querySelector('#calculator-screen');

//Was equal clicked?
let verifyEqual = 'no';


function add(a,b){
    return a + b;
}

function subtract (a,b){
    return a - b;
}

function multiply (a,b){
    return a * b;
}

function divide (a,b){
    return a / b;
}



//Operate the numbers on the display array 
//Should activate when I press equals sign
function operate (input){

    let splitInput= input.split(' '); //space between operators

    a = Number(splitInput[0]);
    let op = splitInput[1];
    b = Number(splitInput[2]);


    if(op === '+'){

        return add(a,b);

    }else if( op === '-'){

        return subtract(a,b);

    }else if (op === 'x'){

        return multiply(a,b);

    }else if (op === '/'){

        return divide(a,b);
    }
    

}




//Code that causes things to be displayed on the screen
function screenDisplay(){
    //Screen starts by displaying zero
    screen.textContent = 0;
    
    getNumberInput();

    getOperatorInput();

    operateExpression();

    clearDisplay();
    
    decimalNumber();

}



//Get number inputs from calculator buttons
function getNumberInput(){
    const numbersNodeList = document.querySelectorAll('.numbers');
    
    numbersNodeList.forEach((button) => {
        button.addEventListener('click', function(){

            if (verifyEqual === 'yes'){
                clearEverything();
                
            }

            displayArray.push(button.textContent);

            //Create a new joinedString variable and assigned the joined version of protoDisplayArray
            displayString = displayArray.join('');

            screen.textContent = displayString; 

            console.log(displayArray);

             console.log(displayString);
            
        })
    })

}




//Get operator inputs from calculator buttons
function getOperatorInput(){

    let operatorArray = [];

    const operatorNodeList = document.querySelectorAll('.operator');

    operatorNodeList.forEach((operatorButton)=> {

        operatorButton.addEventListener('click', function(){

            let splitDisplayString = displayString.split(' ');

            let lastDisplayArrayItem = splitDisplayString[splitDisplayString.length - 1];

                //if the final element of  displayArray is not an operator, continue executing the code, else, return.
            if(!lastDisplayArrayItem){

                return; 

            //Is it possible to make this shorter?

            }else if (lastDisplayArrayItem === ' + '|| lastDisplayArrayItem === ' - ' || lastDisplayArrayItem === ' x ' || lastDisplayArrayItem === ' / '){
                
                return;

            }else if(splitDisplayString.length >= 3){

                let result = operate(displayString); //operate on the pre-existing 3 elements
                let checkResult = verifyResult(result); 
                let resultToString = checkResult.toString();
                console.log(result);
                console.log(displayArray)
                displayArray = []; // clear the displaArray

                displayArray.push(resultToString); //Add the result to the now emptied displayArray
                console.log(displayArray);

            }

            operatorArray.push(operatorButton.textContent);

            displayArray.push(' '+operatorArray.slice(-1)+' ');//Push the last element from operatorArray to mainDisplayArray with empty space so that it will be easier to split later

            displayString = displayArray.join('');

            screen.textContent = displayString;

            //console.log(splitDisplayString);


        })
    }) 


}




function operateExpression(){

    const equalsButton = document.querySelector('#equals')


    equalsButton.addEventListener('click', function(){

        if(!displayString){
            return;
        }

        let splitDisplayString = displayString.split(' ');
        
        //Only if splitDisplayString has 3 elements will the rest of the code be executed
        if(splitDisplayString.length < 3 || splitDisplayString[2] === ''){
            
            return;
        }

        let result = operate(displayString);
        let checkResult = verifyResult(result);
        let resultToString = checkResult.toString();

        screen.textContent = resultToString;
        
        verifyEqual = 'yes';

        console.log('You clicked equal!')
        console.log(splitDisplayString);
        console.log(splitDisplayString.length);
        return;
           
    })

    

}


function clearDisplay(){

    const clearButton = document.querySelector('#clear')


    clearButton.addEventListener('click', function(){
        
        clearEverything();

        return;
           
    })

    

}


function verifyResult (result){

    if(result === Infinity){

        displayArray = [];
        displayString = 0;
        screen.textContent = displayString;
        alert('You can\'t divide by zero!');
        console.log('verifying')
        return;

    }else if (isNaN(result)){

        displayArray = [];
        displayString = 0;
        screen.textContent = displayString;
        alert('Does not compute');
        console.log('verifying')
        return;

    }else if(result%1 != 0){

        return result.toFixed(2);

    }else{

        return result;
    }

    

}


function clearEverything(){

    displayArray = [];
    displayString = 0;
    screen.textContent = displayString;
    verifyEqual = 'no';

    console.log('Everything cleared!')

    return;

}



function decimalNumber(){
    //Remember to uncomment in the screenDisplay function before you run it

    const decimal = document.querySelector('#dot');

    decimal.addEventListener('click', function(){

        if (verifyEqual === 'yes'){
            clearEverything();
            
        }

        if(displayArray.length === 0){
            displayArray.push('0');
            displayArray.push(decimal.textContent);
            displayString = displayArray.join('');
            screen.textContent = displayString;
        }

        if (displayArray.slice(-1) === decimal.textContent){
            return;
        }


        let splitDisplayString = displayString.split(' ');//Big space

        let latestElement = splitDisplayString.slice(-1).toString();

        let splitLatestElement = latestElement.split('');//small space

        let verifyLatestElement = splitLatestElement.includes('.');

        console.log(verifyLatestElement);

        if(verifyLatestElement === false){

            if(latestElement === ''){
                console.log('bruh');
                displayArray.push('0');
            }

            displayArray.push(decimal.textContent);
            displayString = displayArray.join('');
            screen.textContent = displayString;

        }
        
        console.log(latestElement);
        console.log(displayString);
        


    });



}

screenDisplay();
