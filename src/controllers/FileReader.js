'use strict'
const fs = require('fs');


class FileReader{
    
    static get STATE_INPUT(){ return 1; }
    static get STATE_OUTPUT(){ return 2; }

    constructor(path){
        let cont = fs.readFileSync(path, 'utf8');
        cont = cont.replace(/#.*(\r\n|\n|\r)/g, '').replace(/-+(\r\n|\n|\r)/g,'');
        cont = cont.split('\n')
        this.input = [];
        this.output = [];
        let state = 0;
        let input = [];
        let output = [];
        cont.forEach(line => {
            if(line.indexOf("Input:")!==-1){
                if(output.length!=0)
                {
                    this.output.push(output);
                    output = [];
                }
                state = FileReader.STATE_INPUT;
            }
            else if(line.indexOf("Output:") !== -1){
                this.input.push(input);
                input = [];
                state = FileReader.STATE_OUTPUT
            }
            else if(state === FileReader.STATE_INPUT){
                input.push(line.replace(/(\r\n|\n|\r)/g, ''));
            }
            else if(state === FileReader.STATE_OUTPUT){
                output.push(line.replace(/(\r\n|\n|\r)/g, ''))
            }
        });
        if(output.length!=0)
        {
            this.output.push(output);
            output = [];
        }
    }


}

module.exports = FileReader;