/** 
 * Stephen Belikoff
 * Module1Lab1Activity4B
 * All requirements fulfilled
*/
"use strict";
class Calculator{
    constructor(number) {
        this.storedValue=number;
        this.previousOperation=null;
        this.previousOperand=null;
        this.stack=[number];
    }
    calc(string) {
        var parsedJSON = JSON.parse(string);
        var operation = parsedJSON.operation;
        var operand = parsedJSON.operand;
        console.log("operation: " +operation + " operand: " + operand);
        if(typeof this.storedValue === undefined) { // static variable storedValue needs to be initialized to 0 if undefined (which it will be on the first run)
            this.storedValue = 0; //prefixCalculator.stored value is a static variable that will carry over into future function calls
        }
        if (operation == 'add' && operand != 'pop') {
            this.storedValue += operand;
            this.stack.unshift(this.storedValue);
            this.previousOperand = operand;
            this.previousOperation = operation;
        } else if (operation == 'subtract' && operand != 'pop') { //subtraction case
            this.storedValue -= operand;
            this.stack.unshift(this.storedValue);
            this.previousOperand = operand;
            this.previousOperation = operation;
        } else if (operation == 'undo') {
            return this.undo()
        } else if (operation == 'pop') {
            this.previousOperand = this.peek(0);
            this.previousOperation = "pop";
            return this.pop();
        } else { //operation add, operand pop
            operand = this.pop();
            let json = '{"operation" : "' + operation + '", "operand" : ' + operand + '}';
            this.calc(json);
        }
        return this.storedValue;
    }
    undo() {
        if(this.stack === undefined || this.stack.length <= 1 || this.previousOperation==null) {
            this.storedValue=0;
            return this.storedValue;
        }
        if(this.previousOperation == "undo" || this.previousOperation == "add" || this.previousOperation == "subtract") {
            this.stack.unshift(this.peek(1));
        }
        if(this.previousOperation == "pop") {
            this.stack.unshift(this.previousOperand);
            this.previousOperation = "undo";
            return this.storedValue;
        }
        this.storedValue = this.peek(0);
        this.previousOperation = "undo";
        return this.storedValue;
    }
    peek(n) {
        if(n >= this.stack.length || this.stack.length == 0) { //if n = stack length, n will be out of bounds
            return null;
        }
        return this.stack[n];
    }
    pop() {
        if(this.stack === undefined || this.stack.length == 0) {
            return null;
        }
        var popped = this.peek(0);
        this.stack.shift();
        this.previousOperation="pop";
        this.previousOperand=popped;
        return popped;
    }
    printMe() {
        for (const json of this.stack) {
            console.log(json);
        }   
    }
    clear() {
        this.stack=[0];
        this.storedValue=0;
        this.previousOperation=null;
        this.previousOperand=null;
    }
}