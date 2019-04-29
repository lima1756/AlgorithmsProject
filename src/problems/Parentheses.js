'use strict'
const { evaluateInfix } = require('calculator-lib');

class Parentheses{

    constructor(input){
        
        this.input = input;
        this.results = []
        this.operations = []
        const values = this.input[0].split(' ').map(val=>{
            return new Token(val);
        })
        this.solve(values)
    }

    solve(input){
        if(input.length===1){
            const ans = evaluateInfix(input[0].value);
            if(this.operations.indexOf(input[0].value) === -1){
                this.operations.push(input[0].value)
                this.results.push(ans);
            }
        }
        else {
            for(let i = 0; i < input.length-1; i+=2){
                let newValues = []
                for(let j = 0; j<i; j++){
                    newValues.push(input[j]);
                }
                newValues.push(Token.combine(input[i], input[i+1], input[i+2]))
                for(let j = i + 3; j<input.length; j++){
                    newValues.push(input[j]);
                }
                this.solve(newValues);
            }
        }

    }
}

class Token{

    static get VALUE(){ return 1; }
    static get OPERATION(){ return 0; }

    constructor(value){
        this.value = value;
        if(!isNaN(parseFloat(value)) && typeof(parseFloat(value)) === typeof(1.1) || value.length>1){
            this.type = Token.VALUE;
        }
        else{
            
            if(this.value==='–'){
                this.value='-';
            }
            this.type = Token.OPERATION;
        }
    }

    static combine(token1, operator, token2){
        return new Token('(' + token1.value+''+ operator.value+'' + token2.value + ')');
    }
}
module.exports = Parentheses;