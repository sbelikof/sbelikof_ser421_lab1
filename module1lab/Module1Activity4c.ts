/** 
 * Stephen Belikoff
 * Module1Lab1Activity4C
*/

interface ICalculator {
    storedValue: number;
    previousOperation: number|string|null;
    previousOperand: number|null;
    stack: number[];
    calc(json : string) : number | null;
    undo(): number | null;
    peek(n : number): number | null;
    pop(): number | null;
    clear() : void;
    printMe() : void;
}
class CalculatorImp implements ICalculator {
    storedValue: number;
    previousOperation: string | number;
    previousOperand: number;
    stack: number[];
    constructor(initVal : number) {
        this.storedValue=initVal;
        this.stack=[initVal];
    }
    calc(json: string): number | null {
        var parsedJSON = JSON.parse(json);
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
            this.previousOperand = this.stack[0];
            this.previousOperation = "pop";
            return this.pop();
        } else { //operation add, operand pop
            operand = this.pop();
            let json = '{"operation" : "' + operation + '", "operand" : ' + operand + '}';
            this.calc(json);
        }
        return this.storedValue;
    }
    undo(): number | null{
        if(this.stack === undefined || this.stack.length <= 1 || this.previousOperation==null || this.previousOperation=="") {
            this.storedValue=0;
            return this.storedValue;
        }
        if(this.previousOperation == "undo" || this.previousOperation == "add" || this.previousOperation == "subtract") {
            this.stack.unshift(this.stack[1]);
        }
        if(this.previousOperation == "pop") {
            this.stack.unshift(this.previousOperand);
            this.previousOperation = "undo";
            return this.storedValue;
        }
        this.storedValue = this.stack[0];
        this.previousOperation = "undo";
        return this.storedValue;
    }
    peek(n: number): number|null {
        if(n >= this.stack.length || this.stack.length == 0) { //if n = stack length, n will be out of bounds
            return null;
        }
        return this.stack[n];
    }
    pop(): number | null {
        if(this.stack === undefined || this.stack.length == 0) {
            return null;
        }
        var popped = this.stack[0];
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
        this.previousOperation="";
        this.previousOperand=0;
    }
}
    