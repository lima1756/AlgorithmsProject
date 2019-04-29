'use strict'

const problems = require('./problems/problemList');
const fileDialog = require('file-dialog')
const FileReader = require('./controllers/FileReader')
const Parentheses = require('./problems/Parentheses');
const mergelist = require('./problems/mergelist');
const trains = require('./problems/trains');
const words = require('./problems/words');
const ips = require('./problems/ips');
const wordboard = require('./problems/wordboard');
const dijkstra = require('./problems/dijkstra');
const prims = require('./problems/prims');


const radios = document.getElementsByName('problems');
const btn = document.getElementById('fileBtn');
const tableBody = document.getElementById("tableBody");
const table = document.getElementById("table");
const toast = document.getElementById("toast");
const toastBtn = document.getElementById("toastBtn");

document.getElementById('parentheses').value = problems.parentheses;
document.getElementById('mergelist').value = problems.mergeList;
document.getElementById('trains').value = problems.trains;
document.getElementById('words').value = problems.words;
document.getElementById('wordboard').value = problems.wordboard;
document.getElementById('ips').value = problems.ips;
document.getElementById('travelSalesMan').value = problems.travelSalesMan;
document.getElementById('dijkstra').value = problems.dijkstra;
document.getElementById('prims').value = problems.prims;

table.style.display ='none';
toast.style.display ='none';

toastBtn.onclick = ()=>{toast.style.display ='none';};

btn.onclick = ()=>{
    cleanTable();
    let checked = false;
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            toast.style.display ='none'; 
            checked = true; 
            fileDialog({ multiple: false })
            .then(file =>{
                const data = new FileReader(file[0].path)
                solve(parseInt(radios[i].value), data) 
            })   
        }
    }
    if(!checked){
        toast.style.display ='block';    
    }
}

function solve(problemId, data){
    switch(problemId){ 
        case problems.parentheses:
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
            break;
        case problems.mergeList:
            const res = mergelist(data);
            for(let i =0; i<res.length; i++){
                addResultsRow(res[i], data.output[i], res[i]===data.output[i]);
            }
        break;
        case problems.trains:
            const trainsRes = trains(data);
            for(let i =0; i<trainsRes.length; i++){
                addResultsRow(trainsRes[i], parseInt(data.output[i]), trainsRes[i]===parseInt(data.output[i]));
            }
        break;
        case problems.words:
            const wordsResult = words(data);
            for(let i =0; i<wordsResult.length; i++){
                addResultsRow(wordsResult[i], data.output[i], wordsResult[i]==(data.output[i]=='true'));
            }
        break;
        case problems.ips:
            const ipsResult = ips(data.input);
            for(let i =0; i<data.output.length; i++){
                let desiredOutput = data.output[i].split(' ');
                if(desiredOutput[0]===''){
                    desiredOutput = []
                }
                addResultsRow(ipsResult[i].join(' '), desiredOutput, (()=>{
                    if(ipsResult[i].length!==desiredOutput.length)
                        return false;
                    let check = true;
                    for(let j = 0; j<desiredOutput.length; j++){
                        check = ipsResult[i].indexOf(desiredOutput[j])!==-1 && check;
                        if(!check)
                            break;
                    }
                    return check;
                })());
            }
        break;
        case problems.wordboard:
            const wordboardRes = wordboard(data.input)[0]
            console.log(data.output);
            console.log(wordboardRes);
            for(let i =0; i<wordboardRes.length; i++){
                addResultsRow(wordboardRes[i], data.output[i], wordboardRes[i]==(data.output[i]=='true'));
            }
        break;
        case problems.travelSalesMan:
            
        break
        case problems.dijkstra:
            dijkstra(data.input)
        break;
        case problems.prims:
            prims(data.input)
        break;
    }
    table.style.display ='block';
}

function addResultsRow(output, desired, passed){
    const icon = passed?'<i class="icon icon-check text-success"></i>':'<i class="icon icon-cross text-error"></i>'
    tableBody.innerHTML = tableBody.innerHTML + `<tr><td>${output}</td><td>${desired}</td><td>${icon}</td></tr>`
}

function cleanTable(){
    tableBody.innerHTML = "";
    table.style.display ='none';
}