'use strict'

const problems = require('./problems');
const fileDialog = require('file-dialog')
const FileReader = require('../helpers/FileReader')
const Parentheses = require('../problems/Parentheses');
const mergelist = require('../problems/mergelist');


const radios = document.getElementsByName('problems');
const btn = document.getElementById('fileBtn');
const tableBody = document.getElementById("tableBody");

document.getElementById('parentheses').value = problems.parentheses;
document.getElementById('mergelist').value = problems.mergeList;
document.getElementById('trains').value = problems.trains;
document.getElementById('words').value = problems.words;
document.getElementById('wordboard').value = problems.wordboard;
document.getElementById('travelSalesMan').value = problems.travelSalesMan;
document.getElementById('dijkstra').value = problems.dijkstra;
document.getElementById('prims').value = problems.prims;

btn.onclick = ()=>{
    cleanTable();
    fileDialog({ multiple: false })
    .then(file =>{
        for(let i = 0; i < radios.length; i++){
            if(radios[i].checked){
                const data = new FileReader(file[0].path)
                solve(parseInt(radios[i].value), data)
            }
        }    
    })
    
}

function solve(problemId, data){
    switch(problemId){ 
        case problems.parentheses:
            parentheses(data);
        break;
        case problems.mergeList:
            const res = mergelist(data);
            for(let i =0; i<res.length; i++){
                addResultsRow(res[i], data.output[i], res[i]===data.output[i]);
            }
        break;
        case problems.trains:
            trains(data);
        break;
    }
}

function parentheses(data){
    for(let i = 0; i<data.input.length; i++)
        {
            const output = new Parentheses(data.input[i]).results;
            const desiredOutput = data.output[i].split(' ').map(value=>{
                return parseFloat(value);
            })
            let passed = true;
            if(output.length == desiredOutput.length){
                for(let i = 0; i < output.length; i++){
                    if(desiredOutput.indexOf(output[i])==-1)
                    {
                        passed = false;
                        break;
                    }
                }
            }
            else{
                passed = false;
            }
            addResultsRow(output, desiredOutput, passed);
        }
}



function addResultsRow(output, desired, passed){
    const icon = passed?'<i class="icon icon-check"></i>':'<i class="icon icon-cross"></i>'
    tableBody.innerHTML = tableBody.innerHTML + `<tr><td>${output}</td><td>${desired}</td><td>${passed}${icon}</td></tr>`
}

function cleanTable(){
    tableBody.innerHTML = "";
}