/** 
 * Stephen Belikoff
 * Module1Lab1Activity4A
*/
"use strict";
const obj1 = '{"operation" : "add", "operand" : 5}';
const obj2 = '{"operation" : "subtract", "operand" : 2}';
const obj3 = '{"operation" : "add", "operand" : 19}';
function calc(string) {
    var parsedJSON = JSON.parse(string);
    var operation = parsedJSON.operation;
    var operand = parsedJSON.operand;
    if(typeof calc.storedValue == 'undefined') { // static variable storedValue needs to be initialized to 0 if undefined (which it will be on the first run)
        calc.storedValue = 0; //prefixCalculator.stored value is a static variable that will carry over into future function calls
    }
    if (operation == 'add') {
        calc.storedValue += operand;
        
    } else { //subtraction case
        calc.storedValue -= operand;
    }
    return calc.storedValue;
}
calc(obj1); //returns 5
calc(obj2); //returns 3
calc(obj3); //returns 22